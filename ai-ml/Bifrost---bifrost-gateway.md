# Deploy Bifrost on Railway

Self-host Bifrost, the Go AI gateway for 20+ model providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-gateway)

## About

Bifrost is an open-source AI gateway written in Go that puts more than twenty model providers — OpenAI, Anthropic, AWS Bedrock, Google Vertex, Groq, Mistral, Ollama and others — behind a single OpenAI-compatible API. Teams reach for it when calling models directly stops scaling: every application grows its own copy of key handling, retries and cost tracking, and nobody can say which team spent what. Bifrost centralises all of it — virtual keys with budgets and rate limits, automatic failover, semantic caching, cost logging, and an MCP gateway so models can call real tools. Being a compiled binary rather than a Python proxy, it adds microseconds of overhead, not milliseconds.

Self-host Bifrost on Railway and its production pieces arrive wired together. The `bifrost` service runs the gateway, dashboard and management API. PostgreSQL holds both of its stores — configuration and request logs — Redis backs the semantic cache, and an object storage bucket takes bulky payloads off the database. Only the gateway gets a public domain, and it is password-protected from the first request.

![Bifrost Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786826002/dbcdd5a4-7148-48f7-911a-d6f11e449a7f.png)

A gateway sits on the request path of everything your product does with models, so where it runs matters. Self-hosting keeps prompts, completions and provider keys inside infrastructure you control.

- **One API for every provider.** OpenAI-compatible requests plus native Anthropic, Bedrock, Gemini and Cohere formats, with failover across keys.
- **Governance that binds.** Virtual keys scope which providers and models a caller may use, with dollar budgets and request or token limits, attachable to teams.
- **Observability built in.** Every request logged with latency, tokens and cost; Prometheus metrics on `/metrics`; connectors for OpenTelemetry, BigQuery and Kafka.
- **Semantic caching and an MCP gateway.** Near-identical prompts return from cache, and MCP servers connect once to serve tools to any model.

The gateway is stateless, which is why PostgreSQL carries both the configuration it reads at boot and the logs it writes continuously. Redis holds cache vectors, not sessions, so a restart costs only cache warmth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bifrost | [gridalpha/bifrost-railway](https://github.com/gridalpha/bifrost-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bifrost | 8080 | Port Railway health-checks |
| `PG_HOST` | bifrost | - | Private Postgres hostname |
| `PG_USER` | bifrost | (secret) | Scoped database role name |
| `APP_PORT` | bifrost | 8080 | Gateway HTTP listen port |
| `LOG_STYLE` | bifrost | pretty | Log format, json or pretty |
| `S3_BUCKET` | bifrost | - | Bucket holding log payloads |
| `REDIS_ADDR` | bifrost | - | Redis host and port |
| `PG_PASSWORD` | bifrost | (secret) | Password for the scoped role |
| `S3_ENDPOINT` | bifrost | - | S3-compatible endpoint URL |
| `PG_ADMIN_URL` | bifrost | - | Superuser URL for boot-time setup |
| `REDIS_PASSWORD` | bifrost | (secret) | Redis password |
| `S3_ACCESS_KEY_ID` | bifrost | - | Bucket access key id |
| `BIFROST_SETUP_TOKEN` | bifrost | (secret) | Bootstrap secret for first admin |
| `BIFROST_EXTERNAL_URL` | bifrost | - | Public base URL for MCP OAuth |
| `S3_SECRET_ACCESS_KEY` | bifrost | (secret) | Bucket secret access key |
| `BIFROST_ADMIN_PASSWORD` | bifrost | (secret) | Dashboard admin password |
| `BIFROST_ADMIN_USERNAME` | bifrost | (secret) | Dashboard admin username |
| `BIFROST_ENCRYPTION_KEY` | bifrost | - | Encrypts stored provider keys |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bifrost-gateway)
