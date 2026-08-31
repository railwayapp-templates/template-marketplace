# Deploy Toast MCP on Railway

Connect Claude to your Toast POS. Read-only, your credentials, 55 tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/toast-mcp)

## About

Toast MCP is an open-source MCP server that connects Claude (or any MCP client) to your Toast POS. 55 read-only tools for sales, labor, time entries, orders, menus, inventory, customers, and cash. Live-tested against production restaurants. Built by a restaurant operator, for restaurant operators. Full walkthrough at chriscusack.net.

This template deploys the server from github.com/prime-cost/toast-mcp and runs it in remote (streamable HTTP) mode. You supply three values from your own Toast standard API access: client ID, client secret, and restaurant GUID. A connector password (TOAST_MCP_SECRET) is generated automatically. After deploy, generate a public domain under Settings then Networking (port 3000), confirm https://YOUR-DOMAIN/health returns status ok, then add a custom connector in Claude with the URL https://YOUR-DOMAIN/YOUR-SECRET/mcp. Your credentials stay in your Railway project and the server talks to exactly one host: Toast's API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| toast-mcp | [prime-cost/toast-mcp](https://github.com/prime-cost/toast-mcp) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOAST_MCP_MODE` | http | Leave as http. This runs the server in remote mode so Claude can reach it. |
| `TOAST_CLIENT_ID` | - | Your Toast API client ID, from Toast Web: search API access, then Manage credentials. |
| `TOAST_MCP_SECRET` | (secret) | Auto-generated connector password. Leave as is. After deploy, your connector URL is https://YOUR-DOMAIN/THIS-VALUE/mcp |
| `TOAST_ENVIRONMENT` | production | Leave as production. |
| `TOAST_CLIENT_SECRET` | (secret) | Your Toast API client secret. Toast shows it once when you open your credential. Never share it. |
| `TOAST_RESTAURANT_GUID` | - | Your location's GUID. Log into Toast Web, press F12, open Application then Cookies, and copy the value of lastRestaurantGuid. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, HTML

[View on Railway →](https://railway.com/deploy/toast-mcp)
