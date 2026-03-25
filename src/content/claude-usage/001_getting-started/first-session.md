# Your First Session

## Launching Claude Code

Open your terminal, navigate to a project directory, and start Claude Code:

```bash
cd ~/my-project
claude
```

Claude Code starts in interactive mode, showing a welcome message and a prompt (`>`). It automatically detects your project's git repository and reads any CLAUDE.md files.

## Exploring a Codebase

Start by asking Claude to understand the project:

```
> What does this project do?
> What's the tech stack?
> Explain the architecture of src/
```

Claude will use its tools (Glob, Grep, Read) to explore the codebase and give you an informed answer.

## Making a Simple Change

Try a straightforward edit:

```
> Add a "last updated" timestamp to the footer component
```

Claude will:
1. Search for the footer component
2. Read the file
3. Edit it with the change
4. Show you the diff

## Permission Prompts

When Claude tries to use a tool, you may see a permission prompt:

```
Claude wants to run: Bash(npm run test)
Allow? (y/n/always)
```

- **y** — allow this one time
- **n** — deny the action
- **always** — allow this command pattern permanently (saved to settings)

Permission prompts protect you from unintended actions. As you build trust, use "always" to reduce interruptions.

## Essential Slash Commands

Slash commands are typed directly at the Claude Code prompt:

| Command | What It Does |
|---------|-------------|
| `/help` | Show all available commands and usage tips |
| `/clear` | Clear conversation history and start fresh |
| `/exit` | Exit Claude Code (or press Ctrl+C twice) |
| `/init` | Generate a CLAUDE.md for the current project |
| `/compact` | Compress conversation to save context space |

## Tips for Effective Prompting

- **Be specific**: "Fix the null check in `parseConfig`" is better than "fix the bug"
- **Give context**: "The login form should validate email format before submission"
- **Iterate**: Start with a simple request, then refine based on the result
- **Use file paths**: "Read `src/utils/auth.js` and explain the token refresh logic"

## Key Takeaways

- Launch with `claude` from your project directory
- Claude auto-detects your project structure and git context
- Permission prompts keep you in control of tool usage
- Use slash commands like `/help`, `/clear`, and `/init` for session management
- Be specific in your prompts for better results
