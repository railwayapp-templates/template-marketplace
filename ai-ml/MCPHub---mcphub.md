# Deploy MCPHub on Railway

MCPHub 1.0: one endpoint and dashboard for all your MCP servers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcphub)

## About

MCPHub is a hub for Model Context Protocol servers. It runs and manages many MCP servers, stdio or remote, from one dashboard and exposes them through a single Streamable HTTP or SSE endpoint, with groups, per-server routes, smart tool routing, bearer keys and users. AI clients connect once instead of configuring every server.

This template runs the official `samanhappy/mcphub:1.0.40` image as one service. The bootstrap `admin` user gets a generated `ADMIN_PASSWORD` (the upstream default `admin123` does not work), the dashboard API needs a login, and the MCP endpoints need a bearer key you create in the dashboard. Server settings, users and keys are stored in `mcp_settings.json` on a Railway volume at `/app/data`, so they survive redeploys. Stdio servers are started with `npx` or `uvx` inside the container, so they share its CPU and memory. It fits the Hobby plan for a handful of servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcphub | `samanhappy/mcphub:1.0.40` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `JWT_SECRET` | (secret) |
| `TRUST_PROXY` | 1 |
| `ADMIN_PASSWORD` | (secret) |
| `MCPHUB_SETTING_PATH` | /app/data/mcp_settings.json |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mcphub)
