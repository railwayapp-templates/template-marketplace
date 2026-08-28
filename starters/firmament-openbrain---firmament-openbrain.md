# Deploy firmament-openbrain on Railway

Per-user AI memory server over MCP - memories follow users across tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firmament-openbrain)

## About

Open Brain is a per-user AI memory server over MCP (Model Context Protocol). Each team member gets a personal token URL; their memories are fully isolated and follow them across Claude Desktop, claude.ai, Claude Code, and Cursor.

One Node.js MCP service plus one Postgres database. The service auto-creates its schema on boot, exposes a streamable-HTTP MCP endpoint per user token, and an admin API for minting users. Search is Postgres full-text - no embedding API keys required. Source: https://github.com/tswic-highdesert/openbrain-railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openbrain | [tswic-highdesert/openbrain-railway](https://github.com/tswic-highdesert/openbrain-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ADMIN_TOKEN` | openbrain | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/firmament-openbrain)
