/** vocab-ladder · text utilities (cloze, masking, bulk parsing) */

import type { ParseResult } from "../types";

const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const BLANK = "\u2003____\u2003"; // em-spaced blank

/**
 * Replace the first whole-word, case-insensitive occurrence of `target`
 * in `sentence` with a blank. If the word isn't present verbatim (e.g. an
 * inflected form), append an explicit blank so the card still works.
 */
export function makeCloze(sentence: string, target: string): string {
  if (!sentence || !target) return sentence || "";
  const re = new RegExp(`\\b${escapeRe(target)}\\b`, "i");
  if (re.test(sentence)) return sentence.replace(re, BLANK);
  return `${sentence}  \u2003(____ = ${target})`;
}

/** Hide every occurrence of `word` inside `text` (used for collocation hints). */
export function hideWord(text: string, word: string): string {
  if (!word || !text) return text || "";
  const re = new RegExp(`\\b${escapeRe(word)}\\b`, "ig");
  return text.replace(re, "…");
}

/**
 * Parse a pasted bulk list. One item per line.
 * Field separator: `|`, tab, or `;` (comma is used only when no stronger
 * separator is present, so definitions may safely contain commas).
 * Field order: word | collocate | definition | context. Only word required.
 * Lines beginning with `#` are treated as comments.
 */
export function parseBulk(raw: string): ParseResult {
  const out: ParseResult["out"] = [];
  const errors: string[] = [];

  raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .forEach((line, idx) => {
      const parts = /[|\t;]/.test(line)
        ? line.split(/\s*[|\t;]\s*/)
        : line.split(/\s*,\s*/);
      const [word, collocate = "", definition = "", context = ""] = parts.map(
        (p) => p.trim()
      );
      if (!word) {
        errors.push(`Line ${idx + 1}: no word`);
        return;
      }
      out.push({ word, collocate, definition, context });
    });

  return { out, errors };
}

/** Serialize a deck back to the import format (round-trips through parseBulk). */
export function serializeDeck(
  items: { word: string; collocate: string; definition: string; context: string }[]
): string {
  return items
    .map((i) => [i.word, i.collocate, i.definition, i.context].filter(Boolean).join(" | "))
    .join("\n");
}
