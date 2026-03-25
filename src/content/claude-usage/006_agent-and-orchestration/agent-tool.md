# The Agent Tool

The **Agent tool** (also called the subagent tool) launches specialized agents to handle complex, multi-step tasks that would require many sequential tool calls in the main conversation.

## Available Agent Types

| Type | Purpose | Best for |
|------|---------|----------|
| Default (general) | General-purpose task execution | Complex multi-step tasks |
| **Explore** | Fast codebase exploration | Understanding architecture, finding patterns |
| **Plan** | Implementation planning | Designing an approach before coding |
| **claude-code-guide** | Claude Code questions | Answering questions about Claude Code itself |

## Key Parameters

| Parameter | Description |
|-----------|-------------|
| `description` | 3-5 word summary of the task |
| `prompt` | Detailed instructions for the agent |
| `run_in_background` | Run agent without blocking the main thread |
| `isolation` | Use a worktree for isolated file changes |
| `subagent_type` | Agent type: default, Explore, Plan, claude-code-guide |

## Foreground vs Background

### Foreground (default)
Use when you **need the result before proceeding**:

- Exploring code to decide what to modify
- Planning an implementation approach
- Answering a question that affects the next step

### Background (`run_in_background: true`)
Use for **independent work streams**:

- Tasks that do not affect subsequent steps
- Long-running operations (large codebase exploration)
- Parallel independent research tasks

## When NOT to Use Agent

The Agent tool adds overhead. Do not use it for:

- **Reading a specific file** — use Read directly
- **Simple file searches** — use Glob or Grep directly
- **Single-step operations** — just call the tool directly
- **Fewer than 3 queries** — direct tools are faster

## When to Use Agent

Agent is the right choice when:

- The task requires **more than 3 sequential queries**
- You need to **explore unfamiliar code** before making changes
- The task involves **cross-referencing multiple files**
- You want to **parallelize independent research**

## Agent Isolation (Worktrees)

Setting `isolation: true` runs the agent in a separate git worktree. This means:

- The agent can make file changes without affecting the main working tree
- Useful for experimental or risky modifications
- Changes can be reviewed before merging back
