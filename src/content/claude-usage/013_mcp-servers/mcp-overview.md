# Model Context Protocol (MCP) Overview

## What Is MCP?

The **Model Context Protocol (MCP)** is an open standard that extends Claude's capabilities by connecting it to external tools and services. Instead of being limited to built-in tools, MCP lets Claude interact with databases, APIs, cloud platforms, and virtually any external system.

MCP follows a client-server architecture:

| Component | Role | Example |
|-----------|------|---------|
| MCP Client | Sends requests to MCP servers | Claude Code |
| MCP Server | Exposes tools and resources | A database connector |
| External Service | The actual system being accessed | PostgreSQL, GitHub API |

## Why MCP Matters

Without MCP, Claude is limited to its built-in tools (Read, Edit, Bash, Grep, etc.). MCP removes this limitation by allowing **any developer** to create new tools that Claude can use.

Key benefits:

- **Extensibility** — Add capabilities without modifying Claude itself
- **Standardization** — One protocol for all integrations (no custom adapters)
- **Composability** — Combine multiple MCP servers for complex workflows
- **Security** — Each server has defined permissions and boundaries

## How Tool Discovery Works

MCP tools appear automatically in Claude's context through a deferred loading mechanism:

1. MCP servers register their available tools at startup
2. Tool names appear in `<available-deferred-tools>` messages
3. Claude uses `ToolSearch` to fetch full tool schemas when needed
4. Once fetched, tools are callable like any built-in tool

```
<available-deferred-tools>
WebSearch
WebFetch
DatabaseQuery
CustomAnalyzer
</available-deferred-tools>
```

Claude does **not** need to know about MCP tools in advance — discovery is automatic.

## MCP Architecture in Detail

```
Claude Code (MCP Client)
    │
    ├── Built-in Tools (Read, Edit, Bash, Grep, Glob)
    │
    └── MCP Tools (dynamically discovered)
         │
         ├── MCP Server A (filesystem) ──► Local file system
         ├── MCP Server B (database)   ──► PostgreSQL
         └── MCP Server C (api)        ──► REST API endpoint
```

Each MCP server runs as a separate process. Claude communicates with servers through the MCP protocol, and each server translates requests into operations on its target system.

## What MCP Enables

Common integration categories:

- **Databases** — Query and modify data in SQL/NoSQL databases
- **APIs** — Call REST/GraphQL endpoints with proper authentication
- **Cloud Services** — Manage AWS, GCP, Azure resources
- **File Systems** — Access remote or restricted file systems
- **Development Tools** — Integrate with CI/CD, issue trackers, monitoring
- **Custom Business Logic** — Domain-specific operations unique to your organization

## Key Takeaways

- MCP is a protocol, not a specific tool — it defines how Claude connects to external services
- MCP servers expose tools that Claude discovers automatically
- The architecture is client-server: Claude Code (client) talks to MCP servers
- MCP tools appear alongside built-in tools and are used the same way
- Tool discovery happens through deferred tools and `ToolSearch`
