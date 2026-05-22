import React, { useState } from "react";
import type { VocabItem, ParsedItem } from "../../types";
export { WordBank } from "./WordBank";
import { INTERVALS, isOwned } from "../../lib/srs";
import { parseBulk, serializeDeck } from "../../lib/text";
import { StageDots } from "../learner";

interface Preview {
  fresh: ParsedItem[];
  errors: string[];
  dup: number;
}

export const Import: React.FC<{
  items: VocabItem[];
  onImport: (parsed: ParsedItem[]) => { added: number; skipped: number };
}> = ({ items, onImport }) => {
  const [raw, setRaw] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [done, setDone] = useState<number | null>(null);

  const doParse = () => {
    const { out, errors } = parseBulk(raw);
    const have = new Set(items.map((i) => i.word.toLowerCase()));
    const fresh: ParsedItem[] = [];
    let dup = 0;
    for (const o of out) {
      if (have.has(o.word.toLowerCase())) {
        dup++;
        continue;
      }
      have.add(o.word.toLowerCase());
      fresh.push(o);
    }
    setPreview({ fresh, errors, dup });
    setDone(null);
  };

  const commit = () => {
    if (!preview || preview.fresh.length === 0) return;
    const { added } = onImport(preview.fresh);
    setDone(added);
    setPreview(null);
    setRaw("");
  };

  return (
    <div className="vt-card">
      <div className="vt-card-head">
        <h2>Import list</h2>
        <span className="vt-cap">{items.length} in deck</span>
      </div>
      <p className="vt-hint">
        One item per line. Separate fields with <code>|</code> (or a tab / semicolon). Order:{" "}
        <b>word | collocate | definition | context</b>. Only the word is required. Lines starting
        with <code>#</code> are ignored.
      </p>

      <div className="vt-example">
        mitigate | mitigate the impact | to make less severe | Trees mitigate the impact of heat.
        <br />
        pose | pose a threat | to present a danger
        <br />
        curb | curb emissions
        <br />
        resilient
      </div>

      <label className="vt-field">
        <span>Paste your list</span>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={8}
          placeholder={"word | collocate | definition | context\n…"}
        />
      </label>

      <button className="vt-primary" onClick={doParse} disabled={!raw.trim()}>Preview</button>

      {preview && (
        <div className="vt-preview">
          <div className="vt-preview-head">
            <b>{preview.fresh.length}</b> new
            {preview.dup > 0 && (
              <span> · {preview.dup} duplicate{preview.dup > 1 ? "s" : ""} skipped</span>
            )}
            {preview.errors.length > 0 && (
              <span className="vt-err"> · {preview.errors.length} bad line{preview.errors.length > 1 ? "s" : ""}</span>
            )}
          </div>
          <div className="vt-preview-list">
            {preview.fresh.slice(0, 40).map((o, k) => (
              <div key={k} className="vt-preview-row">
                <b>{o.word}</b>
                {o.collocate && <span className="vt-pc">{o.collocate}</span>}
                {o.definition && <span className="vt-pd">{o.definition}</span>}
              </div>
            ))}
            {preview.fresh.length > 40 && (
              <div className="vt-preview-more">+ {preview.fresh.length - 40} more…</div>
            )}
          </div>
          {preview.fresh.length > 0 ? (
            <button className="vt-primary" onClick={commit}>
              Add {preview.fresh.length} to deck
            </button>
          ) : (
            <p className="vt-foot">Nothing new to add.</p>
          )}
        </div>
      )}

      {done != null && <div className="vt-done">Added {done} item{done > 1 ? "s" : ""} ✓</div>}
    </div>
  );
};

export const Deck: React.FC<{
  items: VocabItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}> = ({ items, onRemove, onClear }) => {
  if (items.length === 0)
    return <div className="vt-empty">Deck is empty. Import a list to get started.</div>;

  const sorted = [...items].sort((a, b) =>
    a.stage !== b.stage ? b.stage - a.stage : a.word.localeCompare(b.word)
  );
  const copyDeck = () => {
    void navigator.clipboard?.writeText(serializeDeck(items));
  };
  const clearAll = () => {
    if (confirm("Remove all items? This cannot be undone.")) onClear();
  };

  return (
    <div>
      <div className="vt-deck-bar">
        <button className="vt-ghost sm" onClick={copyDeck}>Copy / export</button>
        <button className="vt-ghost sm danger" onClick={clearAll}>Clear all</button>
      </div>
      <div className="vt-deck">
        {sorted.map((i) => (
          <div key={i.id} className="vt-deck-row">
            <div className="vt-deck-main">
              <div className="vt-deck-top">
                <b>{i.word}</b>
                {i.collocate && <span className="vt-deck-coll">{i.collocate}</span>}
              </div>
              {(i.sentence || i.definition) && (
                <p className="vt-deck-sent">{i.sentence || i.definition}</p>
              )}
            </div>
            <div className="vt-deck-meta">
              {isOwned(i) ? (
                <i className="vt-tag ok">owned</i>
              ) : i.seen ? (
                <StageDots stage={i.stage} small />
              ) : (
                <i className="vt-tag">new</i>
              )}
              <button className="vt-del" onClick={() => onRemove(i.id)} aria-label="delete">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
