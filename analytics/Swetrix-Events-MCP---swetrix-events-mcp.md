# Deploy Swetrix Events MCP on Railway

MCP server for the Swetrix Events API - tracking pageviews & custom events.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swetrix-events-mcp)

## About

Swetrix Events MCP is a remote [Model Context Protocol](https://modelcontextprotocol.io) server that lets an AI assistant send tracking data straight into Swetrix — pageviews, custom events, heartbeats, error events, and revenue — using 5 purpose-built tools, without you writing any tracking code by hand.

This template builds the `swetrix-events-mcp-server` package from the [kieksme/mcp-swetrix](https://github.com/kieksme/mcp-swetrix) monorepo and runs it in Streamable HTTP mode, listening on port 3000 behind a public Railway domain. A random `MCP_HTTP_AUTH_TOKEN` bearer token is generated automatically at deploy time to protect the `/mcp` endpoint; `SWETRIX_API_KEY` is optional and only needed if you plan to use the revenue-tracking tool. Once it's live, point any MCP-compatible client — Claude Desktop, Claude Code, or another agent — at `https:///mcp` with that bearer token to start sending events.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-swetrix | [kieksme/mcp-swetrix](https://github.com/kieksme/mcp-swetrix) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SWETRIX_API_KEY` | (secret) | Your Swetrix API key. Only required for the revenue-tracking tool; other event tools work without it. |
| `MCP_HTTP_AUTH_TOKEN` | (secret) | Bearer token clients must send to authenticate against this MCP server's HTTP endpoint. Auto-generated. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/swetrix-events-mcp)
