# Hook Configuration

## Configuration Location

Hooks are configured in settings.json files. There are three levels:

| File | Scope | Shared? |
|------|-------|---------|
| `~/.claude/settings.json` | Global (all projects) | No — personal |
| `.claude/settings.json` | Project-wide | Yes — checked into git |
| `.claude/settings.local.json` | Project, local only | No — git-ignored |

Project settings override global settings. Local settings override project settings.

## Hook Structure

A hook configuration specifies the event type, an optional matcher, and the command to execute:

```json
{
  "hooks": {
    "post-tool-call": [
      {
        "matcher": {
          "tool_name": "Edit"
        },
        "command": "prettier --write $CLAUDE_FILE_PATH"
      }
    ]
  }
}
```

### Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| `matcher` | No | Filter which tool calls trigger the hook |
| `matcher.tool_name` | No | Match a specific tool (e.g., "Edit", "Bash", "Write") |
| `matcher.pattern` | No | Regex pattern to match against tool parameters |
| `command` | Yes | Shell command to execute |

## Example Configurations

### Post-Edit Formatting Hook

Run prettier after any file edit:

```json
{
  "hooks": {
    "post-tool-call": [
      {
        "matcher": { "tool_name": "Edit" },
        "command": "prettier --write $CLAUDE_FILE_PATH"
      }
    ]
  }
}
```

### Pre-Commit Linting Hook

Run linter before creating a git commit:

```json
{
  "hooks": {
    "pre-tool-call": [
      {
        "matcher": {
          "tool_name": "Bash",
          "pattern": "git commit"
        },
        "command": "npm run lint"
      }
    ]
  }
}
```

### Notification Hook for Long Tasks

Play a sound when Claude sends a notification:

```json
{
  "hooks": {
    "notification": [
      {
        "command": "afplay /System/Library/Sounds/Glass.aiff"
      }
    ]
  }
}
```

## Managing Hooks

### Adding Hooks

You can edit settings.json directly or use the `update-config` skill if available. When editing manually:

1. Open the appropriate settings.json file
2. Add the hook configuration under the `"hooks"` key
3. Save the file — changes take effect in new sessions

### Environment Variables

Hook commands can access environment variables provided by Claude Code:

- `$CLAUDE_FILE_PATH` — the file being operated on
- Other context-specific variables depending on the hook type

## Choosing the Right Settings File

- **Global** (`~/.claude/settings.json`): Hooks you want everywhere (e.g., notification sounds)
- **Project** (`.claude/settings.json`): Team-shared hooks (e.g., formatting, linting)
- **Local** (`.claude/settings.local.json`): Personal project hooks (e.g., custom alerts)

## Key Takeaways

- Hooks are configured in settings.json at global, project, or local level
- Each hook specifies an optional matcher (tool name, pattern) and a command
- Hook commands run in the shell and their output is fed back to Claude
- Use project settings for team-shared hooks and local settings for personal ones
- Changes to settings.json take effect in new Claude Code sessions
