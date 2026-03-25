# Hooks Overview

## What Are Hooks?

Hooks are **shell commands that execute in response to Claude Code events**. They are lifecycle interceptors that run automatically when specific actions occur during a Claude Code session.

**Critical distinction**: Claude Code hooks are NOT git hooks. They are a separate system configured in Claude Code's settings files.

## How Hooks Work

Hooks run in the user's shell environment. When a triggering event occurs, Claude Code executes the hook's shell command and feeds the output back into the conversation. Claude treats hook feedback as coming from the user.

```
Event occurs → Hook command runs → Output fed back to Claude → Claude adjusts
```

## Hook Types

| Hook Type | When It Runs | Use Case |
|-----------|-------------|----------|
| **pre-tool-call** | Before a tool executes | Block or modify actions before they happen |
| **post-tool-call** | After a tool executes | Validate results, run formatters, trigger follow-ups |
| **notification** | When Claude sends a notification | Custom alerts for long-running tasks |
| **user-prompt-submit** | Before a user message is processed | Validate or transform user input |

### pre-tool-call Hooks

Run before a tool executes. Can block the action:

- Lint code before a commit
- Validate file paths before writing
- Check permissions before destructive operations

### post-tool-call Hooks

Run after a tool completes. React to results:

- Format code after editing a file
- Run tests after modifying source code
- Update logs after deployments

### notification Hooks

Trigger on Claude Code notifications:

- Play a sound when a long task completes
- Send a Slack message on completion
- Log notifications to a file

## Hooks Enable Automated Behaviors

Hooks let you define rules like "from now on, whenever X happens, do Y":

- "Whenever a file is edited, run prettier on it"
- "Whenever a commit is created, run the linter"
- "Whenever a long task finishes, send me a desktop notification"

These behaviors happen automatically without user intervention.

## Where Hooks Are Configured

Hooks are configured in **settings.json** files, NOT in CLAUDE.md or memory files:

- Global: `~/.claude/settings.json`
- Project: `.claude/settings.json`
- Local: `.claude/settings.local.json`

## Hooks vs Git Hooks

| Feature | Claude Code Hooks | Git Hooks |
|---------|------------------|-----------|
| Configured in | settings.json | .git/hooks/ |
| Triggered by | Claude Code tool calls | Git operations |
| Scope | Claude Code sessions | Any git operation |
| Output goes to | Claude (as user feedback) | Terminal |

## Key Takeaways

- Hooks are shell commands triggered by Claude Code events
- They are NOT git hooks — completely separate system
- Types: pre-tool-call, post-tool-call, notification, user-prompt-submit
- Configured in settings.json, not in CLAUDE.md
- Hook output is fed back to Claude as user feedback
- Hooks enable automated behaviors during Claude Code sessions
