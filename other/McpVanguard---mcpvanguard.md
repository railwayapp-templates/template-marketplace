# Deploy McpVanguard on Railway

MCP security proxy — blocks prompt injection & attacks instantly.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcpvanguard)

## About

McpVanguard is a security proxy for the Model Context Protocol (MCP).  
It sits between AI agents and system tools and applies three layers of inspection:

- Static threat signatures  
- Semantic intent scoring (LLM-based)  
- Behavioral / entropy-based throttling  

---

Deploying McpVanguard on Railway allows you to expose MCP tools securely over the internet.

Using the SSE (Server-Sent Events) bridge:

- Remote agents connect through an authenticated endpoint  
- TLS is handled automatically by Railway  
- Redis can be attached for persistent session and rate-limit state  

This setup allows the proxy to run continuously with minimal infrastructure overhead.

---

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
