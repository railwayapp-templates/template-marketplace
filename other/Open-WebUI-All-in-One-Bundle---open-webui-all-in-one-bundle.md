# Deploy Open WebUI (All-in-One Bundle) on Railway

Open WebUI + PostgreSQL (pgvector) + Redis + SearXNG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-all-in-one-bundle)

## About

Open WebUI is a self-hosted, extensible web interface for chatting with large language models. It connects to OpenAI, Anthropic, Ollama, and other OpenAI-compatible providers, and adds RAG document chat, multi-model conversations, web search, and a plugin ecosystem inside one polished, ChatGPT-style UI.

Open WebUI runs as a Python/FastAPI backend serving a compiled Svelte frontend, listening on port 8080. Rather than the single-container SQLite default, this template follows Open WebUI's own [scaling guide](https://docs.openwebui.com/getting-started/advanced-topics/scaling) and deploys four services pre-wired over Railway's private network: **Open WebUI** itself, a **Postgres** service (the `pgvector/pgvector` image, which backs both the application database and the vector store for document embeddings), **SearXNG** (a privacy-respecting metasearch engine that powers in-chat web search), and **Redis** (a shared state store). User accounts, chat history, and prompts live in PostgreSQL; uploaded-document embeddings live in pgvector inside that same database (the `vector` extension is created automatically on first boot); Redis coordinates sessions, sign-out token revocation, and realtime websocket events so the app can scale to multiple replicas; and the Open WebUI service keeps its file uploads on a persistent volume at `/app/backend/data`. The template wraps all of this with automatic Railway PORT binding, a `/health` healthcheck, and auto-generated secrets. You add an LLM provider key (or point at Ollama) and you have a private, production-shaped AI chat workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui:main` | Web service |
| Postgres | `pgvector/pgvector:pg16` | Database |
| SearXNG | [protemplate/searxng](https://github.com/protemplate/searxng) | Worker |
| Redis | `redis:7-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Open WebUI | 8080 | Port Open WebUI listens on and Railway's healthcheck probes. |
| `REDIS_URL` | Open WebUI | - | Shared state store. Enables sign-out token revocation and lets multiple replicas coordinate app state. |
| `VECTOR_DB` | Open WebUI | pgvector | Stores document embeddings in pgvector (inside the same Postgres) instead of the embedded store. |
| `DATABASE_URL` | Open WebUI | - | Uses PostgreSQL for the app database instead of the default SQLite. Wired to the bundled Postgres over the private network. |
| `OPENAI_API_KEY` | Open WebUI | (secret) | OpenAI API key to enable GPT models |
| `OLLAMA_BASE_URL` | Open WebUI | - | Point at a self-hosted Ollama instance |
| `PGVECTOR_DB_URL` | Open WebUI | - | Connection URL for the pgvector store. Same Postgres as DATABASE_URL; the 'vector' extension is created automatically on first boot. |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Session signing key |
| `ANTHROPIC_API_KEY` | Open WebUI | (secret) | Anthropic API key to enable Claude models |
| `ENABLE_WEB_SEARCH` | Open WebUI | true | Turns on retrieval-augmented web search in chats, served by the bundled SearXNG. |
| `SEARXNG_QUERY_URL` | Open WebUI | - | Internal URL of the SearXNG service. The literal <query> placeholder is required. |
| `WEBSOCKET_MANAGER` | Open WebUI | redis | - |
| `WEB_SEARCH_ENGINE` | Open WebUI | searxng | - |
| `WEBSOCKET_REDIS_URL` | Open WebUI | - | Redis URL for the websocket manager (same Redis as REDIS_URL). |
| `ENABLE_WEBSOCKET_SUPPORT` | Open WebUI | true | Routes realtime chat/websocket events through Redis so the app can scale to multiple replicas. |
| `POSTGRES_DB` | Postgres | openwebui | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | SearXNG | 8080 | Port SearXNG listens on. Also required so ${{SearXNG.PORT}} references resolve; matches the image's [::]:8080 IPv6 bind. |
| `SEARXNG_SECRET_KEY` | SearXNG | (secret) | Injected into settings.yml at runtime to sign SearXNG sessions. |
| `SEARXNG_UWSGI_THREADS` | SearXNG | 4 | - |
| `SEARXNG_UWSGI_WORKERS` | SearXNG | 4 | - |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis AUTH. Referenced by Open WebUI's REDIS_URL. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `docker-entrypoint.sh postgres -c "listen_addresses=*"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --bind :: 0.0.0.0'`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-webui-all-in-one-bundle)
