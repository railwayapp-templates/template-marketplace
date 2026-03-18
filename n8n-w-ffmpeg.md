# Deploy N8N (w/ FFmpeg) on Railway

n8n on Railway with FFmpeg preinstalled for video/audio automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-w-ffmpeg)

## About

N8N (w/ FFmpeg) is a 1‑click Railway template for media‑centric automations. It deploys n8n in queue mode with worker(s), Redis (BullMQ), and Postgres. FFmpeg and ffprobe are installed on worker startup, enabling video/audio transcoding, trimming, thumbnail generation, and metadata extraction directly inside n8n, no custom setup required.

This template deploys n8n on Railway with a production-ready setup: a main service for the editor and API, worker service(s) that execute workflows, Redis for job queuing, and PostgreSQL for storage. Railway provisions and manages these services so you can deploy quickly without manual configuration. The only difference from the upstream template is the worker image, which includes FFmpeg, enabling media operations directly within your automations. As your workload grows, simply scale worker services to handle more concurrent executions while the main editor remains responsive.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis` | Database |
| Primary | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Worker | `n8nio/n8n` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | Primary | 5678 | - |
| `DB_TYPE` | Primary | postgresdb | - |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | - |
| `NODES_EXCLUDE` | Primary | [] | - |
| `EXECUTIONS_MODE` | Primary | queue | - |
| `DB_POSTGRESDB_USER` | Primary | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Primary | :: | - |
| `N8N_RUNNERS_ENABLED` | Primary | true | - |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Worker | 5678 | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | - |
| `NODES_EXCLUDE` | Worker | [] | - |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Worker | :: | - |
| `N8N_RUNNERS_ENABLED` | Worker | true | - |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |

## Configuration

- **Volume:** `/bitnami`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "apk update && apk add --no-cache ffmpeg && n8n worker"`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-w-ffmpeg)
