# Deploy hevy-mcp-server on Railway

AI agents connect to Hevy workout tracking and history.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/hevy-mcp-server)

## About

hevy-mcp-server is an MCP (Model Context Protocol) server that connects AI agents to the Hevy workout tracking API. It exposes your workout history, exercises, and routines as tools that any MCP-compatible client can call — letting agents analyze your training data, log workouts, and track progress.

Deploying hevy-mcp-server requires a running server that can handle SSE (Server-Sent Events) connections from MCP clients. The server authenticates with the Hevy API using your API key, then exposes tools for reading workouts, exercises, and routines. Railway handles the hosting, SSL termination, and persistent uptime so your agents can connect at any time. No database required — the server proxies requests directly to Hevy's API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hevy-mcp-server | [meimakes/hevy-mcp-server](https://github.com/meimakes/hevy-mcp-server) | Worker |

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/hevy-mcp-server)
