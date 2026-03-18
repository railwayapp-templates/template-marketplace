# Deploy Vercel AI Chatbot on Railway

A full-featured, hackable Next.js AI chatbot built by Vercel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vercel-ai-chatbot)

## About

[Vercel AI Chatbot](https://github.com/vercel/ai-chatbot) is an open-source Next.js app that showcases the Vercel AI SDK with a streaming chat UI. It supports multiple LLM providers, tool/function calling, and server actions. Use it as a production-ready starter to build chatbots, assistants, or agentic interfaces with minimal boilerplate.

This Railway template provisions everything needed to run the Vercel AI Chatbot as a persistent web service. Railway automatically builds the Next.js app, sets up environment variables, and exposes a HTTPS domain. The template also attaches **Redis** (for rate-limiting, caching, or session state) and **Postgres** (for conversation history, analytics, or settings). You’ll configure a few environment variables, including authentication secrets and API gateway keys, and deploy. Nixpacks detects Node.js and installs dependencies; your app scales vertically and horizontally as traffic grows, without managing servers, SSL, or Dockerfiles.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatbot | [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot) | Web service |
| redis | `redis:8.2.1` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_SECRET` | chatbot | (secret) | - |
| `AI_GATEWAY_API_KEY` | chatbot | (secret) | AI Gateway API Key (required for non-Vercel deployments). https://vercel.com/ai-gateway |
| `BLOB_READ_WRITE_TOKEN` | chatbot | (secret) | Instructions to create a Vercel Blob Store here: https://vercel.com/docs/storage/vercel-blob |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/vercel-ai-chatbot)
