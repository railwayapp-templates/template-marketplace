# Deploy Onyx v4 Enterprise AI Search on Railway

Ask questions across Slack, Drive, Confluence and more with self-hosted AI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onyx-v4-enterprise-ai-search)

## About

Onyx is an open-source AI platform for enterprise search and chat: it connects to tools like Slack, Google Drive, Confluence, Jira and GitHub, indexes their content and answers questions with citations using the LLM of your choice. This community template deploys the full Onyx v4 stack on Railway, including connectors, document indexing and local embedding models.

A complete Onyx deployment has many moving parts. An API server and a Next.js web app sit behind nginx; a background service runs Celery workers that pull documents from connectors, split and embed them, sync permissions and keep the index fresh. Two model servers run the embedding models locally, OpenSearch stores the hybrid keyword and vector index, Postgres keeps users, connectors and chat history, Redis brokers the task queues and holds sessions, and an S3-compatible store keeps uploaded files. This template wires all of it together over Railway's private network with generated secrets, persistent volumes and healthchecks. It is resource-intensive: plan for roughly 8–14 GB of RAM.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nginx | [baranberkay96/onyx-railway](https://github.com/baranberkay96/onyx-railway) (branch: main) (root: /services/nginx) | Web service |
| opensearch | [baranberkay96/onyx-railway](https://github.com/baranberkay96/onyx-railway) (branch: main) (root: /services/opensearch) | Database |
| indexing-model-server | `onyxdotapp/onyx-model-server:v4.9.0` | Worker |
| api-server | `onyxdotapp/onyx-backend:v4.9.0` | Worker |
| inference-model-server | `onyxdotapp/onyx-model-server:v4.9.0` | Worker |
| SeaweedFS | `chrislusf/seaweedfs:4.48` | Database |
| web-server | `onyxdotapp/onyx-web-server:v4.9.0` | Worker |
| background | `onyxdotapp/onyx-backend:v4.9.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | nginx | 80 | nginx listen port (public domain target). |
| `ONYX_API_HOST` | nginx | - | API server host (port 8080). |
| `ONYX_WEB_HOST` | nginx | - | Web server host (port 3000). |
| `NGINX_PROXY_READ_TIMEOUT` | nginx | 300 | Upstream read timeout (s); raise for very long agent runs. |
| `NGINX_PROXY_SEND_TIMEOUT` | nginx | 300 | Upstream send timeout (s). |
| `NGINX_PROXY_CONNECT_TIMEOUT` | nginx | 300 | Upstream connect timeout (s). |
| `network.host` | opensearch | :: | Listen on IPv6 and IPv4 for private-network clients. |
| `discovery.type` | opensearch | single-node | Single-node cluster (as upstream). |
| `OPENSEARCH_JAVA_OPTS` | opensearch | -Xms2g -Xmx2g | JVM heap (upstream value). Keep about half of the RAM OpenSearch may use. |
| `bootstrap.memory_lock` | opensearch | false | memlock ulimits cannot be raised on Railway. |
| `node.store.allow_mmap` | opensearch | false | Do not depend on the host's vm.max_map_count, which containers cannot change. |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | opensearch | (secret) | Admin password for the security plugin (prefix guarantees upper/lower/digit/special). |
| `DISABLE_PERFORMANCE_ANALYZER_AGENT_CLI` | opensearch | true | Do not start the Performance Analyzer side JVM (saves ~0.3 GB). |
| `PORT` | indexing-model-server | 9000 | Model server port (Railway healthcheck). |
| `LOG_LEVEL` | indexing-model-server | info | Log level. |
| `INDEXING_ONLY` | indexing-model-server | True | Indexing mode: serves document embedding requests from the background workers. |
| `PORT` | api-server | 8080 | API port (private; nginx routes /api here). |
| `LOG_LEVEL` | api-server | info | Log level for API, Celery workers and bots. |
| `REDIS_HOST` | api-server | - | Redis host (Celery broker, cache, login sessions). |
| `REDIS_PORT` | api-server | - | Redis port. |
| `WEB_DOMAIN` | api-server | - | Public URL (nginx); used for redirects, emails and SSO callbacks. |
| `POSTGRES_DB` | api-server | - | Postgres database. |
| `POSTGRES_HOST` | api-server | - | Postgres host (private network). |
| `POSTGRES_PORT` | api-server | - | Postgres port. |
| `POSTGRES_USER` | api-server | (secret) | Postgres user. |
| `REDIS_PASSWORD` | api-server | (secret) | Redis password. |
| `AWS_REGION_NAME` | api-server | us-east-1 | Region sent to the S3 client; us-east-1 avoids a LocationConstraint when Onyx creates the bucket. |
| `OPENSEARCH_HOST` | api-server | - | OpenSearch host (document index, port 9200, HTTPS with the image's self-signed demo certificate). |
| `S3_ENDPOINT_URL` | api-server | - | SeaweedFS S3 endpoint (private network). Onyx uses path-style addressing. |
| `USER_AUTH_SECRET` | api-server | (secret) | Signs password-reset, verification, OAuth-state and captcha tokens. Required by the API server. |
| `MODEL_SERVER_HOST` | api-server | - | Inference model server (query embeddings, reranking). |
| `POSTGRES_PASSWORD` | api-server | (secret) | Postgres password. |
| `FILE_STORE_BACKEND` | api-server | s3 | Uploaded files and connector blobs go to S3-compatible storage (SeaweedFS). |
| `VALID_EMAIL_DOMAINS` | api-server | - | Optional. Comma-separated email domains allowed to sign up (e.g. example.com). Empty = anyone with the URL can register. |
| `S3_AWS_ACCESS_KEY_ID` | api-server | - | SeaweedFS S3 access key. |
| `ENCRYPTION_KEY_SECRET` | api-server | (secret) | Encrypts connector credentials and API keys stored in Postgres. Never change after first use. |
| `S3_AWS_SECRET_ACCESS_KEY` | api-server | (secret) | SeaweedFS S3 secret key. |
| `OPENSEARCH_ADMIN_PASSWORD` | api-server | (secret) | OpenSearch admin password (reference). |
| `S3_FILE_STORE_BUCKET_NAME` | api-server | onyx-file-store-bucket | Bucket created by Onyx on first start. |
| `ENABLE_PAID_ENTERPRISE_EDITION_FEATURES` | api-server | false | Enterprise features need an Onyx license. |
| `PORT` | inference-model-server | 9000 | Model server port (Railway healthcheck). |
| `LOG_LEVEL` | inference-model-server | info | Log level. |
| `PORT` | SeaweedFS | 8333 | S3 gateway port; Railway healthcheck uses /healthz. |
| `AWS_ACCESS_KEY_ID` | SeaweedFS | - | Admin access key for the S3 gateway (SeaweedFS reads it from the environment). |
| `AWS_SECRET_ACCESS_KEY` | SeaweedFS | (secret) | Admin secret key for the S3 gateway. |
| `PORT` | web-server | 3000 | Next.js port (private; nginx routes / here). |
| `HOSTNAME` | web-server | :: | Bind address; :: accepts IPv4 and IPv6 from nginx. |
| `WEB_DOMAIN` | web-server | - | Public URL. |
| `INTERNAL_URL` | web-server | - | API URL used for server-side rendering. |
| `LOG_LEVEL` | background | info | Log level for API, Celery workers and bots. |
| `REDIS_HOST` | background | - | Redis host (Celery broker, cache, login sessions). |
| `REDIS_PORT` | background | - | Redis port. |
| `WEB_DOMAIN` | background | - | Public URL (nginx); used for redirects, emails and SSO callbacks. |
| `POSTGRES_DB` | background | - | Postgres database. |
| `POSTGRES_HOST` | background | - | Postgres host (private network). |
| `POSTGRES_PORT` | background | - | Postgres port. |
| `POSTGRES_USER` | background | (secret) | Postgres user. |
| `REDIS_PASSWORD` | background | (secret) | Redis password. |
| `API_SERVER_HOST` | background | - | API server host for internal calls. |
| `AWS_REGION_NAME` | background | us-east-1 | Region sent to the S3 client; us-east-1 avoids a LocationConstraint when Onyx creates the bucket. |
| `OPENSEARCH_HOST` | background | - | OpenSearch host (document index, port 9200, HTTPS with the image's self-signed demo certificate). |
| `S3_ENDPOINT_URL` | background | - | SeaweedFS S3 endpoint (private network). Onyx uses path-style addressing. |
| `USER_AUTH_SECRET` | background | (secret) | Must match api-server. |
| `DISCORD_BOT_TOKEN` | background | (secret) | Optional. Enables the Discord bot. |
| `MODEL_SERVER_HOST` | background | - | Inference model server (query embeddings, reranking). |
| `POSTGRES_PASSWORD` | background | (secret) | Postgres password. |
| `FILE_STORE_BACKEND` | background | s3 | Uploaded files and connector blobs go to S3-compatible storage (SeaweedFS). |
| `API_SERVER_PROTOCOL` | background | http | Protocol for internal calls to the API (Discord bot). |
| `S3_AWS_ACCESS_KEY_ID` | background | - | SeaweedFS S3 access key. |
| `ENCRYPTION_KEY_SECRET` | background | (secret) | Must match api-server. |
| `S3_AWS_SECRET_ACCESS_KEY` | background | (secret) | SeaweedFS S3 secret key. |
| `OPENSEARCH_ADMIN_PASSWORD` | background | (secret) | OpenSearch admin password (reference). |
| `S3_FILE_STORE_BUCKET_NAME` | background | onyx-file-store-bucket | Bucket created by Onyx on first start. |
| `INDEXING_MODEL_SERVER_HOST` | background | - | Indexing model server (document embeddings). |
| `ENABLE_PAID_ENTERPRISE_EDITION_FEATURES` | background | false | Enterprise features need an Onyx license. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/usr/bin/tini -g -- /usr/local/bin/wrapper.sh postgres -p 5432 -c listen_addresses=* -c max_connections=250`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/nginx-health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/opensearch/data`
- **Start command:** `python -m uvicorn model_server.main:app --host 0.0.0.0 --port 9000`
- **Healthcheck:** `/api/health`
- **Start command:** `/bin/sh -c "alembic upgrade head && exec uvicorn onyx.main:app --host 0.0.0.0 --port 8080"`
- **Healthcheck:** `/health`
- **Start command:** `/entrypoint.sh server -ip=127.0.0.1 -ip.bind=:: -s3 -s3.port=8333`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/logo.png`
- **Start command:** `/app/scripts/supervisord_entrypoint.sh`

**Category:** AI/ML · **Tags:** onyx, enterprise-search, rag, ai-chat, opensearch · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/onyx-v4-enterprise-ai-search)
