# Deploy langfuse-source-20260617d on Railway

Langfuse v3 observability with ClickHouse, Postgres, Redis, and S3.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-source-20260617d)

## About

Self-host Langfuse v3, an open-source LLM observability platform, with Postgres, ClickHouse, Redis, MinIO object storage, a web service, and a worker service.

- `web`: public Langfuse UI/API service on port `3000`
- `worker`: private background worker service on port `3030`
- `postgres`: private transactional database
- `clickhouse`: private OLAP store for traces, observations, scores, and metrics
- `redis`: private cache and queue service with `noeviction`
- `minio`: S3-compatible object storage for event/media/batch-export blobs
- Generated secrets for auth, encryption, Postgres, ClickHouse, Redis, and MinIO

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7` | Database |
| web | `langfuse/langfuse:3` | Web service |
| postgres | `postgres:17` | Database |
| clickhouse | `clickhouse/clickhouse-server:25.5.6` | Database |
| worker | `langfuse/langfuse-worker:3` | Worker |
| minio | `quay.io/minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CLICKHOUSE_USER` | web | (secret) |
| `NEXTAUTH_SECRET` | web | (secret) |
| `CLICKHOUSE_PASSWORD` | web | (secret) |
| `LANGFUSE_INIT_USER_PASSWORD` | web | (secret) |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | web | (secret) |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | web | (secret) |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | web | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | web | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_USER` | worker | (secret) |
| `CLICKHOUSE_PASSWORD` | worker | (secret) |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | worker | (secret) |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | worker | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | worker | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |

## Configuration

- **Start command:** `/bin/sh -lc 'exec redis-server --appendonly yes --dir /data --requirepass "$REDIS_AUTH" --maxmemory-policy noeviction'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -lc 'mkdir -p /data/langfuse && exec minio server --address ":9000" --console-address ":9001" /data'`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse-source-20260617d)
