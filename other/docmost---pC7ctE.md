# Deploy docmost on Railway

Document base alternative to Notion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pC7ctE)

## About

Docmost is a open source alternative to Notion. Code is all open source and users can host their own instance. Railway is the one of the best places to self hosted Docmost instance. This template contains everything necessary for Docmost. A PostgreSQL server, a Redis cache, and Docmost server is included in this template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| docmost-server | `docmost/docmost` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `APP_SECRET` | docmost-server | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/storage`
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/template/pC7ctE)
