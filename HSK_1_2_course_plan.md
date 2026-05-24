# HSK 1 & HSK 2 Self-Study Course Plan

> **Purpose of this document.** This is a curriculum + data-generation brief. The first half is a human-readable study plan (HSK 1, then HSK 2). The second half (`## Vocabulary Generation Spec`) is a machine-actionable spec for **Claude Code** to generate flashcard vocabulary sets that match this curriculum's structure, ordering, and metadata.
>
> **Standard:** HSK 3.0 (the 9-level standard, full implementation July 2026). This plan covers everyday levels 1 and 2. Word counts are cumulative: HSK 1 ≈ 300, HSK 2 ≈ 500 total (~200 new at level 2).
>
> **Learner profile:** ~30 min/day · reading/character-structure first · handwriting is an optional weekend appendix, never on the critical path.
>
> **Daily rhythm (every day, both courses):** ~10 min new material · ~10 min drilling it · ~10 min spaced-repetition review of old cards. The review third is non-negotiable — it is what makes the consolidation weeks possible.

---

## Course A — HSK 1 (8 weeks)

**Goal:** mechanical literacy of the sound system + the basic sentence skeleton. Recognize ~150 characters / 300 words; introduce yourself, ask & answer simple questions, count, tell time, handle a basic transaction.

**Pacing note:** Weeks 1–2 contain *zero* HSK vocabulary on purpose. They install pinyin, tones, and component logic — the leverage that prevents fossilized tone errors. Do not rush them.

| Week | Theme | Grammar spine | Vocab cluster (new) |
|------|-------|---------------|---------------------|
| 1 | Pinyin & tones | — (sound system only) | None — meet 8 pictographic components as pictures: 人 口 日 月 木 水 山 火 |
| 2 | Numbers, strokes, first characters | Stroke-order rules | 一–十, 百; ~20 high-frequency component-clean characters (你 我 他 她 是 不 的 好 大 小 中 国 …) |
| 3 | Greetings, pronouns, identity | **是** sentence (nouns only); modifier **的** | pronouns, 你好/谢谢/不客气/对不起/再见, 学生/老师/名字 |
| 4 | Description & yes/no questions | Adjectives take **很 not 是**; **吗** question particle | 好/大/小/多/少/高/冷/热; family (爸爸/妈妈/儿子/女儿) |
| 5 | Actions & question words | **S-V-O**; **没有** (not 不有); question words sit where the answer goes | 有/去/看/吃/喝/说/想/做; 饭/水/茶/书/中文 |
| 6 | Time, dates, measure words | **Measure words** (三本书, 一个人, 两 vs 二); dates big→small | 今天/明天/昨天, 年/月/日, 星期, 点, 现在 |
| 7 | Completed actions & combining | Completed-action **了** (我吃了饭); two-clause sentences | places (家/学校/商店/中国/北京), movement/transport |
| 8 | Consolidation + mock | none new — review, listening, timed HSK 1 mock | re-drill weak clusters (tones, measure words, 是/很) |

**Key error-killers (build quizzes around these):** 是 vs 很 (adjectives never take 是); 不有 → must be 没有; tone-3 sandhi; 两 vs 二 before measure words.

---

## Course B — HSK 2 (10 weeks)

**Goal:** the *dynamic* sentence — when, how, compared to what, for how long, whether you can/want/should. ~200 new words (≈500 cumulative). Grammar load is heavier than the word count implies; that's why it's 10 weeks, not 8.

**Prerequisite:** automatic HSK 1 grammar. HSK 2 punishes a weak base — every new structure assumes 是/很/了 are reflexive.

| Week | Theme | Grammar spine | Vocab cluster (new) |
|------|-------|---------------|---------------------|
| 1 | Ongoing action & change-of-state | **在** (在吃饭); 了 as change-of-state | 常常/已经/正在 |
| 2 | Experiential past | **过** (去过北京); the **了 vs 过** distinction | 以前/以后, time-reference words |
| 3 | Comparison | **比** (他比我高); negation 没有 (我没有他高) | 快/慢/贵/便宜/长/短 |
| 4 | Degree complement | **得** (跑得很快, 说得很好) — verb + 得 + description | manner adjectives, more verbs |
| 5 | Modals I | **想 / 要 / 会** (want / will-must / know-how) | 开车/游泳/跳舞 |
| 6 | Modals II + contrast | **能 / 可以**; the **会 vs 能 vs 可以** split (ability vs capacity vs permission) | situational-ability verbs |
| 7 | Connecting clauses | **因为…所以**, **但是**, basic **如果** | reasoning/connective vocab |
| 8 | Richer questions | **A-不-A** (去不去?); 为什么 / 怎么 / 怎么样 | weather, travel/transport, shopping & money |
| 9 | Duration & paragraphs | time-**duration** (学了两年中文); connected paragraphs | duration/quantity words |
| 10 | Consolidation + mock | none new — review, faster listening, timed HSK 2 mock | re-drill 了/过, 会/能/可以, 比 |

**Key error-killers (build contrast quizzes):** 了 vs 过; 会 vs 能 vs 可以; 比 word order & its 没有 negation; 得-complement word order.

---

## Optional Appendix — Handwriting (both courses)

