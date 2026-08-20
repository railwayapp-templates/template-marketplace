# Deploy Langfuse | Open Source LangSmith Alternative for LLM Observability on Railway

Self-hosted LLM tracing, prompt management and evaluations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/YJ_Ivb)

## About

Langfuse is open-source LLM engineering: tracing for every model call, prompt management with versioning, evaluations, and cost and latency analytics. Point any SDK at it and see what your AI application actually did, instead of guessing from application logs.

Langfuse v3 is not a single container. It is a web application, a background worker, PostgreSQL for transactional data, ClickHouse for the trace and observation store, Valkey for the queue between web and worker, and S3-compatible storage for event and media uploads. This template wires all six together with generated credentials, private networking between them, and persistent volumes on ClickHouse, Postgres, Valkey and object storage — the layout Langfuse's own self-hosting guide describes, on infrastructure you don't have to assemble.

Only the web service gets a public domain. Postgres, ClickHouse, Valkey and the object store stay on the private network, reachable by the application and by nothing else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey | `valkey/valkey:8.1.9-alpine` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16.15` | Database |
| langfuse-web | `langfuse/langfuse:3.225.2` | Web service |
| clickhouse | `clickhouse/clickhouse-server:24.12.6.70` | Database |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3.225.2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | valkey | - | Private host of Valkey. |
| `REDISPORT` | valkey | 6379 | Valkey port. |
| `REDISUSER` | valkey | default | Valkey user. |
| `REDIS_URL` | valkey | - | Connection string used by Langfuse over the private network. |
| `REDISPASSWORD` | valkey | (secret) | Valkey password (alias). |
| `REDIS_PASSWORD` | valkey | (secret) | Valkey password, applied via the start command. Generated per deployment. |
| `POSTGRES_DB` | postgres | railway | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | - |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | - |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | - |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | us-east-1 | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | us-east-1 | - |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |
| `PORT` | clickhouse | 8123 | - |
| `PUBLIC_PORT` | clickhouse | 443 | - |
| `CLICKHOUSE_DB` | clickhouse | default | - |
| `INTERNAL_PORT` | clickhouse | 9000 | - |
| `CLICKHOUSE_USER` | clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | - |
| `MINIO_ROOT_USER` | minio | (secret) | - |
| `MINIO_PRIVATE_PORT` | minio | 9000 | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | - |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | - |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | - |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | us-east-1 | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | us-east-1 | - |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |

## Configuration

- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/YJ_Ivb)
