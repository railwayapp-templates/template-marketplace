# Deploy Langfuse v3 on Railway

Self-hosted LLM observability: tracing, evals & prompt management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-v3)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/langfuse-v3)

Langfuse is an open-source LLM observability platform — the self-hosted alternative to LangSmith. It gives you tracing, metrics, evals, and prompt management for your LLM applications in one place.

This template deploys the production Langfuse v3 stack on Railway as a 6-service application:

| Service | Purpose |
|---------|---------|
| langfuse-web | Next.js app server (frontend + API), port 3000 |
| langfuse-worker | Background job processor |
| postgres | Primary database (`postgres:17` with pgvector) |
| clickhouse | Analytics database for event traces |
| redis | Cache + BullMQ job queue |
| minio | S3-compatible object storage for media and batch exports |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:25.12` | Database |
| postgres | `postgres:17` | Database |
| langfuse-worker | [INAPP-Mobile/railway-langfuse-v3](https://github.com/INAPP-Mobile/railway-langfuse-v3) (root: services/langfuse-worker) | Worker |
| redis | [INAPP-Mobile/railway-langfuse-v3](https://github.com/INAPP-Mobile/railway-langfuse-v3) (root: services/redis) | Database |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| langfuse-web | [INAPP-Mobile/railway-langfuse-v3](https://github.com/INAPP-Mobile/railway-langfuse-v3) (root: services/langfuse-web) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | clickhouse | default | Default ClickHouse database. Langfuse uses this for analytics data. Referenced as ${{clickhouse.CLICKHOUSE_DB}}. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | ClickHouse username. Referenced by Langfuse as ${{clickhouse.CLICKHOUSE_USER}}. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | ClickHouse password. Auto-generated at deploy time. Referenced by Langfuse as ${{clickhouse.CLICKHOUSE_PASSWORD}}. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Allow the default user to manage access control so Langfuse can create its tables. |
| `POSTGRES_DB` | postgres | langfuse | Default database name. Langfuse uses this database for all its data. |
| `DATABASE_URL` | postgres | - | Self-referencing connection string. Consumed by the postgres service itself and referenced by Langfuse as ${{postgres.DATABASE_URL}}. |
| `POSTGRES_PORT` | postgres | 5432 | Port PostgreSQL listens on inside the container. Must stay 5432. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser username. Referenced by langfuse-web and langfuse-worker as ${{postgres.POSTGRES_USER}}. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL superuser password. Auto-generated at deploy time. Referenced in DATABASE_URL as ${{POSTGRES_PASSWORD}}. |
| `PORT` | langfuse-worker | 3030 | Internal HTTP port the Langfuse worker listens on. |
| `SALT` | langfuse-worker | - | Must match langfuse-web exactly — companion-referenced. |
| `REDIS_AUTH` | langfuse-worker | - | Redis password — companion-referenced so consumer and producer always match. |
| `REDIS_HOST` | langfuse-worker | - | Redis hostname, wired to the companion Redis service. |
| `REDIS_PORT` | langfuse-worker | - | Redis port, companion-referenced. |
| `DATABASE_URL` | langfuse-worker | - | PostgreSQL connection string, companion-referenced to the postgres service. |
| `NEXTAUTH_URL` | langfuse-worker | - | Public URL of the Langfuse web service — the worker builds links against it. |
| `CLICKHOUSE_URL` | langfuse-worker | - | ClickHouse HTTP endpoint, wired to the companion ClickHouse service. |
| `ENCRYPTION_KEY` | langfuse-worker | - | Must match langfuse-web exactly — companion-referenced. Web and worker encrypt with the same key. |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | ClickHouse username, matching the companion service. |
| `NEXTAUTH_SECRET` | langfuse-worker | (secret) | Must match langfuse-web exactly — companion-referenced. |
| `TELEMETRY_ENABLED` | langfuse-worker | false | Anonymous usage telemetry. Disabled by default in this template. |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password — companion-referenced so consumer and producer always match. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | ClickHouse native-protocol URL used by migrations. Companion-referenced, no literals. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Single-node ClickHouse: disable cluster migrations so no ZooKeeper/Keeper is required. |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | langfuse-worker | langfuse | S3 bucket for batch exports. |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | langfuse-worker | auto | S3 region for batch exports (MinIO expects "auto"). |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | S3 bucket for event uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | Key prefix for event upload objects. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | auto | S3 region for event uploads (MinIO expects "auto"). |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | S3 bucket for media uploads. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | Key prefix for media upload objects. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | auto | S3 region for media uploads (MinIO expects "auto"). |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | langfuse-worker | false | Batch export to S3. Off by default; flip to true to enable. |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | langfuse-worker | - | Internal MinIO endpoint for batch exports. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | Internal MinIO endpoint used by the server for event uploads. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | PUBLIC MinIO endpoint used by browsers for presigned media uploads. |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | langfuse-worker | - | MinIO access key for batch exports — companion-referenced. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | MinIO access key for event uploads — companion-referenced. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | MinIO access key for media uploads — companion-referenced. |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | langfuse-worker | true | Use path-style S3 URLs (required for MinIO). |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Use path-style S3 URLs (required for MinIO). |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Use path-style S3 URLs (required for MinIO). |
| `LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT` | langfuse-worker | - | Public MinIO endpoint browsers use to download export files. |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | MinIO secret key for batch exports — companion-referenced. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | MinIO secret key for event uploads — companion-referenced. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | MinIO secret key for media uploads — companion-referenced. |
| `REDIS_AUTH` | redis | - | Redis password (requirepass). Auto-generated at deploy time. Referenced by langfuse-web and langfuse-worker as ${{redis.REDIS_AUTH}}. |
| `REDIS_HOST` | redis | - | Redis internal hostname. Referenced by Langfuse as ${{redis.REDIS_HOST}}. |
| `REDIS_PORT` | redis | 6379 | Redis server listening port. Referenced by Langfuse as ${{redis.REDIS_PORT}}. |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root username. Referenced by Langfuse as ${{minio.MINIO_ROOT_USER}}. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | MinIO root password. Auto-generated at deploy time. Referenced by Langfuse as ${{minio.MINIO_ROOT_PASSWORD}}. |
| `PORT` | langfuse-web | 3000 | HTTP port Langfuse web listens on. |
| `SALT` | langfuse-web | - | Salt used for hashing API keys. Auto-generated at deploy time. Referenced by langfuse-worker. |
| `REDIS_AUTH` | langfuse-web | - | Redis password — companion-referenced so consumer and producer always match. |
| `REDIS_HOST` | langfuse-web | - | Redis hostname, wired to the companion Redis service. |
| `REDIS_PORT` | langfuse-web | - | Redis port, companion-referenced. |
| `DATABASE_URL` | langfuse-web | - | PostgreSQL connection string, companion-referenced to the postgres service DATABASE_URL. |
| `NEXTAUTH_URL` | langfuse-web | - | Public URL of this Langfuse deployment. Auto-resolves so OAuth callbacks and email links work out of the box. |
| `CLICKHOUSE_URL` | langfuse-web | - | ClickHouse HTTP endpoint, wired to the companion ClickHouse service. |
| `ENCRYPTION_KEY` | langfuse-web | - | 64-character hex key encrypting sensitive data at rest. Must be 256 bits. Referenced by langfuse-worker. |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | ClickHouse username, matching the companion service. |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Cryptographic key used to sign session cookies and JWTs. Auto-generated 64-char hex at deploy time. |
| `TELEMETRY_ENABLED` | langfuse-web | false | Anonymous usage telemetry. Disabled by default in this template. |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | ClickHouse password — companion-referenced so consumer and producer always match. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-web | - | ClickHouse native-protocol URL used by migrations. Companion-referenced, no literals. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | Single-node ClickHouse: disable cluster migrations so no ZooKeeper/Keeper is required. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse | S3 bucket for event uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | Key prefix for event upload objects. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | auto | S3 region for event uploads (MinIO expects "auto"). |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse | S3 bucket for media uploads. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | Key prefix for media upload objects. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | auto | S3 region for media uploads (MinIO expects "auto"). |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-web | - | Internal MinIO endpoint used by the server for event uploads. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-web | - | PUBLIC MinIO endpoint used by browsers for presigned media uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | MinIO access key for event uploads — companion-referenced. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | MinIO access key for media uploads — companion-referenced. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Use path-style S3 URLs (required for MinIO). |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Use path-style S3 URLs (required for MinIO). |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | MinIO secret key for event uploads — companion-referenced. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | MinIO secret key for media uploads — companion-referenced. |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/data`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server /data --address 0.0.0.0:9000 --console-address 0.0.0.0:9001'`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`

**Category:** Observability · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/langfuse-v3)
