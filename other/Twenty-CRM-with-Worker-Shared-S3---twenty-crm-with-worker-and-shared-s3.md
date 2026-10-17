# Deploy Twenty CRM with Worker & Shared S3 on Railway

CRM with Postgres, Redis, background worker and shared S3 file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-crm-with-worker-and-shared-s3)

## About

CRM with Postgres, Redis, background worker and shared S3 file storage.

Deploying this template creates Postgres, Redis, Twenty, Twenty Worker in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty | `twentycrm/twenty@sha256:43fab4bffacdcd63ff3c9257b7f8985a4424d81e9eb43982b9c16a841d555e52` | Web service |
| Postgres | `postgres@sha256:ca0bd484cb98bf4b24eb1010e73fb3fcbd6714d240fbc1a10eea5b7dbecb641d` | Database |
| Redis | `redis@sha256:3811787313eba226a2ef38658c6ccb91cd5e110edc89c37767de373120a0e5a0` | Database |
| Twenty Worker | `twentycrm/twenty@sha256:43fab4bffacdcd63ff3c9257b7f8985a4424d81e9eb43982b9c16a841d555e52` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Twenty | 3000 | - |
| `NODE_PORT` | Twenty | 3000 | - |
| `APP_SECRET` | Twenty | (secret) | - |
| `STORAGE_TYPE` | Twenty | s3 | - |
| `ENCRYPTION_KEY` | Twenty | - | Primary 32-byte base64 encryption key; the worker references this same value. |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | - |
| `POSTGRES_DB` | Postgres | twenty | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated separately for every deployment. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password; keep this service private. |
| `APP_SECRET` | Twenty Worker | (secret) | - |
| `STORAGE_TYPE` | Twenty Worker | s3 | - |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | - |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | - |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`
- **Start command:** `/app/entrypoint.sh yarn worker:prod`

**Category:** Other

[View on Railway →](https://railway.com/deploy/twenty-crm-with-worker-and-shared-s3)
