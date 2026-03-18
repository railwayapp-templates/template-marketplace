# Deploy Twenty CRM on Railway

Deploy the latest version of Twenty CRM (v1.*) on Railway with S3 Bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nAL3hA)

## About

[Twenty CRM](https://twenty.com) is a modern, open-source customer relationship management system built for fast-growing companies. It adapts to your workflows, integrates directly with your customer data, and serves as a flexible platform for sales, support, and marketing operations.

Hosting Twenty CRM involves deploying a self-hosted backend that manages your customer relationships, workflows, and internal processes. The platform is fully open-source and gives you control over infrastructure, data, and customization. You’ll configure environment variables, set up required services like PostgreSQL and Redis, and follow the standard deployment flow. With proper setup, Twenty CRM becomes a scalable and reliable customer operating system.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16` | Database |
| Redis | `redis:8.2.1` | Database |
| Twenty | `twentycrm/twenty:latest` | Web service |
| Twenty Worker | `twentycrm/twenty:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ALLOW_NOSSL` | Postgres | false | - |
| `POSTGRES_DB` | Postgres | postgres | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `PGUSER_SUPERUSER` | Postgres | postgres | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PGPASSWORD_SUPERUSER` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `NODE_PORT` | Twenty | 3000 | - |
| `APP_SECRET` | Twenty | (secret) | - |
| `STORAGE_TYPE` | Twenty | s3 | - |
| `STORAGE_LOCAL_PATH` | Twenty | data | - |
| `DISABLE_DB_MIGRATIONS` | Twenty | false | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | - |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty | false | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty | true | - |
| `APP_SECRET` | Twenty Worker | (secret) | - |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | - |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Worker | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/packages/twenty/data`
- **Start command:** `yarn worker:prod`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nAL3hA)
