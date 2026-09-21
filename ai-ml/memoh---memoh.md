# Deploy memoh on Railway

Every agent gets its own computer, desktop, network, and long-term memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memoh)

## About

Memoh is an open-source, multi-member AI agent platform for building and operating persistent bots. It combines a Vue web console, Go agent runtime, PostgreSQL-backed memory, provider configuration, channel integrations, and isolated workspaces. This Railway deployment provides a ready-to-use browser interface while keeping application data and credentials under your project's control.

Railway runs Memoh as Docker image services with a public web entrypoint, a private Go server, and persistent PostgreSQL services. Railway private networking connects the web proxy to the server, while generated variables provide secure initial credentials and service-to-service database wiring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18.6-alpine` | Database |
| server | `xiaosong233/memoh-railway:latest` | Database |
| pgvector | `pgvector/pgvector:0.8.6-pg18` | Database |
| web | `memohai/web:0.20.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres | memoh |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `TZ` | server | UTC |
| `PORT` | server | 8082 |
| `JWT_SECRET` | server | (secret) |
| `ADMIN_EMAIL` | server | admin@memoh.local |
| `CONFIG_PATH` | server | /app/config.toml |
| `POSTGRES_DB` | server | memoh |
| `POSTGRES_HOST` | server | postgres.railway.internal |
| `POSTGRES_PORT` | server | 5432 |
| `POSTGRES_USER` | server | (secret) |
| `ADMIN_PASSWORD` | server | (secret) |
| `ADMIN_USERNAME` | server | (secret) |
| `MEMOH_JWT_SECRET` | server | (secret) |
| `MEMOH_ADMIN_EMAIL` | server | admin@memoh.local |
| `POSTGRES_PASSWORD` | server | (secret) |
| `MEMOH_PGVECTOR_PORT` | server | 5432 |
| `MEMOH_PGVECTOR_USER` | server | (secret) |
| `MEMOH_POSTGRES_PORT` | server | 5432 |
| `MEMOH_POSTGRES_USER` | server | (secret) |
| `MEMOH_ADMIN_PASSWORD` | server | (secret) |
| `MEMOH_ADMIN_USERNAME` | server | (secret) |
| `MEMOH_SERVER_UPSTREAM` | server | 127.0.0.1:8080 |
| `MEMOH_CHANNEL_UPSTREAM` | server | 127.0.0.1:8081 |
| `MEMOH_PGVECTOR_ENABLED` | server | true |
| `MEMOH_PGVECTOR_PASSWORD` | server | (secret) |
| `MEMOH_POSTGRES_PASSWORD` | server | (secret) |
| `MEMOH_WEBHOOK_TUNNEL_MODE` | server | disabled |
| `MEMOH_AGENT_CREDENTIALS_ENCRYPTION_KEY` | server | (secret) |
| `POSTGRES_DB` | pgvector | memoh_vector |
| `POSTGRES_USER` | pgvector | (secret) |
| `POSTGRES_PASSWORD` | pgvector | (secret) |
| `PORT` | web | 8082 |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Volume:** `/opt/memoh/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/memoh)
