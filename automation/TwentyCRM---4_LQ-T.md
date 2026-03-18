# Deploy TwentyCRM on Railway

The #1 Open-Source CRM Modern, powerful, affordable.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/4_LQ-T)

## About

> ⚠️ This template moved from MinIO to Railway Buckets

TwentyCRM is the #1 Open-Source CRM
A modern, powerful, and affordable platform to manage your customer relationships.

Hosting and deploying TwentyCRM involves setting up the TwentyCRM application on Railway’s cloud infrastructure. This setup allows you to manage your CRM data and assets efficiently, leveraging Railway’s easy deployment process and S3’s reliable object storage. The process typically includes configuring environment variables, connecting to your database, and setting up S3 credentials for file uploads and backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty | `twentycrm/twenty:v1.18.1` | Web service |
| Twenty Worker | `twentycrm/twenty:v1.18.1` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_PORT` | Twenty | 3000 | PORT |
| `REDIS_URL` | Twenty | - | Redis connection URL |
| `APP_SECRET` | Twenty | (secret) | Super secret app secret |
| `SERVER_URL` | Twenty | - | Server URL |
| `STORAGE_TYPE` | Twenty | s3 | Otherwise change to local |
| `PG_DATABASE_URL` | Twenty | - | Postgrase database URL |
| `STORAGE_S3_NAME` | Twenty | - | S3 Bucket name |
| `STORAGE_S3_REGION` | Twenty | - | S3 Storage Region |
| `STORAGE_S3_ENDPOINT` | Twenty | - | S3 Storage Endpoit |
| `REDIS_URL` | Twenty Worker | - | Redis connection URL |
| `APP_SECRET` | Twenty Worker | (secret) | Super secret app secret |
| `SERVER_URL` | Twenty Worker | - | Server URL |
| `STORAGE_TYPE` | Twenty Worker | - | Otherwise change to local |
| `PG_DATABASE_URL` | Twenty Worker | - | Postgrase database URL |
| `STORAGE_S3_NAME` | Twenty Worker | - | S3 Bucket name |
| `STORAGE_S3_REGION` | Twenty Worker | - | S3 Storage Region |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | S3 Storage Endpoit |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | It already runs on the server |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | It already runs on the server |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | REDISHOST |
| `REDISPORT` | Redis | 6379 | REDISPORT |
| `REDISUSER` | Redis | default | REDISUSER |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | REDISPASSWORD |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `yarn worker:prod`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/4_LQ-T)
