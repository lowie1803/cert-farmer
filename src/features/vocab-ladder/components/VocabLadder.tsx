import React, { useEffect, useMemo, useState } from "react";
import "../design/tokens.css";
import "./styles.css";
import type { StorageAdapter } from "../storage/adapter";
import type { VocabItem } from "../types";
import { useVocabStore } from "../hooks/useVocabStore";
import { useMastered } from "../hooks/useMastered";
import { Learn, Bridge, Review } from "./learner";
import { Import, Deck, WordBank } from "./teacher";
import type { LanguageConfig } from "./teacher/WordBank";

type Mode = "learn" | "teach";
type Tab = "today" | "learn" | "bridge" | "review" | "wordbank" | "custom" | "deck";

export interface VocabLadderProps {
  /** Inject a storage backend. Defaults to namespaced localStorage. */
  adapter?: StorageAdapter;
  /** Start in learner or teacher mode. Default "learn". */
  initialMode?: Mode;
  /** Active language: drives the Word Bank, level chips, and storage namespacing. */
  language: LanguageConfig;
}

const Stats: React.FC<{ total: number; owned: number; due: number }> = ({ total, owned, due }) => (
  <div className="vt-stats">
    <div><b>{total}</b><span>items</span></div>
    <div><b>{owned}</b><span>owned</span></div>
    <div><b>{due}</b><span>due</span></div>
  </div>
);

const WARN_KEY = "vt:warned";

const BackupBar: React.FC<{ downloadUrl: string; downloadName: string }> = ({
  downloadUrl,
  downloadName,
}) => {
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(WARN_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);
  const dismiss = () => {
    try { sessionStorage.setItem(WARN_KEY, "1"); } catch { /* ignore */ }
    setDismissed(true);
  };
  return (
    <div className="vt-warn" role="status">
      {!dismissed && (
        <span className="vt-warn-body">
          <b>Heads up:</b> your deck is saved <em>only in this browser</em>. Clearing site
          data will erase it — export a backup to be safe.
        </span>
      )}
      <span className="vt-warn-actions">
        <a
          className="vt-ghost sm"
          href={downloadUrl}
          download={downloadName}
        >
          Export backup
        </a>
        {!dismissed && (
          <button className="vt-ghost sm" onClick={dismiss} aria-label="Dismiss warning">
            Dismiss
          </button>
        )}
      </span>
    </div>
  );
};

const Today: React.FC<{
  newCount: number;
  toBridge: number;
  due: number;
  owned: number;
  total: number;
  go: (t: Tab) => void;
}> = ({ newCount, toBridge, due, owned, total, go }) => {
  if (total === 0)
    return (
      <div className="vt-empty">
        No words yet. Go to the <b>Import</b> tab to add words, then come back here
        to start.
      </div>
    );
  const steps = [
    { k: "learn" as Tab, n: "01", title: "Learn", sub: "Meet today's new words — word, collocation, meaning. Just read and absorb.", stat: newCount ? `${newCount} new` : "none new", done: newCount === 0 },
    { k: "bridge" as Tab, n: "02", title: "Bridge", sub: "Write one sentence of your own per word, collocation intact. This is what makes it active.", stat: toBridge ? `${toBridge} to bridge` : "all bridged", done: toBridge === 0 },
    { k: "review" as Tab, n: "03", title: "Review", sub: "Recall the blanked word. Spaced over 1·3·7·14·30 days, then it's yours.", stat: due ? `${due} due` : "queue clear", done: due === 0 },
  ];
  return (
    <div className="vt-today">
      <p className="vt-lede">
        Three moves, in order. Learning is just reading the new words; the real work is the one
        sentence you write and the recall later.
      </p>
      {steps.map((s) => (
        <button key={s.k} className="vt-step" onClick={() => go(s.k)}>
          <span className="vt-step-n">{s.n}</span>
          <span className="vt-step-body">
            <span className="vt-step-title">
              {s.title}
              {s.done && <i className="vt-check">✓</i>}
            </span>
            <span className="vt-step-sub">{s.sub}</span>
          </span>
          <span className="vt-step-stat">{s.stat}</span>
        </button>
      ))}
      <p className="vt-foot">Owned so far: <b>{owned}</b> of {total}.</p>
    </div>
  );
};

