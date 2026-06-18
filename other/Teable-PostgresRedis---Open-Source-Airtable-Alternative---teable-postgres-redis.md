# Deploy Teable + Postgres/Redis - Open-Source Airtable Alternative on Railway

Teable Airtable alternative with Postgres, Redis, assets, and secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-postgres-redis)

## About

Self-host Teable, an open-source Airtable alternative, with a public Teable web app, private Postgres, private Redis, persistent assets, and generated secrets.

- `teable`: public Teable app service
- `postgres`: private Postgres database for durable workspace data
- `redis`: private Redis service for cache and queue state
- Persistent Teable asset storage
- Generated app and database secrets
- Railway private networking for all database/cache traffic

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| teable | `ghcr.io/teableio/teable:latest` | Web service |
| postgres | `postgres:15.4` | Database |
| redis | `redis:7.2.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY` | teable | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.assets`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/teable-postgres-redis)
