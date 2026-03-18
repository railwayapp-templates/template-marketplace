# Deploy Langfuse | Open Source LLM Observability (DataDog Alternative) on Railway

Self Host Langfuse on Railway. Traces, Evals & Prompt Management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse)

## About

🪢 Langfuse is an open-source LLM engineering platform that gives teams full visibility into their AI applications — traces, evals, prompt management, cost tracking, and dashboards, all in one place. 

Self-host Langfuse on Railway with a one-click deploy and get the exact same platform that powers Langfuse Cloud, running entirely on your own infrastructure.

![Langfuse Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773733718/langfuse_railway_arc_inxyij.png)

---

Langfuse is purpose-built for LLM applications — it understands token usage, model parameters, prompt/completion pairs, multi-turn conversations, and agentic workflows natively. Traditional APM tools tell you if your service is up; Langfuse tells you whether your model is actually performing well.

**Key features:**
- 🔍 **Tracing** — nested traces for every LLM call, retrieval step, tool call, and custom logic with full context
- 📝 **Prompt Management** — version-controlled prompts with server + client-side caching and zero added latency
- 🧪 **Evaluations** — LLM-as-a-Judge, user feedback collection, manual labeling, and custom eval pipelines
- 📊 **Datasets** — test sets for pre-deployment benchmarks and continuous regression testing
- 🛝 **Playground** — jump directly from a bad trace to the prompt editor to iterate and fix
- 🔗 **50+ integrations** — OpenAI SDK, LangChain, LlamaIndex, LiteLLM, OpenTelemetry, and more
- 🔓 **MIT licensed** — no usage caps, no telemetry when self-hosted, full data ownership

The v3 architecture queues all incoming trace events to S3 (MinIO) immediately on receipt, then the worker ingests them into ClickHouse asynchronously. This means traffic spikes never cause trace loss or UI slowdowns.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langfuse Worker | `langfuse/langfuse-worker:3` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Langfuse Web | `langfuse/langfuse:3` | Web service |
| Clickhouse | `clickhouse/clickhouse-server:24` | Database |
| Redis | `redis:8.2.1` | Database |
| Minio | `minio/minio` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SALT` | Langfuse Worker | - | Salt used for hashing operations |
| `REDIS_AUTH` | Langfuse Worker | - | Redis authentication password |
| `REDIS_HOST` | Langfuse Worker | - | Redis service host address |
| `REDIS_PORT` | Langfuse Worker | - | Redis service port |
| `DATABASE_URL` | Langfuse Worker | - | Postgres database connection string |
| `CLICKHOUSE_URL` | Langfuse Worker | - | ClickHouse HTTP interface URL |
| `ENCRYPTION_KEY` | Langfuse Worker | - | Encryption key for sensitive data |
| `CLICKHOUSE_USER` | Langfuse Worker | (secret) | ClickHouse authentication username |
| `CLICKHOUSE_PASSWORD` | Langfuse Worker | (secret) | ClickHouse authentication password |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse Worker | - | ClickHouse migration connection URL |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse Worker | false | Disable ClickHouse cluster mode |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | Langfuse Worker | langfuse | S3 bucket for batch export |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | Langfuse Worker | auto | S3 region configuration value |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse Worker | langfuse | S3 bucket for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse Worker | events/ | Prefix path for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse Worker | auto | S3 region configuration value |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse Worker | langfuse | S3 bucket for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse Worker | media/ | Prefix path for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse Worker | auto | S3 region configuration value |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Langfuse Worker | false | Disable SSL certificate verification |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | Langfuse Worker | false | Enable or disable batch export |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | Langfuse Worker | - | Internal S3 endpoint for export |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse Worker | - | Internal S3 endpoint for events |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | Langfuse Worker | - | Public S3 endpoint for media |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | Langfuse Worker | minio | S3 access key for batch export |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse Worker | minio | S3 access key for events |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse Worker | minio | S3 access key for media |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | Langfuse Worker | true | Force path-style S3 requests |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse Worker | true | Force path-style S3 requests |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse Worker | true | Force path-style S3 requests |
| `LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT` | Langfuse Worker | - | External S3 endpoint for export |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | S3 secret key for export |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | S3 secret key for events |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | S3 secret key for media |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Langfuse Web | 3000 | HTTP server listening port |
| `SALT` | Langfuse Web | - | Salt used for hashing operations |
| `REDIS_AUTH` | Langfuse Web | - | Redis authentication password |
| `REDIS_HOST` | Langfuse Web | - | Redis service host address |
| `REDIS_PORT` | Langfuse Web | - | Redis service port |
| `DATABASE_URL` | Langfuse Web | - | Postgres database connection string |
| `NEXTAUTH_URL` | Langfuse Web | - | Public application base URL |
| `CLICKHOUSE_URL` | Langfuse Web | - | ClickHouse HTTP interface URL |
| `ENCRYPTION_KEY` | Langfuse Web | - | Encryption key for sensitive data |
| `CLICKHOUSE_USER` | Langfuse Web | (secret) | ClickHouse authentication username |
| `NEXTAUTH_SECRET` | Langfuse Web | (secret) | Secret for NextAuth session signing |
| `AUTH_DISABLE_SIGNUP` | Langfuse Web | - | Left empty intentionally. Set to 'false' for first signup; it becomes admin, then set true to disable further registrations (see setup guide: https://railway.app/template/your-template) |
| `CLICKHOUSE_PASSWORD` | Langfuse Web | (secret) | ClickHouse authentication password |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse Web | - | ClickHouse migration connection URL |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse Web | false | Disable ClickHouse cluster mode |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse Web | langfuse | S3 bucket for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse Web | events/ | Prefix path for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse Web | auto | S3 region configuration value |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse Web | langfuse | S3 bucket for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse Web | media/ | Prefix path for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse Web | auto | S3 region configuration value |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Langfuse Web | false | Disable SSL certificate verification |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse Web | - | Internal S3 endpoint for events |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | Langfuse Web | - | Public S3 endpoint for media |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse Web | minio | S3 access key for events |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse Web | minio | S3 access key for media |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse Web | true | Force path-style S3 requests |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse Web | true | Force path-style S3 requests |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Web | (secret) | S3 secret key for events |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Web | (secret) | S3 secret key for media |
| `CLICKHOUSE_DB` | Clickhouse | default | Default ClickHouse database name |
| `CLICKHOUSE_USER` | Clickhouse | (secret) | ClickHouse default user |
| `CLICKHOUSE_PASSWORD` | Clickhouse | (secret) | ClickHouse authentication password |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | Clickhouse | 1 | Enable default access management |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `MINIO_ROOT_USER` | Minio | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | Minio | (secret) | MinIO root user password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse)
