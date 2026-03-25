# Initial Configuration

## The `/init` Command

The fastest way to set up Claude Code for a project is the `/init` command:

```
claude
> /init
```

This scans your project and creates a `CLAUDE.md` file in the project root with:

- Detected tech stack and frameworks
- Build and test commands
- Project structure overview
- Code style conventions

You can (and should) edit this file to add project-specific details.

## Global CLAUDE.md

Create a user-global instruction file that applies to **all** your projects:

```bash
# Create the global CLAUDE.md
touch ~/.claude/CLAUDE.md
```

Good candidates for global instructions:

- Your preferred coding style (tabs vs spaces, naming conventions)
- Common tools you use (testing frameworks, linters)
- Language preferences (e.g., "respond in Vietnamese")
- General behaviors ("be concise", "always run tests after changes")

## Project CLAUDE.md

Project-level instructions live in your repository root:

| Location | Scope | Committed to Git? |
|----------|-------|--------------------|
| `CLAUDE.md` | Project root | Yes — shared with team |
| `.claude/CLAUDE.md` | Project root (alternative) | Yes — shared with team |
| `src/CLAUDE.md` | Subdirectory only | Yes — scoped instructions |

Subdirectory CLAUDE.md files only apply when Claude is working on files within that directory.

## Settings Files

Claude Code uses `.claude/settings.json` for machine-readable configuration:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)"
    ]
  }
}
```

There are three settings files with different scopes:

| File | Scope | Committed? |
|------|-------|------------|
| `~/.claude/settings.json` | All projects | N/A |
| `.claude/settings.json` | This project | Yes — team-shared |
| `.claude/settings.local.json` | This project | No — personal |

## Gitignore Tips

Add these to your `.gitignore` to keep local settings private:

```
.claude/settings.local.json
```

The `.claude/settings.json` file is meant to be committed so your team shares the same permissions and configuration.

## Key Takeaways

- Use `/init` to bootstrap a project's CLAUDE.md automatically
- Global `~/.claude/CLAUDE.md` applies to all projects
- Project CLAUDE.md files are committed and shared with the team
- `.claude/settings.json` controls permissions — commit it for team consistency
- `.claude/settings.local.json` is for personal overrides — gitignore it
