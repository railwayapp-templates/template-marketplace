# Deploy kaneo on Railway

Open source project management that works for you, not against you

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-1)

## About

Kaneo runs as its official combined web and API container on Railway, backed by a private PostgreSQL service with persistent storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kaneo | `ghcr.io/usekaneo/kaneo:2.9.10` | Web service |
| postgres | `postgres:16.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | kaneo | 5173 |
| `AUTH_SECRET` | kaneo | (secret) |
| `POSTGRES_DB` | kaneo | kaneo |
| `POSTGRES_PORT` | kaneo | 5432 |
| `POSTGRES_USER` | kaneo | (secret) |
| `POSTGRES_PASSWORD` | kaneo | (secret) |
| `POSTGRES_DB` | postgres | kaneo |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/kaneo-1)
