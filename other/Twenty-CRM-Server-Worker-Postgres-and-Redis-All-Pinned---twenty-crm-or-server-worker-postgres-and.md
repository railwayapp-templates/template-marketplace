# Deploy Twenty CRM | Server, Worker, Postgres and Redis, All Pinned on Railway

Server, worker, Postgres and Redis. Pinned, and the worker actually runs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-or-server-worker-postgres-and)

## About

# Twenty CRM

The open-source CRM, self-hosted: server, background worker, Postgres and Redis.
Every image pinned.

## What you get

Four services wired together the way Twenty's own compose file does it, but for
this platform:

- **Server** — the API and the app, on a volume for uploaded files
- **Worker** — the background job runner, on the same image with `yarn worker:prod`
- **Postgres 16** and **Redis 8**, both on their own volumes

The worker is the part people skip. Without it, jobs queue up in Redis and nothing
runs them: no email sync, no calendar sync, no cron. It is a separate service here
because that is what it is.

## Details worth knowing

- **Migrations run on the server, not the worker.** The worker sets
  `DISABLE_DB_MIGRATIONS` and `DISABLE_CRON_JOBS_REGISTRATION`, so two services
  starting at once cannot both try to migrate the same database.
- **The worker shares the server's `APP_SECRET` by reference**, not a second
  generated value. They have to match, and a template that generated two would
  look fine and fail in a way that is hard to trace.
- **Redis binds both IPv4 and IPv6.** The private network here is IPv6, and the
  default Redis config listens on neither usefully.
- **Logs are set to `error,warn`.** Twenty at default verbosity exceeds the
  platform's log rate limit on a quiet instance — seen while testing this, with
  hundreds of messages dropped per second.

## Verified

Deployed from this template: `/healthz` returns `status: ok`, the app is served,
the REST API answers unauthenticated calls with 403 rather than a 404, and the
worker's own log shows it processing jobs off the `cron-queue` through BullMQ —
which only happens if server, Redis and worker are all talking.

The first sign-up happens in the browser, at the domain — that part is a UI flow
and was not driven here.

## Configuration

Nothing to fill in. `APP_SECRET` and both database passwords are generated.
`SERVER_URL` follows the public domain.

Files are stored on the server's volume (`STORAGE_TYPE=local`). For S3, set
`STORAGE_TYPE=s3` and the `STORAGE_S3_*` variables from Twenty's documentation.

Twenty is by Twenty PBC, AGPL-3.0. This template only configures their published
images: https://twenty.com

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16.11-alpine` | Database |
| Twenty worker | `twentycrm/twenty:v2.24.1` | Worker |
| Redis | `redis:8.6.5-alpine` | Database |
| Twenty | `twentycrm/twenty:v2.24.1` | Web service |

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

[View on Railway →](https://railway.com/deploy/twenty-crm-or-server-worker-postgres-and)
