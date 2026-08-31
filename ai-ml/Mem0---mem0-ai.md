# Deploy Mem0 on Railway

Long-term memory for AI agents that remembers across conversations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-ai)

## About

Mem0 is an open-source memory layer for AI agents. Rather than replaying a whole transcript into every prompt, your application posts conversation turns to Mem0, which uses an LLM to extract durable facts — preferences, decisions, constraints — deduplicates them against what it knows, embeds them, and returns the handful that matter next time. With over 60,000 GitHub stars it is the most widely used project in agent memory, and it ships Python and TypeScript SDKs plus LangChain, CrewAI, AutoGen and n8n integrations.

Self-host Mem0 on Railway and you get the whole first-party stack: **mem0-api**, the FastAPI REST server that owns extraction, storage and search; **mem0-dashboard**, the official Next.js admin UI for browsing memories, issuing API keys and watching a request audit log; and a managed **Postgres** with pgvector serving as both vector store and application database. Both images build from tagged `mem0ai/mem0` source, since upstream publishes no current image for either half. Agents call the API with an `X-API-Key` header; only Postgres stays private.

![Diagram of the mem0 API, dashboard and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788063217/mem0-architecture.png)

Long-running assistants forget. The usual workarounds — stuffing full history into context, or retrieving raw chunks with plain RAG — get expensive and imprecise as conversations grow. Mem0 decides what is worth remembering and returns only relevant facts at query time. Teams self-host it when conversation data cannot leave their infrastructure, when per-request pricing stops making sense, or when they want memory in the Postgres they already back up.

Key capabilities:

- LLM-driven fact extraction, reconciled against existing memories as add, update or delete
- Semantic search over pgvector scoped by `user_id`, `agent_id` or `run_id`, with metadata filters
- Per-memory history showing when a fact was added, revised or removed
- Per-user API keys with revocation, JWT dashboard sessions, and a request audit log
- Optional expiry dates on memories, and custom extraction prompts

The architecture is small. `mem0-api` runs its migrations at boot then serves the REST API on port 8000, with a volume at `/app/history` holding memory history in SQLite. `mem0-dashboard` is a Next.js server on port 3000 that reads the API's public origin at container start. Postgres holds two databases: the default one carries the pgvector `memories` collection, and `mem0_app` holds users, API keys, configuration and request logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mem0-dashboard | [gridalpha/mem0-railway](https://github.com/gridalpha/mem0-railway) | Web service |
| mem0-api | [gridalpha/mem0-railway](https://github.com/gridalpha/mem0-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mem0-dashboard | 3000 | HTTP port the Next.js server listens on |
| `MEM0_REF` | mem0-dashboard | v2.0.19 | mem0ai/mem0 release tag to build |
| `DASHBOARD_URL` | mem0-dashboard | - | Own public origin, sets cookie security |
| `API_INTERNAL_URL` | mem0-dashboard | - | API address for server-side calls |
| `NEXT_PUBLIC_API_URL` | mem0-dashboard | - | API origin the browser calls |
| `NEXT_PUBLIC_INSTANCE_NAME` | mem0-dashboard | Mem0 | Name shown in the dashboard header |
| `PORT` | mem0-api | 8000 | HTTP port uvicorn listens on |
| `MEM0_REF` | mem0-api | v2.0.19 | mem0ai/mem0 release tag to build |
| `JWT_SECRET` | mem0-api | (secret) | Signs dashboard session tokens |
| `APP_DB_NAME` | mem0-api | mem0_app | Database for users, keys, settings |
| `POSTGRES_DB` | mem0-api | - | Database holding the vector store |
| `DASHBOARD_URL` | mem0-api | - | CORS allow-list origin |
| `POSTGRES_HOST` | mem0-api | - | Private database hostname |
| `POSTGRES_PORT` | mem0-api | - | Database port |
| `POSTGRES_USER` | mem0-api | (secret) | Database user |
| `MEM0_TELEMETRY` | mem0-api | false | Anonymous install telemetry, off |
| `OPENAI_API_KEY` | mem0-api | (secret) | Required: extraction and embedding credential |
| `HISTORY_DB_PATH` | mem0-api | /app/history/history.db | Memory history file on the volume |
| `OPENAI_BASE_URL` | mem0-api | - | Optional: any OpenAI-compatible endpoint |
| `POSTGRES_PASSWORD` | mem0-api | (secret) | Database password |
| `MEM0_DEFAULT_LLM_MODEL` | mem0-api | gpt-5-mini | Default fact-extraction model |
| `POSTGRES_COLLECTION_NAME` | mem0-api | memories | pgvector table name |
| `REQUEST_LOG_RETENTION_DAYS` | mem0-api | 30 | Days of request log to keep when pruning |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | mem0-api | text-embedding-3-small | Default embedding model |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/docs`
- **Volume:** `/app/history`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/mem0-ai)
