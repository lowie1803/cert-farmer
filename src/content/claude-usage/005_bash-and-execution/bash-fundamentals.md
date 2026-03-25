# Bash Tool Fundamentals

The **Bash tool** lets Claude execute shell commands on the user's machine. It is the most versatile tool but should only be used when dedicated tools (Read, Edit, Glob, Grep, Write) cannot accomplish the task.

## Core Behavior

| Property | Detail |
|----------|--------|
| Working directory | Persists between calls |
| Shell state | Does NOT persist (env vars, aliases reset each call) |
| Default timeout | 120,000 ms (2 minutes) |
| Max timeout | 600,000 ms (10 minutes) |

Because shell state resets, you cannot `export MY_VAR=hello` in one call and reference `$MY_VAR` in the next. Working directory, however, carries over.

## When NOT to Use Bash

Dedicated tools provide a better experience and should be preferred:

| Instead of... | Use |
|---------------|-----|
| `cat`, `head`, `tail` | **Read** tool |
| `grep`, `rg` | **Grep** tool |
| `find`, `ls` for searching | **Glob** tool |
| `sed`, `awk` for editing | **Edit** tool |
| `echo >`, `cat <<EOF` | **Write** tool |

Only use Bash for these operations when explicitly instructed or after verifying the dedicated tool cannot accomplish the task.

## Background Execution

Set `run_in_background: true` for long-running commands you do not need results from immediately. You will be notified when the command completes.

- Do **not** append `&` to the command when using this parameter
- Do **not** poll with sleep loops — you will be notified automatically

## Running Multiple Commands

| Pattern | When to use | Example |
|---------|-------------|---------|
| `&&` | Sequential, dependent (stop on failure) | `npm install && npm run build` |
| `;` | Sequential, independent (continue on failure) | `git status; git diff` |
| Parallel Bash calls | Independent commands | Two separate Bash tool invocations in one message |

## Avoiding Unnecessary Sleep

- Do not sleep between commands that can run immediately
- Use `run_in_background` instead of sleep loops for long-running tasks
- Do not retry failing commands in a sleep loop — diagnose the root cause
- If you must sleep, keep duration short (1-5 seconds)

## Description Parameter

Every Bash call requires a clear, concise description of what the command does:

- **Simple commands**: 5-10 words (e.g., "Show working tree status")
- **Complex commands**: Add enough context to clarify (e.g., "Find and delete all .tmp files recursively")
- Never use words like "complex" or "risk" in descriptions
