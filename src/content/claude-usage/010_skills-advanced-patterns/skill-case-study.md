# Skill Case Study: CertFarmer

## Project Overview

CertFarmer is a certification study platform built with React, Vite, and Tailwind CSS. It serves structured educational content — modules, lessons, quizzes, and exams — all driven by JSON and Markdown files. The project uses three skills to encode domain knowledge.

## The Three Skills

### 1. Content Authoring Skill

**Location**: `.claude/skills/content-authoring/SKILL.md`

**Purpose**: Ensures new lessons, quizzes, and modules follow the correct structure.

**What it encodes**:
- Module directories use the `NNN_kebab-name` naming convention
- Each module needs a `module.json` with id, title, icon, description, and lessons array
- Markdown notes follow a consistent format (~40-80 lines with headers, tables, code blocks)
- Quiz JSON follows a strict schema with questions, options, zero-indexed correct answers, and explanations
- File names must match the lesson IDs in `module.json`

**Mistakes it prevents**:
- Creating files with names that don't match module.json IDs
- Using wrong JSON schema for quizzes (e.g., 1-indexed instead of 0-indexed correct answers)
- Forgetting required fields in module.json

### 2. Architecture Skill

**Location**: `.claude/skills/architecture/SKILL.md`

**Purpose**: Provides a map of the codebase structure so Claude navigates correctly.

**What it encodes**:
- Directory layout: components, pages, hooks, data, content
- Path aliases: `@/` maps to `src/`, `@components/` for components, etc.
- State management: React Context + localStorage via `useProgress` hook
- Routing: React Router 6 patterns
- Content loading: `contentLoader.js` uses `import.meta.glob` to auto-wire content

**Mistakes it prevents**:
- Creating components in wrong directories
- Using incorrect import paths
- Misunderstanding how content gets loaded

### 3. Project Roadmap Skill

**Location**: `.claude/skills/project-roadmap/SKILL.md`

**Purpose**: Keeps Claude informed about the project's current state and planned work.

**What it encodes**:
- Current project status and completed features
- Backlog location: `.project/backlog/BACKLOG.md`
- Architecture decisions: `.project/decisions/`
- Upcoming planned work and priorities

## How the Skills Work Together

```
User: "Add a new quiz to module 005"

Claude's process:
1. Architecture skill → knows content lives in src/content/
2. Content authoring skill → knows quiz JSON schema and naming conventions
3. Project roadmap skill → knows this aligns with content completion goals
```

Each skill handles its domain, and together they give Claude complete project understanding.

## Lessons Learned

| Lesson | Detail |
|--------|--------|
| Keep skills focused | One skill per domain, not one mega-skill |
| Update as project evolves | Skills should reflect current patterns, not outdated ones |
| Start with pain points | Build skills for tasks where mistakes happen most |
| Include anti-examples | Showing what NOT to do is as important as showing what to do |
| Test with real tasks | Invoke skills on actual work to find gaps in instructions |

## Key Takeaways

- CertFarmer uses three focused skills: content-authoring, architecture, project-roadmap
- Each skill encodes specific domain knowledge that prevents common mistakes
- Skills work together to give Claude complete project understanding
- Keep skills focused, current, and tested against real tasks
- Anti-examples are critical for preventing mistakes in structured content
