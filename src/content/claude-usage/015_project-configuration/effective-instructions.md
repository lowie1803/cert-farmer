# Writing Effective CLAUDE.md Instructions

## Core Principle: Be Specific and Actionable

Claude follows instructions literally. Vague guidance leads to inconsistent behavior.

| Bad | Good |
|-----|------|
| "Make sure tests pass" | "Run `npm test` before committing" |
| "Follow best practices" | "Use TypeScript strict mode, no `any` types" |
| "Keep code clean" | "Max 80 chars per line, prefer named exports" |
| "Be careful with the database" | "Never run DELETE/DROP queries without WHERE clause" |

## Essential Sections

A well-structured CLAUDE.md includes:

### 1. Tech Stack

```markdown
## Tech Stack
React 18 + Vite 5 + TypeScript 5 + Tailwind CSS 3
```

This tells Claude which frameworks, versions, and patterns to use.

### 2. Key Commands

```markdown
## Commands
npm run dev       # Start dev server
npm run build     # Production build
npm run test      # Run tests
npm run lint      # ESLint check
```

Claude uses these to verify changes and run the correct build tools.

### 3. Architecture Overview

```markdown
## Architecture
src/
  components/    # Reusable UI components
  pages/         # Route-level page components
  hooks/         # Custom React hooks
  utils/         # Pure utility functions
  api/           # API client and types
```

File tree diagrams help Claude navigate the codebase and place new code correctly.

### 4. Key Rules

```markdown
## Key Rules
- All API calls go through src/api/ — never use fetch directly in components
- State management uses React Context, not Redux
- Tests are co-located with source files (Component.test.tsx)
```

Rules are constraints Claude must follow. Make them clear and unambiguous.

## What NOT to Include

- **Things derivable from code** — Claude can read `package.json`, `tsconfig.json`, etc.
- **Git history** — Claude can run `git log` when needed
- **Full documentation** — Link to docs instead of copying content
- **README content** — Don't duplicate what's already in README.md
- **Obvious conventions** — "Use semicolons in JavaScript" (Claude reads your eslint config)

## Anti-Patterns

### Overly Long CLAUDE.md

If your CLAUDE.md exceeds 100 lines, it is likely too long. Long instructions:

- Consume context window space
- May get truncated in long conversations
- Dilute important rules with noise

### Vague Instructions

"Try to write good code" gives Claude no actionable guidance. Every instruction should be something Claude can concretely follow or violate.

### Duplicating README

If your README already documents the tech stack and commands, CLAUDE.md should reference it, not copy it. Focus CLAUDE.md on **rules and constraints** that Claude needs to follow.

### Contradictory Instructions

If enterprise-level CLAUDE.md says "use tabs" but project-level says "use spaces," Claude must pick one. Avoid conflicts across hierarchy levels.

## Testing Your Instructions

The best way to verify CLAUDE.md effectiveness:

1. Start a **new conversation** (fresh context)
2. Ask Claude to perform a task covered by your instructions
3. Check if it follows the rules without being reminded
4. If not, revise the instruction to be more specific

## Template

```markdown
# ProjectName — Brief Description

## Tech Stack
[Framework] + [Build tool] + [Language] + [CSS solution]

## Commands
[List key commands with descriptions]

## Architecture
[File tree of important directories]

## Key Rules
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]
```

## Key Takeaways

- Write specific, actionable instructions — not vague guidelines
- Include tech stack, commands, architecture, and key rules
- Omit information Claude can derive from code or config files
- Keep it concise — under 100 lines for the project root file
- Test instructions by starting fresh conversations
