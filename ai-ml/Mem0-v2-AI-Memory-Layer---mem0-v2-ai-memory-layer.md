# Deploy Mem0 v2 AI Memory Layer on Railway

Persistent memory for AI agents: REST API, dashboard and pgvector storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-v2-ai-memory-layer)

## About

Mem0 is an open-source memory layer for AI agents and assistants. It extracts durable facts from conversations, stores them as embeddings in Postgres with pgvector, and returns the relevant ones for each user, agent or session. This template deploys Mem0's self-hosted REST API, its web dashboard and a pgvector database, ready for your agents to call.

The self-hosted Mem0 server is a FastAPI application with authentication, per-user API keys and a request log, plus a Next.js dashboard. It needs Postgres with the pgvector extension, a second database for users and settings, migrations before start, an LLM and embedding provider, and periodic cleanup of request logs. This community template builds the API and dashboard from the pinned Mem0 v2.2.1 release, creates both databases and runs migrations before each deploy, creates the dashboard admin from generated credentials so no one else can claim the setup page, and adds a daily cron job for log retention. It also installs Mem0's recommended NLP extra, which enables hybrid keyword, semantic and entity search.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mem0 Log Pruner | [baranberkay96/mem0-railway](https://github.com/baranberkay96/mem0-railway) (branch: main) (root: /services/api) | Worker |
| Mem0 Dashboard | [baranberkay96/mem0-railway](https://github.com/baranberkay96/mem0-railway) (branch: main) (root: /services/dashboard) | Web service |
| Mem0 API | [baranberkay96/mem0-railway](https://github.com/baranberkay96/mem0-railway) (branch: main) (root: /services/api) | Web service |
| Postgres | `pgvector/pgvector:0.8.7-pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_DB_NAME` | Mem0 Log Pruner | - | App database that holds the request_logs table. |
| `POSTGRES_HOST` | Mem0 Log Pruner | - | Private hostname of Postgres. |
| `POSTGRES_PORT` | Mem0 Log Pruner | - | Postgres port. |
| `POSTGRES_USER` | Mem0 Log Pruner | (secret) | Postgres user. |
| `POSTGRES_PASSWORD` | Mem0 Log Pruner | (secret) | Postgres password. |
| `REQUEST_LOG_RETENTION_DAYS` | Mem0 Log Pruner | 30 | Delete API request log rows older than this many days (upstream default 30). |
| `PORT` | Mem0 Dashboard | 3000 | Next.js port. Railway routes the domain and the /api/health healthcheck here. |
| `HOSTNAME` | Mem0 Dashboard | 0.0.0.0 | Address Next.js binds to. Must not be the container hostname, or the healthcheck cannot connect. |
| `DASHBOARD_URL` | Mem0 Dashboard | - | Own public origin; an https origin makes the refresh-token cookie Secure. |
| `API_INTERNAL_URL` | Mem0 Dashboard | - | Private URL the dashboard server uses (setup status, token refresh). |
| `NEXT_PUBLIC_API_URL` | Mem0 Dashboard | - | Public URL of the Mem0 API, called from the browser. Written into the bundle at container start. |
| `NEXT_PUBLIC_INSTANCE_NAME` | Mem0 Dashboard | Mem0 | Name shown in the dashboard header. |
| `PORT` | Mem0 API | 8000 | Port uvicorn listens on (0.0.0.0). Railway routes the domain and the healthcheck here. |
| `JWT_SECRET` | Mem0 API | (secret) | Signs dashboard access and refresh tokens. Rotating it logs every dashboard user out. |
| `APP_DB_NAME` | Mem0 API | mem0_app | Database for users, API keys, request logs and settings (created by the pre-deploy step, migrated by Alembic). |
| `POSTGRES_DB` | Mem0 API | - | Database holding the pgvector memory and entity tables. |
| `ADMIN_API_KEY` | Mem0 API | (secret) | Server-wide admin key for scripts and agents: send it as the X-API-Key header. Per-user keys can be created in the dashboard. |
| `AUTH_DISABLED` | Mem0 API | false | Keep false. true opens every endpoint without authentication (upstream: local development only). |
| `DASHBOARD_URL` | Mem0 API | - | Public dashboard origin; the only origin allowed by the API's CORS policy. |
| `POSTGRES_HOST` | Mem0 API | - | Private hostname of the pgvector Postgres service. |
| `POSTGRES_PORT` | Mem0 API | - | Postgres port. |
| `POSTGRES_USER` | Mem0 API | (secret) | Postgres superuser (needed to create the vector extension and the app database). |
| `GOOGLE_API_KEY` | Mem0 API | (secret) | Optional. Lets you switch the LLM and/or embedder to Gemini in the dashboard Configuration page. |
| `MEM0_TELEMETRY` | Mem0 API | false | Upstream anonymous telemetry (PostHog, at most two events per install). Off in this template; set true to opt in. |
| `OPENAI_API_KEY` | Mem0 API | (secret) | REQUIRED. OpenAI (or OpenAI-compatible, see OPENAI_BASE_URL) key for memory extraction and embeddings. The API does not boot without it. |
| `HISTORY_DB_PATH` | Mem0 API | /app/history/history.db | SQLite file with the change history of every memory. Lives on the /app/history volume. |
| `MEM0_ADMIN_NAME` | Mem0 API | Admin | Display name of the bootstrap admin. |
| `OPENAI_BASE_URL` | Mem0 API | - | Optional OpenAI-compatible endpoint (OpenRouter, LiteLLM, Azure gateway, ...). Empty = api.openai.com. |
| `MEM0_ADMIN_EMAIL` | Mem0 API | admin@example.com | Login email of the dashboard admin created on first deploy (change it later under Settings). Empty = first visitor runs the setup wizard. |
| `ANTHROPIC_API_KEY` | Mem0 API | (secret) | Optional. Lets you switch the LLM to Anthropic in the dashboard Configuration page (embeddings still need OpenAI or Gemini). |
| `POSTGRES_PASSWORD` | Mem0 API | (secret) | Postgres password, generated on the Postgres service. |
| `MEM0_ADMIN_PASSWORD` | Mem0 API | (secret) | Password of that admin, generated at deploy. Only used while no user exists; change it later in the dashboard. |
| `MEM0_DEFAULT_LLM_MODEL` | Mem0 API | gpt-5-mini | Model used to extract facts from conversations (upstream default). Can be changed later in the dashboard Configuration page. |
| `POSTGRES_COLLECTION_NAME` | Mem0 API | memories | Table name of the memory embeddings. |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | Mem0 API | text-embedding-3-small | Embedding model (1536 dimensions, upstream default). Changing it after memories exist needs a new collection. |
| `POSTGRES_DB` | Postgres | mem0 | Database for the pgvector memory tables (the app database mem0_app is created next to it by the API pre-deploy step). |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres (private network, no TLS). |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `sh -c 'cd /app && exec python scripts/prune_request_logs.py'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/docs`
- **Volume:** `/app/history`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** mem0, memory, ai-agents, llm, rag · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/mem0-v2-ai-memory-layer)
