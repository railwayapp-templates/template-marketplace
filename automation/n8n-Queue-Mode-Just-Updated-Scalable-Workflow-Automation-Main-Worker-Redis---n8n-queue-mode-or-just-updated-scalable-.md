# Deploy n8n Queue Mode | (Just Updated) Scalable Workflow Automation, Main + Worker + Redis on Railway

n8n with a separate worker, Redis queue and Postgres. Scales out.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-mode-or-just-updated-scalable-)

## About

n8n is a source-available workflow automation platform with 400+ integrations. This template deploys it in **queue mode**: a main instance serving the editor, webhooks and API, a separate worker that executes workflows, Redis as the job queue, and Postgres for storage.

Four services are wired together on Railway's private network: `n8n` (editor, webhooks, scheduler), `n8n-worker` (runs workflow executions, concurrency 10), `redis` (Bull job queue, password protected, persisted with AOF) and `postgres` (workflows, credentials and execution history). The main instance enqueues every execution, including manual runs from the editor, and the worker picks it up, so a heavy workflow never blocks the UI or incoming webhooks. Both n8n services share one generated `N8N_ENCRYPTION_KEY`, so credentials saved by the editor can be decrypted by the worker. Postgres and Redis each have a volume, so workflows, credentials and queued jobs survive redeploys. The first boot runs database migrations and takes a few minutes. Open the public domain and create the owner account. The first visitor becomes the owner, so do this straight after deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| n8n | `n8nio/n8n:2.32.5` | Web service |
| redis | `redis:8.2.1-alpine` | Database |
| n8n-worker | `n8nio/n8n:2.32.5` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export POSTGRES_USER=n8n POSTGRES_DB=n8n PGDATA=/var/lib/postgresql/data/pgdata; exec docker-entrypoint.sh postgres'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'export DB_TYPE=postgresdb DB_POSTGRESDB_PORT=5432 DB_POSTGRESDB_DATABASE=n8n DB_POSTGRESDB_USER=n8n EXECUTIONS_MODE=queue QUEUE_BULL_REDIS_PORT=6379 QUEUE_BULL_REDIS_DUALSTACK=true OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true N8N_LISTEN_ADDRESS=0.0.0.0 N8N_PROTOCOL=https GENERIC_TIMEZONE=UTC N8N_RUNNERS_ENABLED=true N8N_DIAGNOSTICS_ENABLED=false N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true N8N_PORT="${PORT:-5678}"; exec /docker-entrypoint.sh'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'export DB_TYPE=postgresdb DB_POSTGRESDB_PORT=5432 DB_POSTGRESDB_DATABASE=n8n DB_POSTGRESDB_USER=n8n EXECUTIONS_MODE=queue QUEUE_BULL_REDIS_PORT=6379 QUEUE_BULL_REDIS_DUALSTACK=true GENERIC_TIMEZONE=UTC N8N_RUNNERS_ENABLED=true N8N_DIAGNOSTICS_ENABLED=false N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true; exec /docker-entrypoint.sh worker --concurrency=10'`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-mode-or-just-updated-scalable-)
