# What Are Skills

## Definition

Skills are **reusable prompt templates** that extend Claude Code's capabilities. They encapsulate domain expertise into repeatable instructions that Claude follows when performing specific tasks.

Think of skills as specialized playbooks — each one teaches Claude how to handle a particular type of work correctly and consistently.

## How Skills Work

| Concept | Description |
|---------|-------------|
| Storage | Defined in `SKILL.md` files within `.claude/skills/` directories |
| Invocation | Users trigger skills with slash commands (e.g., `/commit`, `/review-pr`) |
| Execution | The **Skill tool** loads and executes the skill's instructions |
| Scope | Each skill provides specialized capabilities for a specific domain |

## Skills vs Built-In CLI Commands

This distinction is critical:

- **Built-in commands** (`/help`, `/clear`, `/init`) are part of Claude Code itself. They cannot be modified or extended by users.
- **Skills** (`/commit`, `/review-pr`, `/deploy`) are **user-defined**. They are created by writing SKILL.md files and can be customized for any project.

The Skill tool should **never** be used for built-in CLI commands — only for user-defined skills.

## What Skills Provide

Skills serve several purposes:

- **Domain knowledge**: Encode how your specific project works (e.g., "our deploy process requires running tests first")
- **Consistency**: Ensure Claude follows the same process every time (e.g., "always format commit messages this way")
- **Error prevention**: Specify what NOT to do (e.g., "never force-push to main")
- **Team alignment**: Capture team conventions so every developer gets the same Claude behavior

## Invoking a Skill

Users invoke skills by referencing them with a slash:

```
/commit -m "Fix login bug"
/review-pr 123
/deploy staging
```

When Claude sees a skill reference, it uses the Skill tool to load the corresponding SKILL.md file and follows its instructions.

## Key Takeaways

- Skills are reusable prompt templates defined in SKILL.md files
- They are user-defined, NOT built-in CLI commands
- Users invoke them with slash commands like `/skill-name`
- The Skill tool executes them within Claude Code
- Skills encode domain expertise, ensuring consistent and correct behavior
