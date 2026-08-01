# Deploy Swetrix Admin MCP on Railway

MCP server for the Swetrix Admin API - manage projects, funnels & orgs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swetrix-admin-mcp)

## About

Swetrix Admin MCP is a remote [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the Swetrix Admin API as 34 tools for managing projects, funnels, annotations, views and organisations — so an AI assistant like Claude can create, update, and organise your Swetrix workspace on your behalf.

This template builds the `swetrix-admin-mcp-server` package from the [kieksme/mcp-swetrix](https://github.com/kieksme/mcp-swetrix) monorepo and runs it in Streamable HTTP mode, listening on port 3000 behind a public Railway domain. At deploy time you'll be asked for your `SWETRIX_API_KEY` (from Swetrix → Account Settings → API keys); a random `MCP_HTTP_AUTH_TOKEN` bearer token is generated automatically to protect the `/mcp` endpoint from unauthenticated access. Once it's live, point any MCP-compatible client — Claude Desktop, Claude Code, or another agent — at `https:///mcp` with that bearer token to start managing your Swetrix account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-swetrix | [kieksme/mcp-swetrix](https://github.com/kieksme/mcp-swetrix) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SWETRIX_API_KEY` | (secret) | Your Swetrix API key (Account Settings -> API). Required to manage projects, funnels & organisations. |
| `MCP_HTTP_AUTH_TOKEN` | (secret) | Bearer token clients must send to authenticate against this MCP server's HTTP endpoint. Auto-generated. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/swetrix-admin-mcp)
