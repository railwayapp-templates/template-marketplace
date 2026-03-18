# Deploy NocoDB + MinIO (Console & Storage) on Railway

Deploy and Host NocoDB + MinIO (Console & Storage) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nocodb-minio-console-and-storage)

## About

NocoDB is a powerful open-source Airtable alternative that turns any database into a smart spreadsheet. This complete stack template includes PostgreSQL for data storage, Redis for caching, and MinIO for persistent file attachments—everything you need for a production-ready deployment.

This template deploys six services: NocoDB as the core application, PostgreSQL for metadata and data storage, Redis for caching and session management, MinIO for S3-compatible file storage, MinIO Console for storage administration, and a MinIO Init sidecar that automatically creates required storage buckets. Unlike basic NocoDB deployments where file attachments can be lost on redeployment, this stack ensures all uploaded files persist permanently in MinIO. NocoDB's built-in authentication handles user management, so no additional auth layer is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| NocoDB | `nocodb/nocodb:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Database |
| MinIO-Init | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: /solutions/nocodb-minio/minio-init) | Worker |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `NC_S3_REGION` | NocoDB | us-east-1 | - |
| `NC_ADMIN_EMAIL` | NocoDB | - | Admin user email. |
| `NC_ADMIN_PASSWORD` | NocoDB | (secret) | Admin user password (at least 8 characters). |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | - |
| `NC_S3_ACCESS_SECRET` | NocoDB | (secret) | - |
| `NC_S3_FORCE_PATH_STYLE` | NocoDB | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MINIO_BUCKET` | Bucket | nocodb | - |
| `MINIO_VERSION` | Bucket | latest | - |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `MINIO_SECRET_KEY` | MinIO-Init | (secret) | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** CMS · **Languages:** Dockerfile, Python, Shell

[View on Railway →](https://railway.com/template/nocodb-minio-console-and-storage)
