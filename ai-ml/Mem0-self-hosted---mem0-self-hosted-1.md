# Deploy Mem0 self-hosted on Railway

Authenticated Mem0 API and dashboard with persistent pgvector memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-self-hosted-1)

## About

Deploy Mem0 `2.0.3` as an authenticated memory API and team dashboard with private pgvector storage and persistent memory history. The template builds from a checksum-verified upstream commit, runs database migrations automatically, and generates the database, JWT, and administrator secrets.

Mem0 gives AI agents and applications persistent user, agent, and run memory through a REST API. This Railway topology runs the API, the browser dashboard, and PostgreSQL as separate services, so the database stays on Railway's private network while the two HTTP surfaces receive managed TLS domains.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mem0 Dashboard | [tech-progress/railway-template-mem0](https://github.com/tech-progress/railway-template-mem0) (branch: release-v1) (root: /) | Web service |
| Mem0 PostgreSQL | `pgvector/pgvector:pg17@sha256:7ae6051efd0e60444282c27c7e141af07f322ce033300e727a49c3dd11075e38` | Database |
| Mem0 API | [tech-progress/railway-template-mem0](https://github.com/tech-progress/railway-template-mem0) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mem0 Dashboard | 3000 | Dashboard HTTP port used by Railway routing and health checks. |
| `API_INTERNAL_URL` | Mem0 Dashboard | - | Private API URL used by dashboard server-side requests. |
| `NEXT_PUBLIC_API_URL` | Mem0 Dashboard | - | Public API URL used by the browser. |
| `NEXT_PUBLIC_INSTANCE_NAME` | Mem0 Dashboard | Mem0 | Display name shown in the dashboard. |
| `POSTGRES_DB` | Mem0 PostgreSQL | postgres | Database used for vectors; the API creates a separate mem0_app database for users and settings. |
| `POSTGRES_USER` | Mem0 PostgreSQL | (secret) | PostgreSQL role used by Mem0. |
| `POSTGRES_PASSWORD` | Mem0 PostgreSQL | (secret) | Generated password for the private pgvector database. |
| `PORT` | Mem0 API | 8000 | HTTP port used by Railway routing and health checks. |
| `JWT_SECRET` | Mem0 API | (secret) | Generated secret that signs dashboard access and refresh tokens. |
| `APP_DB_NAME` | Mem0 API | mem0_app | Database used for Mem0 users, API keys, settings, and request logs. |
| `POSTGRES_DB` | Mem0 API | - | Reference to the vector database name. |
| `ADMIN_API_KEY` | Mem0 API | (secret) | Generated bootstrap API key for administrative and programmatic access. |
| `AUTH_DISABLED` | Mem0 API | false | Keep false on Railway so API and dashboard authentication remain enabled. |
| `DASHBOARD_URL` | Mem0 API | - | Public dashboard origin allowed by the API CORS policy. |
| `POSTGRES_HOST` | Mem0 API | - | Private Railway hostname of the pgvector service. |
| `POSTGRES_PORT` | Mem0 API | 5432 | Private PostgreSQL port. |
| `POSTGRES_USER` | Mem0 API | (secret) | Username reference for the private pgvector service. |
| `MEM0_TELEMETRY` | Mem0 API | false | Disables upstream anonymous onboarding telemetry by default. |
| `OPENAI_API_KEY` | Mem0 API | (secret) | Required provider key for memory extraction and embeddings. |
| `HISTORY_DB_PATH` | Mem0 API | /app/history/history.db | SQLite memory-history file stored on the Mem0 history volume. |
| `OPENAI_BASE_URL` | Mem0 API | - | Optional OpenAI-compatible API base URL; leave blank for OpenAI. |
| `POSTGRES_PASSWORD` | Mem0 API | (secret) | Password reference for the private pgvector service. |
| `MEM0_DEFAULT_LLM_MODEL` | Mem0 API | gpt-4.1-nano-2025-04-14 | Default OpenAI model for memory extraction. |
| `POSTGRES_COLLECTION_NAME` | Mem0 API | memories | pgvector collection used for memory embeddings. |
| `REQUEST_LOG_RETENTION_DAYS` | Mem0 API | 30 | Retention target used by Mem0's request-log pruning command. |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | Mem0 API | text-embedding-3-small | Default OpenAI embedding model for new memories and searches. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/docs`
- **Volume:** `/app/history`

**Category:** AI/ML · **Languages:** Shell, TypeScript, Python

[View on Railway →](https://railway.com/deploy/mem0-self-hosted-1)
