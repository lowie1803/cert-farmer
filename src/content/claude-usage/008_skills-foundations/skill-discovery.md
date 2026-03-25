# Skill Discovery

## Where Skills Live

Skills are stored in `.claude/skills/` directories within a project. The directory structure determines how skills are organized and named:

```
.claude/
  skills/
    content-authoring/
      SKILL.md
    architecture/
      SKILL.md
    project-roadmap/
      SKILL.md
```

Each subdirectory under `skills/` represents one skill, and the `SKILL.md` file inside it contains the instructions.

## How Skills Are Discovered

Claude discovers available skills through **system-reminder messages** in the conversation. When a session starts, the system provides a list of available skills that Claude can use. This list is generated from the SKILL.md files found in the project's `.claude/skills/` directory.

The discovery flow:

1. Claude Code scans `.claude/skills/` for SKILL.md files
2. Available skills are listed in `<available-deferred-tools>` or system context
3. Claude sees the list and knows which skills it can invoke

## Skill Naming

| Source | Skill Name |
|--------|------------|
| Directory name | `.claude/skills/deploy/SKILL.md` becomes `deploy` |
| File name | Can also be derived from the SKILL.md file location |
| Fully qualified | Use `namespace:skill` format for disambiguation |

### Fully Qualified Names

When multiple skill sets exist or names could conflict, use fully qualified names:

```
ms-office-suite:pdf
project-tools:deploy
```

This follows the `namespace:skill-name` pattern, where the namespace groups related skills.

## Referencing Skills

Users reference skills in their messages using the `/<skill-name>` syntax:

- `/commit` — invoke the commit skill
- `/review-pr 123` — invoke the review-pr skill with argument "123"
- `/content-authoring` — invoke the content-authoring skill

## The Skill Tool

The Skill tool is the mechanism Claude uses to execute skills. It accepts:

- **`skill`** (required): The skill name (e.g., `"commit"`, `"review-pr"`)
- **`args`** (optional): Arguments to pass to the skill (e.g., `"-m 'Fix bug'"`, `"123"`)

## Key Takeaways

- Skills live in `.claude/skills/` directories with SKILL.md files
- Skill names derive from the directory or file name
- Available skills appear in system-reminder messages during conversations
- Users reference skills with `/<skill-name>` syntax
- Fully qualified names (`namespace:skill`) resolve ambiguity
- The Skill tool loads and executes the skill instructions
