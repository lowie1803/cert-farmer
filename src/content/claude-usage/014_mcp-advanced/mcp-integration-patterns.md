# MCP Integration Patterns

## Combining MCP with Skills

Skills and MCP servers complement each other. Skills provide **instructions** (what to do), while MCP servers provide **tools** (how to do it).

A skill's `SKILL.md` can reference MCP tools:

```markdown
# Deploy Skill
When deploying, use the `cloud-deploy` MCP tool to push to staging.
Always run the `health-check` MCP tool after deployment.
```

This pattern lets you build sophisticated workflows where Claude follows skill instructions and uses MCP tools to execute them.

## MCP for Team Workflows

Shared MCP servers standardize team operations:

- **Database access** — One server with read-only access for all developers
- **Deployment** — Standardized deploy tool with guardrails built in
- **Documentation** — Query internal wikis and knowledge bases
- **Issue tracking** — Create and update tickets from Claude conversations

Configure shared servers in `.claude/settings.json` (committed to repo) so every team member gets the same tools.

## Security Patterns

### Authentication

- Store tokens in environment variables, never in settings files
- Use short-lived tokens where possible
- Rotate credentials regularly

### Authorization

- Implement role-based access in the MCP server itself
- Restrict operations (e.g., read-only database access)
- Validate inputs to prevent injection attacks

### Audit Logging

```typescript
server.tool("query", "...", schema, async (params) => {
  console.error(`[AUDIT] query called: ${JSON.stringify(params)}`);
  // ... execute query
});
```

Log all tool invocations with parameters for security review. Use stderr for logs in stdio servers.

## Multi-Server Setups

Run multiple MCP servers for different domains:

```json
{
  "mcpServers": {
    "database": {
      "type": "stdio",
      "command": "node",
      "args": ["./mcp/db-server.js"]
    },
    "cloud": {
      "type": "sse",
      "url": "https://mcp.internal.example.com/cloud"
    },
    "analytics": {
      "type": "stdio",
      "command": "python",
      "args": ["./mcp/analytics-server.py"]
    }
  }
}
```

Each server has its own tools, permissions, and lifecycle. Claude discovers tools from all servers and uses them together.

## MCP + Hooks

Hooks can trigger operations that complement MCP workflows:

- **Pre-commit hook** — Validate data with MCP database tool before committing
- **Post-save hook** — Sync changes to external system via MCP
- **Notification hook** — Send alerts through MCP communication tools

Example: a post-commit hook that updates a project tracker via MCP.

## Performance Considerations

| Factor | Local (stdio) | Remote (SSE) |
|--------|---------------|--------------|
| Startup time | Fast (process spawn) | Depends on network |
| Latency per call | Very low (IPC) | Network round-trip |
| Reliability | Tied to local machine | Depends on server uptime |
| Scalability | Single user | Multi-user capable |

### Caching Strategies

- Cache frequently accessed data in the MCP server process
- Use TTL-based cache invalidation for dynamic data
- Return cached results with staleness indicators

## Anti-Patterns to Avoid

- **Over-relying on MCP** for operations Bash can handle (e.g., `ls`, `cat`)
- **Exposing sensitive endpoints** without authentication or input validation
- **Building monolithic servers** — prefer small, focused servers per domain
- **Ignoring errors** — always handle failures gracefully and return clear messages
- **Logging to stdout** in stdio servers — stdout is reserved for MCP protocol
- **Skipping input validation** — never trust parameters without checking

## Key Takeaways

- Skills provide instructions, MCP provides tools — combine them for powerful workflows
- Share MCP servers via project settings for team-wide consistency
- Implement authentication, authorization, and audit logging for security
- Use multiple focused servers rather than one monolithic server
- Consider latency differences between local (stdio) and remote (SSE) servers
