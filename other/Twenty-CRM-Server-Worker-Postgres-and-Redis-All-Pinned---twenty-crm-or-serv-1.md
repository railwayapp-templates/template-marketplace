# Deploy Twenty CRM | Server, Worker, Postgres and Redis, All Pinned on Railway

Server, worker, Postgres and Redis. Pinned, and the worker actually runs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-or-serv-1)

## About

Twenty, the open-source CRM, self-hosted as four services: the server, the background worker, Postgres and Redis. Every image is pinned.

Nothing to fill in. Open the domain and create the first account.

The four services are wired together the way Twenty's own compose file does it, adapted for this platform:

- **Server**: the API and the app, with a volume for uploaded files
- **Worker**: the background job runner, on the same image, started with `yarn worker:prod`
- **Postgres 16** and **Redis 8**, each on its own volume

The worker is the part people skip. Without it, jobs queue up in Redis and nothing runs them: no email sync, no calendar sync, no cron. Here it is a separate service, because that is what it is.

The first sign-up happens in the browser, at the domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16.15-alpine` | Database |
| Twenty worker | `twentycrm/twenty:v2.45.0` | Worker |
| Redis | `redis:8.10.2-alpine` | Database |
| Twenty | `twentycrm/twenty:v2.45.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | default |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `APP_SECRET` | Twenty worker | (secret) |
| `LOG_LEVELS` | Twenty worker | error,warn |
| `STORAGE_TYPE` | Twenty worker | local |
| `DISABLE_DB_MIGRATIONS` | Twenty worker | true |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty worker | true |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Twenty | 3000 |
| `NODE_PORT` | Twenty | 3000 |
| `APP_SECRET` | Twenty | (secret) |
| `LOG_LEVELS` | Twenty | error,warn |
| `STORAGE_TYPE` | Twenty | local |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `yarn worker:prod`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/packages/twenty-server/.local-storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/twenty-crm-or-serv-1)
