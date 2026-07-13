# Deploy onyx on Railway

Open Source AI Platform - AI Chat with advanced features

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onyx)

## About

Onyx is an open-source AI platform that connects to your team's documents, tickets, and messages so it can chat, search, and act with full context of your organization. It combines RAG-based chat with 40+ data connectors (Slack, Confluence, GitHub, Google Drive, and more), custom AI agents, and enterprise auth — deployable as a self-hosted alternative to closed AI assistants.

Onyx is a multi-service application: a FastAPI backend, a Next.js frontend, a Celery-based background worker, and two dedicated ML model servers for embeddings and reranking, backed by Postgres, Redis, OpenSearch, and S3-compatible object storage. This template wires all ten services together on Railway's private network with a single public entry point behind nginx, so the whole stack comes up healthy with one deploy — no manual service linking, connection strings, or Docker Compose required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api-server | `onyxdotapp/onyx-backend:v4.3.4` | Worker |
| inference-model-server | `onyxdotapp/onyx-model-server:v4.3.4` | Database |
| web-server | `onyxdotapp/onyx-web-server:v4.3.4` | Worker |
| background | `onyxdotapp/onyx-backend:v4.3.4` | Worker |
| postgres | `pgvector/pgvector:pg15` | Database |
| nginx | `nginx:1.25.5-alpine` | Web service |
| indexing-model-server | `onyxdotapp/onyx-model-server:v4.3.4` | Database |
| opensearch | `opensearchproject/opensearch:3.6.0` | Database |
| redis | `valkey/valkey:8-alpine` | Database |
| minio | `minio/minio:RELEASE.2025-07-23T15-54-02Z-cpuv1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api-server | 8080 | Port uvicorn listens on |
| `AUTH_TYPE` | api-server | basic | Authentication scheme: `basic` (email/password — the first user to register becomes admin) |
| `LOG_LEVEL` | api-server | info | Log verbosity for the API server. |
| `REDIS_HOST` | api-server | - | Redis/Valkey hostname |
| `WEB_DOMAIN` | api-server | - | Public base URL of the deployment. |
| `POSTGRES_DB` | api-server | - | Database name |
| `POSTGRES_HOST` | api-server | - | Postgres hostname on the private network |
| `POSTGRES_PORT` | api-server | 5432 | Postgres port |
| `POSTGRES_USER` | api-server | (secret) |  Database user |
| `OPENSEARCH_HOST` | api-server | - | OpenSearch hostname on the private network |
| `S3_ENDPOINT_URL` | api-server | - | S3-compatible endpoint for the file store |
| `USER_AUTH_SECRET` | api-server | (secret) | Signs session cookies and password-reset / email-verification / OAuth-state tokens |
| `MODEL_SERVER_HOST` | api-server | - | Hostname of the inference model server |
| `POSTGRES_PASSWORD` | api-server | (secret) | Database password |
| `FILE_STORE_BACKEND` | api-server | s3 | File storage backend |
| `S3_AWS_ACCESS_KEY_ID` | api-server | - | S3 access key |
| `ENCRYPTION_KEY_SECRET` | api-server | (secret) | Encrypts connector credentials at rest in Postgres |
| `S3_AWS_SECRET_ACCESS_KEY` | api-server | (secret) | S3 secret key |
| `OPENSEARCH_ADMIN_PASSWORD` | api-server | (secret) | Basic-auth password for the OpenSearch |
| `S3_FILE_STORE_BUCKET_NAME` | api-server | onyx-file-store-bucket | Bucket for uploaded files |
| `PORT` | inference-model-server | 9000 | Port the model server listens on; used by the Railway healthcheck. |
| `LOG_LEVEL` | inference-model-server | info | Log verbosity |
| `PORT` | web-server | 3000 | Port the Next.js standalone server listens on |
| `INTERNAL_URL` | web-server | - |  URL the Next.js server uses for server-side API calls over the private network |
| `AUTH_TYPE` | background | basic | Must match api-server |
| `LOG_LEVEL` | background | info | Log verbosity for all Celery workers and bots |
| `REDIS_HOST` | background | - | Celery broker / cache hostname |
| `WEB_DOMAIN` | background | - |  Public base URL |
| `POSTGRES_DB` | background | - | Database name |
| `POSTGRES_HOST` | background | - | Postgres hostname on the private network |
| `POSTGRES_PORT` | background | 5432 | Postgres port |
| `POSTGRES_USER` | background | (secret) | Database user |
| `API_SERVER_HOST` | background | - |  How workers and bots (e.g. Discord) reach the API over the private network |
| `OPENSEARCH_HOST` | background | - |  OpenSearch hostname on the private network |
| `S3_ENDPOINT_URL` | background | - | S3-compatible endpoint (MinIO) |
| `USER_AUTH_SECRET` | background | (secret) | Must be identical to api-server |
| `MODEL_SERVER_HOST` | background | - | Inference model server hostname (port 9000) |
| `POSTGRES_PASSWORD` | background | (secret) | Database password |
| `FILE_STORE_BACKEND` | background | s3 |  Must match api-server |
| `API_SERVER_PROTOCOL` | background | http | Protocol for internal API calls (plain HTTP inside the private network) |
| `S3_AWS_ACCESS_KEY_ID` | background | - | S3 access key |
| `ENCRYPTION_KEY_SECRET` | background | (secret) | Must be identical to api-server |
| `S3_AWS_SECRET_ACCESS_KEY` | background | (secret) | S3 secret key |
| `OPENSEARCH_ADMIN_PASSWORD` | background | (secret) | OpenSearch admin password |
| `S3_FILE_STORE_BUCKET_NAME` | background | onyx-file-store-bucket | File store bucket |
| `INDEXING_MODEL_SERVER_HOST` | background | - | Dedicated indexing model server hostname (port 9000) |
| `POSTGRES_DB` | postgres | postgres | Database created on first boot and used by Onyx |
| `POSTGRES_USER` | postgres | (secret) | Database superuser created on first boot. The Onyx backend connects as this user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password |
| `PORT` | nginx | 80 | Target port for the Railway public domain |
| `NGINX_CONF` | nginx | - | nginx config |
| `PORT` | indexing-model-server | 9000 | Port the model server listens on |
| `LOG_LEVEL` | indexing-model-server | info | Log verbosity |
| `INDEXING_ONLY` | indexing-model-server | True | Runs this instance in indexing mode |
| `VESPA_SEARCHER_THREADS` | indexing-model-server | 1 | Embedding worker threads during indexing |
| `OPENSEARCH_JAVA_OPTS` | opensearch | -Xms2g -Xmx2g | JVM heap size. Keep Xms = Xmx at roughly 50% of the memory available to this service. |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | opensearch | (secret) | Admin password applied by the security plugin's demo config on first boot |
| `DISABLE_PERFORMANCE_ANALYZER_AGENT_CLI` | opensearch | true |  Disables the Performance Analyzer telemetry sidecar. |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root access key |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | MinIO root secret key |

## Configuration

- **Start command:** `/bin/sh -c "alembic upgrade head && echo 'Starting Onyx Api Server' && exec uvicorn onyx.main:app --host 0.0.0.0 --port 8080"`
- **Healthcheck:** `/health`
- **Healthcheck:** `/api/health`
- **Volume:** `/app/.cache/huggingface`
- **Healthcheck:** `/`
- **Start command:** `/app/scripts/supervisord_entrypoint.sh`
- **Start command:** `docker-entrypoint.sh postgres -c max_connections=250`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'printenv NGINX_CONF > /etc/nginx/conf.d/default.conf; until nginx -t; do sleep 3; done; (while :; do sleep 60; nginx -s reload; done &); exec nginx -g "daemon off;"'`
- **Healthcheck:** `/nginx-health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -c "chown -R 1000:0 /usr/share/opensearch/data; export HOME=/usr/share/opensearch; exec chroot --userspec=1000:0 / /usr/share/opensearch/opensearch-docker-entrypoint.sh opensearch -Ediscovery.type=single-node"`
- **Volume:** `/usr/share/opensearch/data`
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/onyx)
