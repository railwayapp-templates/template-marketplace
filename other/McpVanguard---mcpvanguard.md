# Deploy McpVanguard on Railway

Open-source MCP security gateway for routed tool calls.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcpvanguard)

## About

McpVanguard is an open-source security gateway for the Model Context Protocol (MCP). It sits between AI agents and MCP tool servers, inspects routed tool calls before execution, and applies configurable policy before requests reach the upstream server.

Hosting McpVanguard on Railway lets you expose an MCP gateway over a public HTTPS endpoint while keeping policy enforcement in front of your upstream MCP server.

In a typical deployment, Railway runs the McpVanguard SSE gateway as the public entrypoint. McpVanguard then launches or connects to the MCP-compatible upstream server configured by `MCP_SERVER_COMMAND`.

Railway handles public networking and TLS. McpVanguard adds MCP tool-call inspection, API-key authentication, configurable profiles, deterministic rules, safe-zone checks, metadata inspection, behavioral signals, and structured audit logs for routed MCP traffic.

McpVanguard is not an OS sandbox and does not secure traffic that bypasses the gateway. For production use, route the relevant MCP workflow through McpVanguard, configure a long random API key, restrict the upstream server command, and tune safe zones for the tools being protected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| McpVanguard | [provnai/McpVanguard](https://github.com/provnai/McpVanguard) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VEX_API_KEY` | (secret) |
| `VANGUARD_API_KEY	` | (secret) |

## Configuration

- **Start command:** `python -m core.cli sse --server "$MCP_SERVER_COMMAND" --behavioral`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/deploy/mcpvanguard)
