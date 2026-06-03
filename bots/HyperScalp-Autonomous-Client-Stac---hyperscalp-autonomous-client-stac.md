# Deploy HyperScalp Autonomous Client Stac on Railway

Deploy and Host HyperScalp Autonomous Client Stac with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hyperscalp-autonomous-client-stac)

## About

Deploying the HyperScalp Autonomous Client Stack on Railway provisions a private, low-latency containerized trading network on your own personal cloud. Railway deploys a dedicated, secure PostgreSQL database to persist strategy settings, active indicator states, and historical trade logs. 
The core quantitative engine executes inside a secure, Cython-compiled Docker container pulling directly from GHCR, protecting proprietary algorithmic logic while running active WebSocket listeners. Simultaneously, the Next.js dashboard compiles dynamically from the sub-directory, securely routing real-time PnL analytics and strategy triggers to your bot over Railway's private internal network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hyperscalp-app | `ghcr.io/azdevz/hyperscalp-client:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | hyperscalp-app | 8080 | - |
| `LOG_LEVEL` | hyperscalp-app | INFO | - |
| `API_SECRET` | hyperscalp-app | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/hyperscalp-autonomous-client-stac)
