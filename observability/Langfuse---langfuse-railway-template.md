# Deploy Langfuse on Railway

A platform for LLM observability, tracing, evaluation, & prompt management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-railway-template)

## About

Langfuse is an open-source LLM engineering platform for observability, tracing, evaluation, prompt management, and debugging AI applications. It helps teams understand how LLM-powered systems behave in production by collecting traces, generations, scores, latency, cost, and other operational data.

Hosting Langfuse on Railway gives you a complete self-hosted LLM observability stack with persistent infrastructure for application metadata, high-volume traces, background processing, caching, and object storage.

This template combines Langfuse Web and Worker with PostgreSQL, ClickHouse, Redis, and Railway Bucket storage.

The Langfuse Web service is publicly accessible, while internal infrastructure services communicate through Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langfuse-Worker | `langfuse/langfuse-worker` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Langfuse-Web | `langfuse/langfuse` | Web service |
| ClickHouse | `clickhouse/clickhouse-server` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Langfuse-Worker | 3030 | Langfuse Worker port |
| `SALT` | Langfuse-Worker | - | Salt used to hash Langfuse API keys |
| `HOSTNAME` | Langfuse-Worker | 0.0.0.0 | Listen on all Railway interfaces |
| `REDIS_AUTH` | Langfuse-Worker | - | Redis authentication password |
| `REDIS_HOST` | Langfuse-Worker | - | Redis private hostname |
| `REDIS_PORT` | Langfuse-Worker | 6379 | Redis TCP port |
| `DATABASE_URL` | Langfuse-Worker | - | PostgreSQL connection string |
| `CLICKHOUSE_DB` | Langfuse-Worker | default | ClickHouse database |
| `CLICKHOUSE_URL` | Langfuse-Worker | - | ClickHouse HTTP endpoint |
| `ENCRYPTION_KEY` | Langfuse-Worker | - | 256-bit hex key used to encrypt sensitive data |
| `CLICKHOUSE_USER` | Langfuse-Worker | (secret) | ClickHouse username |
| `REDIS_TLS_ENABLED` | Langfuse-Worker | false | Redis is accessed through Railway private networking |
| `TELEMETRY_ENABLED` | Langfuse-Worker | false | Disable Langfuse telemetry |
| `CLICKHOUSE_PASSWORD` | Langfuse-Worker | (secret) | ClickHouse password |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse-Worker | - | ClickHouse native endpoint for migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse-Worker | false | Disable cluster commands for single-node ClickHouse |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse-Worker | - | Railway Bucket name |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse-Worker | events/ | Prefix for raw Langfuse events |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse-Worker | - | Railway Bucket region |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse-Worker | - | Railway Bucket S3-compatible endpoint |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse-Worker | - | Railway Bucket access key |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse-Worker | true | Use S3 path-style requests |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse-Worker | (secret) | Railway Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private Redis hostname within the Railway project |
| `REDISPORT` | Redis | 6379 | Redis TCP port |
| `REDISUSER` | Redis | default | Default Redis ACL username |
| `REDIS_URL` | Redis | - | Redis connection string using Railway private networking |
| `REDISPASSWORD` | Redis | (secret) | Compatibility alias for clients expecting REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password generated automatically |
| `PORT` | Langfuse-Web | 3000 | Langfuse Web port |
| `SALT` | Langfuse-Web | - | Must match Langfuse Worker |
| `HOSTNAME` | Langfuse-Web | 0.0.0.0 | Listen on Railway interfaces |
| `REDIS_AUTH` | Langfuse-Web | - | Redis authentication password |
| `REDIS_HOST` | Langfuse-Web | - | Redis private hostname |
| `REDIS_PORT` | Langfuse-Web | 6379 | Redis TCP port |
| `DATABASE_URL` | Langfuse-Web | - | PostgreSQL connection string |
| `NEXTAUTH_URL` | Langfuse-Web | https://example.com | Public Langfuse URL used for authentication and links |
| `CLICKHOUSE_DB` | Langfuse-Web | default | ClickHouse database |
| `CLICKHOUSE_URL` | Langfuse-Web | - | ClickHouse HTTP endpoint |
| `ENCRYPTION_KEY` | Langfuse-Web | - | Must match Langfuse Worker |
| `CLICKHOUSE_USER` | Langfuse-Web | (secret) | ClickHouse username |
| `NEXTAUTH_SECRET` | Langfuse-Web | (secret) | Secret used to sign authentication sessions |
| `REDIS_TLS_ENABLED` | Langfuse-Web | false | Railway private Redis does not require TLS |
| `TELEMETRY_ENABLED` | Langfuse-Web | false | Disable Langfuse telemetry |
| `CLICKHOUSE_PASSWORD` | Langfuse-Web | (secret) | ClickHouse password |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse-Web | - | ClickHouse migration endpoint |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse-Web | false | Single-node ClickHouse deployment |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse-Web | - | Railway Bucket name |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse-Web | events/ | Prefix for raw event storage |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse-Web | - | Railway Bucket region |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse-Web | - | Railway Bucket endpoint |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse-Web | - | Railway Bucket access key |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse-Web | true | S3-compatible path-style access |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse-Web | (secret) | Railway Bucket secret key |
| `CLICKHOUSE_DB` | ClickHouse | default | Database used by Langfuse |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse application user |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Password for the ClickHouse application user |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse-railway-template)
