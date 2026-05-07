# Deploy McpVanguard on Railway

MCP security proxy — blocks prompt injection & attacks instantly.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcpvanguard)

## About

McpVanguard is a security gateway for the Model Context Protocol (MCP). It sits between AI agents and MCP tools, enforcing layered protection with static threat detection, optional semantic intent scoring, behavioral session controls, metadata inspection, and upstream trust checks such as capability and integrity verification.

Hosting McpVanguard on Railway lets you expose MCP tools over a secure network endpoint while keeping policy enforcement in front of your upstream server. In a typical deployment, Railway runs the McpVanguard SSE gateway as the public entrypoint and McpVanguard launches or connects to an MCP-compatible upstream server behind it. Railway handles public networking and TLS, while McpVanguard adds request inspection, auth enforcement, filesystem and tool restrictions, metadata poisoning defenses, and structured security decisions. Redis can be attached for behavioral state, rate limiting, and session-aware enforcement across multiple requests.

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
