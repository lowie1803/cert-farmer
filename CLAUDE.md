# CertFarmer — CCNA 200-301 Study Platform

## Tech Stack
React 18 + Vite 7 + Tailwind CSS 3 + React Router 6 + react-markdown + remark-gfm

## Commands
```
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint (src --ext js,jsx)
```

## Architecture Overview
```
src/
  content/ccna/       # Course content (JSON + Markdown) — no code changes needed to add content
    course.json       # Master module list
    NNN_kebab-name/   # Module directories (001–020)
      module.json     # Module metadata + lesson list
      *.md            # Notes (markdown)
      *-quiz.json     # Quizzes
      *-exam.json     # Exams
  components/         # Layout, ContentRenderer, QuizView, ExamView, ProgressRing, TermTooltip
  pages/              # Dashboard, ModulePage, LessonPage, GlossaryPage, NotFound
  hooks/              # useProgress (React Context + localStorage)
  data/               # contentLoader.js (Vite glob), courses.js (API), glossary.js (145 Vietnamese terms)
  styles/             # Tailwind + custom dark theme (slate/amber palette)
```

## Key Rules
- **Content is data-driven**: add/edit JSON + Markdown files only — `contentLoader.js` auto-wires via `import.meta.glob`
- **Progress**: localStorage key `certfarmer_progress`, managed by `useProgress` hook/context
- **Deploy**: Vercel (see `vercel.json`)
- **Path aliases**: `@/` → src, `@components/`, `@pages/`, `@data/`, `@hooks/`, `@utils/`, `@content/`

## Where to find things
- Backlog: `.project/backlog/BACKLOG.md` (table + inbox)
- Architecture decisions: `.project/decisions/`
- Roadmap: `.project/product/ROADMAP.md`
- Skills: `.claude/skills/`
  - `content-authoring/SKILL.md` — How to add/modify lessons, quizzes, modules
  - `architecture/SKILL.md` — App structure, routing, components, state management
  - `project-roadmap/SKILL.md` — Current state and planned work
