# Deploy Open Collective MCP on Railway

MCP server for managing Open Collective pages via AI assistants.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-collective-mcp)

## About

Open Collective MCP is a Model Context Protocol server that lets AI assistants manage Open Collective pages through natural language. It connects to the Open Collective GraphQL API v2, enabling any MCP-compatible client — Claude Code, OpenCode, and others — to read and modify collective data on your behalf.

Hosting Open Collective MCP requires a Node.js environment and two credentials: an Open Collective Personal Token (with all scopes enabled) and an API key for client authentication. The server runs Express with Streamable HTTP transport, creating a fresh MCP session per connection. Railway handles the build (TypeScript compilation via `tsc`) and sets the PORT automatically. Once deployed, point your MCP client to `https:///mcp` with a Bearer token header — the server authenticates requests and proxies them to the Open Collective API using your Personal Token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-collective-mcp | [Citizen-Infra/open-collective-mcp](https://github.com/Citizen-Infra/open-collective-mcp) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |
| `OPEN_COLLECTIVE_TOKEN` | (secret) |

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/open-collective-mcp)
