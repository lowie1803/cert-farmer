/** vocab-ladder · domain types */

/** A single vocabulary item and its learning state. */
export interface VocabItem {
  id: string;
  /** The target word. Required. */
  word: string;
  /** Common partner phrase, e.g. "mitigate the impact". */
  collocate: string;
  /** Short gloss. Used on the Learn card and as a fallback review prompt. */
  definition: string;
  /** The source sentence the word was found in (authored context). */
  context: string;

  /** The learner's own sentence (the "bridge"). Empty until written. */
  sentence: string;
  /** Cloze derived from `sentence` with `word` blanked. */
  cloze: string;

  /** Learner has met the word in the Learn step. */
  seen: boolean;
  /** Learner has bridged (or explicitly skipped) the word. */
  bridged: boolean;

  /** SRS stage: index into INTERVALS; === INTERVALS.length means "owned". */
  stage: number;
  /** Epoch ms of next due review. Infinity once owned. */
  nextReview: number;
}

/** Result of parsing a pasted bulk-import block. */
export interface ParsedItem {
  word: string;
  collocate: string;
  definition: string;
  context: string;
}

export interface ParseResult {
  out: ParsedItem[];
  errors: string[];
}
