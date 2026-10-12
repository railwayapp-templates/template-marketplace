# Deploy n8n (Queue Mode) - Pinned, Tested, 3.0-Ready on Railway

Pinned, tested n8n in queue mode with worker, Postgres and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-mode-pinned-tested-30-ready)

## About

n8n in queue mode - main, worker, PostgreSQL and Redis - pinned to a release we tested (n8nio/n8n 2.42.3), with the n8n 3.0 defaults already set, your owner account created from variables (no open setup page) and a generated encryption key shared by main and worker.

n8n is a workflow automation platform: connect apps and APIs, run schedules and webhooks, add AI steps, with your own logic in Code nodes. This template runs it in queue mode: the main service serves the editor, the API and webhooks, and a separate worker runs the executions, with Redis as the job queue and PostgreSQL storing workflows, encrypted credentials, executions and binary data. The version is pinned, so a redeploy does not jump to n8n 3.0 (October 2026) on its own - you upgrade when you decide. A fresh n8n normally lets the first visitor create the owner; here the owner is created at start from N8N_OWNER_EMAIL and a generated password. Tested on a fresh throw-away VM: setup page closed, wrong password refused, a webhook executed by the worker, login after restart.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | [localhavenstore/railway-n8n](https://github.com/localhavenstore/railway-n8n) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| n8n-worker | [localhavenstore/railway-n8n](https://github.com/localhavenstore/railway-n8n) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | Port Railway routes the public domain to (5678). |
| `DB_TYPE` | n8n | postgresdb | Database type for n8n. Keep "postgresdb". |
| `N8N_PORT` | n8n | 5678 | Port n8n listens on (5678). Keep it equal to PORT. |
| `N8N_PROXY_HOPS` | n8n | 1 | 1: n8n runs behind Railway's proxy (correct client IPs and HTTPS links). |
| `EXECUTIONS_MODE` | n8n | queue | "queue": executions run on the n8n-worker service via Redis. Keep it. |
| `N8N_OWNER_EMAIL` | n8n | - | REQUIRED: your login e-mail. The owner account is created from it at start (no open setup page). |
| `GENERIC_TIMEZONE` | n8n | UTC | Time zone for schedules and Cron nodes, e.g. Europe/Berlin (default UTC). |
| `DB_POSTGRESDB_HOST` | n8n | - | PostgreSQL host (Railway reference to the Postgres service). |
| `DB_POSTGRESDB_PORT` | n8n | - | PostgreSQL port (Railway reference). |
| `DB_POSTGRESDB_USER` | n8n | (secret) | PostgreSQL user (Railway reference). |
| `N8N_ENCRYPTION_KEY` | n8n | - | Generated key that encrypts your credentials. Back it up now - without it no credential can be decrypted. Never change it after the first start. |
| `N8N_OWNER_PASSWORD` | n8n | (secret) | Generated login password (at least 12 characters). Copy it from here to log in; change it here and redeploy to rotate. |
| `QUEUE_BULL_REDIS_HOST` | n8n | - | Redis host for the job queue (Railway reference). |
| `QUEUE_BULL_REDIS_PORT` | n8n | - | Redis port (Railway reference). |
| `DB_POSTGRESDB_DATABASE` | n8n | - | PostgreSQL database name (Railway reference). |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | PostgreSQL password (Railway reference). |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | "false": no usage telemetry sent to n8n. Set "true" to share it. |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n | 60 | Seconds a Code step may run. 60 = the n8n 3.0 default; raise it if a Code step needs longer. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | Redis password (Railway reference). |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | database | "database": files stay in PostgreSQL so main and worker can both read them. Keep it in queue mode. |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | n8n | false | "false" = the n8n 3.0 default (unverified community packages off). Set "true" only if you need one. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `DB_TYPE` | n8n-worker | postgresdb | Database type. Keep "postgresdb" (same as n8n). |
| `EXECUTIONS_MODE` | n8n-worker | queue | "queue": this service takes jobs from Redis. Keep it. |
| `GENERIC_TIMEZONE` | n8n-worker | UTC | Same time zone as the n8n service. |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | PostgreSQL host (Railway reference). |
| `DB_POSTGRESDB_PORT` | n8n-worker | - | PostgreSQL port (Railway reference). |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | PostgreSQL user (Railway reference). |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | MUST equal the n8n service's key (Railway reference ${{n8n.N8N_ENCRYPTION_KEY}}) - otherwise the worker cannot decrypt credentials. |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | Redis host (Railway reference). |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | - | Redis port (Railway reference). |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | PostgreSQL database name (Railway reference). |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | PostgreSQL password (Railway reference). |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-worker | false | "false": no usage telemetry. |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n-worker | 60 | Seconds a Code step may run on the worker. Keep it equal to the n8n service. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | Redis password (Railway reference). |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-worker | database | "database" (same as n8n): files shared through PostgreSQL. |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | n8n-worker | false | Keep equal to the n8n service ("false" = n8n 3.0 default). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/home/node/start.sh worker`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-queue-mode-pinned-tested-30-ready)
