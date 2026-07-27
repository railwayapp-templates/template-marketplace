# Deploy n8n Queue Mode | Worker, Redis and Postgres, All Pinned on Railway

Main, worker, Redis and Postgres in queue mode. All images pinned.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-mode-or-worker-redis-and-postg)

## About

# n8n in queue mode

n8n split across a main instance and a worker, with Redis as the queue and
Postgres for state. Everything pinned.

## What this fixes

The existing "n8n with workers" template has four problems, and they compound:

- **No image tags at all.** `n8nio/n8n` and `bitnami/redis` are written without a
  version, which means `:latest`. Two deploys a month apart are not the same
  software, and a redeploy can change n8n underneath a database it has migrated.
- **Bitnami closed its public tag catalogue.** That Redis image is no longer a
  dependable pull, and when it fails it does so quietly.
- **Redis and Postgres are exposed through public TCP proxies.** A queue backend
  and a database do not need to be reachable from the internet; here they talk
  over the private network only.
- Postgres is on `:latest` as well.

Roughly one deployment in six fails.

## What this runs

`n8nio/n8n:2.32.5` for both the main instance and the worker, `redis:8.6.5-alpine`,
and `postgres-ssl:18` — every one pinned.

## Two things that took finding

- **The n8n image is Alpine, and the private network is IPv6.** Without
  `ENABLE_ALPINE_PRIVATE_NETWORKING` the app resolves nothing and exits with
  "Unable to connect to Redis" — with no hint that the cause is DNS.
- **Redis has to bind both stacks.** `--bind ::` alone is not enough, and leaving
  the default binds loopback, which is reachable from nowhere.

The worker's health check also runs on 5680, not 5679: n8n's own task broker
already holds 5679 inside the worker container, and the collision kills it on
startup.

## Verified

Not by a status page. An account was created, a webhook workflow activated, the
production URL called, and the execution came back `success` with mode
`webhook` — which only happens if the main instance queued it to Redis and the
worker picked it up.

## Scaling

The worker runs ten executions at a time (`--concurrency=10`). For more
throughput, raise replicas on the worker service; the main instance stays at one.

Binary data stays in the database, because a filesystem volume is not shared
between main and worker. For large files, point n8n at S3 instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n worker | `n8nio/n8n:2.32.5` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n:2.32.5` | Web service |
| Redis | `redis:8.6.5-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | n8n worker | 5680 |
| `DB_TYPE` | n8n worker | postgresdb |
| `N8N_LOG_LEVEL` | n8n worker | info |
| `EXECUTIONS_MODE` | n8n worker | queue |
| `GENERIC_TIMEZONE` | n8n worker | UTC |
| `DB_POSTGRESDB_PORT` | n8n worker | 5432 |
| `DB_POSTGRESDB_USER` | n8n worker | (secret) |
| `N8N_RUNNERS_ENABLED` | n8n worker | true |
| `QUEUE_BULL_REDIS_PORT` | n8n worker | 6379 |
| `DB_POSTGRESDB_PASSWORD` | n8n worker | (secret) |
| `QUEUE_HEALTH_CHECK_PORT` | n8n worker | 5680 |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n worker | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n worker | true |
| `POSTGRES_DB` | Postgres | n8n |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PORT` | n8n | 5678 |
| `N8N_PROTOCOL` | n8n | https |
| `N8N_LOG_LEVEL` | n8n | info |
| `EXECUTIONS_MODE` | n8n | queue |
| `GENERIC_TIMEZONE` | n8n | UTC |
| `DB_POSTGRESDB_PORT` | n8n | 5432 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `N8N_RUNNERS_ENABLED` | n8n | true |
| `QUEUE_BULL_REDIS_PORT` | n8n | 6379 |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n | true |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Start command:** `n8n worker --concurrency=10`
- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-mode-or-worker-redis-and-postg)
