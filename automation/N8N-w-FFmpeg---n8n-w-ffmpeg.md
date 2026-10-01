# Deploy N8N (w/ FFmpeg) on Railway

n8n + FFmpeg [Oct '26] (Video Automation/Workers/Execute Command) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-w-ffmpeg)

## About

n8n is an open source workflow automation platform, and FFmpeg is the standard tool for processing video and audio. Together they let you cut clips, convert formats, generate thumbnails and normalize audio inside your workflows, without paying a rendering API per video. The problem: the official n8n Docker image does not ship FFmpeg, and n8n Cloud does not allow the Execute Command node at all. This template solves it by deploying self hosted n8n in queue mode with FFmpeg and ffprobe already installed on the workers.

Running FFmpeg from n8n requires a self hosted instance where you control the container. On a production setup that means n8n in queue mode: a main instance for the editor and webhooks, workers that execute the workflows, Redis as the job queue and PostgreSQL for storage. FFmpeg must be installed where the workflows actually run, which in queue mode is the worker, not the main instance.

This template deploys four services, connected over Railway's private network at deploy time:

- **Primary**: n8n editor, REST API and webhooks, exposed on an HTTPS domain.
- **Worker**: executes workflows, with FFmpeg and ffprobe installed.
- **Redis**: job queue between Primary and Worker.
- **PostgreSQL**: workflows, credentials and execution history.

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

[View on Railway →](https://railway.com/deploy/n8n-w-ffmpeg)
