# Deploy Langfuse — Self-Hosted LLM Observability on Railway

Self-host Langfuse — LLM traces, evals & prompt management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-llm-observability)

## About

Langfuse is the open-source LLM observability platform — traces, evaluations, prompt management, and cost tracking for your AI applications, self-hosted so your prompt and trace data never leaves your infrastructure. Instrument any LLM app (OpenAI, Anthropic, LangChain, LlamaIndex, or raw OpenTelemetry) and see every call: inputs, outputs, latency, tokens, and cost, in one dashboard. This template deploys Langfuse v3's full stack — web, worker, PostgreSQL, ClickHouse, Redis, and object storage — correctly wired, so the multi-service setup that stops most self-hosters just works.

---

Langfuse v3 is a serious observability stack, and three specifics decide whether it works — all handled here.

**It's a six-service architecture — ClickHouse is the key piece.** Langfuse v3 split trace storage out of PostgreSQL into ClickHouse, a columnar OLAP database that runs aggregations over hundreds of thousands of traces in milliseconds. Postgres holds transactional data, ClickHouse holds the high-volume traces, Redis queues ingestion, and object storage persists raw events. The web and worker run the same image in two roles. Wiring these six together with matched credentials is the entire difficulty of self-hosting Langfuse, and this template does it.

**`ENCRYPTION_KEY` must be exactly 64 hex characters.** Langfuse needs three secrets: `NEXTAUTH_SECRET` and `SALT` (32-byte base64), and `ENCRYPTION_KEY`, which must be *exactly* 64 hex characters (`openssl rand -hex 32`). A wrong length fails startup. This template generates all three, and they must stay stable across redeploys.

**ClickHouse and Postgres must run in UTC — or your data looks wrong.** The subtle trap: a non-UTC timezone makes queries return incorrect or empty results — traces appear to ingest but show wrong data, a silent failure that's maddening to debug. This template sets the databases to UTC.

**Your org, project, and API keys are created on first boot.** The `LANGFUSE_INIT_*` variables auto-create your first organization, project, and a usable API key pair on deploy, so you can send traces immediately. The first account you register becomes the admin. ClickHouse takes the longest to start (~30–60s), so a brief first-boot delay is normal.

One note: Langfuse was acquired by ClickHouse in January 2026, but the core remains MIT-licensed and fully self-hostable, with active maintenance and first-class OpenTelemetry ingestion.

Typical cost: **~$20–30/month** on Railway across the six services, more under heavy trace volume. Langfuse is MIT-licensed and free — versus per-seat or per-event observability SaaS.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langfuse Worker | `langfuse/langfuse-worker:3` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Langfuse Web | `langfuse/langfuse:3` | Worker |
| Minio | `minio/minio` | Database |
| Clickhouse | `clickhouse/clickhouse-server:24` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_USER` | Langfuse Worker | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Langfuse Worker | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse Worker | false | - |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | Langfuse Worker | langfuse | - |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | Langfuse Worker | auto | - |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse Worker | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse Worker | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse Worker | auto | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse Worker | langfuse | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse Worker | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse Worker | auto | - |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Langfuse Worker | false | - |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | Langfuse Worker | false | - |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | Langfuse Worker | minio | - |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse Worker | minio | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse Worker | minio | - |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | Langfuse Worker | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse Worker | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse Worker | true | - |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | Langfuse Web | 3000 | - |
| `CLICKHOUSE_USER` | Langfuse Web | (secret) | - |
| `NEXTAUTH_SECRET` | Langfuse Web | (secret) | - |
| `AUTH_DISABLE_SIGNUP` | Langfuse Web | - | Left empty intentionally. Set to 'false' for first signup; it becomes admin, then set true to disable further registrations (see setup guide: https://railway.app/template/your-template) |
| `CLICKHOUSE_PASSWORD` | Langfuse Web | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse Web | false | - |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse Web | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse Web | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse Web | auto | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse Web | langfuse | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse Web | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse Web | auto | - |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Langfuse Web | false | - |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse Web | minio | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse Web | minio | - |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse Web | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse Web | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Web | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Web | (secret) | - |
| `MINIO_ROOT_USER` | Minio | (secret) | - |
| `MINIO_ROOT_PASSWORD` | Minio | (secret) | - |
| `CLICKHOUSE_DB` | Clickhouse | default | - |
| `CLICKHOUSE_USER` | Clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Clickhouse | (secret) | - |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | Clickhouse | 1 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langfuse-llm-observability)
