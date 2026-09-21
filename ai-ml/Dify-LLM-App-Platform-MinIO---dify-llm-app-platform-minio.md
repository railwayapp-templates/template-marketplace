# Deploy Dify LLM App Platform + MinIO on Railway

Dify LLM app platform with pgvector, plugin daemon, sandbox and MinIO

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-llm-app-platform-minio)

## About

Dify is an open-source platform for building production LLM applications. It combines a visual workflow editor, RAG knowledge pipelines, agent orchestration, prompt management, and model provider integrations in one self-hostable app, so teams can move from prototype to production without stitching together separate tools.

Hosting Dify means running several cooperating services rather than a single container. The API server handles the console, public app, and service APIs; a Celery worker processes background jobs like document indexing and async tasks; a Next.js web frontend serves the UI; and a plugin daemon runs marketplace plugins in isolation. Backing them are PostgreSQL for application metadata and a vector store for embeddings, plus Redis for caching and the Celery broker. Self-hosting normally means provisioning each of these, generating shared secrets, running database migrations, and wiring private networking between them. This template does that wiring for you using the official pinned Docker images, persistent volumes, and Railway reference variables, with pgvector serving double duty as both the metadata database and the vector store to keep the service count low.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dify-web | `langgenius/dify-web:1.17.1` | Web service |
| dify-api | `langgenius/dify-api:1.17.1` | Web service |
| dify-sandbox | `langgenius/dify-sandbox:0.2.15` | Worker |
| Redis | `redis:7-alpine` | Database |
| Postgres | `pgvector/pgvector:pg16` | Database |
| dify-worker | `langgenius/dify-api:1.17.1` | Worker |
| MinIO | `quay.io/minio/minio:RELEASE.2025-03-12T18-04-18Z` | Database |
| dify-plugin-daemon | `langgenius/dify-plugin-daemon:0.6.10-local` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dify-web | 3000 | - |
| `HOSTNAME` | dify-web | 0.0.0.0 | Next.js standalone binds $HOSTNAME, and the container image sets it to the container id. |
| `MARKETPLACE_URL` | dify-web | https://marketplace.dify.ai | - |
| `MARKETPLACE_API_URL` | dify-web | https://marketplace.dify.ai | - |
| `NEXT_TELEMETRY_DISABLED` | dify-web | 1 | - |
| `NEXT_PUBLIC_ENABLE_AGENT_V2` | dify-web | false | Agent v2 needs the agent backend and shell sandbox services, which this template does not deploy. |
| `MODE` | dify-api | api | - |
| `PORT` | dify-api | 5001 | Port Railway's healthcheck and edge proxy probe. Must equal DIFY_PORT, or the healthcheck fails with 'service unavailable'. |
| `DB_PORT` | dify-api | 5432 | - |
| `REDIS_DB` | dify-api | 0 | - |
| `DIFY_PORT` | dify-api | 5001 | - |
| `LOG_LEVEL` | dify-api | INFO | - |
| `S3_REGION` | dify-api | us-east-1 | - |
| `DEPLOY_ENV` | dify-api | PRODUCTION | - |
| `REDIS_PORT` | dify-api | 6379 | - |
| `SECRET_KEY` | dify-api | (secret) | Used to encrypt session cookies and sensitive data. Must match the dify-worker SECRET_KEY. |
| `DB_DATABASE` | dify-api | dify | - |
| `DB_PASSWORD` | dify-api | (secret) | - |
| `DB_USERNAME` | dify-api | (secret) | - |
| `STORAGE_TYPE` | dify-api | s3 | Uploaded files live in the MinIO service so the API and the worker read the same objects. |
| `VECTOR_STORE` | dify-api | pgvector | - |
| `PGVECTOR_PORT` | dify-api | 5432 | - |
| `PGVECTOR_USER` | dify-api | (secret) | - |
| `REDIS_USE_SSL` | dify-api | false | - |
| `S3_SECRET_KEY` | dify-api | (secret) | - |
| `BROKER_USE_SSL` | dify-api | false | - |
| `REDIS_PASSWORD` | dify-api | (secret) | - |
| `S3_BUCKET_NAME` | dify-api | dify | - |
| `S3_ADDRESS_STYLE` | dify-api | path | MinIO serves buckets as a path, not a subdomain. |
| `DIFY_BIND_ADDRESS` | dify-api | [::] | Bracketed IPv6 any-address. gunicorn rejects a bare '::' here. |
| `MIGRATION_ENABLED` | dify-api | true | - |
| `PGVECTOR_DATABASE` | dify-api | dify | - |
| `PGVECTOR_PASSWORD` | dify-api | (secret) | - |
| `PLUGIN_DAEMON_KEY` | dify-api | - | Shared key between the API and the plugin daemon. |
| `MARKETPLACE_API_URL` | dify-api | https://marketplace.dify.ai | - |
| `CODE_EXECUTION_API_KEY` | dify-api | (secret) | - |
| `PLUGIN_DIFY_INNER_API_KEY` | dify-api | (secret) | Inner API key used by the plugin daemon to call back into the API. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | dify-api | * | - |
| `WEB_API_CORS_ALLOW_ORIGINS` | dify-api | * | - |
| `API_KEY` | dify-sandbox | (secret) | Shared secret the API and worker present to the sandbox. |
| `GIN_MODE` | dify-sandbox | release | - |
| `SANDBOX_PORT` | dify-sandbox | 8194 | - |
| `ENABLE_NETWORK` | dify-sandbox | true | Let code nodes reach the internet. |
| `WORKER_TIMEOUT` | dify-sandbox | 15 | Seconds a single code block may run. |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | dify | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `MODE` | dify-worker | worker | - |
| `DB_PORT` | dify-worker | 5432 | - |
| `REDIS_DB` | dify-worker | 0 | - |
| `LOG_LEVEL` | dify-worker | INFO | - |
| `S3_REGION` | dify-worker | us-east-1 | - |
| `DEPLOY_ENV` | dify-worker | PRODUCTION | - |
| `REDIS_PORT` | dify-worker | 6379 | - |
| `SECRET_KEY` | dify-worker | (secret) | Must match dify-api SECRET_KEY so encrypted data stays compatible. |
| `DB_DATABASE` | dify-worker | dify | - |
| `DB_PASSWORD` | dify-worker | (secret) | - |
| `DB_USERNAME` | dify-worker | (secret) | - |
| `STORAGE_TYPE` | dify-worker | s3 | Uploaded files live in the MinIO service so the API and the worker read the same objects. |
| `VECTOR_STORE` | dify-worker | pgvector | - |
| `PGVECTOR_PORT` | dify-worker | 5432 | - |
| `PGVECTOR_USER` | dify-worker | (secret) | - |
| `REDIS_USE_SSL` | dify-worker | false | - |
| `S3_SECRET_KEY` | dify-worker | (secret) | - |
| `BROKER_USE_SSL` | dify-worker | false | - |
| `REDIS_PASSWORD` | dify-worker | (secret) | - |
| `S3_BUCKET_NAME` | dify-worker | dify | - |
| `S3_ADDRESS_STYLE` | dify-worker | path | MinIO serves buckets as a path, not a subdomain. |
| `MIGRATION_ENABLED` | dify-worker | false | - |
| `PGVECTOR_DATABASE` | dify-worker | dify | - |
| `PGVECTOR_PASSWORD` | dify-worker | (secret) | - |
| `MARKETPLACE_API_URL` | dify-worker | https://marketplace.dify.ai | - |
| `CODE_EXECUTION_API_KEY` | dify-worker | (secret) | - |
| `PLUGIN_DIFY_INNER_API_KEY` | dify-worker | (secret) | - |
| `CONSOLE_CORS_ALLOW_ORIGINS` | dify-worker | * | - |
| `WEB_API_CORS_ALLOW_ORIGINS` | dify-worker | * | - |
| `MINIO_ROOT_USER` | MinIO | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |
| `DB_PORT` | dify-plugin-daemon | 5432 | - |
| `REDIS_PORT` | dify-plugin-daemon | 6379 | - |
| `DB_DATABASE` | dify-plugin-daemon | dify | - |
| `DB_PASSWORD` | dify-plugin-daemon | (secret) | - |
| `DB_SSL_MODE` | dify-plugin-daemon | disable | - |
| `DB_USERNAME` | dify-plugin-daemon | (secret) | - |
| `SERVER_PORT` | dify-plugin-daemon | 5002 | - |
| `REDIS_PASSWORD` | dify-plugin-daemon | (secret) | - |
| `DIFY_INNER_API_KEY` | dify-plugin-daemon | (secret) | - |
| `MARKETPLACE_API_URL` | dify-plugin-daemon | https://marketplace.dify.ai | - |
| `PLUGIN_STORAGE_TYPE` | dify-plugin-daemon | local | - |
| `PLUGIN_WORKING_PATH` | dify-plugin-daemon | /app/storage/cwd | - |
| `FORCE_VERIFYING_SIGNATURE` | dify-plugin-daemon | true | - |
| `PLUGIN_STORAGE_LOCAL_ROOT` | dify-plugin-daemon | /app/storage | - |
| `PLUGIN_REMOTE_INSTALLING_HOST` | dify-plugin-daemon | 0.0.0.0 | Required — the plugin daemon refuses to start if this is empty. |
| `PLUGIN_REMOTE_INSTALLING_PORT` | dify-plugin-daemon | 5003 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Start command:** `sh -c 'docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --save 60 1 --dir /data --bind :: 0.0.0.0'`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "mkdir -p /data/dify && exec minio server /data --address :9000"`
- **Volume:** `/app/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-llm-app-platform-minio)
