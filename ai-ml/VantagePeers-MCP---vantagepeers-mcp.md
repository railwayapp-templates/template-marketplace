# Deploy VantagePeers MCP on Railway

AI agent coordination: memory, messaging, tasks, knowledge. + OAuth 2.1.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vantagepeers-mcp)

## About

*Maintained by VantageOS. Last reviewed: 2026-05-08.*

VantagePeers gives your AI agents a shared brain. In under 10 minutes you get a self-hosted MCP server backed by Convex with 82 tools covering memory, tasks, missions, messaging, issue tracking, fix patterns, and more — deployed to Railway with one click, reachable by any MCP-compatible client.

Every new LLM session resets context — decisions from yesterday, fix patterns from last week, tasks assigned to another agent, all gone. VantagePeers keeps that state outside the LLM and makes it queryable from any session, on any machine. Replaces Redis-backed task queues, per-session memory files, and ad-hoc agent state JSON with a single hosted backend. No per-query quotas (Convex free and Pro tiers), EU/EUR-primary billing, namespace isolation so projects share one deployment without data bleed. FSL-1.1-Apache-2.0 license — self-host the data, own the deployment.

VantagePeers v2.2.0 (2026-05-08) has two layers: a Convex backend (20 tables, vector indexes, BM25 text search, hybrid RRF fusion, 1536-dim embeddings via `text-embedding-3-small`) and a stateless MCP server (`vantage-peers-mcp` v2.2.0) translating tool calls into Convex queries. Mode A (stdio) for local clients; Mode B (HTTP SSE) for remote clients — what this Railway template deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vantage-peers | [vantageos-agency/vantage-peers](https://github.com/vantageos-agency/vantage-peers) (root: /mcp-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | Node.js runtime mode. Set to "production" for self-host deploy. Use "development" only for local debugging. |
| `CONVEX_URL_INTERNAL` | - | Convex deployment URL (full https:// URL ending in .convex.cloud). The MCP server uses this to call your Convex backend. Find it in your Convex dashboard → Settings → URL. |
| `BEARER_SECRET_MASTER` | (secret) | Master bearer token securing MCP server HTTP endpoints. Generate a 32+ character random secret (e.g. openssl rand -hex 32). Required to authenticate Claude Code clients connecting in Mode B HTTP. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Python, Shell

[View on Railway →](https://railway.com/deploy/vantagepeers-mcp)
