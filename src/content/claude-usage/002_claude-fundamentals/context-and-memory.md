# Context and Memory

## The Context Window

Claude operates within a **context window** — a fixed-size buffer that holds the entire conversation: your messages, Claude's responses, tool calls, and tool results. Key facts:

- The context window has a maximum token limit
- Every message, tool result, and response consumes tokens
- When the window fills up, older content must be compressed or dropped
- Large tool results (long files, verbose command output) consume context quickly

## Automatic Context Compression

When the conversation grows too long, Claude Code performs **automatic compression**:

1. Older parts of the conversation are summarized
2. The summary replaces the original detailed messages
3. Recent messages remain in full detail
4. The conversation continues without interruption

This is transparent to the user but means that **details from early in a long session may be lost**. For critical information, use explicit memory or CLAUDE.md.

## The Memory System

Claude Code has a **file-based memory system** stored at `~/.claude/projects/`. This provides persistence across sessions — information saved to memory is available in future conversations.

## Memory Types

| Type | Purpose | Stored At |
|------|---------|-----------|
| **User memory** | Personal preferences and global settings | `~/.claude/` |
| **Project memory** | Project-specific knowledge and decisions | `~/.claude/projects/<project>/` |
| **Feedback memory** | Corrections Claude should remember | Saved via user feedback |
| **Reference memory** | Links to important files or resources | Part of project memory |

## MEMORY.md

The `MEMORY.md` file serves as an **index** of saved memories. It is automatically maintained and contains structured entries that Claude can reference in future sessions.

## When to Save to Memory

Save to memory when:

- A user corrects Claude's behavior ("always use tabs, not spaces")
- A project convention is established ("we use kebab-case for file names")
- An important architectural decision is made
- A non-obvious setup step is discovered

Do NOT save to memory:

- Temporary task context ("fix this bug" details)
- Information already in CLAUDE.md
- Obvious language or framework conventions
- Session-specific debugging information

## Memory vs CLAUDE.md

These two systems serve different purposes:

| Aspect | CLAUDE.md | Memory |
|--------|-----------|--------|
| **Storage** | In the project repo | In `~/.claude/` |
| **Version control** | Committed to git | Local to the machine |
| **Shared with team** | Yes | No |
| **Created by** | Developers manually | Claude automatically |
| **Scope** | Project instructions | Learned preferences |
| **Persistence** | Always loaded | Loaded per-project |

## Best Practices

- Use CLAUDE.md for **team-shared** instructions and conventions
- Use memory for **personal** preferences and learned corrections
- Keep important context near the **end** of long conversations (recency bias)
- For very long tasks, consider starting a **new conversation** with a clear prompt
- Reference specific files rather than pasting large blocks of code

## Key Takeaways

- The context window is finite — large tool results consume it quickly
- Automatic compression summarizes older messages to free space
- Memory persists across sessions via files in `~/.claude/projects/`
- Four memory types: user, project, feedback, reference
- CLAUDE.md is for team-shared rules; memory is for personal learned preferences
