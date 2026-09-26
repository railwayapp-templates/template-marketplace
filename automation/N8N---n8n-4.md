# Deploy N8N on Railway

n8n in queue mode: main, workers, Redis and Postgres. Scale workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-4)

## About

**This variant: n8n in queue mode with workers.** A main instance, a worker service you can scale, Redis and Postgres. n8n is an open-source workflow automation platform with 400+ integrations, AI agent nodes and a visual editor: a self-hosted alternative to Zapier and Make with no per-execution fees.

This template deploys n8n's scaling architecture as four services:

- `n8n`: the editor, API, triggers and webhooks. It turns every trigger into a job on the queue instead of running it.
- `n8n-worker`: pulls jobs from Redis and runs the executions, including test runs from the editor.
- `Redis`: the job queue.
- `Postgres`: workflows, credentials, execution history and binary data.

Every n8n service is pinned to 2.40.7. The first boot runs n8n's database migrations, which takes about a minute before the healthchecks on `/healthz/readiness` turn green. Then open the public URL and **create the owner account right away**: the first visitor to an unclaimed instance becomes its owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.40.7` | Web service |
| Redis | `redis:8.2` | Database |
| n8n-worker | `n8nio/n8n:2.40.7` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | Port n8n listens on. Railway's healthcheck and domain use it. |
| `DB_TYPE` | n8n | postgresdb | Stores everything in Postgres instead of SQLite. |
| `N8N_PROXY_HOPS` | n8n | 2 | Proxy hops in front of n8n (Railway's edge adds two), so rate limits see real client IPs. |
| `EXECUTIONS_MODE` | n8n | queue | Hands executions to workers through Redis. |
| `N8N_WEBHOOK_URL` | n8n | - | Public base URL shown for webhook, form and MCP trigger URLs. |
| `GENERIC_TIMEZONE` | n8n | UTC | Timezone for Schedule triggers and dates, e.g. Europe/Berlin. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials. Generated per deploy; back it up. |
| `N8N_EDITOR_BASE_URL` | n8n | - | Public URL of the editor, used in links, emails and OAuth redirects. |
| `QUEUE_BULL_REDIS_HOST` | n8n | - | Redis host on the private network. |
| `QUEUE_BULL_REDIS_PORT` | n8n | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password. |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | Hours to keep execution history before pruning (336 = 14 days). |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n | (secret) | Redis user. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n | true | Resolves Redis over IPv6 as well, which Railway's private network uses. |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n | true | Reinstalls community nodes on boot, since this service has no volume. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | Most executions to keep in history. 0 means no limit. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true | Runs editor test executions on workers too, like production. |
| `REDISHOST` | Redis | - | Private hostname n8n connects to. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Private connection string, for other services you add later. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect it. |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis. Generated per deploy. |
| `PORT` | n8n-worker | 5678 | Port of the worker's health server, which Railway's healthcheck probes. |
| `DB_TYPE` | n8n-worker | postgresdb | Stores everything in Postgres instead of SQLite. |
| `EXECUTIONS_MODE` | n8n-worker | queue | Hands executions to workers through Redis. |
| `N8N_WEBHOOK_URL` | n8n-worker | - | Mirrors the main instance's webhook URL. |
| `GENERIC_TIMEZONE` | n8n-worker | - | Mirrors the main instance's timezone. |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n-worker | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | Must equal the main instance's key to read credentials. |
| `N8N_EDITOR_BASE_URL` | n8n-worker | - | Mirrors the main instance's editor URL. |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | Redis host on the private network. |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | Postgres password. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) | Redis user. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true | Turns on the worker's /healthz endpoints. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true | Resolves Redis over IPv6 as well, which Railway's private network uses. |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n-worker | true | Reinstalls community nodes on boot, since this service has no volume. |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | n8n-worker | 10 | Executions each worker replica runs in parallel. Keep it at 5 or more. |
| `POSTGRES_DB` | Postgres | railway | Database n8n stores workflows, credentials and executions in. |
| `DATABASE_URL` | Postgres | - | Private connection string, for other services you add later. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to Postgres. Generated per deploy. |

## Configuration

- **Healthcheck:** `/healthz/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/sbin/tini -- /docker-entrypoint.sh worker`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-4)
