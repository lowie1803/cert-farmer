# Parallel Tool Calling

Claude can invoke **multiple tools in a single response** when the calls are independent. This dramatically improves performance by eliminating unnecessary round trips.

## The Core Rule

**No dependencies between calls** = safe to parallelize.

If call B needs the result of call A, they must be sequential. If both are independent, run them in parallel.

## Common Parallel Patterns

### Parallel File Reads
When you suspect multiple files are relevant, read them all at once:

```
# In one message, invoke:
Read("src/auth/login.js")
Read("src/auth/middleware.js")
Read("src/auth/config.js")
```

This is called **speculative parallel reading** — you read multiple potentially useful files rather than reading one, checking, then reading the next.

### Parallel Search Operations
Combine Glob and Grep calls when searching broadly:

```
# In one message, invoke:
Glob("**/*.test.js")
Grep("authentication", type: "js")
Grep("login", type: "js")
```

### Parallel Bash Commands
Independent shell commands should be separate parallel Bash calls:

```
# In one message, invoke:
Bash("git status")
Bash("git diff")
Bash("git log --oneline -10")
```

### Parallel Agent Launches
Multiple Agent calls can be made in one message for independent research:

```
# In one message, invoke:
Agent(prompt: "Explore the auth module architecture")
Agent(prompt: "Explore the database schema")
```

## When NOT to Parallelize

### Dependent Operations
When one result determines the next call:

```
# WRONG — result of Glob determines which file to Read
Glob("**/config.*")    # Need this result first
Read("???")            # Don't know the path yet
```

The correct approach: call Glob first, wait for results, then Read the specific file.

### Sequential Modifications
When editing the same file multiple times, edits must be sequential to avoid conflicts.

## Parallel vs Sequential Bash

| Approach | Use when |
|----------|----------|
| Parallel Bash calls | Commands are independent |
| `&&` in single call | Commands depend on each other |
| `;` in single call | Sequential but independent (don't care if earlier fails) |

## Performance Impact

Parallel calling can reduce a task from many round trips to just a few. For example, checking git state before a commit:

- **Sequential**: 3 round trips (status, diff, log)
- **Parallel**: 1 round trip (all three at once)

Always look for parallelization opportunities when multiple independent pieces of information are needed.
