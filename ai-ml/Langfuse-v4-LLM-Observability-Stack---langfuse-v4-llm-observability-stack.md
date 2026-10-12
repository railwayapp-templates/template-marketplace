# Deploy Langfuse v4 LLM Observability Stack on Railway

Trace, evaluate and cost-track every LLM call. Langfuse v4 with ClickHouse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-v4-llm-observability-stack)

## About

Langfuse is an open-source LLM engineering platform for tracing, evaluating and cost-tracking LLM applications and agents. This community template deploys the complete Langfuse v4 stack on Railway: web app, background worker, ClickHouse, Postgres, Redis and a Railway Bucket, with the first organization, project, API keys and admin account created automatically.

Self-hosted Langfuse v4 is not a single container. The web service receives traces from the Langfuse SDKs, OpenTelemetry or integrations such as LiteLLM and stores each raw event in S3-compatible storage. A separate worker turns those events into rows in ClickHouse, the analytical database that powers the trace explorer, dashboards and full-text search. Postgres stores users, projects, prompts and API keys, and Redis carries the job queues and caches. This template wires all of it together over Railway's private network, generates every secret, keeps ClickHouse tuned for a small footprint and uses a Railway Bucket for event, media and export storage, so you get a production-shaped deployment without editing configuration files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| langfuse-web | `langfuse/langfuse:4.56.0` | Web service |
| Redis | `redis:8.2` | Database |
| langfuse-worker | `langfuse/langfuse-worker:4.56.0` | Worker |
| ClickHouse | [baranberkay96/langfuse-railway](https://github.com/baranberkay96/langfuse-railway) (branch: main) (root: /services/clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | langfuse-web | 3000 | HTTP port of the Next.js server (Railway routes the public domain here). |
| `SALT` | langfuse-web | - | Salt for hashing API keys. Generated once; never change after first deploy. |
| `HOSTNAME` | langfuse-web | :: | Bind address; :: listens on IPv4 and IPv6. |
| `DATABASE_URL` | langfuse-web | - | Postgres connection string (private network). Prisma migrations run automatically on web start. |
| `NEXTAUTH_URL` | langfuse-web | - | Public URL of this service; used for login callbacks and links. |
| `CLICKHOUSE_URL` | langfuse-web | - | ClickHouse HTTP endpoint (private network). |
| `ENCRYPTION_KEY` | langfuse-web | - | 256-bit hex key that encrypts stored LLM credentials. Generated once; never change. |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | ClickHouse user (reference). |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Signs session cookies. Generated once. |
| `TELEMETRY_ENABLED` | langfuse-web | true | Anonymous usage telemetry to Langfuse (upstream default). Set false to opt out. |
| `AUTH_DISABLE_SIGNUP` | langfuse-web | true | Public sign-up is off; the admin below is created headlessly. Set false temporarily to let invited teammates create accounts. |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | ClickHouse password (reference). |
| `LANGFUSE_INIT_ORG_ID` | langfuse-web | railway-org | ID of the organization created on first start (headless init). |
| `LANGFUSE_INIT_ORG_NAME` | langfuse-web | My Organization | Display name of the initial organization. |
| `LANGFUSE_INIT_USER_NAME` | langfuse-web | Admin | Display name of the first admin user. |
| `REDIS_CONNECTION_STRING` | langfuse-web | - | Redis URL for queues and cache. family=0 lets ioredis use IPv4 or IPv6 private DNS. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-web | - | ClickHouse native endpoint used for schema migrations. |
| `LANGFUSE_INIT_PROJECT_ID` | langfuse-web | railway-project | ID of the project created on first start. |
| `LANGFUSE_INIT_USER_EMAIL` | langfuse-web | - | Email of the first admin user (organization owner). Used to sign in. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | Single ClickHouse node: do not run DDL ON CLUSTER. |
| `LANGFUSE_INIT_PROJECT_NAME` | langfuse-web | My Project | Display name of the initial project. |
| `LANGFUSE_INIT_USER_PASSWORD` | langfuse-web | (secret) | Password of the first admin user. Generated; read it from this variable and change it after first login. |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | langfuse-web | - | Railway Bucket name for batch exports. |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | langfuse-web | exports/ | Key prefix for exports. |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | langfuse-web | - | Bucket region. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | - | Railway Bucket name for event uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | Key prefix for event objects inside the bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | - | Bucket region (Railway Buckets use auto). |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | - | Railway Bucket name for media uploads. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | Key prefix for media objects inside the bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | - | Bucket region (Railway Buckets use auto). |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | langfuse-web | - | Project public API key (LANGFUSE_PUBLIC_KEY for SDKs). Generated. |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | langfuse-web | (secret) | Project secret API key (LANGFUSE_SECRET_KEY for SDKs). Generated; keep private. |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | langfuse-web | true | Enable CSV/JSON batch exports from the UI, written to the bucket. |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | langfuse-web | - | Bucket S3 endpoint used to upload exports. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-web | - | Bucket S3 endpoint (public; also used for presigned media URLs). |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-web | - | Bucket S3 endpoint (public; also used for presigned media URLs). |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | langfuse-web | - | Bucket access key. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Bucket access key. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Bucket access key. |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | langfuse-web | false | Railway Buckets use virtual-hosted-style URLs. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | false | Railway Buckets use virtual-hosted-style URLs. |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | false | Railway Buckets use virtual-hosted-style URLs. |
| `LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT` | langfuse-web | - | Endpoint used in presigned download links (public bucket endpoint). |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Bucket secret key. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Bucket secret key. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Bucket secret key. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | langfuse-worker | 3030 | Worker HTTP port (health endpoint only). |
| `SALT` | langfuse-worker | - | Must be identical to langfuse-web (hashes API keys). |
| `HOSTNAME` | langfuse-worker | :: | Bind address; :: listens on IPv4 and IPv6. |
| `DATABASE_URL` | langfuse-worker | - | Postgres connection string (private network). Prisma migrations run automatically on web start. |
| `NEXTAUTH_URL` | langfuse-worker | - | Public URL of langfuse-web; used to build links in emails and integrations. |
| `CLICKHOUSE_URL` | langfuse-worker | - | ClickHouse HTTP endpoint (private network). |
| `ENCRYPTION_KEY` | langfuse-worker | - | Must be identical to langfuse-web (encrypts stored secrets). |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | ClickHouse user (reference). |
| `TELEMETRY_ENABLED` | langfuse-worker | true | Anonymous usage telemetry to Langfuse (upstream default). Set false to opt out. |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password (reference). |
| `REDIS_CONNECTION_STRING` | langfuse-worker | - | Redis URL for queues and cache. family=0 lets ioredis use IPv4 or IPv6 private DNS. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | ClickHouse native endpoint used for schema migrations. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Single ClickHouse node: do not run DDL ON CLUSTER. |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | langfuse-worker | - | Railway Bucket name for batch exports. |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | langfuse-worker | exports/ | Key prefix for exports. |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | langfuse-worker | - | Bucket region. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | - | Railway Bucket name for event uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | Key prefix for event objects inside the bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | - | Bucket region (Railway Buckets use auto). |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | - | Railway Bucket name for media uploads. |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | Key prefix for media objects inside the bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | - | Bucket region (Railway Buckets use auto). |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | langfuse-worker | true | Enable CSV/JSON batch exports from the UI, written to the bucket. |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | langfuse-worker | - | Bucket S3 endpoint used to upload exports. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | Bucket S3 endpoint (public; also used for presigned media URLs). |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | Bucket S3 endpoint (public; also used for presigned media URLs). |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | langfuse-worker | - | Bucket access key. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Bucket access key. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Bucket access key. |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | langfuse-worker | false | Railway Buckets use virtual-hosted-style URLs. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | false | Railway Buckets use virtual-hosted-style URLs. |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | false | Railway Buckets use virtual-hosted-style URLs. |
| `LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT` | langfuse-worker | - | Endpoint used in presigned download links (public bucket endpoint). |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Bucket secret key. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Bucket secret key. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Bucket secret key. |
| `PORT` | ClickHouse | 8123 | HTTP port; used by the Railway healthcheck (/ping). |
| `CLICKHOUSE_DB` | ClickHouse | default | Database Langfuse uses. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user created by the image entrypoint on first start. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse password (alphanumeric so it is safe inside Langfuse migration URLs). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/public/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`

**Category:** AI/ML · **Tags:** langfuse, llm, observability, tracing, evaluation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/langfuse-v4-llm-observability-stack)
