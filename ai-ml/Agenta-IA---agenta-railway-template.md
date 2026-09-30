# Deploy Agenta IA on Railway

Agenta (open-source LLMOps) on Railway - 14-service OSS stack (1 click)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agenta-railway-template)

## About

Agenta is an open-source LLMOps platform for building, evaluating and shipping LLM applications.
This template deploys the complete Agenta OSS stack — 14 services behind a single HTTPS domain —
pinned to Agenta **v0.121.5**.

Hosting Agenta on Railway gives you the full open-source platform as a managed multi-service stack:
a Next.js studio, a FastAPI core with evaluations and tracing, a workflow/agent runtime, background
workers, PostgreSQL, Redis, an S3-compatible object store and SuperTokens auth.

Only the nginx gateway is exposed publicly. Every other service is reached over Railway's private
network, so your database, cache and object store are never internet-facing.

Deploying from this template means the topology, start commands, healthchecks, pinned image
versions and generated secrets are already correct — you get a working instance instead of a build
list.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| supertokens | `supertokens/supertokens-postgresql:11` | Database |
| web | `ghcr.io/agenta-ai/agenta-web:v0.121.5` | Worker |
| seaweedfs | [BURNI80/agenta-railway-template](https://github.com/BURNI80/agenta-railway-template) (root: seaweedfs) | Worker |
| alembic | `ghcr.io/agenta-ai/agenta-api:v0.121.5` | Worker |
| worker-streams | `ghcr.io/agenta-ai/agenta-api:v0.121.5` | Worker |
| Postgres | [BURNI80/agenta-railway-template](https://github.com/BURNI80/agenta-railway-template) (root: postgres) | Worker |
| runner | `ghcr.io/agenta-ai/agenta-runner:v0.121.5` | Worker |
| services | `ghcr.io/agenta-ai/agenta-services:v0.121.5` | Worker |
| api | [BURNI80/agenta-railway-template](https://github.com/BURNI80/agenta-railway-template) (root: api) | Worker |
| web-mobile | `ghcr.io/agenta-ai/agenta-web-mobile:v0.121.5` | Worker |
| gateway | [BURNI80/agenta-railway-template](https://github.com/BURNI80/agenta-railway-template) (root: gateway) | Web service |
| redis | [BURNI80/agenta-railway-template](https://github.com/BURNI80/agenta-railway-template) (root: redis) | Worker |
| worker-queues | `ghcr.io/agenta-ai/agenta-api:v0.121.5` | Worker |
| cron | `ghcr.io/agenta-ai/agenta-api:v0.121.5` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_URI_SUPERTOKENS` | supertokens | (secret) |
| `PORT` | web | 8080 |
| `HOSTNAME` | web | 0.0.0.0 |
| `AGENTA_LICENSE` | web | oss |
| `AGENTA_AUTH_KEY` | web | (secret) |
| `AGENTA_STORE_BUCKET` | seaweedfs | agenta-store |
| `AGENTA_STORE_JWT_ISSUER` | seaweedfs | http://api.railway.internal:8000/api |
| `AGENTA_STORE_SECRET_KEY` | seaweedfs | (secret) |
| `AGENTA_LICENSE` | alembic | oss |
| `AGENTA_AUTH_KEY` | alembic | (secret) |
| `ALEMBIC_CFG_PATH_CORE` | alembic | /app/oss/databases/postgres/migrations/core/alembic.ini |
| `ALEMBIC_CFG_PATH_TRACING` | alembic | /app/oss/databases/postgres/migrations/tracing/alembic.ini |
| `POSTGRES_URI_SUPERTOKENS` | alembic | (secret) |
| `AGENTA_LICENSE` | worker-streams | oss |
| `AGENTA_AUTH_KEY` | worker-streams | (secret) |
| `POSTGRES_URI_SUPERTOKENS` | worker-streams | (secret) |
| `SUPERTOKENS_CONNECTION_URI` | worker-streams | (secret) |
| `POSTGRES_DB` | Postgres | agenta_oss_core |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AGENTA_RUNNER_HOST` | runner | 0.0.0.0 |
| `AGENTA_RUNNER_PORT` | runner | 8765 |
| `AGENTA_RUNNER_TOKEN` | runner | (secret) |
| `AGENTA_STORE_BUCKET` | runner | agenta-store |
| `AGENTA_STORE_SECRET_KEY` | runner | (secret) |
| `AGENTA_INSECURE_EGRESS_ALLOWED` | runner | false |
| `AGENTA_RUNNER_DEFAULT_SANDBOX_PROVIDER` | runner | local |
| `AGENTA_RUNNER_ENABLED_SANDBOX_PROVIDERS` | runner | local |
| `PORT` | services | 8080 |
| `SCRIPT_NAME` | services | /services |
| `AGENTA_LICENSE` | services | oss |
| `AGENTA_AUTH_KEY` | services | (secret) |
| `AGENTA_RUNNER_TOKEN` | services | (secret) |
| `AGENTA_STORE_BUCKET` | services | agenta-store |
| `AGENTA_STORE_SECRET_KEY` | services | (secret) |
| `POSTGRES_URI_SUPERTOKENS` | services | (secret) |
| `AGENTA_INSECURE_EGRESS_ALLOWED` | services | false |
| `PORT` | api | 8000 |
| `SCRIPT_NAME` | api | /api |
| `AGENTA_LICENSE` | api | oss |
| `AGENTA_AUTH_KEY` | api | (secret) |
| `AGENTA_RUNNER_TOKEN` | api | (secret) |
| `AGENTA_STORE_BUCKET` | api | agenta-store |
| `AGENTA_DB_WAIT_SECONDS` | api | 300 |
| `AGENTA_STORE_SECRET_KEY` | api | (secret) |
| `POSTGRES_URI_SUPERTOKENS` | api | (secret) |
| `AGENTA_LLM_GATEWAY_ENABLED` | api | false |
| `SUPERTOKENS_CONNECTION_URI` | api | (secret) |
| `AGENTA_INSECURE_EGRESS_ALLOWED` | api | false |
| `PORT` | web-mobile | 8080 |
| `HOSTNAME` | web-mobile | 0.0.0.0 |
| `AGENTA_LICENSE` | web-mobile | oss |
| `AGENTA_AUTH_KEY` | web-mobile | (secret) |
| `PORT` | gateway | 8080 |
| `AGENTA_API_UPSTREAM` | gateway | api.railway.internal:8000 |
| `AGENTA_WEB_UPSTREAM` | gateway | web.railway.internal:8080 |
| `AGENTA_SERVICES_UPSTREAM` | gateway | services.railway.internal:8080 |
| `AGENTA_WEB_MOBILE_UPSTREAM` | gateway | web-mobile.railway.internal:8080 |
| `AGENTA_LICENSE` | worker-queues | oss |
| `AGENTA_AUTH_KEY` | worker-queues | (secret) |
| `POSTGRES_URI_SUPERTOKENS` | worker-queues | (secret) |
| `SUPERTOKENS_CONNECTION_URI` | worker-queues | (secret) |
| `AGENTA_LICENSE` | cron | oss |
| `AGENTA_AUTH_KEY` | cron | (secret) |
| `POSTGRES_URI_SUPERTOKENS` | cron | (secret) |
| `SUPERTOKENS_CONNECTION_URI` | cron | (secret) |

## Configuration

- **Start command:** `sh -lc '/app/entrypoint.sh node /app/oss/server.js'`
- **Start command:** `sh -c 'until psql -w -tAc "SELECT 1" >/dev/null 2>&1; do sleep 2; done; exec /opt/venv/bin/python -m oss.databases.postgres.migrations.runner'`
- **Start command:** `python -m entrypoints.worker_streams`
- **Start command:** `node_modules/.bin/tsx src/server.ts`
- **Start command:** `gunicorn entrypoints.main:app --bind 0.0.0.0:8080 --worker-class uvicorn.workers.UvicornWorker --workers 2 --max-requests 10000 --max-requests-jitter 1000 --timeout 60 --graceful-timeout 60 --log-level info --access-logfile - --error-logfile -`
- **Healthcheck:** `/health`
- **Start command:** `sh -lc '/app/entrypoint.sh node /app/mobile/server.js'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `python -m entrypoints.worker_queues`
- **Start command:** `/usr/local/bin/supercronic /app/crontab`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/agenta-railway-template)
