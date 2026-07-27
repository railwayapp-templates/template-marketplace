# Deploy Evolution API WhatsApp on Railway

WhatsApp REST API with Postgres 17 and Redis 8, sessions survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-what-1)

## About

Evolution API is the open-source WhatsApp REST gateway: connect a WhatsApp number by scanning a QR code, then send and receive messages, media, and groups over plain HTTP. This template deploys Evolution API v2.3.7 with PostgreSQL 17 for message history and Redis 8 for session cache — each on its own persistent volume.

Evolution API keeps three kinds of state, and most self-hosted deployments lose at least one of them. Message, contact, and chat history goes to PostgreSQL. Connection session cache goes to Redis. Instance media and auth files are written to `/evolution/instances` on the container filesystem — and that last one is where typical deployments fail, because an unmounted container path is wiped on every redeploy, forcing you to re-scan the QR code for every connected number.

This template mounts a volume at `/evolution/instances`, so connected numbers stay connected across redeploys and version upgrades. Redis runs with append-only persistence (`appendonly yes`, `everysec` fsync) on its own volume rather than as a pure in-memory cache, so a Redis restart doesn't drop live session state. PostgreSQL uses a `PGDATA` subdirectory inside its mount, which avoids the initialization failure that occurs when Postgres is pointed at a volume root. Both datastores are private — neither has a public domain, and Evolution API reaches them over Railway's internal network only.

The API is protected by a 48-character `AUTHENTICATION_API_KEY` generated at deploy, and telemetry is disabled by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.8.1-trixie` | Database |
| evolution-api | `evoapicloud/evolution-api:v2.3.7` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --appendfsync everysec`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-what-1)
