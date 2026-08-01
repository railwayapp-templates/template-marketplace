# Deploy Swetrix Statistics MCP on Railway

MCP server for the Swetrix Statistics API - read-only analytics queries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swetrix-statistics-mcp)

## About

Swetrix Statistics MCP is a remote [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the Swetrix Statistics API as 34 read-only tools — traffic, performance, funnels, errors, goals, visitor profiles and filters — so an AI assistant like Claude can answer questions about your website analytics directly, without you writing a single query.

This template builds the `swetrix-statistics-mcp-server` package from the [kieksme/mcp-swetrix](https://github.com/kieksme/mcp-swetrix) monorepo and runs it in Streamable HTTP mode, listening on port 3000 behind a public Railway domain. At deploy time you'll be asked for your `SWETRIX_API_KEY` (from Swetrix → Account Settings → API keys); a random `MCP_HTTP_AUTH_TOKEN` bearer token is generated automatically to protect the `/mcp` endpoint from unauthenticated access. Once it's live, point any MCP-compatible client — Claude Desktop, Claude Code, or another agent — at `https:///mcp` with that bearer token to start querying your Swetrix data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-swetrix | [kieksme/mcp-swetrix](https://github.com/kieksme/mcp-swetrix) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SWETRIX_API_KEY` | (secret) | Your Swetrix API key (Account Settings -> API). Required to authenticate statistics queries. |
| `MCP_HTTP_AUTH_TOKEN` | (secret) | Bearer token clients must send to authenticate against this MCP server's HTTP endpoint. Auto-generated. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/swetrix-statistics-mcp)
