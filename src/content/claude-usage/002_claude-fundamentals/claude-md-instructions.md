# CLAUDE.md Instructions

## What Is CLAUDE.md?

CLAUDE.md is a special configuration file that provides **persistent instructions** to Claude Code. When Claude starts a session, it automatically loads CLAUDE.md files and treats their contents as high-priority instructions that override default behavior.

## Where CLAUDE.md Files Live

Claude loads instructions from multiple locations, in this order:

| Location | Scope | Example |
|----------|-------|---------|
| `~/.claude/CLAUDE.md` | User-global | Personal preferences across all projects |
| `CLAUDE.md` (project root) | Project-wide | Shared team instructions, checked into git |
| `.claude/CLAUDE.md` | Project-wide | Alternative project location |
| `CLAUDE.md` (subdirectory) | Directory-scoped | Instructions for specific parts of the codebase |

All discovered files are merged together and presented to Claude as a `system-reminder`.

## Priority and Override Order

When instructions conflict, **more specific files win**:

1. User-global (`~/.claude/CLAUDE.md`) — lowest priority
2. Project root (`CLAUDE.md`) — medium priority
3. Subdirectory files — highest priority for their scope

The key rule: CLAUDE.md instructions **override default behavior**. If CLAUDE.md says "never use semicolons," Claude follows that even if its default style includes semicolons.

## What to Put in CLAUDE.md

Effective CLAUDE.md files include:

- **Tech stack**: Framework, language version, key libraries
- **Commands**: Build, test, lint, deploy commands
- **Architecture overview**: Directory structure, key patterns
- **Code style rules**: Naming conventions, formatting preferences
- **Key rules**: Things Claude must always or never do
- **Path aliases**: Import shortcuts like `@/` or `@components/`

### Example Structure

```markdown
# MyProject

## Tech Stack
React 18 + TypeScript + Vite + Tailwind CSS

## Commands
npm run dev       # Start dev server
npm run test      # Run tests
npm run lint      # Lint code

## Key Rules
- Always use TypeScript strict mode
- Prefer named exports over default exports
- Never commit .env files
```

## What NOT to Put in CLAUDE.md

Avoid cluttering CLAUDE.md with:

- **Obvious conventions**: Claude already knows standard language idioms
- **Entire API documentation**: Too much context wastes the context window
- **Frequently changing information**: CLAUDE.md should be relatively stable
- **Secrets or credentials**: These files are often committed to version control
- **Long prose explanations**: Keep instructions concise and actionable

## The System-Reminder Mechanism

When Claude loads CLAUDE.md content, it appears in the conversation as a `<system-reminder>` block. This means:

- The instructions are present in every turn of the conversation
- They persist even through context compression
- Claude treats them as authoritative project knowledge

## Key Takeaways

- CLAUDE.md provides persistent, high-priority instructions to Claude Code
- Files are loaded from user home, project root, and subdirectories
- More specific locations override more general ones
- Keep content concise: tech stack, commands, architecture, and rules
- Avoid secrets, verbose docs, and frequently changing content
