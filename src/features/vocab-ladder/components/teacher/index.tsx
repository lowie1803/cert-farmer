import React, { useRef, useState } from "react";
import type { VocabItem, ParsedItem } from "../../types";
import type { LanguageConfig } from "./WordBank";
export { WordBank } from "./WordBank";
import { isOwned } from "../../lib/srs";
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

interface BackupPayload {
  lang?: string;
  label?: string;
  exportedAt?: string;
  items?: VocabItem[];
  mastered?: string[];
}

export const Deck: React.FC<{
  language: LanguageConfig;
  items: VocabItem[];
  mastered: Set<string>;
  onRemove: (id: string) => void;
  onClear: () => void;
  exportUrl: string;
  exportName: string;
  onImportItems: (parsed: ParsedItem[]) => { added: number; skipped: number };
  onImportMastered: (words: string[]) => void;
}> = ({ language, items, mastered, onRemove, onClear, exportUrl, exportName, onImportItems, onImportMastered }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const sorted = [...items].sort((a, b) =>
    a.stage !== b.stage ? b.stage - a.stage : a.word.localeCompare(b.word)
  );
  const copyDeck = () => {
    void navigator.clipboard?.writeText(serializeDeck(items));
  };
  const clearAll = () => {
    if (confirm("Remove all items? This cannot be undone. (Tip: Export a backup first.)")) {
      onClear();
    }
  };

  const onPickFile = () => fileRef.current?.click();

  const onFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    let payload: BackupPayload;
    try {
      payload = JSON.parse(await file.text()) as BackupPayload;
    } catch {
      setImportMsg("Could not read that file — is it a valid backup JSON?");
      return;
    }
    if (!Array.isArray(payload.items)) {
      setImportMsg("Backup is missing an items array. Aborted.");
      return;
    }
    if (payload.lang && payload.lang !== language.code) {
      const ok = confirm(
        `This backup is for "${payload.label ?? payload.lang}", but you're on "${language.label}". Import anyway?`
      );
      if (!ok) return;
    }
    const parsed: ParsedItem[] = payload.items.map((i) => ({
      word: i.word,
      collocate: i.collocate ?? "",
      definition: i.definition ?? "",
      context: i.context ?? "",
    }));
    const { added, skipped } = onImportItems(parsed);
    let masteredAdded = 0;
    if (Array.isArray(payload.mastered) && payload.mastered.length > 0) {
      const words = payload.mastered.map((w) => String(w).toLowerCase());
      masteredAdded = words.filter((w) => !mastered.has(w)).length;
      onImportMastered(words);
    }
    setImportMsg(
      `Imported ${added} new word${added === 1 ? "" : "s"}` +
      (skipped ? `, skipped ${skipped} duplicate${skipped === 1 ? "" : "s"}` : "") +
      (masteredAdded ? `, +${masteredAdded} mastered` : "") +
      " ✓"
    );
  };

  if (items.length === 0)
    return (
      <div>
        <div className="vt-empty">Deck is empty. Import a list to get started.</div>
        <div className="vt-deck-bar" style={{ marginTop: "0.75rem" }}>
          <button className="vt-ghost sm" onClick={onPickFile}>Import backup…</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            style={{ display: "none" }}
            onChange={onFileChosen}
          />
        </div>
        {importMsg && <div className="vt-done">{importMsg}</div>}
      </div>
    );

  return (
    <div>
      <div className="vt-deck-bar">
        <a className="vt-ghost sm" href={exportUrl} download={exportName}>Export backup</a>
        <button className="vt-ghost sm" onClick={onPickFile}>Import backup…</button>
        <button className="vt-ghost sm" onClick={copyDeck}>Copy as text</button>
        <button className="vt-ghost sm danger" onClick={clearAll}>Clear all</button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: "none" }}
          onChange={onFileChosen}
        />
      </div>
      {importMsg && <div className="vt-done">{importMsg}</div>}
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
