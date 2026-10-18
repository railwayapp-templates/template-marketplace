# Deploy Langfuse on Railway

Langfuse LLM observability V4 Pro Stack. Langfuse ClickHouse/S3. Lang Fuse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-v4-1)

## About

[Deploy Langfuse V4 on Railway](https://railway.com/deploy/langfuse-v4-1) to trace, debug and evaluate AI applications on infrastructure you control. This **Langfuse Pro Stack** runs **Langfuse 4.59.0** with a matching worker, native PostgreSQL, ClickHouse, Redis and a private Railway S3-compatible Bucket.

Langfuse, also searched as **Lang Fuse**, records model/agent observations, latency and supplied usage/cost metadata. Your **administrator, organization, project and API keys are created at startup**. No model key or custom domain is required.

| Resource | Version / purpose |
| --- | --- |
| Langfuse | 4.59.0 dashboard, authentication, API and OTLP ingestion |
| Langfuse Worker | 4.59.0 background processing |
| Postgres | Native SSL PostgreSQL 17.11, metadata/configuration volume |
| ClickHouse | 26.4.5.143, observation storage/analytics volume |
| Redis | Native Railway 8.2, persistent queues with AOF/RDB and `noeviction` |
| Railway Bucket | Private S3-compatible event, media and export storage |

Only Langfuse has a public domain. Services connect privately; the Bucket uses authenticated S3 and signed media/export URLs. Web and worker share storage/secret references. Standard database variables support Railway tooling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| ClickHouse | `clickhouse/clickhouse-server:26.4.5.143` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17.11` | Database |
| Langfuse Worker | `langfuse/langfuse-worker:4.59.0` | Worker |
| Langfuse | `langfuse/langfuse:4.59.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password used by the web and worker services over private networking. Preserve with the Redis volume. |
| `TZ` | ClickHouse | UTC | Use UTC for consistent trace timestamps. |
| `PORT` | ClickHouse | 8123 | Private HTTP port used by Langfuse and the /ping healthcheck. |
| `CLICKHOUSE_DB` | ClickHouse | default | Database for trace and observation tables. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Dedicated database user for Langfuse. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Generated password referenced by Langfuse web and worker. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Allow Langfuse migrations to create and manage required database objects. |
| `TZ` | Postgres | UTC | Container timezone; UTC is required for consistent timestamps. |
| `PGTZ` | Postgres | UTC | PostgreSQL session timezone; keep UTC. |
| `POSTGRES_DB` | Postgres | langfuse | Database name for Langfuse accounts, projects and settings. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | Application database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. Preserve with the PostgreSQL data volume. |
| `PORT` | Langfuse Worker | 3030 | Private HTTP port for worker health and readiness checks. |
| `SALT` | Langfuse Worker | - | API-key hashing salt shared with the web service. Keep stable. |
| `HOSTNAME` | Langfuse Worker | 0.0.0.0 | Listen on all interfaces so Railway can reach the application. |
| `REDIS_AUTH` | Langfuse Worker | - | Generated Redis password supplied through the standard Railway alias. |
| `REDIS_HOST` | Langfuse Worker | - | Private Redis hostname supplied by the native Railway database service. |
| `REDIS_PORT` | Langfuse Worker | - | Redis port supplied by the native Railway database service. |
| `DATABASE_URL` | Langfuse Worker | - | Private PostgreSQL URL for accounts, projects, prompts and settings. |
| `NEXTAUTH_URL` | Langfuse Worker | - | Public instance URL shared with the web service. |
| `NODE_OPTIONS` | Langfuse Worker | --max-old-space-size=3072 | Limit the Node.js heap to 3 GB; increase alongside allocated memory for larger workloads. |
| `CLICKHOUSE_DB` | Langfuse Worker | default | ClickHouse database used for trace and observation tables. |
| `CLICKHOUSE_URL` | Langfuse Worker | - | Private ClickHouse HTTP endpoint used to read and write observations. |
| `ENCRYPTION_KEY` | Langfuse Worker | - | Encryption key shared with the web service. Keep stable and back up. |
| `REDIS_USERNAME` | Langfuse Worker | (secret) | Redis ACL username supplied by the native Railway database service. |
| `CLICKHOUSE_USER` | Langfuse Worker | (secret) | ClickHouse user provisioned by the database service. |
| `NEXTAUTH_SECRET` | Langfuse Worker | (secret) | Session secret shared with the web service. |
| `REDIS_TLS_ENABLED` | Langfuse Worker | false | False for Redis over Railway private networking. |
| `TELEMETRY_ENABLED` | Langfuse Worker | false | Disable optional Langfuse product telemetry. |
| `CLICKHOUSE_PASSWORD` | Langfuse Worker | (secret) | Generated ClickHouse password shared through a service reference. |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse Worker | - | Private ClickHouse native endpoint used for schema migrations. |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse Worker | false | False for this single-node ClickHouse deployment. |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | Langfuse Worker | - | batch export: Native Railway bucket name. |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | Langfuse Worker | exports/ | Separate object prefix for batch export. |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | Langfuse Worker | - | batch export: Native bucket region. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse Worker | - | event upload: Native Railway bucket name. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse Worker | events/ | Separate object prefix for event upload. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse Worker | - | event upload: Native bucket region. |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse Worker | - | media upload: Native Railway bucket name. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse Worker | media/ | Separate object prefix for media upload. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse Worker | - | media upload: Native bucket region. |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | Langfuse Worker | true | Enable exports to the native Railway bucket. |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | Langfuse Worker | - | batch export: Native bucket HTTPS endpoint, also usable for browser presigned URLs. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse Worker | - | event upload: Native bucket HTTPS endpoint, also usable for browser presigned URLs. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | Langfuse Worker | - | media upload: Native bucket HTTPS endpoint, also usable for browser presigned URLs. |
| `LANGFUSE_S3_MEDIA_MAX_CONTENT_LENGTH` | Langfuse Worker | 100000000 | Maximum media upload size in bytes, about 100 MB. |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | Langfuse Worker | - | batch export: Native bucket access key, supplied automatically by Railway. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse Worker | - | event upload: Native bucket access key, supplied automatically by Railway. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse Worker | - | media upload: Native bucket access key, supplied automatically by Railway. |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | Langfuse Worker | false | batch export: Use virtual-hosted addressing required by Railway buckets. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse Worker | false | event upload: Use virtual-hosted addressing required by Railway buckets. |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse Worker | false | media upload: Use virtual-hosted addressing required by Railway buckets. |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | batch export: Native bucket secret, supplied automatically by Railway. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | event upload: Native bucket secret, supplied automatically by Railway. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse Worker | (secret) | media upload: Native bucket secret, supplied automatically by Railway. |
| `LANGFUSE_OTEL_INGESTION_QUEUE_PROCESSING_CONCURRENCY` | Langfuse Worker | 2 | Concurrent OTLP ingestion jobs; increase alongside worker resources for higher throughput. |
| `PORT` | Langfuse | 3000 | HTTP port for the public Langfuse interface. |
| `SALT` | Langfuse | - | Generated API-key hashing salt. Preserve together with the databases. |
| `HOSTNAME` | Langfuse | 0.0.0.0 | Listen on all interfaces so Railway can reach the application. |
| `REDIS_AUTH` | Langfuse | - | Generated Redis password supplied through the standard Railway alias. |
| `REDIS_HOST` | Langfuse | - | Private Redis hostname supplied by the native Railway database service. |
| `REDIS_PORT` | Langfuse | - | Redis port supplied by the native Railway database service. |
| `DATABASE_URL` | Langfuse | - | Private PostgreSQL URL for accounts, projects, prompts and settings. |
| `NEXTAUTH_URL` | Langfuse | - | Public HTTPS URL used for login callbacks and instance links. |
| `NODE_OPTIONS` | Langfuse | --max-old-space-size=3072 | Limit the Node.js heap to 3 GB; increase alongside allocated memory for larger workloads. |
| `CLICKHOUSE_DB` | Langfuse | default | ClickHouse database used for trace and observation tables. |
| `CLICKHOUSE_URL` | Langfuse | - | Private ClickHouse HTTP endpoint used to read and write observations. |
| `ENCRYPTION_KEY` | Langfuse | - | Generated 32-byte hex encryption key. Keep stable and back it up with the data. |
| `REDIS_USERNAME` | Langfuse | (secret) | Redis ACL username supplied by the native Railway database service. |
| `CLICKHOUSE_USER` | Langfuse | (secret) | ClickHouse user provisioned by the database service. |
| `NEXTAUTH_SECRET` | Langfuse | (secret) | Generated session-signing secret. Keep stable after deployment. |
| `REDIS_TLS_ENABLED` | Langfuse | false | False for Redis over Railway private networking. |
| `TELEMETRY_ENABLED` | Langfuse | false | Disable optional Langfuse product telemetry. |
| `AUTH_DISABLE_SIGNUP` | Langfuse | true | Close public registration; the initial administrator is provisioned automatically. |
| `CLICKHOUSE_PASSWORD` | Langfuse | (secret) | Generated ClickHouse password shared through a service reference. |
| `LANGFUSE_INIT_ORG_ID` | Langfuse | - | Unique initial organization ID. Keep stable after first startup. |
| `LANGFUSE_INIT_ORG_NAME` | Langfuse | My Organization | Name of the organization created during first startup. |
| `LANGFUSE_INIT_USER_NAME` | Langfuse | Admin | Display name of the initial administrator. |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse | - | Private ClickHouse native endpoint used for schema migrations. |
| `LANGFUSE_INIT_PROJECT_ID` | Langfuse | - | Unique initial project ID. Keep stable after first startup. |
| `LANGFUSE_INIT_USER_EMAIL` | Langfuse | admin@example.com | Initial owner email; works immediately. Set your own before first boot, or redeploy with a new email to create another owner. |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse | false | False for this single-node ClickHouse deployment. |
| `LANGFUSE_INIT_PROJECT_NAME` | Langfuse | My Project | Name of the project created during first startup. |
| `LANGFUSE_INIT_USER_PASSWORD` | Langfuse | (secret) | Generated initial administrator password. Copy from Railway variables to sign in; changing this variable does not reset existing users. |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | Langfuse | - | batch export: Native Railway bucket name. |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | Langfuse | exports/ | Separate object prefix for batch export. |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | Langfuse | - | batch export: Native bucket region. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse | - | event upload: Native Railway bucket name. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse | events/ | Separate object prefix for event upload. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse | - | event upload: Native bucket region. |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse | - | media upload: Native Railway bucket name. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse | media/ | Separate object prefix for media upload. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse | - | media upload: Native bucket region. |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | Langfuse | - | Generated public API key for the initial project. |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | Langfuse | (secret) | Generated secret API key for trace ingestion. Never share publicly. |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | Langfuse | true | Enable exports to the native Railway bucket. |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | Langfuse | - | batch export: Native bucket HTTPS endpoint, also usable for browser presigned URLs. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse | - | event upload: Native bucket HTTPS endpoint, also usable for browser presigned URLs. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | Langfuse | - | media upload: Native bucket HTTPS endpoint, also usable for browser presigned URLs. |
| `LANGFUSE_S3_MEDIA_MAX_CONTENT_LENGTH` | Langfuse | 100000000 | Maximum media upload size in bytes, about 100 MB. |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | Langfuse | - | batch export: Native bucket access key, supplied automatically by Railway. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse | - | event upload: Native bucket access key, supplied automatically by Railway. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse | - | media upload: Native bucket access key, supplied automatically by Railway. |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | Langfuse | false | batch export: Use virtual-hosted addressing required by Railway buckets. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse | false | event upload: Use virtual-hosted addressing required by Railway buckets. |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse | false | media upload: Use virtual-hosted addressing required by Railway buckets. |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | Langfuse | (secret) | batch export: Native bucket secret, supplied automatically by Railway. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse | (secret) | event upload: Native bucket secret, supplied automatically by Railway. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse | (secret) | media upload: Native bucket secret, supplied automatically by Railway. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --appendonly yes --appendfsync everysec --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Start command:** `/entrypoint.sh -- --logger.console=1 --logger.level=warning`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Healthcheck:** `/api/public/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse-v4-1)
