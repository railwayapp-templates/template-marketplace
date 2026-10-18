# Deploy OpenWebUI (Open WebUI / Open Web UI) Pro Stack + LiteLLM on Railway

Openweb UI: private AI chat/RAG with LiteLLM, PostgreSQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-pro-stack)

## About

**Open WebUI Pro Stack combines a self-hosted AI chat interface with LiteLLM, PostgreSQL and Redis in one Railway template.** Get a shared AI workspace with centrally managed provider connections, persistent chat history and uploaded files.

Open WebUI, also searched as OpenWebUI or Open Web UI, is the chat application. **Pro Stack describes the included infrastructure**, not a paid edition of Open WebUI. Bring your own provider credentials; hosting and model usage are billed separately.

The template connects the applications and databases through Railway's private network, with generated authentication secrets and persistent volumes already defined.

| Included service | What it adds to your workspace |
|---|---|
| **Open WebUI** | Browser chat, user accounts, chat history, file uploads and the application's knowledge features. A volume is mounted at `/app/backend/data`. |
| **LiteLLM** | A separate model gateway and admin interface. Add supported provider models in one place and expose their aliases to Open WebUI through an OpenAI-compatible API. Model configuration is stored in PostgreSQL. |
| **PostgreSQL** | Persistent relational storage for application records and LiteLLM configuration, using Railway's PostgreSQL service image and standard connection variables. Its data volume is mounted at `/var/lib/postgresql/data`. |
| **Redis** | A connected Redis service, including Open WebUI's Redis WebSocket manager, with a persistent volume at `/data`. |

The chat path is **browser → Open WebUI → LiteLLM → your model provider**. Databases use internal Railway addresses. Public applications use login authentication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |
| litellm | `ghcr.io/berriai/litellm:main-latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis host |
| `REDISPORT` | Redis | 6379 | Redis port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Internal connection URL |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection URL |
| `PORT` | open-webui | 8080 | Open WebUI web interface port |
| `REDIS_URL` | open-webui | - | Internal Redis connection URL |
| `WEBUI_AUTH` | open-webui | true | Enable login authentication |
| `DATABASE_URL` | open-webui | - | Internal Postgres connection URL |
| `ENABLE_SIGNUP` | open-webui | true | Allow new user registration |
| `OPENAI_API_KEY` | open-webui | (secret) | LiteLLM master key (internal) |
| `WEBUI_SECRET_KEY` | open-webui | (secret) | Secret key for session encryption |
| `ENABLE_OLLAMA_API` | open-webui | false | Disable direct Ollama connection |
| `WEBSOCKET_MANAGER` | open-webui | redis | Use Redis for WebSocket sessions |
| `OPENAI_API_BASE_URL` | open-webui | - | LiteLLM internal proxy URL |
| `ENABLE_RAG_WEB_SEARCH` | open-webui | true | Enable web search in chat |
| `ENABLE_IMAGE_GENERATION` | open-webui | true | Enable image generation feature |
| `ENABLE_WEBSOCKET_SUPPORT` | open-webui | true | Enable real-time WebSocket support |
| `PORT` | litellm | 4000 | LiteLLM proxy API port |
| `REDIS_URL` | litellm | - | Internal Redis connection URL |
| `UI_PASSWORD` | litellm | (secret) | LiteLLM admin UI password (auto-generated) |
| `UI_USERNAME` | litellm | (secret) | LiteLLM admin UI username |
| `DATABASE_URL` | litellm | - | Internal Postgres connection URL |
| `STORE_MODEL_IN_DB` | litellm | True | Persist models config in Postgres |
| `LITELLM_MASTER_KEY` | litellm | - | Master API key to access LiteLLM proxy |
| `POSTGRES_DB` | Postgres | railway | Default database name created on first boot |
| `DATABASE_URL` | Postgres | - | Internal connection string for other Railway services |
| `POSTGRES_USER` | Postgres | (secret) | Default superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated 32-char password |
| `DATABASE_PUBLIC_URL` | Postgres | - | External connection string for tools like psql or pgAdmin |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Healthcheck:** `/health/readiness`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-pro-stack)
