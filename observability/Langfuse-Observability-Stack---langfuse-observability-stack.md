# Deploy Langfuse Observability Stack on Railway

Langfuse LLM tracing with ClickHouse, Postgres, Redis and MinIO

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-observability-stack)

## About

Langfuse is the open-source LLM engineering platform for tracing, evaluating, and debugging AI applications. It captures every prompt, completion, latency, and cost, manages versioned prompts, and runs evaluations. This template deploys the full Langfuse v3 stack — web, async worker, Postgres, Redis, ClickHouse, and MinIO — pre-wired in minutes.

Langfuse v3 is not a single container — it is a distributed system. The Next.js web app serves the UI and ingestion API, an async worker drains a Redis-backed BullMQ queue, ClickHouse stores high-volume trace and observation events for fast analytics, Postgres holds transactional data (projects, users, prompts), and an S3-compatible object store (MinIO) buffers raw event batches. Self-hosting this by hand means provisioning four backing stores, generating a 256-bit hex encryption key, keeping shared secrets identical across web and worker, running ClickHouse in single-node mode, and configuring Redis with a no-eviction policy so queued jobs are never dropped. This template wires all six services over Railway's private network and generates every secret for you, so the only post-deploy step is creating your first account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:25.12` | Database |
| langfuse-worker | `langfuse/langfuse-worker:4.38.0` | Worker |
| MinIO | `quay.io/minio/minio:RELEASE.2025-03-12T18-04-18Z` | Database |
| Redis | `redis:7.4.2-alpine` | Database |
| langfuse-web | `langfuse/langfuse:4.38.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | ClickHouse | default | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `SALT` | langfuse-worker | - | References langfuse-web so the worker and web never drift apart |
| `NODE_ENV` | langfuse-worker | production | - |
| `CLICKHOUSE_DB` | langfuse-worker | default | - |
| `ENCRYPTION_KEY` | langfuse-worker | - | References langfuse-web so the worker and web never drift apart |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | - |
| `NEXTAUTH_SECRET` | langfuse-worker | (secret) | References langfuse-web so the worker and web never drift apart |
| `TELEMETRY_ENABLED` | langfuse-worker | false | - |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Must be false on Railway — ClickHouse runs single-node, not clustered |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | auto | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_BUCKET so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | Key prefix for uploaded media inside the bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | auto | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_REGION so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY so screenshots and audio attachments land in the same MinIO bucket. |
| `MINIO_ROOT_USER` | MinIO | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | langfuse-web | 3000 | - |
| `SALT` | langfuse-web | - | Salt for hashing API keys |
| `HOSTNAME` | langfuse-web | 0.0.0.0 | - |
| `NODE_ENV` | langfuse-web | production | - |
| `CLICKHOUSE_DB` | langfuse-web | default | - |
| `ENCRYPTION_KEY` | langfuse-web | - | MUST be 64 hexadecimal characters (256-bit). Generate with openssl rand -hex 32 — plain secret(64) is alphanumeric and will fail to boot. |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | - |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Session signing secret |
| `TELEMETRY_ENABLED` | langfuse-web | false | - |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | - |
| `LANGFUSE_INIT_ORG_ID` | langfuse-web | default | Headless setup: organisation created on first boot so you can use the API immediately. |
| `LANGFUSE_INIT_ORG_NAME` | langfuse-web | My Org | Display name of the organisation created on first boot. |
| `LANGFUSE_INIT_USER_NAME` | langfuse-web | Admin | Display name of the first admin account. |
| `LANGFUSE_INIT_PROJECT_ID` | langfuse-web | default | Headless setup: project created on first boot. |
| `LANGFUSE_INIT_USER_EMAIL` | langfuse-web | admin@example.com | Email of the first admin account. Change it before you share the instance. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | Must be false on Railway — ClickHouse runs single-node, not clustered |
| `LANGFUSE_INIT_PROJECT_NAME` | langfuse-web | My Project | Display name of the project created on first boot. |
| `LANGFUSE_INIT_USER_PASSWORD` | langfuse-web | (secret) | Password for the first admin account. Langfuse requires at least 8 characters. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | auto | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_BUCKET so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | Key prefix for uploaded media inside the bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | auto | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_REGION so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | langfuse-web | - | Public API key created on first boot. Use it as the username in Basic auth when sending traces. |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | langfuse-web | (secret) | Secret API key created on first boot. Use it as the password in Basic auth. Treat it like a password. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-web | - | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE so screenshots and audio attachments land in the same MinIO bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Media upload setting, mirrors LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY so screenshots and audio attachments land in the same MinIO bucket. |
| `POSTGRES_DB` | Postgres | langfuse | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `bash -c "echo '<clickhouse><listen_host>::</listen_host></clickhouse>' > /etc/clickhouse-server/config.d/listen.xml && exec /entrypoint.sh"`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "mkdir -p /data/langfuse && exec minio server /data --address :9000 --console-address :9001"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --maxmemory-policy noeviction --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Healthcheck:** `/api/public/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse-observability-stack)
