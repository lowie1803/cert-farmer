/** vocab-ladder · spaced-repetition scheduling
 *
 * A deliberately simple Leitner-style schedule. Each correct recall
 * advances one stage along INTERVALS; a lapse steps back one. When the
 * stage passes the last interval the item is "owned" and leaves the queue.
 *
 * The schedule (1·3·7·14·30 days) compresses the ~dozen spaced encounters
 * an item needs into a few weeks rather than the years of incidental
 * exposure a child would get.
 */

import type { VocabItem } from "../types";

export const INTERVALS = [1, 3, 7, 14, 30] as const;
export const DAY_MS = 24 * 60 * 60 * 1000;

export const now = (): number => Date.now();

/** True once an item has graduated past the last interval. */
export const isOwned = (item: Pick<VocabItem, "stage">): boolean =>
  item.stage >= INTERVALS.length;

/** Compute the next-review timestamp for a given stage. */
export function dueAt(stage: number, from: number = now()): number {
  if (stage >= INTERVALS.length) return Infinity;
  const days = INTERVALS[Math.min(stage, INTERVALS.length - 1)];
  return from + days * DAY_MS;
}

/** Apply a review grade, returning the updated scheduling fields. */
export function grade(
  item: VocabItem,
  correct: boolean
): Pick<VocabItem, "stage" | "nextReview"> {
  const stage = correct ? item.stage + 1 : Math.max(0, item.stage - 1);
  return { stage, nextReview: dueAt(stage) };
}

/** Queue selectors over a deck. */
export const selectNew = (items: VocabItem[]): VocabItem[] =>
  items.filter((i) => i.stage === 0 && !i.seen);

export const selectToBridge = (items: VocabItem[]): VocabItem[] =>
  items.filter((i) => i.seen && !i.bridged);

export const selectDue = (items: VocabItem[], at: number = now()): VocabItem[] =>
  items.filter((i) => i.seen && i.stage < INTERVALS.length && i.nextReview <= at);

export const selectOwned = (items: VocabItem[]): VocabItem[] =>
  items.filter(isOwned);
