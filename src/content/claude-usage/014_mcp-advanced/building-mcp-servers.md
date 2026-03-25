# Building Custom MCP Servers

## Why Build Custom Servers?

While community MCP servers cover common use cases (databases, file systems, APIs), you may need custom servers for:

- Domain-specific business logic
- Internal APIs with custom authentication
- Specialized data processing pipelines
- Proprietary system integrations

## MCP Server SDKs

Official SDKs are available in two languages:

| SDK | Language | Package |
|-----|----------|---------|
| TypeScript | Node.js | `@modelcontextprotocol/sdk` |
| Python | Python 3.10+ | `mcp` |

Both SDKs provide the same core abstractions: server lifecycle, tool registration, and request handling.

## Defining Tools with JSON Schema

Each tool must declare its parameters using JSON Schema:

```typescript
server.tool(
  "calculate",
  "Perform arithmetic calculations",
  {
    operation: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
    a: { type: "number", description: "First operand" },
    b: { type: "number", description: "Second operand" }
  },
  async ({ operation, a, b }) => {
    // handler implementation
  }
);
```

Good tool definitions include:

- **Clear name** — Verb-noun format (`query-database`, `send-email`)
- **Descriptive description** — What the tool does and when to use it
- **Typed parameters** — Proper types, enums for fixed values, descriptions for each parameter

## Tool Handler Implementation

Handlers receive validated parameters and return results:

```typescript
async ({ operation, a, b }) => {
  let result;
  switch (operation) {
    case "add": result = a + b; break;
    case "subtract": result = a - b; break;
    case "multiply": result = a * b; break;
    case "divide":
      if (b === 0) return { content: [{ type: "text", text: "Error: Division by zero" }] };
      result = a / b;
      break;
  }
  return { content: [{ type: "text", text: `Result: ${result}` }] };
}
```

Return values use a content array with typed entries (`text`, `image`, `resource`).

## Server Lifecycle

1. **Initialization** — Server starts, registers tools and resources
2. **Connection** — Client (Claude Code) connects via stdio or SSE
3. **Discovery** — Client requests list of available tools
4. **Execution** — Client sends tool calls, server processes and returns results
5. **Shutdown** — Server cleans up resources on disconnect

## Example: Database Query Server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import pg from "pg";

const server = new McpServer({ name: "postgres-query", version: "1.0.0" });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

server.tool(
  "query",
  "Execute a read-only SQL query",
  { sql: { type: "string", description: "SQL SELECT query" } },
  async ({ sql }) => {
    if (!sql.trim().toUpperCase().startsWith("SELECT")) {
      return { content: [{ type: "text", text: "Error: Only SELECT queries allowed" }] };
    }
    const result = await pool.query(sql);
    return { content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Testing Locally

1. Run the server directly: `node my-server.js`
2. Add to Claude Code settings with `stdio` transport
3. Start a new conversation and verify tool discovery
4. Call the tool with test parameters

## Best Practices

- **Clear descriptions** — Claude uses descriptions to decide when to use a tool
- **Input validation** — Validate all parameters before processing
- **Error handling** — Return descriptive error messages, never crash the server
- **Minimal permissions** — Only expose operations that are needed
- **Idempotency** — Where possible, make tools safe to call multiple times
- **Logging** — Log to stderr (stdout is reserved for MCP protocol messages in stdio mode)
