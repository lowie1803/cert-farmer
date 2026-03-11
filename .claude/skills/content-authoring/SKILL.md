# Content Authoring

## Content Location
All content lives in `src/content/ccna/`. No code changes are needed to add content — Vite's `import.meta.glob` in `src/data/contentLoader.js` auto-discovers files at build time.

## Module Directory Naming
`NNN_kebab-name/` — zero-padded 3-digit prefix controls sort order.

## course.json
`src/content/ccna/course.json` — lists all module directory names. **Must be updated when adding/removing modules.**
```json
{
  "id": "ccna",
  "title": "CCNA 200-301",
  "description": "Cisco Certified Network Associate",
  "version": "1.1",
  "modules": ["001_network-fundamentals", "002_cabling-and-topology", ...]
}
```

## module.json Schema
Each module directory must have a `module.json`:
```json
{
  "id": "network-fundamentals",
  "title": "Network Fundamentals",
  "icon": "🌐",
  "description": "Core networking concepts and the OSI/TCP-IP models",
  "domain": "Domain 1: Network Fundamentals",
  "lessons": [
    {
      "id": "osi-model",
      "title": "OSI Model",
      "type": "notes",
      "resources": [
        { "type": "video", "title": "OSI Model Deep Dive", "url": "https://..." },
        { "type": "link", "title": "Cisco Learning Network", "url": "https://..." }
      ]
    },
    {
      "id": "osi-quiz",
      "title": "OSI Model Quiz",
      "type": "quiz"
    }
  ]
}
```
- `resources` is optional, only for `notes` type lessons
- Exam lessons can have `"timeLimit"` (minutes) and `"passingScore"` (percentage) fields

## Lesson Types

| Type | File Extension | `type` value |
|------|---------------|-------------|
| Notes | `.md` | `"notes"` |
| Quiz | `-quiz.json` | `"quiz"` |
| Exam | `-exam.json` | `"exam"` |

**Critical**: Lesson `id` must match the filename (minus extension). E.g., lesson id `"osi-quiz"` → file `osi-quiz.json`.

## Quiz/Exam JSON Schema
```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Which layer handles logical addressing?",
      "options": ["Data Link", "Network", "Transport", "Session"],
      "correct": 1,
      "explanation": "The Network Layer (Layer 3) handles logical addressing."
    }
  ]
}
```
- `options`: exactly 4 choices
- `correct`: 0-based index (0–3)
- Exam questions may include `"domain"` field for score breakdown

## To Add a New Lesson

1. Create the content file in the module directory:
   - Notes: `lesson-name.md`
   - Quiz: `lesson-name-quiz.json`
2. Add a lesson entry to the module's `module.json` `lessons` array
3. Ensure the lesson `id` matches the filename (minus extension)
4. Done — contentLoader picks it up automatically

## To Add a New Module

1. Create directory: `src/content/ccna/NNN_module-name/`
2. Create `module.json` with id, title, icon, description, domain, lessons array
3. Create lesson content files (`.md`, `-quiz.json`, `-exam.json`)
4. Add the directory name (`"NNN_module-name"`) to `src/content/ccna/course.json` `modules` array
5. Done — no code changes needed

## Current Modules (20 total)
001–007: Domain content (Network Fundamentals through Wireless)
008: Midterm 1 (exam)
009–014: Domain content (IP Connectivity through Network Services)
015: Midterm 2 (exam)
016–019: Domain content (Security through Programmability)
020: Final Exam
