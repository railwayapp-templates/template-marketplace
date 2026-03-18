# Deploy NocoDB (w/ Object Storage) on Railway

OSS Airtable Alternative. Deployment optimized for maintainability.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-w-object-storage)

## About

Railway is the **simplest way to deploy and scale infrastructure**—no DevOps expertise required. By hosting **NocoDB with S3 storage on Railway**, you get:

- **Fully managed infrastructure** – No server configuration or maintenance.
- **Auto-scaling** – Handle traffic spikes effortlessly.
- **Cost-efficient hosting** – Pay only for what you use.
- **Seamless integrations** – Connect databases, APIs, and services in one place.

**Deploy NocoDB on Railway today** and build **scalable, no-code databases** in minutes—backed by **S3-compatible storage** for reliability and growth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| NocoDB | `nocodb/nocodb` | Web service |

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
| `NC_DB` | NocoDB | - | Database connection string |
| `NC_REDIS_URL` | NocoDB | - | Cache connection string |
| `NC_S3_REGION` | NocoDB | - | Region of object storage (for S3 API) |
| `NC_PUBLIC_URL` | NocoDB | - | Public URL of NocoDB deployment |
| `NC_S3_ENDPOINT` | NocoDB | - | Endpoint of object storage (for S3 API) |
| `NC_S3_ACCESS_KEY` | NocoDB | - | Access key of object storage (for S3 API) |
| `NC_S3_BUCKET_NAME` | NocoDB | - | Bucket name of object storage (for S3 API) |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | Secret used for signing auth tokens |
| `NC_S3_ACCESS_SECRET` | NocoDB | (secret) | Access secret of object storage (for S3 API) |
| `NC_S3_FORCE_PATH_STYLE` | NocoDB | true | S3 API config to support custom Railway buckets |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | Configuration needed to support Railways internal networking |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data/`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nocodb-w-object-storage)
