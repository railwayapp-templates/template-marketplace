# Deploy Universal API Gateway - New API on Railway

Deploy this new API gateway for OpenAI, Gemini, and Claude.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/new-api-or-universal-ai-gateway)

## About

New API | Universal AI Gateway is a powerful, OpenAI-compatible API gateway that lets you manage and route requests across multiple AI providers through a single unified endpoint. It includes a modern web dashboard, user and API key management, usage analytics, quotas, model routing, and support for providers such as OpenAI, Anthropic, Google Gemini, DeepSeek, OpenRouter, Groq, xAI, Cohere, Ollama, Azure OpenAI, Mistral, and many more.

Deploying New API on Railway provides a fast, production-ready environment without the complexity of manually managing infrastructure. This template automatically provisions PostgreSQL and Redis, configures the required environment variables, generates a secure session secret, and deploys the application with sensible production defaults.

Once deployed, you'll have a fully functional AI gateway with a web-based administration panel where you can manage AI providers, API keys, users, channels, quotas, usage statistics, and billing. Applications can immediately connect using the standard OpenAI API format, making migration from OpenAI or integration with multiple AI providers seamless. Railway's managed infrastructure also provides HTTPS, automatic deployments, private networking, centralized logs, and easy scaling as your workload grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| new-api | [bilalnawaz072/new-api](https://github.com/bilalnawaz072/new-api) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | new-api | Asia/Shanghai | - |
| `PORT` | new-api | 3000 | - |
| `SESSION_SECRET` | new-api | (secret) | - |
| `ERROR_LOG_ENABLED` | new-api | true | - |
| `BATCH_UPDATE_ENABLED` | new-api | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, Makefile, Dockerfile, Shell, Lua

[View on Railway →](https://railway.com/deploy/new-api-or-universal-ai-gateway)
