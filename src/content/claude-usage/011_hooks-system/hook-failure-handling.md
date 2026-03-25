# Hook Failure Handling

## How Claude Handles Hook Failures

When a hook fails (returns a non-zero exit code), Claude does not ignore it or bypass it. Instead, Claude:

1. **Reads the error output** from the hook
2. **Investigates the cause** of the failure
3. **Adjusts its approach** or asks the user for help

This is a fundamental principle: **Claude never uses `--no-verify` or any bypass flag to skip hooks.**

## Pre-Tool-Call Hook Failures

When a pre-tool-call hook blocks an action:

```
User: /commit
Pre-hook runs: npm run lint
Hook fails: ESLint found 3 errors
```

Claude's response:
1. Reads the lint errors from hook output
2. Fixes the identified issues
3. Attempts the commit again (which re-triggers the hook)
4. Repeats until the hook passes or asks the user for guidance

Claude will NOT:
- Add `--no-verify` to skip the hook
- Ignore the error and proceed anyway
- Disable the hook in settings

## The user-prompt-submit Hook

This special hook runs before Claude processes a user message:

```json
{
  "hooks": {
    "user-prompt-submit": [
      {
        "command": "check-message-policy.sh"
      }
    ]
  }
}
```

If blocked by this hook, Claude checks the error output and either adjusts its response or informs the user about the policy violation.

## Debugging Hook Failures

When a hook isn't working as expected, check these common issues:

| Issue | Symptom | Solution |
|-------|---------|----------|
| Incorrect path | "command not found" | Use absolute paths in hook commands |
| Missing tools | Tool-specific error | Ensure required tools are installed |
| Permission errors | "permission denied" | Check file permissions with `chmod` |
| Wrong shell syntax | Syntax errors | Test the command independently in your terminal |
| Bad matcher pattern | Hook never triggers | Verify the regex pattern matches the intended tool calls |

## Testing Hooks Independently

Before configuring a hook, test the command in isolation:

```bash
# Test the command directly
npm run lint

# Test with the same environment variables
CLAUDE_FILE_PATH=src/App.jsx prettier --write $CLAUDE_FILE_PATH
```

If the command works in your terminal but fails as a hook, the issue is likely:
- Path differences (hook runs from a different working directory)
- Missing environment variables
- Shell configuration not loaded in hook context

## Hook Output as Feedback

Remember that hook output is fed back to Claude as if it came from the user. This means:

- **Clear error messages** in hook output help Claude fix issues faster
- **Verbose output** gives Claude more context for troubleshooting
- **Exit codes** matter: non-zero blocks the action, zero allows it

## Best Practices

- Write hook commands that produce clear, actionable error messages
- Test hook commands independently before adding to settings.json
- Use absolute paths for commands and files in hooks
- Keep hooks fast — slow hooks delay every matching tool call
- Log hook output to a file if you need to debug intermittent failures

## Key Takeaways

- Claude never bypasses hooks with `--no-verify` or similar flags
- When a hook fails, Claude reads the error, investigates, and adjusts
- The user-prompt-submit hook runs before message processing
- Debug hooks by testing commands independently in your terminal
- Common issues: incorrect paths, missing tools, permission errors
- Hook output is treated as user feedback — clear messages help Claude fix issues
