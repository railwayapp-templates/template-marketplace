# Deploy MCP-Meta Ads on Railway

Deploy and Host MCP-Meta Ads with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcp-meta-ads)

## About

A Model Context Protocol (MCP) server for the Meta Marketing API. Exposes 60+ tools that let AI agents query 650+ scraped Meta Ads documentation files locally and execute Facebook/Instagram ad operations: campaigns, ad sets, ads, creatives, audiences, insights, Advantage+ Creative and value rules, all from a single remote MCP endpoint.

Hosting on Railway runs the MCP server in HTTP/Streamable mode (`node dist/index.js --http --port $PORT`) so any MCP-compatible client can connect over the network instead of stdio. Railway's Nixpacks builder handles `npm install && npm run build` automatically, and the runtime serves the MCP protocol on the assigned port. Provide `META_ACCESS_TOKEN` to unlock the 60+ Graph API tools; without it, the documentation tools still work. For multi-tenant deployments, attach a Railway PostgreSQL plugin and set `DATABASE_URL` + `MCP_ENCRYPTION_KEY` to enable per-user OAuth sessions and encrypted token storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| faceads-mcp | [yvfl/faceads-mcp](https://github.com/yvfl/faceads-mcp) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mcp-meta-ads)
