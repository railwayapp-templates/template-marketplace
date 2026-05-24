# Deploy n8n Queue Mode + Postgres/Redis + Backups on Railway

n8n queue mode with Postgres, Redis, workers, and backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-mode-postgresredis-backups)

## About

Self-host n8n with a production-shaped queue-mode architecture: Postgres for durable data, Redis for queued executions, a dedicated worker, and daily Postgres backups.

- `n8n-main`: public n8n editor/API service
- `n8n-worker`: dedicated worker service running `n8n worker --concurrency=5`
- `postgres`: private Postgres database with persistent storage
- `redis`: private Redis queue broker with append-only persistence
- `postgres-backup`: daily `pg_dump` backup service writing `.sql.gz` dumps to a Railway volume
- Generated `N8N_ENCRYPTION_KEY`, JWT secret, database password, and app secrets

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-backup | `postgres:16-alpine` | Database |
| n8n-worker | `n8nio/n8n:latest` | Worker |
| postgres | `postgres:16-alpine` | Database |
| n8n-main | `n8nio/n8n:latest` | Web service |
| redis | `redis:7-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BACKUP_RETENTION_DAYS` | postgres-backup | 14 |
| `PORT` | n8n-worker | 5678 |
| `DB_TYPE` | n8n-worker | postgresdb |
| `N8N_PORT` | n8n-worker | 5678 |
| `N8N_PROTOCOL` | n8n-worker | https |
| `EXECUTIONS_MODE` | n8n-worker | queue |
| `DB_POSTGRESDB_PORT` | n8n-worker | 5432 |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | 6379 |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-worker | database |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8n-worker | (secret) |
| `POSTGRES_DB` | postgres | n8n |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | n8n-main | 5678 |
| `DB_TYPE` | n8n-main | postgresdb |
| `N8N_PORT` | n8n-main | 5678 |
| `N8N_PROTOCOL` | n8n-main | https |
| `EXECUTIONS_MODE` | n8n-main | queue |
| `DB_POSTGRESDB_PORT` | n8n-main | 5432 |
| `DB_POSTGRESDB_USER` | n8n-main | (secret) |
| `QUEUE_BULL_REDIS_PORT` | n8n-main | 6379 |
| `DB_POSTGRESDB_PASSWORD` | n8n-main | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-main | true |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-main | database |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8n-main | (secret) |

## Configuration

- **Start command:** `/bin/sh -lc 'set -eu; mkdir -p /backups; while true; do stamp="$(date -u +%Y%m%d-%H%M%S)"; file="/backups/n8n-${stamp}.sql.gz"; echo "Writing Postgres backup to ${file}"; pg_dump "$DATABASE_URL" | gzip > "$file"; find /backups -type f -name "n8n-*.sql.gz" -mtime +"${BACKUP_RETENTION_DAYS:-14}" -delete; ls -lh /backups | tail -20; echo "Next backup in 24h"; sleep 86400; done'`
- **Volume:** `/backups`
- **Start command:** `n8n worker --concurrency=5`
- **Healthcheck:** `/healthz/readiness`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `redis-server --appendonly yes --dir /data`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-mode-postgresredis-backups)
