import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getGlossary, getGlossaryCategories } from '@data/glossaries';

const courseTitles = {
  ccna: 'Từ điển thuật ngữ mạng',
  'stock-finance': 'Từ điển thuật ngữ tài chính',
};

export default function GlossaryPage() {
  const { courseId } = useParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const glossary = getGlossary(courseId);
  const glossaryCategories = getGlossaryCategories(courseId);

  // Filter and sort terms
  const filteredTerms = useMemo(() => {
    return Object.entries(glossary)
      .filter(([term, data]) => {
        const matchesSearch =
          term.toLowerCase().includes(search.toLowerCase()) ||
          data.vi.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === 'All' || data.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [search, selectedCategory, glossary]);

  // Group terms by first letter for quick navigation
  const groupedTerms = useMemo(() => {
    const groups = {};
    filteredTerms.forEach(([term, data]) => {
      const letter = term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push({ term, ...data });
    });
    return groups;
  }, [filteredTerms]);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to={courseId ? `/course/${courseId}` : '/'}
          className="inline-flex items-center gap-2 text-soft hover:text-ink mb-6 transition-colors"
        >
          <span>←</span> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">📖</span>
          <div>
            <h1 className="text-2xl font-display font-medium text-ink">Technical Glossary</h1>
            <p className="text-soft">
              {courseTitles[courseId] || 'Từ điển thuật ngữ'} • {Object.keys(glossary).length} terms
            </p>
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search terms / Tìm thuật ngữ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-soft">
              🔍
            </span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input sm:w-48"
          >
            {glossaryCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-soft/70 mb-4">
          Showing {filteredTerms.length} of {Object.keys(glossary).length} terms
        </p>

        {/* Terms list */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-2">
            {filteredTerms.map(([term, data]) => (
              <div
                key={term}
                className="card p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-medium text-accent">{term}</span>
                      {data.category && (
                        <span className="text-xs px-2 py-0.5 bg-line text-soft rounded-full">
                          {data.category}
                        </span>
                      )}
                    </div>
                    <p className="text-ink/80 text-sm">{data.vi}</p>
                  </div>
                  <span className="text-xl shrink-0">🇻🇳</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-soft">
            <p className="text-4xl mb-4">🔍</p>
            <p>No terms found matching "{search}"</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              className="text-accent hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Quick navigation by letter */}
        {!search && selectedCategory === 'All' && (
          <div className="mt-8 pt-6 border-t border-line">
            <h3 className="text-sm font-medium text-soft mb-3">
              Quick Navigation
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(groupedTerms).sort().map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    document
                      .getElementById(`letter-${letter}`)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-8 h-8 rounded bg-paper-2 border border-line text-soft hover:bg-accent hover:text-paper hover:border-accent transition-colors text-sm font-mono"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
