# Deploy securo on Railway

Self-host your personal finances with Securo on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/securo)

## About

Securo is an open-source, self-hosted personal finance manager focused on privacy and ownership of financial data. This template deploys the stable release `0.14.2` with durable PostgreSQL (including pgvector), Redis-backed task queues, and persistent attachment storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celery-beat | `ghcr.io/securo-finance/securo-backend:0.14.2@sha256:0b4aed85fa609ea4761be73bf738e5db322dcc922b73a8949e17424f63e0f3cf` | Worker |
| frontend | [monotykamary/railway-template-securo](https://github.com/monotykamary/railway-template-securo) | Web service |
| redis | `redis:8-alpine@sha256:978f0e01593e65eed801f2402944efcd936d43b5027e4908a7897baf88ed6241` | Database |
| backend | `ghcr.io/securo-finance/securo-backend:0.14.2@sha256:0b4aed85fa609ea4761be73bf738e5db322dcc922b73a8949e17424f63e0f3cf` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| celery-worker | `ghcr.io/securo-finance/securo-backend:0.14.2@sha256:0b4aed85fa609ea4761be73bf738e5db322dcc922b73a8949e17424f63e0f3cf` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | celery-beat | false | Enable verbose debug logging in the Securo backend. |
| `REDIS_URL` | celery-beat | - | Redis broker URL shared by the Celery worker and beat services. |
| `SECRET_KEY` | celery-beat | (secret) | Secret key used to sign sessions and tokens; generated automatically on deploy. |
| `DATABASE_URL` | celery-beat | - | Async SQLAlchemy connection string to PostgreSQL over Railway private networking. |
| `FRONTEND_URL` | celery-beat | - | Public URL of the frontend, used for CORS and generated links. |
| `AGENTS_ENABLED` | celery-beat | false | Enable the agents/LLM knowledge-base feature (requires LLM provider credentials and per-feature volumes). Defaults to off. |
| `STORAGE_LOCAL_PATH` | celery-beat | /app/data/attachments | Local directory for uploaded transaction attachments (backed by the attached volume). |
| `TESOURO_DIRETO_ENABLED` | celery-beat | true | Enable Brazilian Tesouro Direto government-bond asset pricing. |
| `AGENTS_KNOWLEDGE_STORAGE_PATH` | celery-beat | /app/data/agent_knowledge | Storage path for the agent knowledge base; used when AGENTS_ENABLED=true. |
| `BACKEND_URL` | frontend | - | Backend base URL over Railway private networking; used by the nginx adapter. |
| `FRONTEND_URL` | frontend | - | This service's public URL, exposed to the SPA at build time. |
| `REDIS_URL` | redis | - | Self-referencing Redis URL for local tooling. |
| `REDIS_PASSWORD` | redis | (secret) | Password required by Redis (--requirepass); generated automatically on deploy. |
| `DEBUG` | backend | false | Enable verbose debug logging in the Securo backend. |
| `REDIS_URL` | backend | - | Redis broker URL shared by the Celery worker and beat services. |
| `SECRET_KEY` | backend | (secret) | Secret key used to sign sessions and tokens; generated automatically on deploy. |
| `DATABASE_URL` | backend | - | Async SQLAlchemy connection string to PostgreSQL over Railway private networking. |
| `FRONTEND_URL` | backend | - | Public URL of the frontend, used for CORS and generated links. |
| `AGENTS_ENABLED` | backend | false | Enable the agents/LLM knowledge-base feature (requires LLM provider credentials and per-feature volumes). Defaults to off. |
| `STORAGE_LOCAL_PATH` | backend | /app/data/attachments | Local directory for uploaded transaction attachments (backed by the attached volume). |
| `TESOURO_DIRETO_ENABLED` | backend | true | Enable Brazilian Tesouro Direto government-bond asset pricing. |
| `AGENTS_KNOWLEDGE_STORAGE_PATH` | backend | /app/data/agent_knowledge | Storage path for the agent knowledge base; used when AGENTS_ENABLED=true. |
| `POSTGRES_DB` | postgres | securo | Database name. |
| `DATABASE_URL` | postgres | - | Connection string used by the backend services. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres superuser password; generated automatically on deploy. |
| `DEBUG` | celery-worker | false | Enable verbose debug logging in the Securo backend. |
| `REDIS_URL` | celery-worker | - | Redis broker URL shared by the Celery worker and beat services. |
| `SECRET_KEY` | celery-worker | (secret) | Secret key used to sign sessions and tokens; generated automatically on deploy. |
| `DATABASE_URL` | celery-worker | - | Async SQLAlchemy connection string to PostgreSQL over Railway private networking. |
| `FRONTEND_URL` | celery-worker | - | Public URL of the frontend, used for CORS and generated links. |
| `AGENTS_ENABLED` | celery-worker | false | Enable the agents/LLM knowledge-base feature (requires LLM provider credentials and per-feature volumes). Defaults to off. |
| `STORAGE_LOCAL_PATH` | celery-worker | /app/data/attachments | Local directory for uploaded transaction attachments (backed by the attached volume). |
| `TESOURO_DIRETO_ENABLED` | celery-worker | true | Enable Brazilian Tesouro Direto government-bond asset pricing. |
| `AGENTS_KNOWLEDGE_STORAGE_PATH` | celery-worker | /app/data/agent_knowledge | Storage path for the agent knowledge base; used when AGENTS_ENABLED=true. |

## Configuration

- **Start command:** `celery -A app.worker beat --loglevel=info`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Start command:** `sh -c 'alembic upgrade head > /tmp/migrate.log 2>&1 & exec uvicorn app.main:app --host 0.0.0.0 --port 8000'`
- **Volume:** `/app/data/attachments`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `celery -A app.worker worker --loglevel=info --concurrency=2`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/securo)
