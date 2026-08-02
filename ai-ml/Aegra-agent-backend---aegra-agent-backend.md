# Deploy Aegra agent backend on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aegra-agent-backend)

## About

Deploy Aegra `0.9.24` as an authenticated, self-hosted Agent Protocol backend with durable PostgreSQL checkpoints and Redis-backed job execution. The template includes a working echo graph, generated bearer authentication, automatic database migrations, and crash recovery without requiring an LLM key.

Aegra serves LangGraph applications through the Agent Protocol used by LangGraph clients. This Railway topology keeps PostgreSQL and Redis on the private network while exposing one managed-TLS API domain for threads, runs, streaming events, crons, and store operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Aegra Redis | `redis:8-alpine@sha256:e8eb6f2980c06c6a25c08f62cb2e00dc7d2fead9aa492cfdd8b54a42109ae0f2` | Database |
| Aegra PostgreSQL | `pgvector/pgvector:pg18@sha256:691673308c99d2161ba298736f3147f1f22d79de2fb7ec93ae9b4afcab870b62` | Database |
| Aegra | [tech-progress/railway-template-aegra](https://github.com/tech-progress/railway-template-aegra) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Aegra Redis | (secret) | Generated password for the private persistent Redis broker. |
| `POSTGRES_DB` | Aegra PostgreSQL | aegra | Database used for Agent Protocol state, runs, leases, and checkpoints. |
| `POSTGRES_USER` | Aegra PostgreSQL | (secret) | PostgreSQL role used by Aegra. |
| `POSTGRES_PASSWORD` | Aegra PostgreSQL | (secret) | Generated password for the private pgvector database. |
| `HOST` | Aegra | 0.0.0.0 | Binds the HTTP server to every container interface. |
| `PORT` | Aegra | 2026 | HTTP port used by Railway routing and health checks. |
| `DEBUG` | Aegra | false | Disables debug behavior in production. |
| `ENV_MODE` | Aegra | PRODUCTION | Selects Aegra's production settings. |
| `AUTH_TYPE` | Aegra | custom | Loads the bundled constant-time bearer-token authenticator. |
| `LOG_LEVEL` | Aegra | INFO | Application log threshold. |
| `REDIS_URL` | Aegra | - | Authenticated private Redis connection string. |
| `SERVER_URL` | Aegra | - | Public Agent Protocol base URL. |
| `DB_ECHO_LOG` | Aegra | false | Keeps SQL statement logging disabled in production. |
| `POSTGRES_DB` | Aegra | - | Reference to the Aegra database name. |
| `AEGRA_CONFIG` | Aegra | /app/aegra.json | Absolute path to the graph and authentication configuration. |
| `CRON_ENABLED` | Aegra | true | Runs Aegra's persisted cron scheduler in this instance. |
| `OTEL_TARGETS` | Aegra | - | Optional comma-separated observability targets; empty by default. |
| `WORKER_COUNT` | Aegra | 2 | Worker loops started inside the Aegra instance. |
| `AEGRA_API_KEY` | Aegra | (secret) | Generated bearer token required by every protected Agent Protocol route. |
| `POSTGRES_HOST` | Aegra | - | Private Railway hostname of PostgreSQL. |
| `POSTGRES_PORT` | Aegra | 5432 | Private PostgreSQL port. |
| `POSTGRES_USER` | Aegra | (secret) | Username reference for PostgreSQL. |
| `METRICS_ENABLED` | Aegra | false | Keeps the metrics route disabled unless explicitly enabled. |
| `DB_POOL_MAX_SIZE` | Aegra | 5 | Maximum API database pool size. |
| `DB_POOL_MIN_SIZE` | Aegra | 5 | Minimum API database pool size. |
| `N_JOBS_PER_WORKER` | Aegra | 4 | Maximum concurrent jobs handled by each worker loop. |
| `POSTGRES_PASSWORD` | Aegra | (secret) | Password reference for PostgreSQL. |
| `REDIS_WORKER_COUNT` | Aegra | 2 | Worker loops started inside the Aegra instance. |
| `OTEL_CONSOLE_EXPORT` | Aegra | false | Disables console trace export. |
| `OTEL_CONSOLE_ENABLED` | Aegra | false | Disables console trace export. |
| `REDIS_BROKER_ENABLED` | Aegra | true | Uses Redis for queued workers and event streaming. |
| `SQLALCHEMY_POOL_SIZE` | Aegra | 5 | Base API database pool size. |
| `REDIS_JOBS_PER_WORKER` | Aegra | 4 | Maximum concurrent jobs handled by each worker loop. |
| `DB_WORKER_POOL_MAX_SIZE` | Aegra | 10 | Maximum worker database pool size. |
| `DB_WORKER_POOL_MIN_SIZE` | Aegra | 2 | Minimum worker database pool size. |
| `LANGGRAPH_MAX_POOL_SIZE` | Aegra | 10 | Maximum LangGraph checkpoint database pool size. |
| `LANGGRAPH_MIN_POOL_SIZE` | Aegra | 2 | Minimum LangGraph checkpoint database pool size. |
| `SQLALCHEMY_MAX_OVERFLOW` | Aegra | 5 | Maximum overflow connections above the API pool size. |
| `ENABLE_PROMETHEUS_METRICS` | Aegra | false | Keeps the Prometheus metrics route disabled unless explicitly enabled. |

## Configuration

- **Start command:** `/bin/sh -ec 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, TypeScript, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/aegra-agent-backend)
