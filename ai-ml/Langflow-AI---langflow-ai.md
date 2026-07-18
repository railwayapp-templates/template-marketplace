# Deploy Langflow AI on Railway

Low-code app builder for RAG and multi-agent AI applications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-ai)

## About

Langflow is a low-code visual platform for building RAG and multi-agent AI applications. It provides a drag-and-drop interface to connect LLMs, tools, memory, and APIs into production-ready workflows.

![Langflow](https://opengraph.githubassets.com/4a3fa291732195ae8467266dd5a49902a29d66a2efa92dcdd854c9c7a7e035f3/langflow-ai/langflow)

This template deploys a complete Langflow stack on Railway with managed PostgreSQL for persistent data storage and Redis for job queuing. It comes pre-configured with 4 workers for better performance under load. Auto-login is enabled by default for quick start, while still allowing you to enable proper authentication easily later. Railway automatically handles HTTPS, scaling, logging, and infrastructure management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflow | `langflowai/langflow:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DO_NOT_TRACK` | langflow | True | - |
| `LANGFLOW_HOST` | langflow | 0.0.0.0 | - |
| `LANGFLOW_PORT` | langflow | 7860 | - |
| `LANGFLOW_WORKERS` | langflow | 4 | - |
| `LANGFLOW_LOG_LEVEL` | langflow | info | - |
| `LANGFLOW_SUPERUSER` | langflow | admin | - |
| `LANGFLOW_AUTO_LOGIN` | langflow | (secret) | - |
| `LANGFLOW_CONFIG_DIR` | langflow | /app/config | - |
| `LANGFLOW_SECRET_KEY` | langflow | (secret) | - |
| `LANGFLOW_AUTO_SAVING` | langflow | True | - |
| `LANGFLOW_BACKEND_ONLY` | langflow | false | - |
| `LANGFLOW_JOB_QUEUE_TYPE` | langflow | redis | - |
| `LANGFLOW_GUNICORN_PRELOAD` | langflow | true | - |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | langflow | False | - |
| `LANGFLOW_SUPERUSER_PASSWORD` | langflow | (secret) | - |
| `LANGFLOW_ENABLE_SUPERUSER_CLI` | langflow | False | - |
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

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-ai)
