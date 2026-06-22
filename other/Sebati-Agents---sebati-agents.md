# Deploy Sebati Agents on Railway

Sebati Agent Template for Sebati Agent multi tenant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sebati-agents)

## About

Sebati Agents is an enterprise AI agent platform for building, governing, and
running multi-agent systems. Teams configure conversational and work agents,
connect knowledge and data sources, and ship them to chat and automation
channels — with built-in governance, learning from feedback, and analytics.
Each deployment is single-tenant and runs on your own infrastructure.

Hosting Sebati Agents means running a self-contained, single-tenant stack:
an API server, a web console, a pgvector database, S3-compatible file storage,
an agent-memory service, a background-job/workflow engine, and an observability
backend. The services talk over a private network; you supply an LLM provider
key, an email sender, and an optional brand config to white-label the UI. Each
instance is fully data-isolated — its own database — so one deployment serves
one organization. Once it's up, your team configures agents in the console and
exposes them through chat or automation channels. Scaling is per-service: size
the database, API, and workers to your load.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sebati-web | [sebati-ai/sebati-agents](https://github.com/sebati-ai/sebati-agents) | Web service |
| rustfs-tFuI | `rustfs/rustfs` | Web service |
| InngestApp | `inngest/inngest:v1.17.5` | Web service |
| langfuse-worker | `langfuse/langfuse-worker:3` | Worker |
| langfuse-web | `langfuse/langfuse:3` | Web service |
| objects rill | [sebati-ai/sebati-agents](https://github.com/sebati-ai/sebati-agents) | Web service |
| InngestRedis | `redis:8.2.1` | Database |
| hc-mcp | [sebati-ai/hc-mcp](https://github.com/sebati-ai/hc-mcp) | Web service |
| hindsight | `ghcr.io/vectorize-io/hindsight:latest` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| pgvector | `pgvector/pgvector:pg17` | Database |
| sebati-agent-server | [sebati-ai/sebati-agents](https://github.com/sebati-ai/sebati-agents) | Web service |
| redis | `redis:7.2.5` | Database |
| clickhouse | `clickhouse/clickhouse-server:24` | Database |
| rill | [sebati-ai/sebati-agents-data](https://github.com/sebati-ai/sebati-agents-data) | Web service |
| InngestPostgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| minio | `minio/minio` | Database |
| ClickHouse | `clickhouse/clickhouse-server:25.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sebati-web | - | Sebati Agents |
| `APP_ENV` | sebati-web | - | Sebati Agents |
| `SNAP_ENV` | sebati-web | - | Sebati Agents |
| `S3_BUCKET` | sebati-web | - | Sebati Agents |
| `TWILIO_SID` | sebati-web | - | Sebati Agents |
| `DB_PASSWORD` | sebati-web | (secret) | Sebati Agents |
| `ERPNEXT_URL` | sebati-web | - | Sebati Agents |
| `S3_ENDPOINT` | sebati-web | - | Sebati Agents |
| `DATABASE_URL` | sebati-web | - | Sebati Agents |
| `RILL_MCP_URL` | sebati-web | - | Sebati Agents |
| `COOKIE_DOMAIN` | sebati-web | - | Sebati Agents |
| `HINDSIGHT_URL` | sebati-web | - | Sebati Agents |
| `S3_ACCESS_KEY` | sebati-web | - | Sebati Agents |
| `S3_SECRET_KEY` | sebati-web | (secret) | Sebati Agents |
| `RESEND_API_KEY` | sebati-web | (secret) | Sebati Agents |
| `RILL_API_TOKEN` | sebati-web | (secret) | Sebati Agents |
| `BETTER_AUTH_URL` | sebati-web | - | Sebati Agents |
| `ERPNEXT_API_KEY` | sebati-web | (secret) | Sebati Agents |
| `ERPNEXT_MCP_URL` | sebati-web | - | Sebati Agents |
| `RELEASE_CHANNEL` | sebati-web | - | Sebati Agents |
| `INNGEST_BASE_URL` | sebati-web | - | Sebati Agents |
| `ERPNEXT_MCP_TOKEN` | sebati-web | (secret) | Sebati Agents |
| `INNGEST_EVENT_KEY` | sebati-web | - | Sebati Agents |
| `OVERWATCH_MCP_URL` | sebati-web | - | Sebati Agents |
| `VERTEXAI_LOCATION` | sebati-web | - | Sebati Agents |
| `BETTER_AUTH_SECRET` | sebati-web | (secret) | Sebati Agents |
| `ERPNEXT_API_SECRET` | sebati-web | (secret) | Sebati Agents |
| `OPENROUTER_API_KEY` | sebati-web | (secret) | Sebati Agents |
| `PERPLEXITY_API_KEY` | sebati-web | (secret) | Sebati Agents |
| `DISCORD_WEBHOOK_URL` | sebati-web | - | Sebati Agents |
| `HALAL_GIS_API_TOKEN` | sebati-web | (secret) | Sebati Agents |
| `INNGEST_SIGNING_KEY` | sebati-web | - | Sebati Agents |
| `NEXT_PUBLIC_APP_URL` | sebati-web | - | Sebati Agents |
| `OVERWATCH_MCP_TOKEN` | sebati-web | (secret) | Sebati Agents |
| `VERTEXAI_PROJECT_ID` | sebati-web | - | Sebati Agents |
| `RESEND_WEBHOOK_SECRET` | sebati-web | (secret) | Sebati Agents |
| `NEXT_PUBLIC_SERVICE_URL` | sebati-web | - | Sebati Agents |
| `VERTEXAI_CREDENTIALS_JSON` | sebati-web | (secret) | Sebati Agents |
| `SEBATI_AGENTS_DATABASE_URL` | sebati-web | - | Sebati Agents |
| `WEBHOOK_TOKEN_INBOUND_EMAIL_PROCESSOR` | sebati-web | (secret) | WEBHOOK_TOKEN_INBOUND_EMAIL_PROCESSOR |
| `RUSTFS_ACCESS_KEY` | rustfs-tFuI | - | Sebati Agents |
| `RUSTFS_SECRET_KEY` | rustfs-tFuI | (secret) | Sebati Agents |
| `RUSTFS_CONSOLE_ENABLE` | rustfs-tFuI | - | Sebati Agents |
| `INNGEST_DEV` | InngestApp | - | Sebati Agents |
| `INNGEST_PORT` | InngestApp | - | Sebati Agents |
| `INNGEST_EVENT_KEY` | InngestApp | - | Sebati Agents |
| `INNGEST_REDIS_URI` | InngestApp | - | Sebati Agents |
| `INNGEST_SIGNING_KEY` | InngestApp | - | Sebati Agents |
| `INNGEST_POSTGRES_URI` | InngestApp | - | Sebati Agents |
| `SALT` | langfuse-worker | - | Sebati Agents |
| `DATABASE_URL` | langfuse-worker | - | Sebati Agents |
| `NEXTAUTH_URL` | langfuse-worker | - | Sebati Agents |
| `CLICKHOUSE_URL` | langfuse-worker | - | Sebati Agents |
| `ENCRYPTION_KEY` | langfuse-worker | - | Sebati Agents |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | Sebati Agents |
| `NEXTAUTH_SECRET` | langfuse-worker | (secret) | Sebati Agents |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | Sebati Agents |
| `REDIS_CONNECTION_STRING` | langfuse-worker | - | Sebati Agents |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | Sebati Agents |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | Sebati Agents |
| `SALT` | langfuse-web | - | Sebati Agents |
| `DATABASE_URL` | langfuse-web | - | Sebati Agents |
| `NEXTAUTH_URL` | langfuse-web | - | Sebati Agents |
| `CLICKHOUSE_URL` | langfuse-web | - | Sebati Agents |
| `ENCRYPTION_KEY` | langfuse-web | - | Sebati Agents |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | Sebati Agents |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | Sebati Agents |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | Sebati Agents |
| `LANGFUSE_INIT_ORG_ID` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_ORG_NAME` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_USER_NAME` | langfuse-web | - | Sebati Agents |
| `REDIS_CONNECTION_STRING` | langfuse-web | - | Sebati Agents |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_PROJECT_ID` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_USER_EMAIL` | langfuse-web | - | Sebati Agents |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_PROJECT_NAME` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_USER_PASSWORD` | langfuse-web | (secret) | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | langfuse-web | (secret) | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | - | Sebati Agents |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Sebati Agents |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | Sebati Agents |
| `PORT` | objects rill | - | Sebati Agents |
| `DATABASE_URL` | objects rill | - | Sebati Agents |
| `REDISHOST` | InngestRedis | - | Sebati Agents |
| `REDISPORT` | InngestRedis | - | Sebati Agents |
| `REDISUSER` | InngestRedis | - | Sebati Agents |
| `REDIS_URL` | InngestRedis | - | Sebati Agents |
| `REDISPASSWORD` | InngestRedis | (secret) | Sebati Agents |
| `REDIS_PASSWORD` | InngestRedis | (secret) | Sebati Agents |
| `REDIS_PUBLIC_URL` | InngestRedis | - | Sebati Agents |
| `MCP_PORT` | hc-mcp | - | Sebati Agents |
| `MOCK_MODE` | hc-mcp | - | Sebati Agents |
| `GABY_PROXY_URL` | hc-mcp | - | Sebati Agents |
| `HF_HOME` | hindsight | - | Sebati Agents |
| `HINDSIGHT_DB_URL` | hindsight | - | Sebati Agents |
| `HINDSIGHT_API_PORT` | hindsight | - | Sebati Agents |
| `TRANSFORMERS_CACHE` | hindsight | - | Sebati Agents |
| `HINDSIGHT_API_LLM_MODEL` | hindsight | - | Sebati Agents |
| `HINDSIGHT_API_HEALTH_URL` | hindsight | - | Sebati Agents |
| `HINDSIGHT_API_LLM_API_KEY` | hindsight | (secret) | Sebati Agents |
| `HINDSIGHT_API_LLM_BASE_URL` | hindsight | - | Sebati Agents |
| `HINDSIGHT_API_LLM_PROVIDER` | hindsight | - | Sebati Agents |
| `POSTGRES_DB` | postgres | - | Sebati Agents |
| `DATABASE_URL` | postgres | - | Sebati Agents |
| `POSTGRES_USER` | postgres | (secret) | Sebati Agents |
| `POSTGRES_PASSWORD` | postgres | (secret) | Sebati Agents |
| `DATABASE_PUBLIC_URL` | postgres | - | Sebati Agents |
| `POSTGRES_DB` | pgvector | - | Sebati Agents |
| `DATABASE_URL` | pgvector | - | Sebati Agents |
| `POSTGRES_USER` | pgvector | (secret) | Sebati Agents |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Sebati Agents |
| `DATABASE_PUBLIC_URL` | pgvector | - | Sebati Agents |
| `APP_ENV` | sebati-agent-server | - | Sebati Agents |
| `REDIS_URL` | sebati-agent-server | - | Sebati Agents |
| `S3_BUCKET` | sebati-agent-server | - | Sebati Agents |
| `CONSOLE_URL` | sebati-agent-server | - | Sebati Agents |
| `CORS_ORIGIN` | sebati-agent-server | - | Sebati Agents |
| `INNGEST_DEV` | sebati-agent-server | - | Sebati Agents |
| `S3_ENDPOINT` | sebati-agent-server | - | Sebati Agents |
| `DATABASE_URL` | sebati-agent-server | - | Sebati Agents |
| `RILL_MCP_URL` | sebati-agent-server | - | Sebati Agents |
| `HINDSIGHT_URL` | sebati-agent-server | - | Sebati Agents |
| `S3_ACCESS_KEY` | sebati-agent-server | - | Sebati Agents |
| `S3_SECRET_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `CLICKHOUSE_URL` | sebati-agent-server | - | Sebati Agents |
| `DAYTONA_TARGET` | sebati-agent-server | - | Sebati Agents |
| `ENCRYPTION_KEY` | sebati-agent-server | - | Sebati Agents |
| `RESEND_API_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `RILL_API_TOKEN` | sebati-agent-server | (secret) | Sebati Agents |
| `RILL_MCP_TOKEN` | sebati-agent-server | (secret) | Sebati Agents |
| `BETTER_AUTH_URL` | sebati-agent-server | - | Sebati Agents |
| `CLICKHOUSE_USER` | sebati-agent-server | (secret) | Sebati Agents |
| `DAYTONA_API_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `DAYTONA_API_URL` | sebati-agent-server | - | Sebati Agents |
| `RELEASE_CHANNEL` | sebati-agent-server | - | Sebati Agents |
| `INNGEST_BASE_URL` | sebati-agent-server | - | Sebati Agents |
| `RILL_INSTANCE_ID` | sebati-agent-server | - | Sebati Agents |
| `RILL_RUNTIME_URL` | sebati-agent-server | - | Sebati Agents |
| `RILL_SIDECAR_URL` | sebati-agent-server | - | Sebati Agents |
| `SEBATI_MCP_TOKEN` | sebati-agent-server | (secret) | Sebati Agents |
| `INNGEST_EVENT_KEY` | sebati-agent-server | - | Sebati Agents |
| `LANGFUSE_BASE_URL` | sebati-agent-server | - | Sebati Agents |
| `OVERWATCH_MCP_URL` | sebati-agent-server | - | Sebati Agents |
| `RESEND_FROM_EMAIL` | sebati-agent-server | - | Sebati Agents |
| `VERTEXAI_LOCATION` | sebati-agent-server | - | Sebati Agents |
| `BETTER_AUTH_SECRET` | sebati-agent-server | (secret) | Sebati Agents |
| `ELEVENLABS_API_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `INNGEST_SERVE_HOST` | sebati-agent-server | - | Sebati Agents |
| `OPENROUTER_API_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `PERPLEXITY_API_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `PUBLIC_SERVICE_URL` | sebati-agent-server | - | Sebati Agents |
| `CLICKHOUSE_DATABASE` | sebati-agent-server | - | Sebati Agents |
| `CLICKHOUSE_PASSWORD` | sebati-agent-server | (secret) | Sebati Agents |
| `DISCORD_WEBHOOK_URL` | sebati-agent-server | - | Sebati Agents |
| `ELEVENLABS_VOICE_ID` | sebati-agent-server | - | Sebati Agents |
| `INNGEST_SIGNING_KEY` | sebati-agent-server | - | Sebati Agents |
| `LANGFUSE_PUBLIC_KEY` | sebati-agent-server | - | Sebati Agents |
| `LANGFUSE_SECRET_KEY` | sebati-agent-server | (secret) | Sebati Agents |
| `NEXT_PUBLIC_APP_URL` | sebati-agent-server | - | Sebati Agents |
| `RILL_METRICS_BUCKET` | sebati-agent-server | - | Sebati Agents |
| `RILL_METRICS_PREFIX` | sebati-agent-server | - | Sebati Agents |
| `VERTEXAI_PROJECT_ID` | sebati-agent-server | - | Sebati Agents |
| `LANGFUSE_ADMIN_EMAIL` | sebati-agent-server | - | Sebati Agents |
| `OAUTH_PUBLIC_BASE_URL` | sebati-agent-server | - | Sebati Agents |
| `WORKFLOW_POSTGRES_URL` | sebati-agent-server | - | Sebati Agents |
| `WORKFLOW_TARGET_WORLD` | sebati-agent-server | - | Sebati Agents |
| `LANGFUSE_ADMIN_PASSWORD` | sebati-agent-server | (secret) | Sebati Agents |
| `NEXT_PUBLIC_SERVICE_URL` | sebati-agent-server | - | Sebati Agents |
| `LANGFUSE_INIT_USER_EMAIL` | sebati-agent-server | - | Sebati Agents |
| `VERTEXAI_CREDENTIALS_JSON` | sebati-agent-server | (secret) | Sebati Agents |
| `LANGFUSE_INIT_USER_PASSWORD` | sebati-agent-server | (secret) | Sebati Agents |
| `LANGFUSE_TRACING_ENVIRONMENT` | sebati-agent-server | - | Sebati Agents |
| `KNOWLEDGE_CONTEXTUALIZER_MODEL` | sebati-agent-server | - | Sebati Agents |
| `REDISHOST` | redis | - | Sebati Agents |
| `REDISPORT` | redis | - | Sebati Agents |
| `REDISUSER` | redis | - | Sebati Agents |
| `REDIS_URL` | redis | - | Sebati Agents |
| `REDISPASSWORD` | redis | (secret) | Sebati Agents |
| `REDIS_PASSWORD` | redis | (secret) | Sebati Agents |
| `REDIS_PUBLIC_URL` | redis | - | Sebati Agents |
| `REDIS_RDB_POLICY` | redis | - | Sebati Agents |
| `REDIS_AOF_ENABLED` | redis | - | Sebati Agents |
| `HOST` | clickhouse | - | Sebati Agents |
| `PORT` | clickhouse | - | Sebati Agents |
| `HOST_PORT` | clickhouse | - | Sebati Agents |
| `PUBLIC_HOST` | clickhouse | - | Sebati Agents |
| `PUBLIC_PORT` | clickhouse | - | Sebati Agents |
| `DATABASE_URL` | clickhouse | - | Sebati Agents |
| `CLICKHOUSE_DB` | clickhouse | - | Sebati Agents |
| `INTERNAL_PORT` | clickhouse | - | Sebati Agents |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Sebati Agents |
| `PUBLIC_HOST_PORT` | clickhouse | - | Sebati Agents |
| `DATABASE_JDBC_URL` | clickhouse | - | Sebati Agents |
| `INTERNAL_HOST_PORT` | clickhouse | - | Sebati Agents |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Sebati Agents |
| `PUBLIC_DATABASE_URL` | clickhouse | - | Sebati Agents |
| `PUBLIC_DATABASE_JDBC_URL` | clickhouse | - | Sebati Agents |
| `PORT` | rill | - | Sebati Agents |
| `RILL_PORT` | rill | - | Sebati Agents |
| `S3_BUCKET` | rill | - | Sebati Agents |
| `S3_PREFIX` | rill | - | Sebati Agents |
| `S3_ENDPOINT` | rill | - | Sebati Agents |
| `SEED_PROJECT` | rill | - | Sebati Agents |
| `SIDECAR_PORT` | rill | - | Sebati Agents |
| `CLICKHOUSE_DB` | rill | - | Sebati Agents |
| `S3_ACCESS_KEY` | rill | - | Sebati Agents |
| `S3_SECRET_KEY` | rill | (secret) | Sebati Agents |
| `CLICKHOUSE_SSL` | rill | - | Sebati Agents |
| `RILL_API_TOKEN` | rill | (secret) | Sebati Agents |
| `ALLOWED_ORIGINS` | rill | - | Sebati Agents |
| `CLICKHOUSE_HOST` | rill | - | Sebati Agents |
| `CLICKHOUSE_PORT` | rill | - | Sebati Agents |
| `CLICKHOUSE_USER` | rill | (secret) | Sebati Agents |
| `CLICKHOUSE_PASSWORD` | rill | (secret) | Sebati Agents |
| `SEED_METRICS_FROM_IMAGE` | rill | - | Sebati Agents |
| `POSTGRES_DB` | InngestPostgres | - | Sebati Agents |
| `DATABASE_URL` | InngestPostgres | - | Sebati Agents |
| `POSTGRES_USER` | InngestPostgres | (secret) | Sebati Agents |
| `POSTGRES_PASSWORD` | InngestPostgres | (secret) | Sebati Agents |
| `DATABASE_PUBLIC_URL` | InngestPostgres | - | Sebati Agents |
| `PORT` | minio | - | Sebati Agents |
| `MINIO_ROOT_USER` | minio | (secret) | Sebati Agents |
| `MINIO_PRIVATE_HOST` | minio | - | Sebati Agents |
| `MINIO_PRIVATE_PORT` | minio | - | Sebati Agents |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Sebati Agents |
| `MINIO_PRIVATE_ENDPOINT` | minio | - | Sebati Agents |
| `HOST` | ClickHouse | - | Sebati Agents |
| `PORT` | ClickHouse | - | Sebati Agents |
| `HOST_PORT` | ClickHouse | - | Sebati Agents |
| `PUBLIC_HOST` | ClickHouse | - | Sebati Agents |
| `PUBLIC_PORT` | ClickHouse | - | Sebati Agents |
| `DATABASE_URL` | ClickHouse | - | Sebati Agents |
| `CLICKHOUSE_DB` | ClickHouse | - | Sebati Agents |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Sebati Agents |
| `PUBLIC_HOST_PORT` | ClickHouse | - | Sebati Agents |
| `DATABASE_JDBC_URL` | ClickHouse | - | Sebati Agents |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Sebati Agents |
| `PUBLIC_DATABASE_URL` | ClickHouse | - | Sebati Agents |
| `PUBLIC_DATABASE_JDBC_URL` | ClickHouse | - | Sebati Agents |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "inngest start --event-key $INNGEST_EVENT_KEY --signing-key $INNGEST_SIGNING_KEY --postgres-uri $INNGEST_POSTGRES_URI --redis-uri $INNGEST_REDIS_URI http://sublime-comfort.railway.internal/api/inngest"`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data/`
- **Volume:** `/bitnami`
- **Volume:** `/project`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`

**Category:** Other · **Languages:** TypeScript, MDX, PLpgSQL, CSS, JavaScript, Dockerfile, Shell, Python

[View on Railway →](https://railway.com/deploy/sebati-agents)
