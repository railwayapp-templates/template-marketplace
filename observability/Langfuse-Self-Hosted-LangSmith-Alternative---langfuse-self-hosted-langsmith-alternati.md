# Deploy Langfuse (Self-Hosted LangSmith Alternative) on Railway

Self-hosted LLM observability & tracing — a LangSmith alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-self-hosted-langsmith-alternati)

## About

[Updated Aug '26] Langfuse is an open-source LLM engineering platform for tracing, prompt management, evaluations, and analytics — a self-hosted alternative to LangSmith. This template deploys the full v3 stack (web app, async worker, Postgres, ClickHouse, Redis, and MinIO S3 storage) so traces, evals, and dashboards work out of the box, with every secret auto-generated and services wired over Railway’s private network.

Hosting Langfuse means running six coordinated services: a Next.js web app, a background worker, Postgres for transactional data, ClickHouse for high-volume trace analytics, Redis for the queue, and an S3-compatible object store (MinIO) for event and media blobs. This template pins every image to a known-good tag, generates NEXTAUTH_SECRET, SALT, and a 64-character hex ENCRYPTION_KEY, points CLICKHOUSE_URL and CLICKHOUSE_MIGRATION_URL at the correct HTTP and native ports, and attaches a persistent volume to each stateful service. On first boot the web service runs database migrations and serves a sign-up page — create the first account to claim the instance. Note this is a genuine multi-service stack, so it uses more resources than a single-container template; that is what makes tracing, evals, and analytics reliable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17` | Database |
| redis | `redis:7` | Database |
| langfuse | `langfuse/langfuse:3.225.2` | Web service |
| langfuse-worker | `langfuse/langfuse-worker:3.225.2` | Worker |
| clickhouse-server | `clickhouse/clickhouse-server:25.12` | Database |
| minio | `minio/minio:RELEASE.2025-04-08T15-41-24Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | postgres | Name of the default database Postgres creates on first boot |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser username |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated Postgres superuser password |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password (referenced by Langfuse web/worker via REDIS_AUTH) |
| `PORT` | langfuse | 3000 | Web server HTTP port (Railway routes the public domain here) |
| `SALT` | langfuse | - | Auto-generated salt for hashing API keys (the worker references this value) |
| `HOSTNAME` | langfuse | 0.0.0.0 | Bind to all interfaces so Railway can reach the web server |
| `REDIS_AUTH` | langfuse | - | Redis password (references the redis service) |
| `REDIS_HOST` | langfuse | - | Redis host (references the redis service private domain) |
| `REDIS_PORT` | langfuse | 6379 | Redis port |
| `DATABASE_URL` | langfuse | - | Postgres connection string (references the postgres service) |
| `NEXTAUTH_URL` | langfuse | - | Public URL of this Langfuse instance, used for auth callbacks (auto-set to the generated domain) |
| `CLICKHOUSE_URL` | langfuse | - | ClickHouse HTTP endpoint for analytics reads/writes |
| `ENCRYPTION_KEY` | langfuse | - | Auto-generated 64-char hex key encrypting stored integration secrets (the worker references this value) |
| `CLICKHOUSE_USER` | langfuse | (secret) | ClickHouse username (must match the clickhouse-server service) |
| `NEXTAUTH_SECRET` | langfuse | (secret) | Auto-generated NextAuth session-signing secret |
| `REDIS_TLS_ENABLED` | langfuse | false | Redis runs on the private network without TLS |
| `TELEMETRY_ENABLED` | langfuse | true | Send anonymous usage telemetry to Langfuse (set false to disable) |
| `CLICKHOUSE_PASSWORD` | langfuse | (secret) | ClickHouse password (references the clickhouse-server service) |
| `CLICKHOUSE_MIGRATION_URL` | langfuse | - | ClickHouse native protocol URL used only for schema migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse | false | Single-node ClickHouse; disable cluster mode |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse | langfuse | S3/MinIO bucket for raw event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse | events/ | Key prefix for event objects |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse | auto | S3 region (auto for MinIO) |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse | langfuse | S3/MinIO bucket for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse | media/ | Key prefix for media objects |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse | auto | S3 region (auto for MinIO) |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse | - | MinIO S3 endpoint for event uploads (references the minio service) |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse | - | MinIO S3 endpoint for media uploads (references the minio service) |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse | minio | S3 access key (MinIO root user) |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse | minio | S3 access key (MinIO root user) |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse | true | Use path-style S3 addressing (required for MinIO) |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse | true | Use path-style S3 addressing (required for MinIO) |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse | (secret) | S3 secret key (references the minio service root password) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse | (secret) | S3 secret key (references the minio service root password) |
| `PORT` | langfuse-worker | 3030 | Worker HTTP port (internal only, not publicly exposed) |
| `SALT` | langfuse-worker | - | Shared salt; references the Langfuse web service so web and worker match |
| `HOSTNAME` | langfuse-worker | 0.0.0.0 | Bind to all interfaces so Railway can reach the worker |
| `REDIS_AUTH` | langfuse-worker | - | Redis password (references the redis service) |
| `REDIS_HOST` | langfuse-worker | - | Redis host (references the redis service private domain) |
| `REDIS_PORT` | langfuse-worker | 6379 | Redis port |
| `DATABASE_URL` | langfuse-worker | - | Postgres connection string (references the postgres service) |
| `CLICKHOUSE_URL` | langfuse-worker | - | ClickHouse HTTP endpoint for analytics reads/writes |
| `ENCRYPTION_KEY` | langfuse-worker | - | Shared 64-char hex encryption key; references the Langfuse web service |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | ClickHouse username (must match the clickhouse-server service) |
| `REDIS_TLS_ENABLED` | langfuse-worker | false | Redis runs on the private network without TLS |
| `TELEMETRY_ENABLED` | langfuse-worker | true | Send anonymous usage telemetry to Langfuse (set false to disable) |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password (references the clickhouse-server service) |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | ClickHouse native protocol URL used only for schema migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Single-node ClickHouse; disable cluster mode |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | S3/MinIO bucket for raw event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | Key prefix for event objects |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | auto | S3 region (auto for MinIO) |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | S3/MinIO bucket for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | Key prefix for media objects |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | auto | S3 region (auto for MinIO) |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | MinIO S3 endpoint for event uploads (references the minio service) |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | MinIO S3 endpoint for media uploads (references the minio service) |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | minio | S3 access key (MinIO root user) |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | minio | S3 access key (MinIO root user) |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Use path-style S3 addressing (required for MinIO) |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Use path-style S3 addressing (required for MinIO) |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | S3 secret key (references the minio service root password) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | S3 secret key (references the minio service root password) |
| `CLICKHOUSE_DB` | clickhouse-server | default | ClickHouse database name used by Langfuse for analytics data |
| `CLICKHOUSE_USER` | clickhouse-server | (secret) | ClickHouse username (referenced by the Langfuse web and worker services) |
| `CLICKHOUSE_PASSWORD` | clickhouse-server | (secret) | Auto-generated ClickHouse password (referenced by Langfuse web/worker) |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root (admin) username, also used as the S3 access key by Langfuse |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Auto-generated MinIO root password / S3 secret key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse-self-hosted-langsmith-alternati)
