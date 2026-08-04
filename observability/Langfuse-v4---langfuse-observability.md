# Deploy Langfuse v4 on Railway

Self-host Langfuse on Railway: LLM tracing, evals and prompt management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-observability)

## About

Langfuse is the open-source LLM engineering platform: tracing, evaluations, prompt management, cost metrics and datasets in one MIT-licensed app. Teams shipping AI agents and RAG systems use it to see which prompt version produced an answer and what a chain cost in tokens. It is OpenTelemetry-native, so instrumenting an app is a decorator, not a rewrite, and tracing needs no LLM provider key.

Self-host Langfuse on Railway behind one public domain. `langfuse-web` serves the UI and OTLP endpoint; the private `langfuse-worker` (`4.3.1`, port `3030`) drains the queue. Managed **Postgres**/**Redis**, a pinned **ClickHouse** with a volume and a Railway **bucket** hold accounts, traces, queues and events.

![Langfuse Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785783362/0bd810b1-4bda-4b8d-91b5-a42fafe03245.png)

Self-host when prompts cannot sit in a vendor account, or when volume makes per-unit cloud pricing the wrong shape.

- **OpenTelemetry tracing** — nested traces over LLM calls, retrievals, tool calls and agent steps.
- **Prompt management** — version and roll back prompts, fetched at runtime via a cached client.
- **Evaluations** — LLM-as-a-judge, code evaluators, annotation queues.
- **SDKs** — Python and JS/TS plus LangChain, LlamaIndex, the Vercel AI SDK and LiteLLM.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langfuse-worker | `langfuse/langfuse-worker` | Worker |
| langfuse-web | `langfuse/langfuse` | Web service |
| clickhouse | `clickhouse/clickhouse-server` | Database |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | langfuse-worker | 3030 | Worker HTTP port for health checks |
| `SALT` | langfuse-worker | - | Must match the web service salt |
| `HOSTNAME` | langfuse-worker | 0.0.0.0 | Bind address inside the container |
| `DATABASE_URL` | langfuse-worker | - | Transactional Postgres connection string |
| `NEXTAUTH_URL` | langfuse-worker | - | Public base URL, matches the web service |
| `NODE_OPTIONS` | langfuse-worker | --max-old-space-size=3072 | Node heap ceiling for the container |
| `CLICKHOUSE_DB` | langfuse-worker | default | ClickHouse database name |
| `CLICKHOUSE_URL` | langfuse-worker | - | ClickHouse HTTP endpoint, private |
| `ENCRYPTION_KEY` | langfuse-worker | - | Must match the web service key |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | ClickHouse username |
| `TELEMETRY_ENABLED` | langfuse-worker | true | Anonymous usage stats, set false to opt out |
| `LANGFUSE_LOG_LEVEL` | langfuse-worker | info | Application log verbosity |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password |
| `REDIS_CONNECTION_STRING` | langfuse-worker | - | Queue and cache, dual-stack DNS |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | Native endpoint for schema migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Single-node, no replicated tables |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | langfuse-worker | - | Batch export bucket |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | langfuse-worker | exports/ | Key prefix for batch exports |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | langfuse-worker | - | Bucket region |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | - | Raw ingestion event bucket |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | Key prefix for ingestion events |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | - | Bucket region |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | - | Multi-modal media bucket |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | Key prefix for uploaded media |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | - | Bucket region |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | langfuse-worker | true | Enable scheduled batch exports |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | langfuse-worker | - | S3-compatible endpoint |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | S3-compatible endpoint |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | Endpoint used for presigned browser uploads |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | langfuse-worker | - | Bucket access key id |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Bucket access key id |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Bucket access key id |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | langfuse-worker | true | Path-style bucket addressing |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Path-style bucket addressing |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Path-style bucket addressing |
| `LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT` | langfuse-worker | - | Endpoint used in download links |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Bucket secret access key |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Bucket secret access key |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Bucket secret access key |
| `PORT` | langfuse-web | 3000 | HTTP port, matches public target port |
| `SALT` | langfuse-web | - | Hashes API keys, keep stable |
| `HOSTNAME` | langfuse-web | 0.0.0.0 | Bind address inside the container |
| `DATABASE_URL` | langfuse-web | - | Transactional Postgres connection string |
| `NEXTAUTH_URL` | langfuse-web | - | Public base URL for auth callbacks |
| `NODE_OPTIONS` | langfuse-web | --max-old-space-size=3072 | Node heap ceiling for the container |
| `CLICKHOUSE_DB` | langfuse-web | default | ClickHouse database name |
| `CLICKHOUSE_URL` | langfuse-web | - | ClickHouse HTTP endpoint, private |
| `ENCRYPTION_KEY` | langfuse-web | - | Encrypts stored LLM secrets, 64 hex |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | ClickHouse username |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Signs session cookies, keep stable |
| `TELEMETRY_ENABLED` | langfuse-web | true | Anonymous usage stats, set false to opt out |
| `LANGFUSE_LOG_LEVEL` | langfuse-web | info | Application log verbosity |
| `AUTH_DISABLE_SIGNUP` | langfuse-web | false | Set true after the first owner signs up |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | ClickHouse password |
| `REDIS_CONNECTION_STRING` | langfuse-web | - | Queue and cache, dual-stack DNS |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-web | - | Native endpoint for schema migrations |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | Single-node, no replicated tables |
| `LANGFUSE_CSP_ENFORCE_HTTPS` | langfuse-web | true | Force HTTPS in content security policy |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | langfuse-web | - | Batch export bucket |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | langfuse-web | exports/ | Key prefix for batch exports |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | langfuse-web | - | Bucket region |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | - | Raw ingestion event bucket |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | Key prefix for ingestion events |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | - | Bucket region |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | - | Multi-modal media bucket |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | Key prefix for uploaded media |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | - | Bucket region |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | langfuse-web | true | Enable UI batch exports |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | langfuse-web | - | S3-compatible endpoint |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-web | - | S3-compatible endpoint |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-web | - | Endpoint used for presigned browser uploads |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | langfuse-web | - | Bucket access key id |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Bucket access key id |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Bucket access key id |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | langfuse-web | true | Path-style bucket addressing |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Path-style bucket addressing |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | Path-style bucket addressing |
| `LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT` | langfuse-web | - | Endpoint used in download links |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Bucket secret access key |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Bucket secret access key |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Bucket secret access key |
| `PORT` | clickhouse | 8123 | HTTP port the health check probes |
| `CLICKHOUSE_DB` | clickhouse | default | Database Langfuse migrates into |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Database user created on first boot |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Generated database password |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/api/health`
- **Healthcheck:** `/api/public/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/entrypoint.sh -- --logger.console=1 --logger.level=information`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langfuse-observability)
