# Deploy Open WebUI v0.12 + Ollama Private AI on Railway

Private AI chat: run open models with web search, RAG and multiple users.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-v012-ollama-private-ai)

## About

Open WebUI is a self-hosted chat interface for large language models, similar to ChatGPT, that works with local models through Ollama and with any OpenAI-compatible API. This community template runs Open WebUI with Ollama, private SearXNG web search, Postgres with pgvector for RAG, and Redis.

Open WebUI on its own is a single container, but a private, multi-user deployment needs several supporting pieces: a model server for open models, a database that survives redeploys, a vector store for document chat, a search backend for web-grounded answers, and Redis for real-time connections across workers. This template provides all of them on Railway's private network. Ollama pulls a small chat model and an embedding model on first boot, SearXNG answers web searches without third-party search keys, and pgvector keeps embeddings in Postgres. The admin account is created from variables at startup and public sign-up is closed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:v0.12.0` | Web service |
| Postgres | `pgvector/pgvector:0.8.7-pg18-trixie` | Database |
| SearXNG | [baranberkay96/open-webui-ollama-railway](https://github.com/baranberkay96/open-webui-ollama-railway) (branch: main) (root: /services/searxng) | Worker |
| Ollama | [baranberkay96/open-webui-ollama-railway](https://github.com/baranberkay96/open-webui-ollama-railway) (branch: main) (root: /services/ollama) | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Open WebUI | 0.0.0.0 | Bind address. 0.0.0.0, not '::': single-worker uvicorn on '::' is IPv6-only and Railway's healthcheck connects over IPv4. |
| `PORT` | Open WebUI | 8080 | HTTP port (public domain target). |
| `REDIS_URL` | Open WebUI | - | Redis for app state, task control and websockets. |
| `VECTOR_DB` | Open WebUI | pgvector | Store RAG embeddings in Postgres (pgvector) instead of the embedded Chroma. |
| `WEBUI_URL` | Open WebUI | - | Public URL (links, OAuth callbacks, notifications). |
| `DATABASE_URL` | Open WebUI | - | Postgres for users, chats, settings and knowledge metadata. |
| `DO_NOT_TRACK` | Open WebUI | true | Disable tracking. |
| `DEFAULT_MODELS` | Open WebUI | llama3.2:3b | Model preselected for new chats. |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Optional: add an OpenAI (or compatible) key to use hosted models alongside local ones. |
| `OLLAMA_BASE_URL` | Open WebUI | - | Private Ollama endpoint. |
| `UVICORN_WORKERS` | Open WebUI | 1 | Uvicorn worker processes. Raise to 2-4 after the first successful boot (migrations run per worker at startup). |
| `WEBUI_ADMIN_NAME` | Open WebUI | Admin | Display name of the bootstrap admin. |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Signs sessions/JWTs and encrypts OAuth tokens. Never change after first boot. |
| `CORS_ALLOW_ORIGIN` | Open WebUI | - | Allowed browser origins (semicolon-separated). |
| `DEFAULT_USER_ROLE` | Open WebUI | pending | Role for users who sign up later (admin approves them). |
| `ENABLE_WEB_SEARCH` | Open WebUI | true | Enable web search in chats. |
| `SEARXNG_QUERY_URL` | Open WebUI | - | SearXNG search endpoint (JSON format). |
| `WEBSOCKET_MANAGER` | Open WebUI | redis | Socket.IO state in Redis (required for more than one worker). |
| `WEBUI_ADMIN_EMAIL` | Open WebUI | - | Email (login) of the admin account created on first boot. Sign-up is disabled once it exists. |
| `WEB_SEARCH_ENGINE` | Open WebUI | searxng | Use the private SearXNG service. |
| `DATABASE_POOL_SIZE` | Open WebUI | 10 | SQLAlchemy pool size per worker. |
| `SCARF_NO_ANALYTICS` | Open WebUI | true | Disable Scarf analytics. |
| `RAG_EMBEDDING_MODEL` | Open WebUI | nomic-embed-text:v1.5 | Embedding model pulled by the Ollama service. |
| `ANONYMIZED_TELEMETRY` | Open WebUI | false | Disable anonymous telemetry. |
| `RAG_EMBEDDING_ENGINE` | Open WebUI | ollama | Compute document embeddings with Ollama (no local embedding model in this container). |
| `WEBUI_ADMIN_PASSWORD` | Open WebUI | (secret) | Password of the bootstrap admin account (generated). Change it after first login. |
| `DATABASE_POOL_RECYCLE` | Open WebUI | 1800 | Recycle DB connections after N seconds. |
| `WEB_SEARCH_RESULT_COUNT` | Open WebUI | 5 | Search results fetched per query. |
| `ENABLE_WEBSOCKET_SUPPORT` | Open WebUI | true | Real-time streaming over websockets. |
| `DATABASE_POOL_MAX_OVERFLOW` | Open WebUI | 5 | Extra connections above the pool size. |
| `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH` | Open WebUI | 1536 | Vector column size; fits nomic-embed-text (768, zero-padded) and 1536-dim API embeddings. Fixed after first use. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | SearXNG | 8080 | SearXNG port (private). |
| `SEARXNG_SECRET` | SearXNG | (secret) | SearXNG server secret. |
| `SEARXNG_BASE_URL` | SearXNG | - | Internal base URL (instance is private-only). |
| `PORT` | Ollama | 11434 | Ollama API port (private). |
| `OLLAMA_HOST` | Ollama | [::]:11434 | Bind address for the Ollama API (IPv4+IPv6). |
| `OLLAMA_KEEP_ALIVE` | Ollama | 5m | Unload idle models after this time to free RAM. |
| `OLLAMA_PULL_MODELS` | Ollama | llama3.2:3b,nomic-embed-text:v1.5 | Models pulled on first boot (comma-separated): a chat model and the RAG embedding model. |
| `OLLAMA_CONTEXT_LENGTH` | Ollama | 8192 | Default context window for chats with documents/web results. |
| `OLLAMA_MAX_LOADED_MODELS` | Ollama | 2 | Keep chat + embedding model loaded together. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/`
- **Volume:** `/root/.ollama`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Tags:** open-webui, ollama, llm, chatgpt-alternative, rag · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-webui-v012-ollama-private-ai)
