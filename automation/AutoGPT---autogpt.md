# Deploy AutoGPT on Railway

AutoGPT provides accessible AI tools to build and automate tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autogpt)

## About

AutoGPT Platform is a no-code AI agent builder for creating, running, and scheduling autonomous agents. It provides a visual editor for connecting agent blocks, LLMs, tools, and integrations, with support for scheduled and triggered executions, live execution monitoring, user-managed credentials, and self-hosted deployments.

Hosting AutoGPT on Railway deploys the complete self-hosted platform as five coordinated services: the frontend, backend, PostgreSQL, Redis, and RabbitMQ. The frontend provides the web interface, while the backend runs the REST API, websocket server, agent executor, scheduler, and notification workers. PostgreSQL with pgvector stores persistent application data and vector information, Redis provides caching and event handling, and RabbitMQ handles the execution queue.

The template uses prebuilt Docker images, so no application build process is required. Database migrations run automatically when the backend starts. Railway private networking connects the backend to PostgreSQL, Redis, and RabbitMQ, while the frontend is exposed through Railway's public networking. Persistent volumes retain PostgreSQL, RabbitMQ, and agent workspace data across deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `ghcr.io/hmseeb/autogpt-railway-backend:autogpt-platform-beta-v0.7.0` | Web service |
| redis | `redis:8.2.1` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| frontend | `ghcr.io/hmseeb/autogpt-railway-frontend:autogpt-platform-beta-v0.7.0` | Web service |
| rabbitmq | `rabbitmq:4.1.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend | 8080 | - |
| `DB_NAME` | backend | postgres | - |
| `DB_PORT` | backend | 5432 | - |
| `DB_USER` | backend | (secret) | - |
| `REDIS_PORT` | backend | 6379 | - |
| `CHAT_API_KEY` | backend | (secret) | The key for the endpoint in CHAT_BASE_URL. Only needed if you set that. |
| `CHAT_BASE_URL` | backend | - | Optional. Any OpenAI-compatible endpoint that should write the replies, including OpenAI itself (https://api.openai.com/v1) or your own Ollama or vLLM server. Pair with CHAT_API_KEY. Covers the conversation only. |
| `RABBITMQ_PORT` | backend | 5672 | - |
| `ANTHROPIC_API_KEY` | backend | (secret) | Optional. Use Anthropic to write the replies instead of OpenRouter. Covers the conversation only, so pair it with an OpenRouter key above if you also want web search. |
| `OPEN_ROUTER_API_KEY` | backend | (secret) | RECOMMENDED, and the only single credential that gives a complete assistant. Get one at openrouter.ai/keys. The assistant's web search and the marketplace search both run through OpenRouter no matter which model writes the replies, so without this they report themselves unavailable. |
| `RABBITMQ_DEFAULT_USER` | backend | (secret) | - |
| `CLAMAV_SERVICE_ENABLED` | backend | false | - |
| `UNSUBSCRIBE_SECRET_KEY` | backend | (secret) | - |
| `CLAUDE_CODE_OAUTH_TOKEN` | backend | (secret) | Optional. Use your own Claude Pro or Max subscription to write the replies: run 'claude setup-token' on a machine signed in to Claude Code and paste the result. Covers the conversation only, so pair it with an OpenRouter key above if you also want web search. Personal instances only, a consumer subscription is not licensed to serve other people. |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `PORT` | frontend | 3000 | - |
| `AUTH_DB_SCHEMA` | frontend | platform | - |
| `BETTER_AUTH_SECRET` | frontend | (secret) | - |
| `AUTH_REQUIRE_EMAIL_VERIFICATION` | frontend | false | - |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/autogpt_platform/backend/workspaces`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/rabbitmq`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/autogpt)
