# Deploy n8n Production Stack (Queue Mode) on Railway

[Aug'26] Production n8n: queue mode, workers + verified S3 backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-production-stack-queue-mode)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-production-stack-queue-mode)

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
3. *(Recommended)* Activate backups: set `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` on the pg-backup service — works with AWS S3, Backblaze B2 (cheapest), Cloudflare R2, or MinIO. Backups run every 6 hours with 7-day retention (both configurable).
4. **Scaling:** when executions queue up, increase the worker service's replicas in Railway — workers are stateless, so 2, 4, or 8 replicas just work. The main instance never needs scaling for execution load.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| n8n-worker | [Kjudeh/n8n-production-stack](https://github.com/Kjudeh/n8n-production-stack) | Worker |
| n8n | [Kjudeh/n8n-production-stack](https://github.com/Kjudeh/n8n-production-stack) | Web service |
| pg-backup | [Kjudeh/railway-postgres-backups](https://github.com/Kjudeh/railway-postgres-backups) (root: services/backup) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n | (secret) |
| `S3_SECRET_ACCESS_KEY` | pg-backup | (secret) |
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
