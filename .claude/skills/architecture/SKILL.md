# Architecture

## Routing
| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | All modules overview |
| `/course/:courseId` | Dashboard | Course-specific view |
| `/course/:courseId/module/:moduleId` | ModulePage | Module lessons list |
| `/course/:courseId/module/:moduleId/lesson/:lessonId` | LessonPage | Lesson viewer |
| `/glossary` | GlossaryPage | Glossary browser |
| `*` | NotFound | 404 |

Routing is in `src/App.jsx`. All routes are wrapped in `<ProgressProvider>` and `<Layout>`.

## Content Pipeline
```
course.json → module.json → .md/.json files
       ↓
contentLoader.js (Vite import.meta.glob, eager loading)
       ↓
courses.js API (getCourse, getModule, getLesson, getAllCourses)
       ↓
Page components render content
```

`contentLoader.js` uses four glob patterns:
- `/src/content/*/course.json` — course metadata
- `/src/content/*/*/module.json` — module metadata
- `/src/content/**/*.md` with `?raw` — markdown content
- `/src/content/**/*.json` — quiz/exam data

## Components
| Component | Purpose |
|-----------|---------|
| `Layout.jsx` | App shell with header/nav, renders `<Outlet>` |
| `ContentRenderer.jsx` | Renders markdown via react-markdown + remark-gfm, auto-wraps glossary terms |
| `QuizView.jsx` | Interactive quiz with scoring |
| `ExamView.jsx` | Timed exam with question navigation, flagging, results breakdown |
| `ProgressRing.jsx` | Circular SVG progress indicator |
| `TermTooltip.jsx` | Hover tooltip for glossary terms |

## Pages
| Page | Purpose |
|------|---------|
| `Dashboard.jsx` | Course overview, module cards with progress |
| `ModulePage.jsx` | Module detail, lesson list with completion status |
| `LessonPage.jsx` | Renders notes (ContentRenderer), quiz (QuizView), or exam (ExamView) |
| `GlossaryPage.jsx` | Searchable/filterable glossary browser |
| `NotFound.jsx` | 404 page |

## State Management
- **useProgress** (`src/hooks/useProgress.jsx`): React Context + localStorage
  - Key: `certfarmer_progress`
  - Per-lesson data: `completed`, `quizScore`, `quizTotal`, `lastAccessed`
  - Functions: `markCompleted`, `saveQuizScore`, `getLessonProgress`, `isLessonCompleted`, `calculateModuleProgress`, `calculateCourseProgress`, `resetProgress`

## Glossary System
- `src/data/glossary.js`: 600+ terms with Vietnamese definitions, categorized
- Format: `{ "Term": { vi: "Vietnamese definition", category: "Category" } }`
- Categories: Models, OSI Layers, Protocols, Addressing, Switching, Routing, Security, Wireless, Devices, Concepts
- Auto-wrapped in `ContentRenderer` via `glossaryHelper.jsx`

## Styling
- Tailwind CSS 3.4 with custom config
- Dark theme: `bg-slate-900`, `text-slate-100`, amber accents
- Custom styles in `src/styles/index.css`
- Font: Inter / system-ui

## Path Aliases (vite.config.js)
| Alias | Path |
|-------|------|
| `@/` | `src/` |
| `@components/` | `src/components/` |
| `@pages/` | `src/pages/` |
| `@data/` | `src/data/` |
| `@hooks/` | `src/hooks/` |
| `@utils/` | `src/utils/` |
| `@content/` | `src/content/` |

## Key File Paths
| File | Purpose |
|------|---------|
| `src/App.jsx` | Root component, routing |
| `src/data/contentLoader.js` | Vite glob content loading |
| `src/data/courses.js` | Content API layer |
| `src/data/glossary.js` | Vietnamese glossary data |
| `src/hooks/useProgress.jsx` | Progress context + localStorage |
| `src/content/ccna/course.json` | Master module list |
| `vite.config.js` | Vite config with path aliases |
| `vercel.json` | Vercel deployment config |
