# Deploy teable on Railway

One-click Teable (open-source Airtable alternative) with Postgres + Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-1)

## About

Hosting Teable yourself means your tables, records, and attachments never leave
infrastructure you control, and you can use it with unlimited users at no per-seat cost.
This template runs the community-edition image Teable publishes, pinned to the exact
release [`release.2026-09-05T15-06-03Z.2943`](https://github.com/teableio/teable/releases)
(one bump = one line in the repo's `Dockerfile`). PostgreSQL 15.4 and Redis 7.2.4 match
Teable's own reference compose file — variable names (`PRISMA_DATABASE_URL`,
`BACKEND_CACHE_REDIS_URI`, `PUBLIC_ORIGIN`, …) are taken from Teable's backend env
validation schema, not guessed. All three services keep state on Railway volumes, so
deploys and restarts don't lose data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | [lNamelessl/teable-railway-template](https://github.com/lNamelessl/teable-railway-template) (root: postgres) | Database |
| Redis | [lNamelessl/teable-railway-template](https://github.com/lNamelessl/teable-railway-template) (root: redis) | Database |
| Teable | [lNamelessl/teable-railway-template](https://github.com/lNamelessl/teable-railway-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `SECRET_KEY` | Teable | (secret) |
| `BACKEND_JWT_SECRET` | Teable | (secret) |
| `BACKEND_SESSION_SECRET` | Teable | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'exec redis-server --appendonly yes --requirepass $REDIS_PASSWORD'`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.assets`

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/teable-1)
