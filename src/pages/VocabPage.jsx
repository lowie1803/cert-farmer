import React, { useEffect, useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { usePageTitle } from '@hooks/usePageTitle';
import { VocabLadder } from '@features/vocab-ladder';
import { LocalStorageAdapter } from '@features/vocab-ladder/storage/adapter';
import { LANGUAGES, DEFAULT_LANG, getLanguage } from '@data/vocab-languages';

const LAST_LANG_KEY = 'cert-farmer:vocab:lang';

function readLastLang() {
  try {
    const v = localStorage.getItem(LAST_LANG_KEY);
    return v && getLanguage(v) ? v : null;
  } catch {
    return null;
  }
}

function Picker() {
  usePageTitle('Vocab — choose language');
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="font-display text-2xl mb-2">Choose a language</h1>
        <p className="text-soft text-sm mb-6">
          Each language has its own deck and progress. You can switch from the
          Vocab Ladder header at any time.
        </p>
        <div className="grid gap-3">
          {LANGUAGES.map((l) => (
            <Link
              key={l.code}
              to={`/vocab/${l.code}`}
              className="flex items-center gap-3 border border-line rounded-lg p-4 hover:border-accent transition-colors"
            >
              {l.flag && <span className="text-2xl">{l.flag}</span>}
              <div className="flex-1">
                <div className="font-display font-medium text-ink">{l.label}</div>
                <div className="text-xs text-soft">
                  {l.topics.length} topic set{l.topics.length === 1 ? '' : 's'} ·{' '}
                  {l.levels.join(', ')}
                </div>
              </div>
              <span className="text-soft">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VocabPage() {
  const { lang: langParam } = useParams();
  const navigate = useNavigate();

  // No :lang in URL — redirect to last-used (or default) once we know.
  if (!langParam) {
    const last = readLastLang() ?? DEFAULT_LANG;
    return <Navigate to={`/vocab/${last}`} replace />;
  }

  const language = getLanguage(langParam);

  // Unknown language → show picker.
  if (!language) {
    return <Picker />;
  }

  return <ActiveVocab language={language} navigate={navigate} />;
}

function ActiveVocab({ language, navigate }) {
  usePageTitle(`Vocab — ${language.label}`);

  useEffect(() => {
    try {
      localStorage.setItem(LAST_LANG_KEY, language.code);
    } catch {
      /* ignore */
    }
  }, [language.code]);

  const adapter = useMemo(
    () => new LocalStorageAdapter(`cert-farmer:vocab:${language.code}`),
    [language.code]
  );

  // The languages page lives at /vocab (with no :lang, it shows picker only
  // when the URL doesn't resolve). Use /vocab/<other> direct links from a
  // small in-app switcher rendered below VocabLadder.
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-soft uppercase tracking-wide mr-1">Language</span>
          {LANGUAGES.map((l) => {
            const active = l.code === language.code;
            return (
              <button
                key={l.code}
                onClick={() => !active && navigate(`/vocab/${l.code}`)}
                aria-pressed={active}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  active
                    ? 'border-accent text-accent bg-accent/10 cursor-default'
                    : 'border-line text-soft hover:text-ink hover:border-soft'
                }`}
              >
                {l.flag && <span className="mr-1">{l.flag}</span>}
                {l.label}
              </button>
            );
          })}
        </div>
        <VocabLadder
          key={language.code}
          adapter={adapter}
          language={language}
          initialMode="learn"
        />
      </div>
    </div>
  );
}
