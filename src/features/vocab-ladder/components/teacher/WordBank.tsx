import React, { useState, useMemo } from "react";
import type { VocabItem, ParsedItem } from "../../types";

interface BankEntry {
  word: string;
  collocate: string;
  definition: string;
  context: string;
  category: string;
  level: string;
  topic: string;
}

interface TopicMeta {
  key: string;
  label: string;
  description: string;
  entries: BankEntry[];
}

export interface LanguageConfig {
  code: string;
  label: string;
  flag?: string;
  levels: string[];
  categories: string[];
  topics: TopicMeta[];
}

const ALL = "all";

// ── Sets view ────────────────────────────────────────────────────────────────

const SetsView: React.FC<{
  topics: TopicMeta[];
  levels: string[];
  inDeck: Set<string>;
  mastered: Set<string>;
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
}> = ({ topics, levels, inDeck, mastered, onImport }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [done, setDone] = useState<{ label: string; n: number } | null>(null);

  const addAll = (label: string, entries: BankEntry[]) => {
    const toAdd: ParsedItem[] = entries
      .filter((e) => !inDeck.has(e.word.toLowerCase()) && !mastered.has(e.word.toLowerCase()))
      .map(({ word, collocate, definition, context }) => ({ word, collocate, definition, context }));
    if (toAdd.length === 0) return;
    const { added } = onImport(toAdd);
    setDone({ label, n: added });
  };

  if (topics.length === 0) {
    return <div className="vt-empty">No topic sets defined for this language yet.</div>;
  }

  return (
    <div>
      <p className="vt-hint">
        Pick a topic set and add all words to your deck at once, or expand to browse before adding.
        Words already in your deck keep their original example.
      </p>
      <div className="vt-sets-grid">
        {topics.map(({ key, label, description, entries }) => {
          const inDeckCount = entries.filter((e) => inDeck.has(e.word.toLowerCase())).length;
          const addable = entries.filter(
            (e) => !inDeck.has(e.word.toLowerCase()) && !mastered.has(e.word.toLowerCase())
          ).length;
          const levelCounts = levels.map((lv) => ({
            lv,
            n: entries.filter((e) => e.level === lv).length,
          }));
          const isOpen = expanded === key;
          return (
            <div key={key} className="vt-set-card">
              <div className="vt-set-card-head">
                <span className="vt-set-label">{label}</span>
                <button
                  className="vt-ghost sm"
                  onClick={() => setExpanded(isOpen ? null : key)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Collapse" : "Preview"}
                </button>
              </div>
              <p className="vt-set-meta">
                {description}
                <br />
                <b>{entries.length}</b> words · <b>{inDeckCount}</b> in deck
                <br />
                <span className="vt-cap">
                  {levelCounts
                    .filter((c) => c.n > 0)
                    .map((c) => `${c.lv}·${c.n}`)
                    .join(" ")}
                </span>
              </p>
              <div className="vt-set-actions">
                <button
                  className="vt-primary sm"
                  onClick={() => addAll(label, entries)}
                  disabled={addable === 0}
                >
                  {addable > 0 ? `Add ${addable}` : "All added"}
                </button>
              </div>
              {isOpen && (
                <div className="vt-set-words">
                  {entries.map((e) => {
                    const owned = inDeck.has(e.word.toLowerCase());
                    const isMastered = mastered.has(e.word.toLowerCase());
                    return (
                      <div
                        key={e.word}
                        className={`vt-set-word${owned ? " in-deck" : ""}${isMastered ? " is-mastered" : ""}`}
                      >
                        <b>{e.word}</b>
                        {e.collocate && <span className="vt-pc" style={{ marginLeft: "6px" }}>{e.collocate}</span>}
                        {owned && <i className="vt-tag ok" style={{ marginLeft: "6px" }}>in deck</i>}
                        {isMastered && !owned && <i className="vt-tag" style={{ marginLeft: "6px" }}>mastered</i>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {done && (
        <div className="vt-done" style={{ marginTop: "0.75rem" }}>
          Added {done.n} {done.label} word{done.n !== 1 ? "s" : ""} ✓
        </div>
      )}
    </div>
  );
};

// ── Browse view ───────────────────────────────────────────────────────────────

const BrowseView: React.FC<{
  vocabList: BankEntry[];
  levels: string[];
  categories: string[];
  inDeck: Set<string>;
  mastered: Set<string>;
  onToggleMastered: (word: string) => void;
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
}> = ({ vocabList, levels, categories, inDeck, mastered, onToggleMastered, onImport }) => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string>(ALL);
  const [category, setCategory] = useState<string>(ALL);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showMastered, setShowMastered] = useState(false);
  const [done, setDone] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vocabList.filter((e) => {
      if (!showMastered && mastered.has(e.word.toLowerCase())) return false;
      if (level !== ALL && e.level !== level) return false;
      if (category !== ALL && e.category !== category) return false;
      if (q && !e.word.toLowerCase().startsWith(q)) return false;
      return true;
    });
  }, [search, level, category, showMastered, mastered, vocabList]);

  const toggle = (word: string) => {
    if (inDeck.has(word.toLowerCase())) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      return next;
    });
    setDone(null);
  };

  const selectAll = () => {
    const addable = filtered.filter((e) => !inDeck.has(e.word.toLowerCase()) && !mastered.has(e.word.toLowerCase()));
    setSelected(new Set(addable.map((e) => e.word)));
    setDone(null);
  };

  const clearSel = () => {
    setSelected(new Set());
    setDone(null);
  };

  const commit = () => {
    const toAdd: ParsedItem[] = vocabList
      .filter((e) => selected.has(e.word))
      .map(({ word, collocate, definition, context }) => ({ word, collocate, definition, context }));
    if (toAdd.length === 0) return;
    const { added } = onImport(toAdd);
    setDone(added);
    setSelected(new Set());
  };

  const masteredCount = mastered.size;

  return (
    <div>
      {/* filters */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <input
          className="vt-search"
          type="search"
          placeholder="Search words…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setDone(null); }}
        />
        <div className="vt-filter-row">
          {([ALL, ...levels] as string[]).map((l) => (
            <button
              key={l}
              className={`vt-chip${level === l ? " on" : ""}`}
              onClick={() => { setLevel(l); setDone(null); }}
            >
              {l === ALL ? "All levels" : l}
            </button>
          ))}
        </div>
        <div className="vt-filter-row">
          {([ALL, ...categories] as string[]).map((c) => (
            <button
              key={c}
              className={`vt-chip${category === c ? " on" : ""}`}
              onClick={() => { setCategory(c); setDone(null); }}
            >
              {c === ALL ? "All types" : c + "s"}
            </button>
          ))}
        </div>
        {masteredCount > 0 && (
          <div>
            <button
              className={`vt-chip${showMastered ? " on" : ""}`}
              onClick={() => setShowMastered((v) => !v)}
            >
              {showMastered ? `Hide mastered (${masteredCount})` : `Show mastered (${masteredCount})`}
            </button>
          </div>
        )}
      </div>

      {/* select-all / clear row */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <button
          className="vt-ghost sm"
          onClick={selectAll}
          disabled={filtered.every((e) => inDeck.has(e.word.toLowerCase()) || mastered.has(e.word.toLowerCase()))}
        >
          Select all visible
        </button>
        {selected.size > 0 && (
          <button className="vt-ghost sm" onClick={clearSel}>Clear selection</button>
        )}
      </div>

      {/* word list */}
      <div className="vt-bank-list">
        {filtered.length === 0 && (
          <div className="vt-empty" style={{ padding: "1rem 0" }}>No words match your filters.</div>
        )}
        {filtered.map((e) => {
          const owned = inDeck.has(e.word.toLowerCase());
          const isMastered = mastered.has(e.word.toLowerCase());
          const sel = selected.has(e.word);
          return (
            <div
              key={e.word}
              className={`vt-bank-row${sel ? " sel" : ""}${owned ? " owned" : ""}${isMastered && !owned ? " mastered" : ""}`}
              onClick={() => toggle(e.word)}
              role="checkbox"
              aria-checked={owned ? true : sel}
              tabIndex={owned || isMastered ? -1 : 0}
              onKeyDown={(ev) => ev.key === " " && toggle(e.word)}
            >
              <span className="vt-bank-check">{owned ? "✓" : sel ? "☑" : "☐"}</span>
              <span className="vt-bank-body">
                <span className="vt-bank-word">
                  {e.word}
                  <span className="vt-bank-level">{e.level}</span>
                  {owned && <i className="vt-tag ok" style={{ marginLeft: "0.35rem" }}>in deck</i>}
                  {isMastered && !owned && <i className="vt-tag" style={{ marginLeft: "0.35rem" }}>mastered</i>}
                </span>
                {e.collocate && <span className="vt-pc">{e.collocate}</span>}
                {e.definition && <span className="vt-pd">{e.definition}</span>}
              </span>
              {!owned && (
                <button
                  className="vt-master-btn"
                  onClick={(ev) => { ev.stopPropagation(); onToggleMastered(e.word.toLowerCase()); setSelected((prev) => { const next = new Set(prev); next.delete(e.word); return next; }); }}
                  aria-label={isMastered ? "Unmark mastered" : "Mark as mastered"}
                >
                  {isMastered ? "Unmaster" : "Master ✓"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* footer action */}
      <div style={{ marginTop: "0.75rem" }}>
        <button className="vt-primary" onClick={commit} disabled={selected.size === 0}>
          Add {selected.size > 0 ? selected.size : ""} word{selected.size !== 1 ? "s" : ""} to deck
        </button>
      </div>

      {done != null && (
        <div className="vt-done">Added {done} item{done !== 1 ? "s" : ""} ✓</div>
      )}
    </div>
  );
};

// ── WordBank shell ────────────────────────────────────────────────────────────

export const WordBank: React.FC<{
  language: LanguageConfig;
  items: VocabItem[];
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
  mastered: Set<string>;
  onToggleMastered: (word: string) => void;
}> = ({ language, items, onImport, mastered, onToggleMastered }) => {
  const [bankView, setBankView] = useState<"sets" | "browse">("sets");

  const vocabList = useMemo<BankEntry[]>(
    () => language.topics.flatMap((t) => t.entries),
    [language]
  );

  const inDeck = useMemo(
    () => new Set(items.map((i) => i.word.toLowerCase())),
    [items]
  );

  return (
    <div className="vt-card">
      <div className="vt-card-head">
        <h2>Word Bank</h2>
        <span className="vt-cap">{vocabList.length} words</span>
      </div>

      <div className="vt-bank-pills">
        <button className={bankView === "sets" ? "on" : ""} onClick={() => setBankView("sets")}>Sets</button>
        <button className={bankView === "browse" ? "on" : ""} onClick={() => setBankView("browse")}>Browse</button>
      </div>

      {bankView === "sets" ? (
        <SetsView
          topics={language.topics}
          levels={language.levels}
          inDeck={inDeck}
          mastered={mastered}
          onImport={onImport}
        />
      ) : (
        <BrowseView
          vocabList={vocabList}
          levels={language.levels}
          categories={language.categories}
          inDeck={inDeck}
          mastered={mastered}
          onToggleMastered={onToggleMastered}
          onImport={onImport}
        />
      )}
    </div>
  );
};
