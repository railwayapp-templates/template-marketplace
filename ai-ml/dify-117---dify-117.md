# Deploy dify 1.17 on Railway

Deploy Dify 1.17 on Railway — LLM apps, RAG, agents, plugins, and workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-117)

## About

[Dify](https://dify.ai) is an open-source LLM app development platform with visual workflows, RAG pipelines, agents, and API management. This template deploys the full Dify 1.17 production stack on Railway.

Hosting Dify on Railway maps the official [Dify Docker Compose](https://docs.dify.ai/en/self-host/deploy/quick-start/docker-compose) stack to individual Railway services. Only **nginx** is public; everything else communicates over Railway's private network.

The stack includes:

- **nginx** — reverse proxy (custom image) for `/`, `/console/api`, `/api`, `/v1`, `/files`, `/socket.io`, `/e/` (plugin webhooks)
- **postgres** — PostgreSQL 15 for Dify and plugin metadata
- **redis** — managed Redis for cache and Celery
- **weaviate** — vector database for RAG knowledge bases
- **minio** — S3-compatible object storage (shared files across api/worker)
- **api** / **api-websocket** / **worker** / **worker-beat** — Dify backend (`langgenius/dify-api:1.17.0`)
- **web** — Dify frontend (`langgenius/dify-web:1.17.0`)
- **plugin-daemon** — Dify plugin runtime
- **agent-backend** / **local-sandbox** — Dify Agent shell workspaces
- **sandbox** / **ssrf-proxy** / **agent-ssrf-proxy** — secure code execution with SSRF protection

After deploy:

1. Generate a public domain on the **nginx** service (Settings → Networking).
2. Redeploy so `CONSOLE_API_URL`, `APP_API_URL`, and related URL variables resolve.
3. Open `https:///install` to create the admin account.
4. Add LLM provider API keys in **Settings → Model Providers**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dify-api | `langgenius/dify-api:1.17.0` | Worker |
| api-websocket | `langgenius/dify-api:1.17.0` | Worker |
| postgres | `postgres:15-alpine` | Database |
| redis | `redis:8.2` | Database |
| web | `langgenius/dify-web:1.17.0` | Worker |
| local-sandbox | `langgenius/dify-agent-local-sandbox:1.17.0` | Database |
| worker-beat | `langgenius/dify-api:1.17.0` | Worker |
| plugin-daemon | `langgenius/dify-plugin-daemon:0.6.10-local` | Database |
| weaviate | `semitechnologies/weaviate:1.27.0` | Database |
| ssrf-proxy | `ghcr.io/sethumadhavan-k/dify-ssrf-proxy:1.17.0` | Worker |
| agent-backend | `langgenius/dify-agent-backend:1.17.0` | Worker |
| sandbox | `langgenius/dify-sandbox:0.2.15` | Database |
| nginx | `ghcr.io/sethumadhavan-k/dify-nginx:1.17.0` | Web service |
| minio | `minio/minio:latest` | Database |
| worker | `langgenius/dify-api:1.17.0` | Worker |
| agent-ssrf-proxy | `ghcr.io/sethumadhavan-k/dify-agent-ssrf-proxy:1.17.0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY` | dify-api | (secret) |
| `DB_PASSWORD` | dify-api | (secret) |
| `DB_USERNAME` | dify-api | (secret) |
| `S3_SECRET_KEY` | dify-api | (secret) |
| `REDIS_PASSWORD` | dify-api | (secret) |
| `SANDBOX_API_KEY` | dify-api | (secret) |
| `WEAVIATE_API_KEY` | dify-api | (secret) |
| `DIFY_AGENT_API_TOKEN` | dify-api | (secret) |
| `CODE_EXECUTION_API_KEY` | dify-api | (secret) |
| `AGENT_BACKEND_API_TOKEN` | dify-api | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | dify-api | (secret) |
| `PLUGIN_DIFY_INNER_API_KEY` | dify-api | (secret) |
| `DIFY_AGENT_SERVER_SECRET_KEY` | dify-api | (secret) |
| `DIFY_AGENT_LOCAL_SANDBOX_AUTH_TOKEN` | dify-api | (secret) |
| `SECRET_KEY` | api-websocket | (secret) |
| `DB_PASSWORD` | api-websocket | (secret) |
| `DB_USERNAME` | api-websocket | (secret) |
| `S3_SECRET_KEY` | api-websocket | (secret) |
| `REDIS_PASSWORD` | api-websocket | (secret) |
| `SANDBOX_API_KEY` | api-websocket | (secret) |
| `WEAVIATE_API_KEY` | api-websocket | (secret) |
| `DIFY_AGENT_API_TOKEN` | api-websocket | (secret) |
| `CODE_EXECUTION_API_KEY` | api-websocket | (secret) |
| `AGENT_BACKEND_API_TOKEN` | api-websocket | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | api-websocket | (secret) |
| `PLUGIN_DIFY_INNER_API_KEY` | api-websocket | (secret) |
| `DIFY_AGENT_LOCAL_SANDBOX_AUTH_TOKEN` | api-websocket | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDISPASSWORD` | redis | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `SHELLCTL_AUTH_TOKEN` | local-sandbox | (secret) |
| `SECRET_KEY` | worker-beat | (secret) |
| `DB_PASSWORD` | worker-beat | (secret) |
| `DB_USERNAME` | worker-beat | (secret) |
| `S3_SECRET_KEY` | worker-beat | (secret) |
| `REDIS_PASSWORD` | worker-beat | (secret) |
| `SANDBOX_API_KEY` | worker-beat | (secret) |
| `WEAVIATE_API_KEY` | worker-beat | (secret) |
| `DIFY_AGENT_API_TOKEN` | worker-beat | (secret) |
| `CODE_EXECUTION_API_KEY` | worker-beat | (secret) |
| `AGENT_BACKEND_API_TOKEN` | worker-beat | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | worker-beat | (secret) |
| `PLUGIN_DIFY_INNER_API_KEY` | worker-beat | (secret) |
| `DIFY_AGENT_LOCAL_SANDBOX_AUTH_TOKEN` | worker-beat | (secret) |
| `DB_PASSWORD` | plugin-daemon | (secret) |
| `DB_USERNAME` | plugin-daemon | (secret) |
| `REDIS_PASSWORD` | plugin-daemon | (secret) |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) |
| `DIFY_AGENT_API_TOKEN` | agent-backend | (secret) |
| `DIFY_AGENT_INNER_API_KEY` | agent-backend | (secret) |
| `DIFY_AGENT_SERVER_SECRET_KEY` | agent-backend | (secret) |
| `DIFY_AGENT_PLUGIN_DAEMON_API_KEY` | agent-backend | (secret) |
| `DIFY_AGENT_LOCAL_SANDBOX_AUTH_TOKEN` | agent-backend | (secret) |
| `API_KEY` | sandbox | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `SECRET_KEY` | worker | (secret) |
| `DB_PASSWORD` | worker | (secret) |
| `DB_USERNAME` | worker | (secret) |
| `S3_SECRET_KEY` | worker | (secret) |
| `REDIS_PASSWORD` | worker | (secret) |
| `SANDBOX_API_KEY` | worker | (secret) |
| `WEAVIATE_API_KEY` | worker | (secret) |
| `DIFY_AGENT_API_TOKEN` | worker | (secret) |
| `CODE_EXECUTION_API_KEY` | worker | (secret) |
| `AGENT_BACKEND_API_TOKEN` | worker | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | worker | (secret) |
| `PLUGIN_DIFY_INNER_API_KEY` | worker | (secret) |
| `DIFY_AGENT_LOCAL_SANDBOX_AUTH_TOKEN` | worker | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/workspace`
- **Volume:** `/app/storage`
- **Volume:** `/var/lib/weaviate`
- **Volume:** `/dependencies`
- **Healthcheck:** `/nginx-health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /data --console-address :9001`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-117)
