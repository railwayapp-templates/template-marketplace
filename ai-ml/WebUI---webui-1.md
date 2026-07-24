# Deploy WebUI on Railway

Deploy OpenWebUI with Postgres & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webui-1)

## About

Open WebUI is an open-source, self-hosted AI chat interface for interacting with large language models through a modern, ChatGPT-style web application. It supports OpenAI-compatible APIs, Ollama, and other AI providers, while offering user management, chat history, document-based retrieval (RAG), and multi-user collaboration in a private deployment.

Hosting Open WebUI on Railway provides a production-ready AI workspace without managing servers or container infrastructure. This template deploys Open WebUI alongside PostgreSQL for persistent storage and Redis for real-time WebSocket communication and caching. Railway automatically provisions secure private networking between services, HTTPS for public access, and environment variable management for secrets and API keys. Unlike the default SQLite deployment, PostgreSQL preserves chat history, prompts, user accounts, and settings across redeployments, while Redis enables horizontal scaling and responsive real-time collaboration for multiple users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| open-webui/open-webui | `ghcr.io/open-webui/open-webui` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | open-webui/open-webui | 8080 | HTTP server listening port |
| `REDIS_URL` | open-webui/open-webui | - | Redis connection string for caching |
| `WEBUI_URL` | open-webui/open-webui | - | Public URL for OpenWebUI |
| `WEBUI_AUTH` | open-webui/open-webui | true | Enable authentication for web interface |
| `DATABASE_URL` | open-webui/open-webui | - | Postgres connection string for OpenWebUI |
| `DO_NOT_TRACK` | open-webui/open-webui | true | Disable tracking signals |
| `OPENAI_API_KEY` | open-webui/open-webui | (secret) | Optional OpenAI API key |
| `WEBUI_SECRET_KEY` | open-webui/open-webui | (secret) | Secret key for session security |
| `WEBSOCKET_MANAGER` | open-webui/open-webui | redis | Use Redis for websocket scaling |
| `DATABASE_POOL_SIZE` | open-webui/open-webui | 10 | Base database connection pool size |
| `SCARF_NO_ANALYTICS` | open-webui/open-webui | true | Disable Scarf package analytics |
| `OPENAI_API_BASE_URL` | open-webui/open-webui | https://api.openai.com/v1 | Base endpoint for OpenAI API. Modify if using Gemini. Note: OpenWebUI doesnt support Anthropic's format. Need to proxy that if you want to use it |
| `WEBSOCKET_REDIS_URL` | open-webui/open-webui | - | Redis backend for websocket manager |
| `ANONYMIZED_TELEMETRY` | open-webui/open-webui | false | Disable anonymous usage telemetry |
| `DATABASE_POOL_RECYCLE` | open-webui/open-webui | 1800 | Seconds before recycling connections |
| `DATABASE_POOL_TIMEOUT` | open-webui/open-webui | 30 | Seconds to wait for connection |
| `ENABLE_WEBSOCKET_SUPPORT` | open-webui/open-webui | true | Enable real-time websocket communication |
| `DATABASE_POOL_MAX_OVERFLOW` | open-webui/open-webui | 5 | Extra connections beyond pool size |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/webui-1)
