# Settings and Permissions Configuration

## Settings File Locations

Claude Code uses three settings files, each with a different scope:

| File | Scope | Commit to Git? |
|------|-------|----------------|
| `~/.claude/settings.json` | Global (all projects) | N/A (user home) |
| `.claude/settings.json` | Project (shared with team) | Yes |
| `.claude/settings.local.json` | Project (personal) | No |

Settings are merged in order: global < project < local. Local settings override project settings, which override global settings.

## Permission Modes

Permissions control which tools Claude can use without asking:

### Allowlist Pattern

Explicitly list allowed commands:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Bash(npx vitest *)",
      "Read",
      "Edit",
      "Write"
    ]
  }
}
```

### Deny Patterns

Block specific dangerous operations:

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  }
}
```

## Permission Scopes

Permissions operate at two levels:

- **Tool-level** — Allow or deny an entire tool (`"Read"`, `"Bash"`)
- **Pattern-level** — Allow or deny specific command patterns (`"Bash(npm run *)"`)

Pattern matching uses glob syntax. The `*` wildcard matches any arguments.

## Environment Variables

Set environment variables available to Claude's Bash commands:

```json
{
  "env": {
    "NODE_ENV": "development",
    "DATABASE_URL": "postgresql://localhost:5432/dev"
  }
}
```

Sensitive values should go in `.claude/settings.local.json` (not committed to git).

## Model Selection

Configure the default model:

```json
{
  "model": "claude-sonnet-4-20250514"
}
```

This can be overridden per-session with command-line flags.

## MCP Server Configuration

MCP servers are also configured in settings files (covered in Module 012):

```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "node",
      "args": ["./server.js"]
    }
  }
}
```

## Security Best Practices

- **Never commit** `.claude/settings.local.json` — add it to `.gitignore`
- **Never store secrets** in `.claude/settings.json` (it gets committed)
- Use environment variable references (`${VAR}`) for sensitive values
- Review project settings before committing — ensure no credentials leaked
- Use deny patterns for destructive operations the team should never auto-approve

## Updating Settings

You can modify settings by:

1. Editing the JSON files directly
2. Using Claude's built-in configuration commands
3. Changes take effect on the next conversation (restart required)

## Key Takeaways

- Three settings files: global, project (shared), local (personal)
- Permissions use allowlist/denylist with glob patterns
- Pattern-level permissions give fine-grained control over Bash commands
- Never commit `.claude/settings.local.json` — it contains personal preferences
- Use environment variable references for sensitive values
