# Deploy Langwatch (AI Observability) on Railway

Deploy and Host Langwatch (AI Observability) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langwatch-ai-observability)

## About

LangWatch is an open-source LLM observability platform for monitoring, evaluating, and improving AI applications. It captures traces and spans from your LLM calls, runs automated evaluations and guardrails, tracks quality and cost analytics, and includes an optimization studio for prompt and pipeline tuning — giving teams full visibility into how their AI behaves in production.

Hosting LangWatch means running a multi-service stack: the Next.js app (UI and API), a background workers process, a Go-based NLP engine, the LangEvals evaluation service, plus three datastores — PostgreSQL for primary data, Redis for queues, and ClickHouse for trace indexing and time-series analytics. This template wires all seven services together over Railway's private network, provisions managed Postgres and Redis, mounts persistent volumes for ClickHouse and the databases, and auto-generates the encryption and auth secrets on deploy. The app runs Prisma migrations on first boot, so you get a working instance with no manual database setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:25.10.2.65` | Database |
| Redis | `redis:8.2.1` | Database |
| nlp | `langwatch/langwatch_nlp:latest` | Worker |
| workers | `langwatch/langwatch:latest` | Worker |
| langevals | `langwatch/langevals:latest` | Worker |
| app | `langwatch/langwatch:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | clickhouse | langwatch | - |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `LANGWATCH_ENDPOINT` | nlp | http://app.railway.internal:5560 | - |
| `NODE_ENV` | workers | production | - |
| `NEXTAUTH_URL` | workers | - | --- secrets (CHANGE THESE — see note) --- |
| `INSTALL_METHOD` | workers | docker | - |
| `NEXTAUTH_SECRET` | workers | (secret) | - |
| `NEXTAUTH_PROVIDER` | workers | email | - |
| `CREDENTIALS_SECRET` | workers | (secret) | - |
| `SKIP_ENV_VALIDATION` | workers | true | - |
| `API_TOKEN_JWT_SECRET` | workers | (secret) | --- service wiring (private network) --- |
| `DISABLE_PII_REDACTION` | workers | true | --- public URL (app service) --- |
| `LW_GATEWAY_JWT_SECRET` | workers | (secret) | - |
| `LW_GATEWAY_INTERNAL_SECRET` | workers | (secret) | - |
| `DISABLE_EVALUATORS_PRELOAD` | langevals | true | - |
| `NODE_ENV` | app | production | - |
| `NEXTAUTH_URL` | app | - | --- secrets (CHANGE THESE — see note) --- |
| `INSTALL_METHOD` | app | docker | - |
| `NEXTAUTH_SECRET` | app | (secret) | - |
| `NEXTAUTH_PROVIDER` | app | email | - |
| `CREDENTIALS_SECRET` | app | (secret) | - |
| `SKIP_ENV_VALIDATION` | app | true | - |
| `API_TOKEN_JWT_SECRET` | app | (secret) | --- service wiring (private network) --- |
| `DISABLE_PII_REDACTION` | app | true | --- public URL (app service) --- |
| `LW_GATEWAY_JWT_SECRET` | app | (secret) | - |
| `LW_GATEWAY_INTERNAL_SECRET` | app | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `bash -lc "cd /app/langwatch && while true; do pnpm run start:workers; echo 'worker exited, restarting'; sleep 1; done"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/langwatch-ai-observability)
