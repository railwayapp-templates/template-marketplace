# Deploy Langfuse v4.6.0 (Production ready AI Observability) on Railway

Open-source LLM platform for prompt management, tracing, evals & metrics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-v410-production-ready-ai-observ)

## About

Langfuse is an open-source LLM engineering platform that helps teams collaboratively debug, analyze, and iterate on their LLM applications. This template deploys a production-ready Langfuse v4 stack on Railway with web, worker, and the required data services.

Hosting Langfuse v4 means running two application containers—`langfuse-web` and `langfuse-worker`—plus four infrastructure dependencies: PostgreSQL for transactional data, ClickHouse for high-volume observability analytics, Redis for caching and queues, and S3-compatible object storage (MinIO) for event uploads and large payloads. Traces are ingested via the web service, queued through Redis/object storage, then processed by the worker into ClickHouse. Railway wires private networking and volumes so the full stack comes up as one connected project with a public URL for the Langfuse UI and API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| langfuse-worker | `langfuse/langfuse-worker:4.6.0` | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16.11` | Database |
| clickhouse | `clickhouse/clickhouse-server:26.4` | Database |
| minio | `minio/minio` | Database |
| langfuse-web | `langfuse/langfuse:4.6.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | redis | 6379 |
| `REDISUSER` | redis | default |
| `REDISPASSWORD` | redis | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `REDIS_RDB_POLICY` | redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | redis | no |
| `ENCRYPTION_KEY` | langfuse-worker | 0000000000000000000000000000000000000000000000000000000000000000 |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | us-east-1 |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | us-east-1 |
| `LANGFUSE_MIGRATION_V4_WRITE_MODE` | langfuse-worker | events_only |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true |
| `LANGFUSE_MIGRATION_V4_ALLOW_PREVIEW_OPT_IN` | langfuse-worker | true |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |
| `LANGFUSE_MIGRATION_V4_NATIVE_OTEL_BEHAVIOUR` | langfuse-worker | direct |
| `POSTGRES_DB` | postgres | railway |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | clickhouse | 8123 |
| `PUBLIC_PORT` | clickhouse | 443 |
| `CLICKHOUSE_DB` | clickhouse | default |
| `INTERNAL_PORT` | clickhouse | 9000 |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_PRIVATE_PORT` | minio | 9000 |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `ENCRYPTION_KEY` | langfuse-web | 0000000000000000000000000000000000000000000000000000000000000000 |
| `CLICKHOUSE_USER` | langfuse-web | (secret) |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | us-east-1 |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | us-east-1 |
| `LANGFUSE_MIGRATION_V4_WRITE_MODE` | langfuse-web | events_only |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true |
| `LANGFUSE_MIGRATION_V4_ALLOW_PREVIEW_OPT_IN` | langfuse-web | true |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `LANGFUSE_MIGRATION_V4_NATIVE_OTEL_BEHAVIOUR` | langfuse-web | direct |

## Configuration

- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langfuse-v410-production-ready-ai-observ)
