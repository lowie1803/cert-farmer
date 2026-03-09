import React from 'react';
import glossary from '@data/glossary';

/**
 * Sorted terms by length (longest first) for accurate matching
 */
const sortedTerms = Object.keys(glossary).sort((a, b) => b.length - a.length);

/**
 * Create regex pattern for all glossary terms
 */
const createTermPattern = () => {
  if (sortedTerms.length === 0) return null;
  
  const pattern = sortedTerms
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  
  return new RegExp(`\\b(${pattern})\\b`, 'gi');
};

const termRegex = createTermPattern();

/**
 * Find glossary entry case-insensitively
 */
export const findGlossaryEntry = (term) => {
  const key = Object.keys(glossary).find(
    k => k.toLowerCase() === term.toLowerCase()
  );
  return key ? { term: key, ...glossary[key] } : null;
};

/**
 * Check if a term exists in the glossary
 */
export const isGlossaryTerm = (term) => {
  return Object.keys(glossary).some(
    k => k.toLowerCase() === term.toLowerCase()
  );
};

/**
 * Get all terms for a specific category
 */
export const getTermsByCategory = (category) => {
  return Object.entries(glossary)
    .filter(([_, data]) => data.category === category)
    .map(([term, data]) => ({ term, ...data }));
};

/**
 * Search glossary by term or definition
 */
export const searchGlossary = (query) => {
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
 * @param {string} text - Text to process
 * @param {string} keyPrefix - Unique key prefix for React elements
 * @param {Function} WrapperComponent - Component to wrap terms with
 */
export const wrapGlossaryTerms = (text, keyPrefix, WrapperComponent) => {
  if (!text || !termRegex) return text;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  let partIndex = 0;
  
  // Reset regex state
  const regex = new RegExp(termRegex.source, 'gi');
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    const matchedTerm = match[0];
    const entry = findGlossaryEntry(matchedTerm);
    
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
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

export default glossary;
