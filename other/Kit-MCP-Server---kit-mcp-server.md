# Deploy Kit MCP Server on Railway

Self-hosted Kit MCP server to manage your account

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-mcp-server)

## About

Kit MCP Server is an open-source MCP server that connects your Kit account to any AI assistant. Give Claude or another MCP client the ability to manage subscribers, draft broadcasts, and build sequences without leaving the conversation.

Hosting Kit MCP Server on Railway gives you a persistent, always-on endpoint your AI clients can connect to. You bring your Kit API key, Railway handles the rest. The server runs as a Node.js process, listens for MCP connections over HTTP, and routes tool calls directly to the Kit REST API. No database, no queue, no background workers. One service, one env var, and you have a personal Kit automation layer that any MCP-compatible client can talk to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kit-mcp | [Benanna2019/kit-mcp](https://github.com/Benanna2019/kit-mcp) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KIT_API_KEY` | (secret) | Get your Kit API key from the developer dashboard within Kit at https://app.kit.com/account_settings/developer_settings |

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/kit-mcp-server)
