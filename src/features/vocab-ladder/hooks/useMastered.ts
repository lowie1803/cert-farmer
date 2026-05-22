import { useCallback, useEffect, useState } from "react";

const KEY = "vocab-ladder:mastered";

export function useMastered(): {
  mastered: Set<string>;
  toggle: (word: string) => void;
} {
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
      setMastered(new Set(saved));
    } catch {
      /* ignore parse errors */
    }
  }, []);

  const toggle = useCallback((word: string) => {
    setMastered((prev) => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      localStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { mastered, toggle };
}
