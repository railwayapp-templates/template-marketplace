# Deploy Langfuse v3 on Railway

Langfuse v3 (LLM Tracing, Evals & Prompt Management) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-v3-1)

## About

Langfuse v3 is the open-source stack for LLM tracing, evals, and prompt management. This guide covers the full self-hosted deploy on Railway: web, worker, Postgres, Redis, ClickHouse, and S3-compatible storage, so you get production observability without LangSmith pricing.

Langfuse runs as Docker images plus supporting services: web UI and API, async worker, Postgres for metadata, Redis for queues, ClickHouse for traces, and a Railway Storage Bucket instead of MinIO. Railway's private network links them. The core repo is MIT licensed, so self-hosting has no usage fees, and you decide where prompts live and how long traces are kept.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langfuse-web | `langfuse/langfuse:3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ClickHouse | `clickhouse/clickhouse-server:24.8` | Database |
| Redis | `redis:8.2` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | langfuse-web | 3000 | Port the service listens on |
| `SALT` | langfuse-web | - | Random salt for hashing API keys, auto-generated |
| `HOSTNAME` | langfuse-web | :: | Address the server binds to |
| `DATABASE_URL` | langfuse-web | - | Postgres connection string |
| `NEXTAUTH_URL` | langfuse-web | - | Public URL of the Langfuse app |
| `CLICKHOUSE_URL` | langfuse-web | - | ClickHouse HTTP connection URL |
| `ENCRYPTION_KEY` | langfuse-web | - | 64-hex key encrypting stored secrets, auto-generated |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | ClickHouse username |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Secret used to sign auth sessions |
| `TELEMETRY_ENABLED` | langfuse-web | true | Send anonymous usage telemetry to Langfuse |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | ClickHouse password |
| `REDIS_CONNECTION_STRING` | langfuse-web | - | Redis connection URL |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-web | - | ClickHouse native URL used for migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | Whether ClickHouse runs in cluster mode |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | - | Railway bucket bucket name for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | Railway bucket key prefix for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | - | Railway bucket region for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | - | Railway bucket bucket name for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | Railway bucket key prefix for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | - | Railway bucket region for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-web | - | Railway bucket endpoint URL for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-web | - | Railway bucket endpoint URL for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Railway bucket access key ID for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Railway bucket access key ID for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Railway bucket path-style addressing flag for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Railway bucket path-style addressing flag for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Railway bucket secret access key for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Railway bucket secret access key for media uploads |
| `POSTGRES_DB` | Postgres | railway | Postgres database name |
| `DATABASE_URL` | Postgres | - | Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password, auto-generated |
| `CLICKHOUSE_DB` | ClickHouse | default | ClickHouse database name |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse username |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse password, auto-generated |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enable SQL access management for the default ClickHouse user |
| `REDISHOST` | Redis | - | Redis host |
| `REDISPORT` | Redis | 6379 | Redis port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Redis connection URL |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, auto-generated |
| `PORT` | langfuse-worker | 3030 | Port the service listens on |
| `SALT` | langfuse-worker | - | Random salt for hashing API keys, auto-generated |
| `HOSTNAME` | langfuse-worker | :: | Address the server binds to |
| `DATABASE_URL` | langfuse-worker | - | Postgres connection string |
| `CLICKHOUSE_URL` | langfuse-worker | - | ClickHouse HTTP connection URL |
| `ENCRYPTION_KEY` | langfuse-worker | - | 64-hex key encrypting stored secrets, auto-generated |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | ClickHouse username |
| `TELEMETRY_ENABLED` | langfuse-worker | true | Send anonymous usage telemetry to Langfuse |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password |
| `REDIS_CONNECTION_STRING` | langfuse-worker | - | Redis connection URL |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | ClickHouse native URL used for migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Whether ClickHouse runs in cluster mode |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | - | Railway bucket bucket name for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | Railway bucket key prefix for event uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | - | Railway bucket region for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | - | Railway bucket bucket name for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | Railway bucket key prefix for media uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | - | Railway bucket region for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | Railway bucket endpoint URL for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | Railway bucket endpoint URL for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Railway bucket access key ID for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Railway bucket access key ID for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Railway bucket path-style addressing flag for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Railway bucket path-style addressing flag for media uploads |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Railway bucket secret access key for event uploads |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Railway bucket secret access key for media uploads |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langfuse-v3-1)
