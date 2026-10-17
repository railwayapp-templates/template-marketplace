# Deploy Docmost Team Wiki with PostgreSQL & Redis on Railway

Collaborative team wiki with Postgres, Redis and persistent uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-team-wiki-with-postgresql-and-re)

## About

Collaborative team wiki with Postgres, Redis and persistent uploads.

Deploying this template creates Postgres, Redis, Docmost in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres@sha256:77f585114c32fbca283dc835b0596f4e52b51b4c6662d7810b2f4084f60a1873` | Database |
| Docmost | `docmost/docmost@sha256:b56947fcfd08aab8fae12a377e1792784786adbf8b96e4281f14ef4fc072685a` | Web service |
| Redis | `redis@sha256:3811787313eba226a2ef38658c6ccb91cd5e110edc89c37767de373120a0e5a0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | docmost | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated separately for every deployment. |
| `PORT` | Docmost | 3000 | - |
| `APP_SECRET` | Docmost | (secret) | Stable application secret, generated independently for every deployment. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password; keep this service private. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/storage`
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/docmost-team-wiki-with-postgresql-and-re)
