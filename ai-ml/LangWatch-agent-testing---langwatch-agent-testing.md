# Deploy LangWatch agent testing on Railway

Private LangWatch agent testing with durable traces and evaluations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langwatch-agent-testing)

## About

Run LangWatch agent testing and LLM observability with durable traces, datasets, evaluations, and background workers. This template deploys the pinned community release with PostgreSQL, Redis, ClickHouse analytics, and Railway object storage.

LangWatch receives application traces, turns production examples into datasets, and runs evaluators and agent tests. Railway hosts the web application and workers alongside private persistent data services, so the deployment survives restarts without placing databases on the public network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LangWatch Workers | `langwatch/langwatch:3.9.0@sha256:78ef9aa223bf443cb82ec8ee272b50392357d37dafd66d87d513fb576fa1b2ea` | Worker |
| LangWatch ClickHouse | `clickhouse/clickhouse-server:25.10.2.65-alpine@sha256:81ce9121febca7b12c75cf1aae448ccfaef0f68da25802ad805e81f8af610de9` | Database |
| LangWatch NLP | `langwatch/langwatch_nlp:3.9.0@sha256:c9be1948fc11fb347915df73796880e463938e96b9fed142ee885caebb586e2b` | Worker |
| LangWatch Evaluators | `langwatch/langevals:3.9.0@sha256:44e087f1d77b91efd0a9c073cb158cc972d21060c167f6f49187a84ffb747357` | Worker |
| LangWatch | `langwatch/langwatch:3.9.0@sha256:78ef9aa223bf443cb82ec8ee272b50392357d37dafd66d87d513fb576fa1b2ea` | Web service |
| LangWatch Redis | `redis:8.2.1-alpine3.22@sha256:987c376c727652f99625c7d205a1cba3cb2c53b92b0b62aade2bd48ee1593232` | Database |
| LangWatch PostgreSQL | `postgres:16.10-alpine3.22@sha256:029660641a0cfc575b14f336ba448fb8a75fd595d42e1fa316b9fb4378742297` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | LangWatch Workers | production | - |
| `INSTALL_METHOD` | LangWatch Workers | docker | - |
| `NEXTAUTH_SECRET` | LangWatch Workers | (secret) | Shared with the LangWatch application. |
| `NEXTAUTH_PROVIDER` | LangWatch Workers | email | - |
| `CREDENTIALS_SECRET` | LangWatch Workers | (secret) | Shared with the LangWatch application. |
| `DISABLE_USAGE_STATS` | LangWatch Workers | true | - |
| `SKIP_ENV_VALIDATION` | LangWatch Workers | true | - |
| `API_TOKEN_JWT_SECRET` | LangWatch Workers | (secret) | Shared with the LangWatch application. |
| `S3_SECRET_ACCESS_KEY` | LangWatch Workers | (secret) | - |
| `CLICKHOUSE_DB` | LangWatch ClickHouse | langwatch | - |
| `CLICKHOUSE_PASSWORD` | LangWatch ClickHouse | (secret) | Generated password for persistent trace analytics. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | LangWatch ClickHouse | 1 | - |
| `DISABLE_EVALUATORS_PRELOAD` | LangWatch Evaluators | true | - |
| `PORT` | LangWatch | 5560 | - |
| `NODE_ENV` | LangWatch | production | - |
| `INSTALL_METHOD` | LangWatch | docker | - |
| `S3_BUCKET_NAME` | LangWatch | - | Railway Bucket used for datasets and evaluation artifacts. |
| `NEXTAUTH_SECRET` | LangWatch | (secret) | Generated session-signing secret. |
| `NEXTAUTH_PROVIDER` | LangWatch | email | - |
| `CREDENTIALS_SECRET` | LangWatch | (secret) | Generated encryption key for stored provider credentials. |
| `DISABLE_USAGE_STATS` | LangWatch | true | - |
| `SKIP_ENV_VALIDATION` | LangWatch | true | - |
| `API_TOKEN_JWT_SECRET` | LangWatch | (secret) | Generated API-token signing secret. |
| `S3_SECRET_ACCESS_KEY` | LangWatch | (secret) | - |
| `REDIS_PASSWORD` | LangWatch Redis | (secret) | Generated password for the private job queue. |
| `POSTGRES_DB` | LangWatch PostgreSQL | langwatch | - |
| `POSTGRES_USER` | LangWatch PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | LangWatch PostgreSQL | (secret) | Generated password for LangWatch metadata. |

## Configuration

- **Start command:** `/bin/sh -ec 'cd /app/langwatch && exec pnpm run start:workers'`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -ec 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langwatch-agent-testing)
