# Deploy n8n Production Stack (Queue Mode) on Railway

[Oct'26] n8n queue mode + workers, Redis, Postgres & auto backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-production-stack-queue-mode)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-production-stack-queue-mode?referralCode=qxxcuG)

A **production-grade n8n** in one click: queue mode with a dedicated worker, Redis, Postgres — and the one thing every other n8n template skips: **automated database backups with restore verification already wired in**. Most n8n deployments run fine until the day an upgrade breaks, a workflow floods the executions table, or the database volume dies. This stack is configured for that day in advance.

[n8n](https://github.com/n8n-io/n8n) (201k★) is the leading self-hosted workflow automation platform — 400+ integrations, visual editor, AI agent nodes. This template runs it the way n8n's own docs recommend for production: `EXECUTIONS_MODE=queue`, where the main instance only serves the UI and webhooks while workers execute your workflows, so heavy runs never freeze your editor or drop incoming webhooks.

**Who it's for:** teams running business-critical automations — and anyone who's outgrown a single-instance n8n that dies under load.

Five services, wired over Railway's private network:

| Service | Version | Role |
|---|---|---|
| **n8n** (main) | `2.36.5` (pinned by tag + sha256 digest) | Editor UI, webhook intake, orchestration |
| **n8n-worker** | same pinned image | Executes workflows from the Redis queue — scale replicas as load grows |
| **Redis** | Railway managed | Execution queue (Bull) |
| **PostgreSQL** | Railway managed | Workflows, credentials, execution history |
| **pg-backup** | [railway-postgres-backups](https://github.com/Kjudeh/railway-postgres-backups) (MIT) | Compressed `pg_dump` to any S3-compatible storage on an interval, with retention |

**Hardening on by default** — the settings that separate a demo from production:

- **Execution pruning**: `EXECUTIONS_DATA_PRUNE` with a 14-day / 50k-run cap — the unbounded executions table is the #1 cause of dead self-hosted n8n instances
- **Encryption key auto-generated** and shared between main and workers (credentials stay decryptable across redeploys)
- **Webhook URL pre-wired** to your public domain; manual executions offloaded to workers
- **Stateless n8n services** — all state lives in Postgres, so workers scale horizontally (no volume lock-in) and redeploys are safe
- Telemetry/diagnostics off; secure cookies on

**Setup (~4 minutes):**

1. Click **Deploy Now**. Everything deploys with auto-generated secrets — no required input.
2. Open the n8n service URL, create your owner account, build workflows. Executions run on the worker via the queue automatically.
3. **Backups are already on.** The template ships with its own Railway storage bucket, so the first compressed `pg_dump` lands there within a minute of deploy — no S3 account, no keys to paste. Backups run every 6 hours with 7-day retention (both configurable). Prefer your own AWS S3, Backblaze B2 or Cloudflare R2? Just swap the five `S3_*` variables on pg-backup.
4. **Scaling:** when executions queue up, increase the worker service's replicas in Railway — workers are stateless, so 2, 4, or 8 replicas just work. The main instance never needs scaling for execution load.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| n8n-worker | [Kjudeh/n8n-production-stack](https://github.com/Kjudeh/n8n-production-stack) (root: /services/n8n) | Worker |
| n8n | [Kjudeh/n8n-production-stack](https://github.com/Kjudeh/n8n-production-stack) (root: /services/n8n) | Web service |
| pg-backup | [Kjudeh/railway-postgres-backups](https://github.com/Kjudeh/railway-postgres-backups) (root: services/backup) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | n8n-worker | 5678 |
| `DB_TYPE` | n8n-worker | postgresdb |
| `DEPLOY_TRIGGER` | n8n-worker | 1 |
| `EXECUTIONS_MODE` | n8n-worker | queue |
| `GENERIC_TIMEZONE` | n8n-worker | UTC |
| `DB_POSTGRESDB_PORT` | n8n-worker | 5432 |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) |
| `EXECUTIONS_DATA_PRUNE` | n8n-worker | true |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | 6379 |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) |
| `EXECUTIONS_DATA_MAX_AGE` | n8n-worker | 168 |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-worker | false |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n-worker | 10000 |
| `PORT` | n8n | 5678 |
| `DB_TYPE` | n8n | postgresdb |
| `N8N_PORT` | n8n | 5678 |
| `N8N_PROTOCOL` | n8n | https |
| `DEPLOY_TRIGGER` | n8n | 1 |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `EXECUTIONS_MODE` | n8n | queue |
| `GENERIC_TIMEZONE` | n8n | UTC |
| `DB_POSTGRESDB_PORT` | n8n | 5432 |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `EXECUTIONS_DATA_PRUNE` | n8n | true |
| `QUEUE_BULL_REDIS_PORT` | n8n | 6379 |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 168 |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n | (secret) |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true |
| `BACKUP_PREFIX` | pg-backup | n8n-postgres |
| `DEPLOY_TRIGGER` | pg-backup | 1 |
| `BACKUP_INTERVAL` | pg-backup | 21600 |
| `S3_SECRET_ACCESS_KEY` | pg-backup | (secret) |
| `BACKUP_RETENTION_DAYS` | pg-backup | 7 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `n8n worker`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile, Shell, Makefile

[View on Railway →](https://railway.com/deploy/n8n-production-stack-queue-mode)
