import React, { useState, useMemo } from "react";
import type { VocabItem, ParsedItem } from "../../types";
import core from "@data/vocab-b1b2.js";
import health from "@data/vocab-health.js";
import environment from "@data/vocab-environment.js";
import education from "@data/vocab-education.js";
import work from "@data/vocab-work.js";
import technology from "@data/vocab-technology.js";
import travel from "@data/vocab-travel.js";
import urban from "@data/vocab-urban.js";
import communication from "@data/vocab-communication.js";
import food from "@data/vocab-food.js";
import science from "@data/vocab-science.js";
import academicConnectors from "@data/vocab-academic-connectors.js";
import academicSkills from "@data/vocab-academic-skills.js";
import speakingPhrases from "@data/vocab-speaking-phrases.js";

interface BankEntry {
  word: string;
  collocate: string;
  definition: string;
  context: string;
  category: string;
  level: "B1" | "B2" | "C1";
  topic: string;
}

interface TopicMeta {
  key: string;
  label: string;
  description: string;
  entries: BankEntry[];
}

const tagTopic = (entries: unknown[], topic: string): BankEntry[] =>
  (entries as Omit<BankEntry, "topic">[]).map((e) => ({ ...e, topic }));

const TOPICS: TopicMeta[] = [
  { key: "core",          label: "Foundations",                description: "Core academic verbs, nouns, and connectors",         entries: tagTopic(core, "core") },
  { key: "health",        label: "Health & Lifestyle",         description: "Exercise, diet, mental health, well-being",         entries: tagTopic(health, "health") },
  { key: "environment",   label: "Environment & Sustainability", description: "Pollution, climate, recycling, biodiversity",     entries: tagTopic(environment, "environment") },
  { key: "education",     label: "Education & Learning",       description: "Study, university, lifelong learning",              entries: tagTopic(education, "education") },
  { key: "work",          label: "Work & Careers",             description: "Workplace, remote work, burnout, promotion",        entries: tagTopic(work, "work") },
  { key: "technology",    label: "Technology & Internet",      description: "Devices, social media, AI, privacy",                entries: tagTopic(technology, "technology") },
  { key: "travel",        label: "Travel & Culture",           description: "Tourism, cross-cultural experience, language",      entries: tagTopic(travel, "travel") },
  { key: "urban",         label: "Urban Life & Transport",     description: "Cities, commute, infrastructure, housing",          entries: tagTopic(urban, "urban") },
  { key: "communication", label: "Communication & Relationships", description: "Family, friendship, conflict, media",            entries: tagTopic(communication, "communication") },
  { key: "food",          label: "Food & Eating Habits",       description: "Cuisine, nutrition, cooking, fast food",            entries: tagTopic(food, "food") },
  { key: "science",              label: "Science & Nature",        description: "Research, animals, space, discoveries",                       entries: tagTopic(science, "science") },
  { key: "academic-connectors", label: "Academic Connectors",    description: "Contrast, causality, addition, exemplification, conclusion markers", entries: tagTopic(academicConnectors, "academic-connectors") },
  { key: "academic-skills",     label: "Academic Skills",        description: "Cross-topic B2/C1 verbs, adjectives, and adverbs for IELTS/VSTEP essays", entries: tagTopic(academicSkills, "academic-skills") },
  { key: "speaking-phrases",    label: "Speaking Phrases",       description: "Opinion starters, hedges, discourse markers for IELTS Speaking",     entries: tagTopic(speakingPhrases, "speaking-phrases") },
];

const vocabList: BankEntry[] = TOPICS.flatMap((t) => t.entries);

const ALL = "all";

// ── Sets view ────────────────────────────────────────────────────────────────

const SetsView: React.FC<{
  inDeck: Set<string>;
  mastered: Set<string>;
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
}> = ({ inDeck, mastered, onImport }) => {
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

  return (
    <div>
      <p className="vt-hint">
        Pick a topic set and add all words to your deck at once, or expand to browse before adding.
        Words already in your deck keep their original example.
      </p>
      <div className="vt-sets-grid">
        {TOPICS.map(({ key, label, description, entries }) => {
          const inDeckCount = entries.filter((e) => inDeck.has(e.word.toLowerCase())).length;
          const addable = entries.filter(
            (e) => !inDeck.has(e.word.toLowerCase()) && !mastered.has(e.word.toLowerCase())
          ).length;
          const b1 = entries.filter((e) => e.level === "B1").length;
          const b2 = entries.filter((e) => e.level === "B2").length;
          const c1 = entries.filter((e) => e.level === "C1").length;
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
                <span className="vt-cap">B1·{b1} B2·{b2}{c1 > 0 ? ` C1·${c1}` : ""}</span>
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
  inDeck: Set<string>;
  mastered: Set<string>;
  onToggleMastered: (word: string) => void;
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
}> = ({ inDeck, mastered, onToggleMastered, onImport }) => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string>(ALL);
  const [category, setCategory] = useState<string>(ALL);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showMastered, setShowMastered] = useState(false);
  const [done, setDone] = useState<number | null>(null);

  const cats = ["verb", "noun", "adjective", "adverb", "phrase"];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (vocabList as BankEntry[]).filter((e) => {
      if (!showMastered && mastered.has(e.word.toLowerCase())) return false;
      if (level !== ALL && e.level !== level) return false;
      if (category !== ALL && e.category !== category) return false;
      if (q && !e.word.toLowerCase().startsWith(q)) return false;
      return true;
    });
  }, [search, level, category, showMastered, mastered]);

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
    const toAdd: ParsedItem[] = (vocabList as BankEntry[])
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
          {([ALL, "B1", "B2", "C1"] as string[]).map((l) => (
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
          {([ALL, ...cats] as string[]).map((c) => (
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
  items: VocabItem[];
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
  mastered: Set<string>;
  onToggleMastered: (word: string) => void;
}> = ({ items, onImport, mastered, onToggleMastered }) => {
  const [bankView, setBankView] = useState<"sets" | "browse">("sets");

  const inDeck = useMemo(
    () => new Set(items.map((i) => i.word.toLowerCase())),
    [items]
  );

  return (
    <div className="vt-card">
      <div className="vt-card-head">
        <h2>Word Bank</h2>
        <span className="vt-cap">{(vocabList as BankEntry[]).length} words</span>
      </div>

      <div className="vt-bank-pills">
        <button className={bankView === "sets" ? "on" : ""} onClick={() => setBankView("sets")}>Sets</button>
        <button className={bankView === "browse" ? "on" : ""} onClick={() => setBankView("browse")}>Browse</button>
      </div>

      {bankView === "sets" ? (
        <SetsView inDeck={inDeck} mastered={mastered} onImport={onImport} />
      ) : (
        <BrowseView inDeck={inDeck} mastered={mastered} onToggleMastered={onToggleMastered} onImport={onImport} />
      )}
    </div>
  );
};
