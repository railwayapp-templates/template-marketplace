# Deploy Langfuse v4 | Open Source LangSmith Alternative for LLM Observability on Railway

Self-hosted LLM tracing and evals on Langfuse v4, old and new SDKs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-v4)

## About

Langfuse is open-source LLM engineering: tracing for every model call and agent step, prompt management with versioning, evaluations, and cost and latency analytics. Point any SDK or OpenTelemetry exporter at it and see what your AI application actually did, instead of guessing from application logs.

Langfuse v4 rebuilt the storage layer: traces and observations that used to live in two joined tables are now one denormalised, append-only observations table, so table views and dashboards resolve without a join at query time. Everything else about self-hosting it stays the same shape — and that shape is six containers, not one.

This template wires them together: the web application, the background worker, PostgreSQL 17 for accounts, projects and prompts, ClickHouse 26.4 for the observation store, Valkey for the queue between web and worker, and S3-compatible object storage for event and media uploads. Credentials are generated per deployment, the services talk over the private network, and ClickHouse, Postgres, Valkey and the object store each get a volume.

Only the web service is published. Postgres, ClickHouse, Valkey and the object store stay private, reachable by the application and by nothing else.

**Both SDK generations work out of the box.** v4 defaults to an ingestion mode that rejects anything older than Python SDK 4.7 or JS/TS 5.4 — the legacy `/api/public/ingestion` endpoint answers 400 and the legacy read endpoints answer 404. This template ships `LANGFUSE_MIGRATION_V4_WRITE_MODE=dual` instead, so both the new OpenTelemetry path and every older SDK are accepted and readable. Set it to `events_only` once all your applications are on current SDKs: it halves what ClickHouse stores and is the mode Langfuse recommends long-term.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:26.4.5.143` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17.11` | Database |
| langfuse-web | `langfuse/langfuse:4.14.0` | Web service |
| langfuse-worker | `langfuse/langfuse-worker:4.14.0` | Worker |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| valkey | `valkey/valkey:8.1.9-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | clickhouse | 8123 | - |
| `PUBLIC_PORT` | clickhouse | 443 | - |
| `DATABASE_URL` | clickhouse | - | PostgreSQL connection string for accounts, projects, prompts and datasets. |
| `CLICKHOUSE_DB` | clickhouse | default | - |
| `INTERNAL_PORT` | clickhouse | 9000 | - |
| `CLICKHOUSE_USER` | clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | ClickHouse password. Generated per deployment. |
| `POSTGRES_DB` | postgres | railway | - |
| `DATABASE_URL` | postgres | - | PostgreSQL connection string for accounts, projects, prompts and datasets. |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated per deployment. |
| `SALT` | langfuse-web | - | Hashes API keys at rest. Generated per deployment; changing it invalidates every issued key. |
| `DATABASE_URL` | langfuse-web | - | PostgreSQL connection string for accounts, projects, prompts and datasets. |
| `NEXTAUTH_URL` | langfuse-web | - | Public URL of this deployment. Must match the address you actually open, or sign-in redirects fail. Update it if you attach a custom domain. |
| `CLICKHOUSE_URL` | langfuse-web | - | HTTP endpoint of the observation store, over the private network. |
| `ENCRYPTION_KEY` | langfuse-web | - | Encrypts stored API keys and LLM credentials. Back it up — losing it means losing access to them. 64 hex characters. |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | - |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Signs session cookies. Generated per deployment; rotating it logs everyone out. |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | ClickHouse password. Generated per deployment. |
| `REDIS_CONNECTION_STRING` | langfuse-web | - | Queue between web and worker. Carries ?family=6 because Railway's private network is IPv6-only. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-web | - | Native-protocol endpoint used for schema migrations on boot. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | Single-node deployment, so clustering stays off. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse | Bucket for raw ingestion events. Created automatically on the bundled object store. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | us-east-1 | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse | Bucket for media attached to traces (images, audio). |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | us-east-1 | - |
| `LANGFUSE_MIGRATION_V4_WRITE_MODE` | langfuse-web | dual | v4 ingestion compatibility. `dual` (default here) accepts both the new SDKs (Python >=4.7, JS >=5.4, OpenTelemetry) and every older one. Switch to `events_only` once all your apps are on current SDKs — ClickHouse then stores half as much. `legacy` keeps v3 behaviour. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |
| `SALT` | langfuse-worker | - | Hashes API keys at rest. Generated per deployment; changing it invalidates every issued key. |
| `DATABASE_URL` | langfuse-worker | - | PostgreSQL connection string for accounts, projects, prompts and datasets. |
| `CLICKHOUSE_URL` | langfuse-worker | - | HTTP endpoint of the observation store, over the private network. |
| `ENCRYPTION_KEY` | langfuse-worker | - | Encrypts stored API keys and LLM credentials. Back it up — losing it means losing access to them. 64 hex characters. |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | - |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password. Generated per deployment. |
| `REDIS_CONNECTION_STRING` | langfuse-worker | - | Queue between web and worker. Carries ?family=6 because Railway's private network is IPv6-only. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | Native-protocol endpoint used for schema migrations on boot. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Single-node deployment, so clustering stays off. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | Bucket for raw ingestion events. Created automatically on the bundled object store. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | us-east-1 | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | Bucket for media attached to traces (images, audio). |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | us-east-1 | - |
| `LANGFUSE_MIGRATION_V4_WRITE_MODE` | langfuse-worker | dual | v4 ingestion compatibility. `dual` (default here) accepts both the new SDKs (Python >=4.7, JS >=5.4, OpenTelemetry) and every older one. Switch to `events_only` once all your apps are on current SDKs — ClickHouse then stores half as much. `legacy` keeps v3 behaviour. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |
| `MINIO_ROOT_USER` | minio | (secret) | Object store root user. Generated per deployment. |
| `MINIO_PRIVATE_PORT` | minio | 9000 | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Object store root password. Generated per deployment. |
| `REDISHOST` | valkey | - | Приватный хост Valkey. |
| `REDISPORT` | valkey | 6379 | Порт Valkey. |
| `REDISUSER` | valkey | default | Пользователь Valkey. |
| `REDIS_URL` | valkey | - | Строка подключения для Langfuse по приватной сети. |
| `REDISPASSWORD` | valkey | (secret) | Пароль Valkey (алиас). |
| `REDIS_PASSWORD` | valkey | (secret) | Valkey password, applied via the start command. Generated per deployment. |

## Configuration

- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction --dir /data'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langfuse-v4)
