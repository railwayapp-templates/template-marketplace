# Deploy Syllogic on Railway

Self-host your own personal finance app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/syllogic)

## About

syllogic is a full-stack personal finance platform for tracking transactions, balances, subscriptions, and spending analytics across accounts. It supports CSV imports, smart categorization, recurring-payment detection, and optional AI enrichment. This Railway template deploys the full stack with production-oriented defaults, private service networking, and persistent storage.

Hosting syllogic on Railway provisions multiple services: `app` (frontend), `backend` (API/business logic), `mcp`, `worker`, `beat`, `postgres`, and `redis`. Internal service-to-service communication is prewired, reducing manual infrastructure setup. Database migrations run automatically during deployment, and uploads are persisted on a mounted app volume. In practice, setup is mostly configuring shared variables and enabling public access only where needed. This gives you a clean deployment path with managed infrastructure, while retaining flexibility to scale services independently as usage grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7-alpine` | Database |
| postgres | `postgres:16-alpine` | Database |
| backend | `ghcr.io/syllogic-ai/personal-finance-backend:sha-495e6e2` | Worker |
| worker | `ghcr.io/syllogic-ai/personal-finance-backend:sha-495e6e2` | Worker |
| mcp | `ghcr.io/syllogic-ai/personal-finance-backend:sha-495e6e2` | Worker |
| beat | `ghcr.io/syllogic-ai/personal-finance-backend:sha-495e6e2` | Worker |
| app | `ghcr.io/syllogic-ai/personal-finance-frontend:sha-495e6e2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | finance_db | Name of the db |
| `POSTGRES_USER` | postgres | (secret) | user of db |
| `POSTGRES_PASSWORD` | postgres | (secret) | password of db |
| `PORT` | backend | 8080 | Port of backend |
| `REDIS_URL` | backend | - | Redis url |
| `DATABASE_URL` | backend | - | Database url |
| `FRONTEND_URL` | backend | - | Frontend url |
| `PROCESS_TYPE` | backend | api | process type |
| `OPENAI_API_KEY` | backend | (secret) | OpenAI API key. |
| `API_DOCS_ENABLED` | backend | false | API docs |
| `MCP_UPSTREAM_URL` | backend | - | MCP upstream url |
| `CORS_ALLOW_ORIGINS` | backend | - | CORS origins |
| `INTERNAL_AUTH_SECRET` | backend | (secret) | auth secret |
| `REDIS_URL` | worker | - | redis url |
| `DATABASE_URL` | worker | - | db url |
| `FRONTEND_URL` | worker | - | Frontend URL |
| `PROCESS_TYPE` | worker | worker | process type |
| `OPENAI_API_KEY` | worker | (secret) | OpenAI API key. |
| `API_DOCS_ENABLED` | worker | false | API docs |
| `CORS_ALLOW_ORIGINS` | worker | - | CORS origins |
| `PORT` | mcp | 8001 | Port |
| `DATABASE_URL` | mcp | - | db url |
| `PROCESS_TYPE` | mcp | mcp | Process role (mcp). |
| `OPENAI_API_KEY` | mcp | (secret) | OpenAI API key. |
| `REDIS_URL` | beat | - | redis url |
| `DATABASE_URL` | beat | - | Database URL |
| `FRONTEND_URL` | beat | - | Frontend URL |
| `PROCESS_TYPE` | beat | beat | process type |
| `OPENAI_API_KEY` | beat | (secret) | OpenAI API key. |
| `API_DOCS_ENABLED` | beat | false | API docs |
| `CORS_ALLOW_ORIGINS` | beat | - | CORS origins |
| `PORT` | app | 3000 | Port |
| `APP_URL` | app | - | App listen port. |
| `NODE_ENV` | app | production | Node runtime environment. |
| `BACKEND_URL` | app | - | Backend Port config |
| `DATABASE_URL` | app | - | Database URL |
| `OPENAI_API_KEY` | app | (secret) | OpenAI API key. |
| `BETTER_AUTH_URL` | app | - | auth url |
| `LOGO_DEV_API_KEY` | app | (secret) | Logo.dev API key. |
| `MCP_UPSTREAM_URL` | app | - | MCP Server upstream URL |
| `STORAGE_PROVIDER` | app | local | storage provider |
| `BETTER_AUTH_SECRET` | app | (secret) | auth secret |
| `LOCAL_STORAGE_PATH` | app | uploads | local storage path |
| `INTERNAL_AUTH_SECRET` | app | (secret) | Internal auth secret |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | app | - | next public ur; |
| `MCP_PROXY_RATE_LIMIT_WINDOW_MS` | app | 60000 | Rate limit window for MCP requests |
| `MCP_PROXY_RATE_LIMIT_MAX_REQUESTS` | app | 240 | Rate limit for MCP requests |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `celery -A celery_app worker --loglevel=info --concurrency=4`
- **Start command:** `uvicorn mcp_server:app --host 0.0.0.0 --port 8001`
- **Start command:** `celery -A celery_app beat --loglevel=info`
- **Start command:** `/bin/sh -lc "mkdir -p /app/public/uploads && node scripts/migrate.js && exec node_modules/.bin/next start -p 3000 -H 0.0.0.0"`
- **Volume:** `/app/public/uploads`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/syllogic)