function useBackupDownload(
  language: LanguageConfig,
  items: VocabItem[],
  mastered: Set<string>
): { url: string; name: string } {
  const json = useMemo(() => {
    const payload = {
      lang: language.code,
      label: language.label,
      exportedAt: new Date().toISOString(),
      items,
      mastered: [...mastered],
    };
    return JSON.stringify(payload, null, 2);
  }, [language.code, language.label, items, mastered]);

  const url = useMemo(() => {
    if (typeof URL === "undefined" || typeof Blob === "undefined") return "";
    return URL.createObjectURL(new Blob([json], { type: "application/json" }));
  }, [json]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  const name = `vocab-${language.code}-${new Date().toISOString().slice(0, 10)}.json`;
  return { url, name };
}

export const VocabLadder: React.FC<VocabLadderProps> = ({
  adapter,
  initialMode = "learn",
  language,
}) => {
  const store = useVocabStore(adapter);
  const { mastered, toggle: onToggleMastered, addMany: addManyMastered } = useMastered(language.code);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [tab, setTab] = useState<Tab>(initialMode === "teach" ? "wordbank" : "today");

  const { items, loaded, queues } = store;
  const { newItems, toBridge, due, owned } = queues;

  const switchMode = (m: Mode) => {
    setMode(m);
    setTab(m === "teach" ? "wordbank" : "today");
  };

  const backup = useBackupDownload(language, items, mastered);

  const learnerTabs: [Tab, string][] = [
    ["today", "Today"],
    ["learn", `Learn${newItems.length ? " · " + newItems.length : ""}`],
    ["bridge", `Bridge${toBridge.length ? " · " + toBridge.length : ""}`],
    ["review", `Review${due.length ? " · " + due.length : ""}`],
  ];
  const teacherTabs: [Tab, string][] = [
    ["wordbank", "Word Bank"],
    ["custom", "Custom"],
    ["deck", `Deck${items.length ? " · " + items.length : ""}`],
  ];

  return (
    <div className="vt-root">
      <header className="vt-head">
        <div className="vt-brand">
          <span className="vt-mark" />
          <h1>vocab<em>·</em>ladder</h1>
          <div className="vt-mode">
            <button className={mode === "learn" ? "on" : ""} onClick={() => switchMode("learn")}>Learn</button>
            <button className={mode === "teach" ? "on" : ""} onClick={() => switchMode("teach")}>Import</button>
          </div>
        </div>
        <Stats total={items.length} owned={owned.length} due={due.length} />
      </header>

      <BackupBar downloadUrl={backup.url} downloadName={backup.name} />

      <nav className="vt-tabs">
        {(mode === "learn" ? learnerTabs : teacherTabs).map(([k, label]) => (
          <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </nav>

      <main className="vt-main">
        {!loaded && <div className="vt-empty">loading…</div>}

        {loaded && mode === "learn" && tab === "today" && (
          <Today
            newCount={newItems.length}
            toBridge={toBridge.length}
            due={due.length}
            owned={owned.length}
            total={items.length}
            go={setTab}
          />
        )}
        {loaded && mode === "learn" && tab === "learn" && (
          <Learn queue={newItems} onLearn={store.markSeen} />
        )}
        {loaded && mode === "learn" && tab === "bridge" && (
          <Bridge queue={toBridge} onBridge={store.bridge} onSkip={store.skipBridge} />
        )}
        {loaded && mode === "learn" && tab === "review" && (
          <Review queue={due} onGrade={store.review} />
        )}

        {loaded && mode === "teach" && tab === "wordbank" && (
          <WordBank
            language={language}
            items={items}
            onImport={store.importItems}
            mastered={mastered}
            onToggleMastered={onToggleMastered}
          />
        )}
        {loaded && mode === "teach" && tab === "custom" && (
          <Import items={items} onImport={store.importItems} />
        )}
        {loaded && mode === "teach" && tab === "deck" && (
          <Deck
            language={language}
            items={items}
            mastered={mastered}
            onRemove={store.remove}
            onClear={store.clear}
            exportUrl={backup.url}
            exportName={backup.name}
            onImportItems={store.importItems}
            onImportMastered={addManyMastered}
          />
        )}
      </main>
    </div>
  );
};

export default VocabLadder;
