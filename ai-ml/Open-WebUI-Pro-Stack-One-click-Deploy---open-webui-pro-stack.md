# Deploy Open WebUI Pro Stack One-click Deploy on Railway

AI stack: open webui, litellm, pg & redis. openwebui open web ui openweb ui

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-pro-stack)

## About

Open WebUI Pro Stack is a production-ready, self-hosted AI workspace that gives you a private ChatGPT-like interface connected to any LLM provider. Powered by Open WebUI, LiteLLM, Postgres, and Redis — fully yours, zero vendor lock-in, one-click deploy.

This template deploys a complete private AI workspace on Railway across four services: Open WebUI as the chat frontend, LiteLLM as the multi-provider proxy, Postgres for persistent storage, and Redis for WebSocket session management. All services are pre-wired through Railway's internal private network with auto-generated secrets — no manual networking required. After deploy, log into LiteLLM's admin UI to add your API keys (OpenAI, Anthropic, Groq, Gemini, or any OpenAI-compatible provider), then open Open WebUI and start chatting. The first account created automatically becomes admin. Supports multi-user teams, RAG web search, image generation, and real-time streaming out of the box.

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
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-pro-stack)
