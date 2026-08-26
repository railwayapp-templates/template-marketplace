# Deploy TrueForge on Railway

Self-host TrueForge with protected UI, PostgreSQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trueforge)

## About

TrueForge is an open-source agent harness for model calls, MCP tools, skills, sandboxing, approvals and persistent agent sessions.

This community template deploys the hosted TrueForge topology with no required input:

- **Proxy** - public Caddy endpoint with Railway-generated Basic Auth credentials
- **TrueForge** - private hosted-mode application service
- **Postgres** - private durable system of record with a persistent volume
- **Redis** - private executor-peering service with AOF persistence

Only Proxy receives a public Railway domain. TrueForge, Postgres and Redis remain on Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:7-alpine` | Database |
| TrueForge | [just-deploy-it/trueforge-railway](https://github.com/just-deploy-it/trueforge-railway) | Worker |
| Proxy | `caddy:2-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | trueforge |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDIS_PORT` | TrueForge | 6379 |
| `POSTGRES_USER` | TrueForge | (secret) |
| `POSTGRES_PASSWORD` | TrueForge | (secret) |
| `PORT` | Proxy | 8080 |
| `BASIC_AUTH_PASSWORD` | Proxy | (secret) |
| `BASIC_AUTH_USERNAME` | Proxy | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `redis-server --appendonly yes`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c 'HASH="$(caddy hash-password --plaintext "$BASIC_AUTH_PASSWORD")"; printf ":${PORT} {\n  @health path /proxy-healthz\n  respond @health \"OK\" 200\n  basic_auth {\n    ${BASIC_AUTH_USERNAME} ${HASH}\n  }\n  reverse_proxy http://${UPSTREAM_HOST}:${UPSTREAM_PORT}\n}\n" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/trueforge)
