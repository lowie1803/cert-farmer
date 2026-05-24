import { useCallback, useEffect, useMemo, useState } from "react";

const BASE = "vocab-ladder:mastered";

export function useMastered(namespace = "default"): {
  mastered: Set<string>;
  toggle: (word: string) => void;
  addMany: (words: string[]) => void;
} {
  const key = useMemo(() => `${BASE}:${namespace}`, [namespace]);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      setMastered(new Set(saved));
    } catch {
      setMastered(new Set());
    }
  }, [key]);

  const toggle = useCallback(
    (word: string) => {
      setMastered((prev) => {
        const next = new Set(prev);
        next.has(word) ? next.delete(word) : next.add(word);
        localStorage.setItem(key, JSON.stringify([...next]));
        return next;
      });
    },
    [key]
  );

  const addMany = useCallback(
    (words: string[]) => {
      if (words.length === 0) return;
      setMastered((prev) => {
        const next = new Set(prev);
        for (const w of words) next.add(w);
        localStorage.setItem(key, JSON.stringify([...next]));
        return next;
      });
    },
    [key]
  );

  return { mastered, toggle, addMany };
}
