# Deploy Mem0 Memory API + pgvector on Railway

Mem0 memory layer for AI agents: REST API, dashboard and pgvector Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-memory-api-pgvector)

## About

Mem0 is an open-source memory layer for AI agents and apps. It extracts durable facts from conversations, stores them as embeddings, and lets your agent recall them per user, agent, or session through a simple REST API. This template deploys the official self-hosted Mem0 server with its web dashboard and a pgvector Postgres database.

Hosting Mem0 means running the FastAPI REST server next to PostgreSQL with the pgvector extension, which holds both the memory embeddings and the app tables for users, API keys, request logs, and runtime settings. The dashboard is a separate Next.js service that talks to the API over its public HTTPS domain, and the API's CORS allow-list contains only the dashboard origin. Both app services are built directly from the upstream repository (`server/` and `server/dashboard/`), because Mem0 does not publish a maintained prebuilt image for the current server. Authentication is on by default: the first visit to the dashboard runs a setup wizard that creates the admin account, and a generated `ADMIN_API_KEY` lets you call the API immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| Mem0 API | [mem0ai/mem0](https://github.com/mem0ai/mem0) (branch: main) (root: /server) | Web service |
| Mem0 Dashboard | [mem0ai/mem0](https://github.com/mem0ai/mem0) (branch: main) (root: /server/dashboard) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | mem0 | Database name (memories table and app tables share it). |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `PORT` | Mem0 API | 8000 | Listen port for the Mem0 REST API. Railway probes $PORT for the healthcheck, so keep it equal to the uvicorn --port in the start command. |
| `JWT_SECRET` | Mem0 API | (secret) | Signs dashboard login tokens. Required when auth is enabled (default). Rotating it logs every dashboard user out. |
| `APP_DB_NAME` | Mem0 API | - | Database for users, API keys, request logs and settings (alembic). Upstream compose uses a second database created by an init script; Railway cannot mount init scripts, so both live in the same database (no table name overlap). |
| `POSTGRES_DB` | Mem0 API | - | Database holding the pgvector memories table. |
| `ADMIN_API_KEY` | Mem0 API | (secret) | Bootstrap admin key. Send it as the X-API-Key header to call the API before any dashboard admin exists. Per-user keys (m0sk_...) can be created in the dashboard afterwards. |
| `AUTH_DISABLED` | Mem0 API | false | Leave false. Setting true opens every endpoint to the internet (upstream marks it local-development only). |
| `DASHBOARD_URL` | Mem0 API | - | Public origin of the dashboard. Used as the only allowed CORS origin, so the browser dashboard can call this API. |
| `POSTGRES_HOST` | Mem0 API | - | Private hostname of the pgvector Postgres service. |
| `POSTGRES_PORT` | Mem0 API | - | Postgres port (5432). |
| `POSTGRES_USER` | Mem0 API | (secret) | Postgres user (superuser, needed for CREATE EXTENSION vector). |
| `GOOGLE_API_KEY` | Mem0 API | (secret) | Optional. Lets you pick Gemini as LLM and/or embedder in the dashboard Configuration page. |
| `MEM0_TELEMETRY` | Mem0 API | true | Upstream default. Sends at most two anonymous PostHog events per install. Set false to opt out. |
| `OPENAI_API_KEY` | Mem0 API | (secret) | REQUIRED to boot. Mem0 builds its OpenAI LLM and embedder at startup and the openai client raises 'Missing credentials' without a key, so the server crash-loops if this is empty. Other providers (Anthropic, Gemini) can be switched on later from the dashboard Configuration page. |
| `HISTORY_DB_PATH` | Mem0 API | /app/history/history.db | SQLite file for memory change history. Lives on the /app/history volume so it survives redeploys. |
| `ANTHROPIC_API_KEY` | Mem0 API | (secret) | Optional. Lets you pick Anthropic as the LLM in the dashboard Configuration page (embeddings still need OpenAI or Gemini). |
| `POSTGRES_PASSWORD` | Mem0 API | (secret) | Postgres password, generated on the Postgres service. |
| `MEM0_DEFAULT_LLM_MODEL` | Mem0 API | gpt-5-mini | OpenAI model used for fact extraction. Can be overridden later in the dashboard. |
| `POSTGRES_COLLECTION_NAME` | Mem0 API | memories | Name of the pgvector table that stores memory embeddings. |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | Mem0 API | text-embedding-3-small | OpenAI embedding model (1536 dims). Changing it after memories exist requires a new collection. |
| `PORT` | Mem0 Dashboard | 3000 | Next.js listen port. Railway probes $PORT for the /api/health healthcheck. |
| `HOSTNAME` | Mem0 Dashboard | 0.0.0.0 | Next.js standalone binds only $HOSTNAME. Docker sets HOSTNAME to the container id, which would make the healthcheck fail. |
| `DASHBOARD_URL` | Mem0 Dashboard | - | Own public origin. An https origin makes the refresh-token cookie Secure. |
| `API_INTERNAL_URL` | Mem0 Dashboard | - | URL the dashboard server uses for token refresh. Points at the API's public HTTPS domain because uvicorn binds 0.0.0.0 (an explicit :: bind is IPv6-only and fails Railway's healthcheck). |
| `NEXT_PUBLIC_API_URL` | Mem0 Dashboard | - | Public URL of the Mem0 API, called directly from the browser. Substituted into the built bundle at container start. |
| `NEXT_PUBLIC_INSTANCE_NAME` | Mem0 Dashboard | Mem0 | Name shown in the dashboard header. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'pip install --no-cache-dir --quiet "psycopg[binary]" && alembic upgrade head && exec uvicorn main:app --host 0.0.0.0 --port "$PORT" --proxy-headers --forwarded-allow-ips "*"'`
- **Healthcheck:** `/docs`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/history`
- **Healthcheck:** `/api/health`

**Category:** AI/ML · **Languages:** Python, TypeScript, Shell, CSS, Makefile, JavaScript, Go Template, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/mem0-memory-api-pgvector)
