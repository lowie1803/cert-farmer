# Using MCP Tools in Practice

## How MCP Tools Appear

MCP tools are listed as **deferred tools** — they are available but not fully loaded until needed. You will see them in the conversation context:

```xml
<available-deferred-tools>
WebSearch
WebFetch
DatabaseQuery
CustomAnalyzer
</available-deferred-tools>
```

These tool names are visible to Claude, but their full schemas (parameters, descriptions) are not yet loaded.

## Fetching Tool Schemas with ToolSearch

Before calling an MCP tool, Claude must fetch its schema using `ToolSearch`:

```
ToolSearch(query: "select:WebFetch", max_results: 1)
```

This returns the tool's complete JSON Schema definition, including:

- Tool description
- Required and optional parameters
- Parameter types and constraints

Once fetched, the tool is callable exactly like a built-in tool.

### Search Strategies

| Query Format | Use Case | Example |
|-------------|----------|---------|
| `select:ToolName` | Fetch a specific tool by exact name | `select:WebFetch` |
| `select:Tool1,Tool2` | Fetch multiple tools at once | `select:WebSearch,WebFetch` |
| `keyword search` | Find tools by description | `database query` |
| `+prefix keyword` | Require prefix in name, rank by keyword | `+slack send` |

## Tool Parameters Follow JSON Schema

MCP tool parameters use standard JSON Schema. When calling a tool, structure parameters as JSON:

```json
{
  "url": "https://example.com/api/data",
  "method": "GET",
  "headers": {
    "Accept": "application/json"
  }
}
```

Array and object parameters must be valid JSON — not strings or shorthand.

## Combining MCP Tools with Built-in Tools

MCP tools work alongside built-in tools. A typical workflow might combine both:

1. **Grep** (built-in) — Find relevant code patterns
2. **DatabaseQuery** (MCP) — Check database schema
3. **Read** (built-in) — Read migration files
4. **Edit** (built-in) — Update code based on findings

Claude selects the best tool for each step, whether built-in or MCP-provided.

## Common MCP Tool Patterns

### Database Queries

```
DatabaseQuery(query: "SELECT * FROM users WHERE created_at > '2024-01-01' LIMIT 10")
```

Use for: checking data, verifying migrations, debugging data issues.

### API Calls

```
WebFetch(url: "https://api.example.com/status", method: "GET")
```

Use for: checking service health, fetching configuration, calling external APIs.

### Remote File Operations

```
RemoteFS(operation: "read", path: "/var/log/app.log", lines: 50)
```

Use for: reading logs on remote servers, checking deployed configurations.

## Security Considerations

MCP tools can access external systems, so security awareness is critical:

- **Data sensitivity** — MCP tools may read/write production data; be cautious with queries
- **Authentication** — Tokens and credentials are configured in env vars; never hardcode them
- **Network access** — SSE servers communicate over the network; ensure encrypted connections
- **Permission scope** — Each MCP server should have minimal required permissions
- **Audit trail** — MCP tool calls appear in conversation history for review

### What Claude Will NOT Do

- Call MCP tools without user awareness (tools require permission)
- Send credentials in tool parameters (credentials live in server config)
- Bypass permission prompts for MCP tools

## Key Takeaways

- MCP tools appear as deferred tools and must be fetched with `ToolSearch` before use
- Use `select:ToolName` for exact tool fetching or keywords for discovery
- Tool parameters follow JSON Schema — use proper JSON for complex types
- MCP tools combine naturally with built-in tools in multi-step workflows
- Always consider security when using tools that access external systems
