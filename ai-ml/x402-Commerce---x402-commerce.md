# Deploy x402 Commerce on Railway

Agent-to-Agent Micropayment Infrastructure with x402 v2 and MCP server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/x402-commerce)

## About

Agent-to-Agent Micropayment Infrastructure with x402 v2 payment protocol, monetized MCP server, and observability stack.

Deploy a complete monetized Model Context Protocol (MCP) server + observability stack with x402 v2 payment protocol, 30+ monetized agent tools, USDC settlement on Base, and real-time telemetry.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| x402-mcp | [Disseveru/x402-mcp](https://github.com/Disseveru/x402-mcp) | Web service |
| Redis-WvMX | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `GEMINI_API_KEY` | x402-mcp | (secret) |
| `X402_SECRET_KEY` | x402-mcp | (secret) |
| `REDISPASSWORD` | Redis-WvMX | (secret) |
| `REDIS_PASSWORD` | Redis-WvMX | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node dist/mcp/server.js`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/x402-commerce)
