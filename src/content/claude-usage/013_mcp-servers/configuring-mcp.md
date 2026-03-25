# Configuring MCP Servers

## Configuration Locations

MCP servers are configured in settings files at two levels:

| Level | File | Scope |
|-------|------|-------|
| Global | `~/.claude/settings.json` | All projects on this machine |
| Project | `.claude/settings.json` | This project only |

Project-level configuration is preferred — it keeps MCP servers relevant to the codebase and can be shared with the team via version control.

## Server Types

MCP supports two transport types:

### stdio (Local Process)

The MCP server runs as a **local child process**. Claude Code starts it, communicates via stdin/stdout.

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"],
      "env": {}
    }
  }
}
```

Best for: local tools, development servers, file system access.

### SSE (Remote Server)

The MCP server runs as a **remote HTTP service**. Claude Code connects via Server-Sent Events.

```json
{
  "mcpServers": {
    "remote-api": {
      "type": "sse",
      "url": "https://mcp.example.com/sse",
      "headers": {
        "Authorization": "Bearer ${MCP_API_TOKEN}"
      }
    }
  }
}
```

Best for: shared team servers, cloud-hosted services, production integrations.

## Configuration Format

Each MCP server entry requires:

- **Server name** — A unique identifier (used in logs and tool prefixes)
- **command** — The executable to run (for stdio servers)
- **args** — Command-line arguments passed to the server
- **env** — Environment variables available to the server process

## Example Configurations

### Database Server

```json
{
  "mcpServers": {
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"],
      "env": {
        "DB_PASSWORD": "${POSTGRES_PASSWORD}"
      }
    }
  }
}
```

### API Server

```json
{
  "mcpServers": {
    "github-api": {
      "type": "stdio",
      "command": "node",
      "args": ["./mcp-servers/github-server.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Testing MCP Connections

After configuring a server, verify it works:

1. Start a new Claude Code conversation (MCP servers load at startup)
2. Check that the server's tools appear in `<available-deferred-tools>`
3. Use `ToolSearch` to fetch a tool schema
4. Call a simple tool to verify end-to-end connectivity

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Server not starting | Wrong command or missing dependency | Run the command manually to check |
| Tools not appearing | Server crashed on startup | Check server logs for errors |
| Connection refused (SSE) | Wrong URL or server not running | Verify the URL and server status |
| Environment variable empty | Variable not set in shell | Export the variable before starting Claude Code |
| Permission denied | Server binary not executable | Run `chmod +x` on the server binary |

## Key Takeaways

- Configure MCP servers in `settings.json` (global or project level)
- Use `stdio` for local servers and `sse` for remote servers
- Environment variables can reference shell variables with `${VAR}` syntax
- Always test connections by checking tool discovery in a new conversation
