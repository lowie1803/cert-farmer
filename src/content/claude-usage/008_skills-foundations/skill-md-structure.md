# SKILL.md Structure

## Purpose of SKILL.md

A SKILL.md file contains the complete instructions that Claude follows when a skill is invoked. It acts as a detailed playbook — specifying when to trigger, what tools to use, the step-by-step process, and the expected output format.

## Core Sections

A well-structured SKILL.md typically includes these sections:

| Section | Purpose |
|---------|---------|
| **When to trigger** | Conditions under which this skill should activate |
| **Tools to use** | Which Claude Code tools the skill relies on |
| **Step-by-step process** | Ordered instructions for completing the task |
| **Output format** | What the result should look like |
| **Examples** | Correct usage demonstrations |
| **Anti-examples** | What NOT to do |

## Example: Content Authoring Skill

From the CertFarmer project's `.claude/skills/content-authoring/SKILL.md`:

```markdown
# Content Authoring Skill

## When to trigger
When the user asks to add or modify lessons, quizzes, or modules.

## Tools to use
- Read: to check existing content structure
- Write: to create new content files
- Edit: to modify existing files

## Process
1. Check the module's module.json for lesson list
2. Create markdown notes following the existing format
3. Create quiz JSON with correct structure
4. Verify file naming matches module.json IDs
```

## Writing Clear Instructions

Effective SKILL.md files follow these principles:

- **Be specific**: "Create a file at `src/content/...`" not "create a file somewhere"
- **Use imperative voice**: "Run the build command" not "you might want to run the build"
- **Include concrete examples**: Show actual file paths, JSON structures, command syntax
- **Define boundaries**: Specify what the skill should NOT do
- **Reference other files**: Point to templates, schemas, or related documentation

## Referencing Other Resources

Skills can reference other files and tools in the project:

```markdown
## Reference files
- See `src/content/ccna/001_network-fundamentals/module.json` for module structure
- See existing quiz files for JSON format
- Follow patterns in CLAUDE.md for coding conventions
```

## Real Project Skills

The CertFarmer project uses three skills:

1. **content-authoring** — How to add/modify lessons, quizzes, and modules
2. **architecture** — App structure, routing, components, and state management
3. **project-roadmap** — Current project state and planned work

Each encodes domain-specific knowledge that prevents mistakes and ensures consistency.

## Key Takeaways

- SKILL.md files contain complete instructions for a skill
- Include: trigger conditions, tools, step-by-step process, output format
- Use examples AND anti-examples for clarity
- Be specific and use imperative voice
- Reference other project files when relevant
- Keep instructions unambiguous — Claude follows them literally
