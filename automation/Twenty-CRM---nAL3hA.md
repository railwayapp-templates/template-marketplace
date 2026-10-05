# Deploy Twenty CRM on Railway

Deploy the latest version (v2) of open-source CRM Twenty,  with S3 Bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nAL3hA)

## About

[TwentyCRM](https://twenty.com) is a modern, open-source customer relationship management system built for fast-growing companies. It adapts to your workflows, integrates directly with your customer data, and serves as a flexible platform for sales, support, and marketing operations.

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
| `ALLOW_NOSSL` | Postgres | false | Allow non-SSL connections |
| `POSTGRES_DB` | Postgres | postgres | Default PostgreSQL database name |
| `DATABASE_URL` | Postgres | - | PostgreSQL connection string |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser username |
| `PGUSER_SUPERUSER` | Postgres | postgres | PostgreSQL superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password of Postgresql db |
| `DATABASE_PUBLIC_URL` | Postgres | - | PostgreSQL public connection string |
| `PGPASSWORD_SUPERUSER` | Postgres | (secret) | PostgreSQL superuser password |
| `REDISHOST` | Redis | - | Redis server hostname |
| `REDISPORT` | Redis | 6379 | Redis server port |
| `REDISUSER` | Redis | default | Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password for authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Twenty | - | HTTP port for the Twenty application |
| `NODE_PORT` | Twenty | 3000 | Node.js application port |
| `REDIS_URL` | Twenty | - | Redis connection string |
| `APP_SECRET` | Twenty | (secret) | Application secret key for encryption |
| `SERVER_URL` | Twenty | - | Public server URL for Twenty application |
| `STORAGE_TYPE` | Twenty | s3 | Storage backend type (s3 or local) |
| `PG_DATABASE_URL` | Twenty | - | PostgreSQL database connection string |
| `STORAGE_S3_NAME` | Twenty | - | S3 bucket name for file storage |
| `STORAGE_S3_REGION` | Twenty | - | AWS S3 region |
| `STORAGE_LOCAL_PATH` | Twenty | data | Local filesystem path for file storage |
| `STORAGE_S3_ENDPOINT` | Twenty | - | S3-compatible endpoint URL |
| `DISABLE_DB_MIGRATIONS` | Twenty | false | Set to true to skip database migrations on startup |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty | - | S3 access key ID |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | S3 secret access key |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty | false | Set to true to disable cron job registration |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty | true | Enable private networking for Alpine |
| `REDIS_URL` | Twenty Worker | - | Redis connection string |
| `APP_SECRET` | Twenty Worker | (secret) | Application secret key for encryption |
| `SERVER_URL` | Twenty Worker | - | Public server URL for Twenty application |
| `STORAGE_TYPE` | Twenty Worker | - | Storage backend type (s3 or local) |
| `PG_DATABASE_URL` | Twenty Worker | - | PostgreSQL database connection string |
| `STORAGE_S3_NAME` | Twenty Worker | - | S3 bucket name for file storage |
| `STORAGE_S3_REGION` | Twenty Worker | - | AWS S3 region |
| `STORAGE_LOCAL_PATH` | Twenty Worker | - | Local filesystem path for file storage |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | S3-compatible endpoint URL |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | Set to true to skip database migrations on startup |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | S3 access key ID |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | S3 secret access key |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | Set to true to disable cron job registration |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Worker | true | Enable private networking for Alpine |

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
