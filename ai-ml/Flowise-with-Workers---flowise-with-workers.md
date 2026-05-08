# Deploy Flowise with Workers on Railway

Flowise with workers, Redis, Postgres, and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-with-workers)

## About

Flowise with Workers is an advanced, production-style deployment for building AI agents, chatbots, RAG pipelines, and LLM workflows with a visual web UI. This template combines Flowise Web, Flowise Worker, Redis, PostgreSQL, and persistent storage so workloads can be processed through a queue-based architecture.

![](https://i.imgur.com/hbOkfpX.png)

Deploying Flowise with Workers on Railway provides a scalable Flowise setup using multiple services. Flowise Web runs the browser-based UI on port `3000`, while Flowise Worker processes queued jobs in the background. Redis acts as the queue and message broker between the Web and Worker services, and PostgreSQL stores Flowise database records. A Railway Volume is mounted on the Flowise Web service at `/root/.flowise` to persist local Flowise files, API key files, secret files, logs, and blob storage across restarts and redeployments.

> **Note**
> This is an advanced Flowise template. It runs multiple Railway services and may cost more than a basic single-service Flowise deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise-web | `flowiseai/flowise` | Web service |
| Redis | `redis:8.2.1` | Database |
| flowise-worker | `flowiseai/flowise-worker` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | flowise-web | queue | - |
| `PORT` | flowise-web | 3000 | - |
| `LOG_PATH` | flowise-web | /root/.flowise/logs | - |
| `PGSSLMODE` | flowise-web | disable | - |
| `REDIS_TLS` | flowise-web | false | - |
| `QUEUE_NAME` | flowise-web | flowise-queue | - |
| `APIKEY_PATH` | flowise-web | /root/.flowise | - |
| `DATABASE_TYPE` | flowise-web | postgres | - |
| `DATABASE_USER` | flowise-web | (secret) | - |
| `REDIS_PASSWORD` | flowise-web | (secret) | - |
| `REDIS_USERNAME` | flowise-web | (secret) | - |
| `SECRETKEY_PATH` | flowise-web | (secret) | - |
| `FLOWISE_PASSWORD` | flowise-web | (secret) | - |
| `FLOWISE_USERNAME` | flowise-web | (secret) | - |
| `BLOB_STORAGE_PATH` | flowise-web | /root/.flowise/storage | - |
| `DATABASE_PASSWORD` | flowise-web | (secret) | - |
| `SECRETKEY_ENCRYPT` | flowise-web | (secret) | - |
| `QUEUE_REDIS_EVENT_STREAM_MAX_LEN` | flowise-web | 10000 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MODE` | flowise-worker | queue | - |
| `PORT` | flowise-worker | 5566 | - |
| `LOG_PATH` | flowise-worker | /root/.flowise/logs | - |
| `PGSSLMODE` | flowise-worker | disable | - |
| `REDIS_TLS` | flowise-worker | false | - |
| `QUEUE_NAME` | flowise-worker | flowise-queue | - |
| `APIKEY_PATH` | flowise-worker | /root/.flowise | - |
| `WORKER_PORT` | flowise-worker | 5566 | - |
| `DATABASE_TYPE` | flowise-worker | postgres | - |
| `DATABASE_USER` | flowise-worker | (secret) | - |
| `REDIS_PASSWORD` | flowise-worker | (secret) | - |
| `REDIS_USERNAME` | flowise-worker | (secret) | - |
| `SECRETKEY_PATH` | flowise-worker | (secret) | - |
| `BLOB_STORAGE_PATH` | flowise-worker | /root/.flowise/storage | - |
| `DATABASE_PASSWORD` | flowise-worker | (secret) | - |
| `SECRETKEY_ENCRYPT` | flowise-worker | (secret) | - |
| `WORKER_CONCURRENCY` | flowise-worker | 100 | - |
| `QUEUE_REDIS_EVENT_STREAM_MAX_LEN` | flowise-worker | 10000 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-with-workers)
