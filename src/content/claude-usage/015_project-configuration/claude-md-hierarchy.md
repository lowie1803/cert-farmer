# CLAUDE.md File Hierarchy

## What Is CLAUDE.md?

`CLAUDE.md` is the primary way to give Claude persistent instructions for a project. It is loaded automatically into the conversation context at the start of every session — no manual import needed.

## Hierarchy and Loading Order

CLAUDE.md files exist at multiple levels, loaded from broadest to most specific:

| Level | Path | Scope |
|-------|------|-------|
| Enterprise | `~/.claude/CLAUDE.md` | All projects on this machine |
| Project root | `./CLAUDE.md` | This project |
| Project .claude dir | `./.claude/CLAUDE.md` | This project (alternative location) |
| Subdirectory | `./src/CLAUDE.md` | When working in that subdirectory |

## Override Behavior

More specific files **add to** (and can override) general ones:

```
~/.claude/CLAUDE.md          ← "Always use English for comments"
./CLAUDE.md                  ← "Use React 18, run npm test before commits"
./src/api/CLAUDE.md          ← "All API routes return JSON, use zod validation"
```

When working in `src/api/`, Claude sees all three files. If instructions conflict, the more specific file takes precedence.

## What Belongs at Each Level

### Enterprise Level (`~/.claude/CLAUDE.md`)

Global personal preferences that apply everywhere:

- Preferred code style (tabs vs spaces, quote style)
- Language preferences (comments in English/Vietnamese)
- General workflow habits

### Project Root (`./CLAUDE.md`)

Project-specific information:

- Tech stack and versions
- Key commands (`npm run dev`, `npm run build`, `npm run test`)
- Architecture overview with file tree
- Key rules and constraints
- Path aliases and conventions

### Subdirectory Level

Module-specific rules:

- API conventions for the API directory
- Component patterns for the UI directory
- Test conventions for the test directory

## Context Window Considerations

CLAUDE.md content is loaded into the conversation context, which means it counts against the context window. Keep instructions concise:

- **Do**: "Run `npm test` before committing"
- **Don't**: Paste entire test documentation into CLAUDE.md

### Size Guidelines

- Enterprise: 10-20 lines (brief preferences)
- Project root: 30-80 lines (essential project info)
- Subdirectory: 10-30 lines (focused module rules)

## Loading Verification

To verify what Claude sees, you can ask "What instructions do you have from CLAUDE.md?" at the start of a conversation. The content appears in `<system-reminder>` blocks in the conversation context.

## Key Takeaways

- CLAUDE.md is automatically loaded — no manual import needed
- Files form a hierarchy: enterprise < project < subdirectory
- More specific files override general ones when instructions conflict
- Keep content concise — it uses context window space
- Put tech stack and commands at project root, module rules in subdirectories
