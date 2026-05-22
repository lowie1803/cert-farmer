/** vocab-ladder · storage adapter
 *
 * THE integration seam. The feature persists exactly one thing — the deck
 * (a VocabItem[]) — through this interface. Swap the implementation to back
 * it with the CMS instead of the browser:
 *
 *   • Browser-only (default)  → LocalStorageAdapter
 *   • Server / CMS-backed     → implement StorageAdapter against your API
 *   • Tests / SSR             → MemoryAdapter
 *
 * Keep the interface async even for synchronous backends so callers don't
 * change when you move persistence to the network.
 */

import type { VocabItem } from "../types";

export interface StorageAdapter {
  load(): Promise<VocabItem[]>;
  save(items: VocabItem[]): Promise<void>;
}

/** Default: namespaced localStorage. `key` lets you scope per-user. */
export class LocalStorageAdapter implements StorageAdapter {
  constructor(private key: string = "vocab-ladder:items") {}

  async load(): Promise<VocabItem[]> {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as VocabItem[]) : [];
    } catch {
      return [];
    }
  }

  async save(items: VocabItem[]): Promise<void> {
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
    } catch (e) {
      console.error("[vocab-ladder] save failed", e);
    }
  }
}

/** In-memory (tests, SSR, previews). Not persistent. */
export class MemoryAdapter implements StorageAdapter {
  private data: VocabItem[] = [];
  async load(): Promise<VocabItem[]> {
    return this.data;
  }
  async save(items: VocabItem[]): Promise<void> {
    this.data = items;
  }
}

/**
 * Sketch of a CMS/server adapter. Wire to your own endpoints/auth.
 * Namespacing by user is the caller's job (pass a user-scoped path).
 *
 * export class ApiAdapter implements StorageAdapter {
 *   constructor(private base: string, private headers: HeadersInit) {}
 *   async load() {
 *     const r = await fetch(`${this.base}/vocab`, { headers: this.headers });
 *     return r.ok ? await r.json() : [];
 *   }
 *   async save(items: VocabItem[]) {
 *     await fetch(`${this.base}/vocab`, {
 *       method: "PUT",
 *       headers: { ...this.headers, "Content-Type": "application/json" },
 *       body: JSON.stringify(items),
 *     });
 *   }
 * }
 */
