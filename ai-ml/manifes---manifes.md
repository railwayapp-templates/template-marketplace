# Deploy manifes on Railway

Smart model router with dashboard, routing tiers, and cost analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/manifes)

## About

Manifest runs cleanly on Railway as a Docker-first deployment: one web service for the dashboard/API and one managed PostgreSQL service for persistent state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| manifest | `manifestdotbuild/manifest:5.55.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | manifest | 2099 |
| `NODE_ENV` | manifest | production |
| `SEED_DATA` | manifest | false |
| `OLLAMA_HOST` | manifest | http://host.docker.internal:11434 |
| `BIND_ADDRESS` | manifest | 0.0.0.0 |
| `MANIFEST_MODE` | manifest | selfhosted |
| `BETTER_AUTH_SECRET` | manifest | (secret) |
| `MANIFEST_TELEMETRY_DISABLED` | manifest | 0 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/manifes)
