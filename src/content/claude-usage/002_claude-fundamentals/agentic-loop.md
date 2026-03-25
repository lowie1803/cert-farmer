# The Agentic Loop

## What Is Claude Code?

Claude Code is an **agentic coding assistant** that runs in your terminal. Unlike a simple chatbot that only produces text, Claude Code can take actions — reading files, editing code, running commands, and searching codebases — all through a structured loop.

## The Read-Think-Act Loop

Claude Code operates on a continuous cycle:

| Phase | What Happens |
|-------|-------------|
| **Read** | Claude receives input: your message, tool results, or system context |
| **Think** | Claude analyzes the information and decides what to do next |
| **Act** | Claude either responds with text or invokes a tool |

This cycle repeats until the task is complete. A single user request may trigger dozens of loop iterations.

## Tool Use vs Plain Text

Claude has two types of output:

- **Plain text**: Direct responses to the user (explanations, summaries, answers)
- **Tool calls**: Structured actions that interact with the environment (reading files, running commands, searching code)

Claude decides which to use based on the task. A question like "What is a React hook?" gets plain text. A request like "Fix the bug in App.jsx" triggers tool calls.

## How Tool Results Flow Back

When Claude calls a tool:

1. The tool executes and produces a result (file contents, command output, search matches)
2. The result is added to the conversation as a **tool result message**
3. Claude reads this result and decides the next step
4. The loop continues until Claude has enough information to respond

## Multi-Turn Conversations

Each message in a conversation builds on previous context. Claude remembers:

- What files it has already read
- What changes it has made
- What commands it has run
- What the user has asked for

This allows complex, multi-step tasks like "refactor this module, update the tests, and commit the changes."

## Error Handling and Retries

When a tool call fails, Claude does not simply give up:

- **File not found**: Claude searches for the correct path
- **Edit conflict**: Claude re-reads the file and adjusts the edit
- **Command failure**: Claude reads the error output and tries a different approach
- **Permission denied**: Claude informs the user and suggests alternatives

The key principle is **graceful recovery** — treat errors as information, not stop conditions.

## Parallel Tool Calls

When multiple actions are independent, Claude can invoke several tools simultaneously:

```
# These can run in parallel:
- Read src/App.jsx
- Read src/index.js
- Glob **/*.test.js

# These must be sequential:
- Read file → Edit file (edit depends on read result)
```

Parallel execution significantly speeds up tasks like exploring a codebase or gathering information from multiple files.

## Key Takeaways

- Claude Code is not a chatbot — it is an **agent** that takes actions
- The core loop is **read-think-act**, repeated until the task is done
- Tool use is how Claude interacts with your codebase and environment
- Errors trigger adaptive behavior, not failure
- Independent tool calls run in parallel for efficiency
