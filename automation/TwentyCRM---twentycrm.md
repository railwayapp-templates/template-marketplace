# Deploy TwentyCRM on Railway

The #1 Open-Source CRM Modern, powerful, affordable.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twentycrm)

## About

> ⚠️ This template moved from MinIO to Railway Buckets

TwentyCRM is the #1 Open-Source CRM
A modern, powerful, and affordable platform to manage your customer relationships.

Hosting and deploying TwentyCRM involves setting up the TwentyCRM application on Railway’s cloud infrastructure. This setup allows you to manage your CRM data and assets efficiently, leveraging Railway’s easy deployment process and S3’s reliable object storage. The process typically includes configuring environment variables, connecting to your database, and setting up S3 credentials for file uploads and backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Twenty | `twentycrm/twenty:v2.19.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Twenty Worker | `twentycrm/twenty:v2.19.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16.14` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_PORT` | Twenty | 3000 | PORT |
| `REDIS_URL` | Twenty | - | Redis connection URL |
| `SERVER_URL` | Twenty | - | Server URL |
| `EMAIL_DRIVER` | Twenty | smtp | Email Driver |
| `STORAGE_TYPE` | Twenty | s3 | Storage type (s3 or local) |
| `ENCRYPTION_KEY` | Twenty | - | Super secret app secret |
| `EMAIL_FROM_NAME` | Twenty | - | Email Name |
| `EMAIL_SMTP_HOST` | Twenty | - | Email Host |
| `EMAIL_SMTP_PORT` | Twenty | 465 | Email Port |
| `EMAIL_SMTP_USER` | Twenty | (secret) | Email User |
| `PG_DATABASE_URL` | Twenty | - | Postgrase database URL |
| `STORAGE_S3_NAME` | Twenty | - | S3 Bucket name |
| `STORAGE_S3_REGION` | Twenty | - | S3 Region |
| `EMAIL_FROM_ADDRESS` | Twenty | - | Email From |
| `EMAIL_SMTP_PASSWORD` | Twenty | (secret) | Email Password |
| `STORAGE_S3_ENDPOINT` | Twenty | - | S3 Endpoint |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty | - | S3 Key |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | S3 Secret Key |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_URL` | Twenty Worker | - | Redis connection URL |
| `SERVER_URL` | Twenty Worker | - | Server URL |
| `EMAIL_DRIVER` | Twenty Worker | - | Email Driver |
| `STORAGE_TYPE` | Twenty Worker | - | Storage type |
| `ENCRYPTION_KEY` | Twenty Worker | - | Super secret app secret |
| `EMAIL_FROM_NAME` | Twenty Worker | - | Email Name |
| `EMAIL_SMTP_HOST` | Twenty Worker | - | Email Host |
| `EMAIL_SMTP_PORT` | Twenty Worker | - | Email Port |
| `EMAIL_SMTP_USER` | Twenty Worker | (secret) | Email User |
| `PG_DATABASE_URL` | Twenty Worker | - | Postgrase database URL |
| `STORAGE_S3_NAME` | Twenty Worker | - | S3 Bucket name |
| `STORAGE_S3_REGION` | Twenty Worker | - | S3 Region |
| `EMAIL_FROM_ADDRESS` | Twenty Worker | - | Email From |
| `EMAIL_SMTP_PASSWORD` | Twenty Worker | (secret) | Email Password |
| `STORAGE_S3_ENDPOINT` | Twenty Worker | - | S3 Endpoint |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | It already runs on the server |
| `STORAGE_S3_ACCESS_KEY_ID` | Twenty Worker | - | S3 Key |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | S3 Secret Key |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | It already runs on the server |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `yarn worker:prod`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/twentycrm)
