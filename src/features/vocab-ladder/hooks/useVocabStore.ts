/** vocab-ladder · state store hook
 *
 * Owns the deck in React state and writes through to the injected
 * StorageAdapter on every mutation. All domain mutations live here so the
 * components stay presentational.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import type { VocabItem, ParsedItem } from "../types";
import { LocalStorageAdapter, type StorageAdapter } from "../storage/adapter";
import {
  INTERVALS,
  dueAt,
  grade as gradeItem,
  now,
  selectDue,
  selectNew,
  selectOwned,
  selectToBridge,
} from "../lib/srs";
import { makeCloze } from "../lib/text";

const uid = (): string => Math.random().toString(36).slice(2, 10);

export interface VocabStore {
  items: VocabItem[];
  loaded: boolean;
  queues: {
    newItems: VocabItem[];
    toBridge: VocabItem[];
    due: VocabItem[];
    owned: VocabItem[];
  };
  /** Teacher: add parsed items, skipping case-insensitive duplicate words. */
  importItems(parsed: ParsedItem[]): { added: number; skipped: number };
  /** Learner: mark a word met; schedule its first review. */
  markSeen(id: string): void;
  /** Learner: save an original sentence and derive the cloze. */
  bridge(id: string, sentence: string): void;
  /** Learner: skip bridging but keep the item reviewable (by definition). */
  skipBridge(id: string): void;
  /** Learner: apply a review grade. */
  review(id: string, correct: boolean): void;
  /** Teacher: remove one / all. */
  remove(id: string): void;
  clear(): void;
}

export function useVocabStore(
  adapter: StorageAdapter = new LocalStorageAdapter()
): VocabStore {
  const [items, setItems] = useState<VocabItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    adapter.load().then((it) => {
      if (!alive) return;
      setItems(it);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
    // adapter is expected to be stable; intentionally run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback(
    (next: VocabItem[]) => {
      setItems(next);
      void adapter.save(next);
    },
    [adapter]
  );

  const importItems = useCallback<VocabStore["importItems"]>(
    (parsed) => {
      const have = new Set(items.map((i) => i.word.toLowerCase()));
      const fresh: VocabItem[] = [];
      let skipped = 0;
      for (const p of parsed) {
        if (have.has(p.word.toLowerCase())) {
          skipped++;
          continue;
        }
        have.add(p.word.toLowerCase());
        fresh.push({
          id: uid(),
          word: p.word,
          collocate: p.collocate,
          definition: p.definition,
          context: p.context,
          sentence: "",
          cloze: "",
          seen: false,
          bridged: false,
          stage: 0,
          nextReview: now(),
        });
      }
      if (fresh.length) persist([...fresh, ...items]);
      return { added: fresh.length, skipped };
    },
    [items, persist]
  );

  const markSeen = useCallback<VocabStore["markSeen"]>(
    (id) => {
      persist(
        items.map((i) =>
          i.id === id ? { ...i, seen: true, nextReview: dueAt(0) } : i
        )
      );
    },
    [items, persist]
  );

  const bridge = useCallback<VocabStore["bridge"]>(
    (id, sentence) => {
      const s = sentence.trim();
      if (!s) return;
      persist(
        items.map((i) =>
          i.id === id
            ? { ...i, sentence: s, cloze: makeCloze(s, i.word), bridged: true }
            : i
        )
      );
    },
    [items, persist]
  );

  const skipBridge = useCallback<VocabStore["skipBridge"]>(
    (id) => {
      persist(items.map((i) => (i.id === id ? { ...i, bridged: true } : i)));
    },
    [items, persist]
  );

  const review = useCallback<VocabStore["review"]>(
    (id, correct) => {
      persist(
        items.map((i) => (i.id === id ? { ...i, ...gradeItem(i, correct) } : i))
      );
    },
    [items, persist]
  );

  const remove = useCallback<VocabStore["remove"]>(
    (id) => persist(items.filter((i) => i.id !== id)),
    [items, persist]
  );

  const clear = useCallback<VocabStore["clear"]>(() => persist([]), [persist]);

  const queues = useMemo(
    () => ({
      newItems: selectNew(items),
      toBridge: selectToBridge(items),
      due: selectDue(items),
      owned: selectOwned(items),
    }),
    [items]
  );

  return {
    items,
    loaded,
    queues,
    importItems,
    markSeen,
    bridge,
    skipBridge,
    review,
    remove,
    clear,
  };
}

export { INTERVALS };
