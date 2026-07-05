# Deploy Hermes Agent + Honcho Memory on Railway

Deploy and Host Hermes Agent + Honcho Memory with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-honcho-memory)

## About

[Hermes Agent + Honcho Memory](https://github.com/kalix-vn/hermes-agent-with-honcho) is an advanced AI agent system featuring a self-hosted cognitive architecture. Combining the tool-calling power of Hermes with Honcho's dialectic reasoning engine, it constructs a persistent, evolving user profile that summarizes sessions, reconciles conversations, and delivers a deeply personalized, contextual AI experience.

Hosting a self-hosted cognitive agent involves orchestrating multiple interconnected services. A standard deployment requires a frontend Web UI (Hermes Agent) to interact with users, an API server (Honcho API) to manage cognitive states, and an asynchronous worker (Honcho Deriver) to process complex dialectic reasoning via LLMs in the background. Supporting this stack requires a PostgreSQL database with the `pgvector` extension for semantic search over historical context and conclusions, and a Redis instance for caching. Deploying this manually would require complex networking, database provisioning, and env configuration, but a containerized template automates the entire orchestration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| hermes-agent | [kalix-vn/hermes-agent-with-honcho](https://github.com/kalix-vn/hermes-agent-with-honcho) (root: hermes) | Worker |
| honcho-deriver | [kalix-vn/hermes-agent-with-honcho](https://github.com/kalix-vn/hermes-agent-with-honcho) (root: honcho) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| honcho-api | [kalix-vn/hermes-agent-with-honcho](https://github.com/kalix-vn/hermes-agent-with-honcho) (root: honcho) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `OPENAI_API_KEY` | hermes-agent | (secret) | - |
| `OPENAI_BASE_URL` | hermes-agent | https://api.openai.com/v1 | - |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | hermes-agent | (secret) | - |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | hermes-agent | (secret) | - |
| `HONCHO_MODE` | honcho-deriver | deriver | - |
| `AUTH_USE_AUTH` | honcho-deriver | false | - |
| `CACHE_ENABLED` | honcho-deriver | true | - |
| `LLM_OPENAI_API_KEY` | honcho-deriver | (secret) | - |
| `EMBEDDING_MODEL_CONFIG__MODEL` | honcho-deriver | text-embedding-3-small | - |
| `DERIVER_MODEL_CONFIG__OVERRIDES__BASE_URL` | honcho-deriver | https://api.openai.com/v1 | - |
| `EMBEDDING_MODEL_CONFIG__OVERRIDES__BASE_URL` | honcho-deriver | https://api.openai.com/v1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HONCHO_MODE` | honcho-api | api | - |
| `AUTH_USE_AUTH` | honcho-api | false | - |
| `CACHE_ENABLED` | honcho-api | true | - |
| `LLM_OPENAI_API_KEY` | honcho-api | (secret) | - |
| `EMBEDDING_MODEL_CONFIG__MODEL` | honcho-api | text-embedding-3-small | - |
| `DERIVER_MODEL_CONFIG__OVERRIDES__BASE_URL` | honcho-api | https://api.openai.com/v1 | - |
| `EMBEDDING_MODEL_CONFIG__OVERRIDES__BASE_URL` | honcho-api | https://api.openai.com/v1 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/hermes-agent-honcho-memory)
