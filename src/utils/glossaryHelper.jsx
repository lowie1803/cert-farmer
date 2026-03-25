import React from 'react';
import { getGlossary } from '@data/glossaries';

/**
 * Per-course cache: { courseId: { sortedTerms, regex, glossary } }
 */
const cache = {};

function getCache(courseId) {
  if (cache[courseId]) return cache[courseId];

  const glossary = getGlossary(courseId);
  const sortedTerms = Object.keys(glossary).sort((a, b) => b.length - a.length);

  let regex = null;
  if (sortedTerms.length > 0) {
    const pattern = sortedTerms
      .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  }

  cache[courseId] = { sortedTerms, regex, glossary };
  return cache[courseId];
}

/**
 * Find glossary entry case-insensitively
 */
export const findGlossaryEntry = (courseId, term) => {
  const { glossary } = getCache(courseId);
  const key = Object.keys(glossary).find(
    k => k.toLowerCase() === term.toLowerCase()
  );
  return key ? { term: key, ...glossary[key] } : null;
};

/**
 * Check if a term exists in the glossary
 */
export const isGlossaryTerm = (courseId, term) => {
  const { glossary } = getCache(courseId);
  return Object.keys(glossary).some(
    k => k.toLowerCase() === term.toLowerCase()
  );
};

/**
 * Get all terms for a specific category
 */
export const getTermsByCategory = (courseId, category) => {
  const { glossary } = getCache(courseId);
  return Object.entries(glossary)
    .filter(([_, data]) => data.category === category)
    .map(([term, data]) => ({ term, ...data }));
};

/**
 * Search glossary by term or definition
 */
export const searchGlossary = (courseId, query) => {
  const { glossary } = getCache(courseId);
  const lowerQuery = query.toLowerCase();
  return Object.entries(glossary)
    .filter(([term, data]) =>
      term.toLowerCase().includes(lowerQuery) ||
      data.vi.toLowerCase().includes(lowerQuery)
    )
    .map(([term, data]) => ({ term, ...data }));
};

/**
 * Wrap glossary terms with a component
 * @param {string} courseId - Course identifier
 * @param {string} text - Text to process
 * @param {string} keyPrefix - Unique key prefix for React elements
 * @param {Function} WrapperComponent - Component to wrap terms with
 */
export const wrapGlossaryTerms = (courseId, text, keyPrefix, WrapperComponent) => {
  const { regex } = getCache(courseId);
  if (!text || !regex) return text;

  const parts = [];
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  // Reset regex state
  const re = new RegExp(regex.source, 'gi');

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matchedTerm = match[0];
    const entry = findGlossaryEntry(courseId, matchedTerm);

    if (entry) {
      parts.push(
        <WrapperComponent
          key={`${keyPrefix}-${partIndex++}`}
          term={entry.term}
          definition={entry.vi}
        >
          {matchedTerm}
        </WrapperComponent>
      );
    } else {
      parts.push(matchedTerm);
    }

    lastIndex = re.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};