Parallel track, **weekends only**, droppable with zero consequence (HSK 3.0 doesn't test handwriting until Level 5). Targets: HSK 1 → handwrite the ~40 lowest-stroke, highest-frequency characters; HSK 2 → cumulative ~80–100. Value is that muscle memory cements component structure, which serves the reading-first goal. In data terms this is just a `handwriting_target: boolean` flag + a `stroke_order` field per character.

---

## Vocabulary Generation Spec

> **For Claude Code.** Generate one flashcard dataset per course, partitioned by week, matching the curriculum above. The schema is structure-first: every entry decomposes its characters into components, because that is this learner's primary acquisition strategy. Do **not** treat a word as an opaque string.

### Output format

- One file per course: `hsk1_vocab.json` and `hsk2_vocab.json`.
- Top-level: `{ "level": 1, "standard": "HSK 3.0", "weeks": [ ... ] }`.
- Each week object: `{ "week": 3, "theme": "...", "grammar_focus": ["..."], "entries": [ ... ] }`.
- Weeks 1–2 of HSK 1 contain **components**, not standard vocab — see "Component entries" below.

### Entry schema (one flashcard)

```json
{
  "id": "h1-w3-001",
  "hanzi": "学生",
  "pinyin": "xuéshēng",
  "tones": [2, 1],
  "english": "student",
  "pos": "noun",
  "measure_word": "个",
  "cluster_id": "identity",
  "grammar_pattern_id": "shi-sentence",
  "components": [
    { "char": "学", "meaning_hint": "study/learn", "role": "semantic" },
    { "char": "生", "meaning_hint": "be born / life", "role": "semantic" }
  ],
  "example_sentence": { "hanzi": "他是学生。", "pinyin": "Tā shì xuéshēng.", "english": "He is a student." },
  "contrast_set_id": null,
  "handwriting_target": false,
  "stroke_count": [8, 5]
}
```

### Field rules

- **`tones`**: integer array, one per syllable; neutral tone = `5`. Must align with `pinyin` syllable order. This field is first-class — tone drilling is where self-learners fail.
- **`components`**: decompose every character. `role` ∈ `semantic` | `phonetic` | `pictographic` | `structural`. If a character is an indivisible pictograph (e.g. 山, 口), emit a single component with `role: "pictographic"`. Prefer real functional decomposition over invented mnemonics. If unsure of phonetic vs semantic role, use `structural` rather than guessing.
- **`measure_word`**: fill for countable nouns (default `个` only when no specific MW applies); `null` otherwise.
- **`cluster_id`**: matches the vocab cluster column in the tables above (e.g. `pronouns`, `family`, `time-date`, `weather`, `travel`, `money`).
- **`grammar_pattern_id`**: the pattern the word is introduced *with* (e.g. `shi-sentence`, `hen-adjective`, `ma-question`, `measure-word`, `le-completed`, `bi-comparison`, `de-complement`, `modal-hui-neng-keyi`, `yinwei-suoyi`, `a-not-a`).
- **`contrast_set_id`**: **critical feature.** Group words/patterns that must be quizzed *against each other*: e.g. `le-vs-guo`, `hui-neng-keyi`, `shi-vs-hen`, `liang-vs-er`, `mei-vs-bu`. Generic flashcards fail here; the deck must support contrastive review. Leave `null` if the entry belongs to no contrast set.
- **`example_sentence`**: must use ONLY vocabulary and grammar introduced in the current week or earlier. Never use a later week's words. Keep to HSK 1/2 sentence length.
- **`handwriting_target`** / **`stroke_count`**: set `handwriting_target: true` only for the appendix target characters (HSK 1 ~40, HSK 2 cumulative ~80–100). `stroke_count` is a per-character array.

### Generation constraints

1. **Match counts:** HSK 1 ≈ 300 words total, HSK 2 ≈ ~200 *new* words (don't re-emit HSK 1 words in the HSK 2 file; reference by id if needed).
2. **Respect ordering:** a word's `example_sentence` may only draw on same-or-earlier-week material. This forward-reference ban is the single most important constraint.
3. **Source the wordlist** from the official HSK 3.0 (2025/2026) Level 1 and Level 2 lists. If exact official membership is uncertain for a borderline word, flag it with `"verify": true` rather than silently including it.
4. **Components data:** prefer an open IDS dataset (CHISE / cjkvi-ids) for decomposition rather than improvising; definitions/pinyin can lean on CC-CEDICT. Keep decomposition to one level deep per card (don't recurse the whole tree into the flashcard — link out if a tree view is needed).
5. **Validate before emitting:** every `tones.length` === pinyin syllable count; every `example_sentence` passes the forward-reference check; every `contrast_set_id` that is non-null appears on ≥2 entries.

### Component entries (HSK 1 weeks 1–2 only)

These weeks teach components/pictographs, not vocabulary. Emit them with a reduced schema:

```json
{
  "id": "h1-w1-comp-001",
  "hanzi": "门",
  "type": "component",
  "meaning": "door",
  "pictograph_note": "stylized double door / gate",
  "appears_in": ["们", "问", "间"],
  "stroke_count": 3
}
```

`appears_in` should list a few higher-level characters that contain this component, so the app can later surface "you already know this piece" moments.
