# CertFarmer — CCNA 200-301 Study Platform

A responsive web app for CCNA 200-301 exam preparation with a Vietnamese networking glossary, practice quizzes, and full-length exams.

## Features

- **Interactive Study Notes** — Markdown lessons with automatic glossary term highlighting
- **Practice Quizzes** — Multiple-choice questions with instant feedback and explanations
- **Full-length Exams** — Midterms and final exam with timer and per-domain scoring (ExamView)
- **Vietnamese Glossary** — 145 networking terms with Vietnamese explanations
- **Progress Tracking** — Per-lesson/quiz progress saved to localStorage
- **Fully Responsive** — Desktop, tablet, and mobile

## Quick Start

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # ESLint
```

## Project Structure

```
cert-farmer/
├── public/
├── scripts/                    # Content tooling
│   ├── generate-content.js     # Claude API content generator
│   ├── validate-content.js     # Schema validator
│   ├── extract-content.js
│   └── syllabus-outline.json
├── src/
│   ├── content/ccna/           # Course content (data-driven)
│   │   ├── course.json         # Master module list
│   │   └── NNN_kebab-name/     # Module dirs (001–020)
│   │       ├── module.json     # Module metadata + lesson list
│   │       ├── *.md            # Lesson notes (markdown)
│   │       ├── *-quiz.json     # Quizzes
│   │       └── *-exam.json     # Exams
│   ├── components/             # Layout, ContentRenderer, QuizView,
│   │                           # ExamView, ProgressRing, TermTooltip
│   ├── pages/                  # Dashboard, ModulePage, LessonPage,
│   │                           # GlossaryPage, NotFound
│   ├── hooks/                  # useProgress (Context + localStorage)
│   ├── data/                   # contentLoader.js (import.meta.glob),
│   │                           # courses.js (API), glossary.js
│   ├── utils/                  # glossaryHelper.js
│   └── styles/                 # Tailwind + dark theme
├── index.html
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

## Adding Content

Content is **data-driven** — no code changes needed. `src/data/contentLoader.js` auto-discovers files in `src/content/ccna/**` via Vite's `import.meta.glob`.

### Add a lesson

1. Create `src/content/ccna/NNN_module-name/my-lesson.md`.
2. Register it in that module's `module.json` lesson list with `type: "notes"`.

### Add a quiz

1. Create `src/content/ccna/NNN_module-name/my-topic-quiz.json`:
   ```json
   {
     "id": "my-topic-quiz",
     "title": "My Topic Quiz",
     "questions": [
       {
         "id": "q1",
         "question": "Your question?",
         "options": ["A", "B", "C", "D"],
         "correct": 1,
         "explanation": "Why B is correct."
       }
     ]
   }
   ```
2. Register it in `module.json` with `type: "quiz"`.

### Add an exam

Same as quizzes but with filename `*-exam.json` and `type: "exam"` in `module.json`. ExamView handles timer and per-domain scoring.

### Add a glossary term

Edit `src/data/glossary.js`:

```js
"New Term": {
  vi: "Vietnamese explanation",
  category: "Category Name"
}
```

Terms are auto-detected and highlighted in lesson content.

See `.claude/skills/content-authoring/SKILL.md` for the full content-authoring guide.

## Deployment

Configured for **Vercel** (see `vercel.json`) — push to GitHub and import the repo. For other targets, `npm run build` produces a static bundle in `dist/`.

## Tech Stack

- **React 18** — UI
- **Vite 7** — build tool
- **Tailwind CSS 3** — styling
- **React Router 6** — routing
- **react-markdown + remark-gfm** — Markdown rendering

## Project Docs

- Backlog: `.project/backlog/BACKLOG.md`
- Roadmap: `.project/product/ROADMAP.md`
- Architecture decisions: `.project/decisions/`
- Skills (Claude Code): `.claude/skills/` (architecture, content-authoring, project-roadmap)

## License

MIT
