# Deploy Open WebUI [with Postgres & Redis] on Railway

Self-host OpenWebUI; Postgres survives redeploys, Redis scales sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openwebui)

## About

This Railway template deploys OpenWebUI backed by **PostgreSQL** and **Redis** — giving you persistent chat history, production-grade connection pooling, and horizontally scalable WebSocket support out of the box. One-click deploy, zero manual wiring.

![OpenWebUI Railway Template](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773087946/openwebui_wv1sxw.png)

OpenWebUI (`ghcr.io/open-webui/open-webui`) is an open-source, self-hosted ChatGPT-style interface for interacting with LLMs. It supports any OpenAI-compatible API (OpenAI, Gemini, Ollama) and runs entirely on your infrastructure.

**This template specifically adds:**
- **PostgreSQL** — replaces the default SQLite, so chat history, prompts, and user config survive redeploys and scale beyond a single container
- **Redis** — handles WebSocket state and caching, enabling multi-instance scaling
- **Private networking** — all three services communicate internally; nothing is exposed unnecessarily

OpenWebUI ships with a built-in vector store (ChromaDB). Unless you're running heavy RAG workloads at scale, it's sufficient — no need to add Qdrant separately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Open WebUI | 8080 | HTTP server listening port |
| `REDIS_URL` | Open WebUI | - | Redis connection string for caching |
| `WEBUI_URL` | Open WebUI | - | Public URL for OpenWebUI |
| `WEBUI_AUTH` | Open WebUI | true | Enable authentication for web interface |
| `DATABASE_URL` | Open WebUI | - | Postgres connection string for OpenWebUI |
| `DO_NOT_TRACK` | Open WebUI | true | Disable tracking signals |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Optional OpenAI API key |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Secret key for session security |
| `WEBSOCKET_MANAGER` | Open WebUI | redis | Use Redis for websocket scaling |
| `DATABASE_POOL_SIZE` | Open WebUI | 10 | Base database connection pool size |
| `SCARF_NO_ANALYTICS` | Open WebUI | true | Disable Scarf package analytics |
| `OPENAI_API_BASE_URL` | Open WebUI | https://api.openai.com/v1 | Base endpoint for OpenAI API. Modify if using Gemini. Note: OpenWebUI doesnt support Anthropic's format. Need to proxy that if you want to use it |
| `WEBSOCKET_REDIS_URL` | Open WebUI | - | Redis backend for websocket manager |
| `ANONYMIZED_TELEMETRY` | Open WebUI | false | Disable anonymous usage telemetry |
| `DATABASE_POOL_RECYCLE` | Open WebUI | 1800 | Seconds before recycling connections |
| `DATABASE_POOL_TIMEOUT` | Open WebUI | 30 | Seconds to wait for connection |
| `ENABLE_WEBSOCKET_SUPPORT` | Open WebUI | true | Enable real-time websocket communication |
| `DATABASE_POOL_MAX_OVERFLOW` | Open WebUI | 5 | Extra connections beyond pool size |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for Postgres admin user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `REDISHOST` | Redis | - | Internal hostname for Redis service |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/openwebui)
