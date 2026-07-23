# Deploy n8n (Queue Mode, Production) on Railway

Production n8n: queue mode, workers, Postgres, Redis, generated secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-mode-production)

## About

Self-host n8n — the open-source Zapier / Make alternative — in one click, with a production queue-mode architecture built for 24/7 workflow automation: a dedicated editor/webhook service, a separate execution worker, PostgreSQL 17, and a password-protected Redis queue.

Most n8n templates run a single instance: the same process serves the editor, receives webhooks, and executes workflows. Under real load that means missed webhooks during redeploys and a frozen UI during heavy executions. This template deploys n8n the way n8n's own docs recommend for production — queue mode. The main service only handles the UI and webhook intake; executions are pushed to Redis and processed by a separate worker you can scale independently (add replicas or raise `--concurrency`). Redis runs with `noeviction` (required for Bull queues), AOF persistence, and a generated password. Postgres 17 stores workflows, credentials (encrypted with an auto-generated key shared correctly between main and worker), and execution history — with pruning enabled by default so your database doesn't grow forever.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.29.11` | Web service |
| Redis | `redis:7.4.9-alpine` | Database |
| n8n-worker | `n8nio/n8n:2.29.11` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | n8n | UTC | Container timezone. |
| `DB_TYPE` | n8n | postgresdb | Use PostgreSQL as the n8n database. |
| `N8N_HOST` | n8n | - | Public hostname of this n8n instance. |
| `N8N_PORT` | n8n | 5678 | Port n8n listens on inside the container. |
| `WEBHOOK_URL` | n8n | - | Public base URL used to build webhook addresses. |
| `N8N_PROTOCOL` | n8n | https | Public protocol (Railway terminates TLS). |
| `N8N_PROXY_HOPS` | n8n | 1 | n8n runs behind Railway's proxy (1 hop). |
| `EXECUTIONS_MODE` | n8n | queue | Run n8n in queue mode: executions are processed by worker services. |
| `GENERIC_TIMEZONE` | n8n | UTC | Default timezone for schedules and Cron nodes. |
| `N8N_SECURE_COOKIE` | n8n | true | Cookies only over HTTPS. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Database user (from the Postgres service). |
| `N8N_ENCRYPTION_KEY` | n8n | - | Auto-generated key that encrypts stored credentials. Shared with the worker. |
| `N8N_EDITOR_BASE_URL` | n8n | - | Base URL of the editor UI. |
| `N8N_RUNNERS_ENABLED` | n8n | true | Enable task runners (required in n8n 2.x). |
| `QUEUE_BULL_REDIS_DB` | n8n | 0 | Redis database index used by the queue. |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | Automatically prune old execution data to protect disk and DB size. |
| `N8N_TEMPLATES_ENABLED` | n8n | true | Enable the in-app workflow templates library. |
| `QUEUE_BULL_REDIS_HOST` | n8n | - | Redis host for the execution queue (private network). |
| `QUEUE_BULL_REDIS_PORT` | n8n | 6379 | Redis port for the queue. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Database name (from the Postgres service). |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Database password (from the Postgres service). |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | Keep execution data for 14 days (336 hours). |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | Disable telemetry. |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | Hide the n8n hiring banner. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | Redis password (from the Redis service). |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n | true | Expose /healthz for Railway healthchecks. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n | true | Required on Railway: enables IPv6 for Redis connections on the private network. |
| `N8N_PERSONALIZATION_ENABLED` | n8n | false | Skip personalization survey on first run. |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n | true | Block Code nodes from reading container env vars (they contain secrets). |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n | 30 | Seconds to wait for graceful shutdown on redeploys. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | Keep at most 10k executions. |
| `REDISHOST` | Redis | - | Private-network hostname of this Redis service. |
| `REDISPORT` | Redis | 6379 | Redis port on the private network. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password (used by requirepass and by n8n queue connections). |
| `TZ` | n8n-worker | UTC | Container timezone. |
| `DB_TYPE` | n8n-worker | postgresdb | Use PostgreSQL as the n8n database. |
| `WEBHOOK_URL` | n8n-worker | - | Public base URL of the main n8n service (used to build webhook addresses). |
| `EXECUTIONS_MODE` | n8n-worker | queue | Worker consumes executions from the queue. |
| `GENERIC_TIMEZONE` | n8n-worker | UTC | Default timezone for schedules and Cron nodes. |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n-worker | 5432 | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | Database user (from the Postgres service). |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | MUST match the main n8n service key - referenced automatically. Never change. |
| `N8N_RUNNERS_ENABLED` | n8n-worker | true | Enable task runners (required in n8n 2.x). |
| `QUEUE_BULL_REDIS_DB` | n8n-worker | 0 | Redis database index used by the queue. |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | Redis host for the execution queue (private network). |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | 6379 | Redis port for the queue. |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | Database name (from the Postgres service). |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | Database password (from the Postgres service). |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-worker | false | Disable telemetry. |
| `QUEUE_HEALTH_CHECK_PORT` | n8n-worker | 5678 | Port for the worker healthcheck endpoint. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | Redis password (from the Redis service). |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true | Expose /healthz for Railway healthchecks. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true | Required on Railway: enables IPv6 for Redis connections on the private network. |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n-worker | true | Block Code nodes from reading container env vars (they contain secrets). |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n-worker | 300 | Give running executions up to 5 minutes to finish on redeploys. |
| `POSTGRES_DB` | Postgres | n8n | Database name created on first boot. |
| `DATABASE_URL` | Postgres | - | Connection string used by other services over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | Database user for n8n. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction --bind 0.0.0.0 ::'`
- **Volume:** `/data`
- **Start command:** `n8n worker --concurrency=10`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-mode-production)
