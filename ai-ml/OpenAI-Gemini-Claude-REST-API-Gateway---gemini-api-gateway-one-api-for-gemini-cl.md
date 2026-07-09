# Deploy OpenAI, Gemini & Claude REST API Gateway on Railway

Unified REST API Gateway for OpenAI, Gemini, Antigravity and Claude models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gemini-api-gateway-one-api-for-gemini-cl)

## About

Gemini API Gateway is a self-hosted AI gateway that converts **Gemini CLI** into **OpenAI, Gemini Native, and Claude-compatible REST APIs**. It provides OAuth credential management, automatic credential rotation, streaming responses, multimodal support, image generation, and a powerful web dashboard, making it easy to integrate Gemini into any AI application, automation workflow, or developer tool.

Deploy Gemini API Gateway on Railway in minutes with a production-ready Docker setup. The gateway exposes standardized OpenAI, Gemini Native, and Claude-compatible endpoints while automatically managing Google OAuth credentials, load balancing requests across multiple accounts, monitoring credential health, and retrying failed requests. It supports real-time streaming, multimodal inputs, image generation, proxy configuration, and both SQLite and MongoDB storage. Whether you're building AI assistants, chatbots, automation tools, or internal developer platforms, Railway provides a simple, scalable environment for running your own secure AI gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gcli2api | [bilalnawaz072/gcli2api](https://github.com/bilalnawaz072/gcli2api) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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

**Category:** AI/ML · **Languages:** Python, HTML, JavaScript, Shell, PowerShell, Dockerfile, Batchfile

[View on Railway →](https://railway.com/deploy/gemini-api-gateway-one-api-for-gemini-cl)
