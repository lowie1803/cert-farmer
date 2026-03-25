# Debugging Workflow

## Describing the Bug

Start with a clear description of the problem:

```
> The login form submits but the page shows a blank screen instead of redirecting to the dashboard
```

The more context you provide, the faster Claude can narrow down the cause:
- **What you expected** vs **what actually happened**
- **Steps to reproduce**
- **Error messages** or stack traces (paste them directly)

## Investigation Phase

Claude follows a systematic investigation process:

1. **Search for relevant code** — uses Grep and Glob to find related files
2. **Read the code** — examines the suspected area in detail
3. **Trace the data flow** — follows the execution path from input to output
4. **Identify the root cause** — pinpoints where behavior diverges from intent

```
> Here's the error from the console:
> TypeError: Cannot read property 'user' of undefined
>   at AuthContext.js:24
>   at Dashboard.jsx:15
```

Claude reads both files, traces the context provider chain, and identifies why `user` is undefined.

## Iterative Test-Fix Cycles

Once Claude identifies the issue, the workflow becomes a tight loop:

```
Fix → Test → Verify → Repeat (if needed)
```

Example conversation:

```
> Fix the null reference in AuthContext.js

[Claude edits the file]

> Run the tests

[Tests pass, but one new failure]

> Fix the failing test — it expects the old behavior

[Claude updates the test]

> Run the tests again

[All pass]
```

## Stack Trace Analysis

When you paste a stack trace, Claude:

1. Reads the files mentioned in the trace (top of stack first)
2. Identifies the error origin vs the propagation path
3. Checks for common patterns (undefined access, type mismatch, async issues)
4. Proposes a fix at the root cause, not the symptom

## Debugging Strategies Claude Uses

| Strategy | When It Applies |
|----------|----------------|
| **Read the error** | Stack traces, console errors, build failures |
| **Search for patterns** | "Where else is this function called?" |
| **Check recent changes** | `git diff` or `git log` to find what changed |
| **Compare working vs broken** | Read tests or working code paths for reference |
| **Add logging** | When the cause isn't visible from static analysis |

## Best Practices

- **Paste actual errors** — don't paraphrase error messages
- **Share reproduction steps** — Claude can't run your app, but knowing the steps helps narrow the search
- **Test after each fix** — verify one issue is resolved before moving to the next
- **Ask "why"** — understanding the root cause prevents recurrence

## Key Takeaways

- Start with a clear bug description including expected vs actual behavior
- Claude investigates systematically: search → read → trace → fix
- Use iterative test-fix cycles to verify each change
- Paste full stack traces for accurate root cause analysis
- Always test after fixing to confirm the issue is resolved
