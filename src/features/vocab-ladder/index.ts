/** vocab-ladder · public API
 *
 * Mount the whole feature with one component:
 *   import { VocabLadder } from "@/features/vocab-ladder";
 *   <VocabLadder adapter={myAdapter} />
 *
 * Lower-level pieces are exported for custom integrations (e.g. building a
 * server-backed adapter, or reusing the SRS engine elsewhere).
 */

export { VocabLadder, default } from "./components/VocabLadder";
export type { VocabLadderProps } from "./components/VocabLadder";

export { useVocabStore } from "./hooks/useVocabStore";
export type { VocabStore } from "./hooks/useVocabStore";

export {
  LocalStorageAdapter,
  MemoryAdapter,
} from "./storage/adapter";
export type { StorageAdapter } from "./storage/adapter";

export {
  INTERVALS,
  DAY_MS,
  grade,
  dueAt,
  isOwned,
  selectNew,
  selectToBridge,
  selectDue,
  selectOwned,
} from "./lib/srs";
export { makeCloze, hideWord, parseBulk, serializeDeck } from "./lib/text";

export { tokens } from "./design/theme";
export type { Tokens } from "./design/theme";

export type { VocabItem, ParsedItem, ParseResult } from "./types";
