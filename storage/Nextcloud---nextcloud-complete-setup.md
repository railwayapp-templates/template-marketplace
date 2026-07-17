# Deploy Nextcloud on Railway

Self-hosted Google Drive, OneDrive & Dropbox alternative for file storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextcloud-complete-setup)

## About

![Nextcloud](https://raw.githubusercontent.com/nextcloud/screenshots/master/nextcloud-hub-25-files.png)

Nextcloud Complete Setup is a production-ready self-hosted cloud platform. It gives you full control over your files, real-time collaboration, calendar, contacts, and team communication — without relying on Google or Microsoft.

This template deploys a complete and production-oriented Nextcloud stack on Railway using the official **`nextcloud:latest`** image. It includes:

- **Nextcloud** (`nextcloud:latest`)
- **PostgreSQL** as the main database
- **Redis** for file locking and caching
- **Railway Bucket** as primary S3-compatible object storage

All complex configurations (database connection, Redis, S3 storage, trusted domains, reverse proxy settings, etc.) are already pre-configured using Railway variable references.  

**You only need to fill in two variables to deploy:**

- `NEXTCLOUD_ADMIN_USER`
- `NEXTCLOUD_ADMIN_PASSWORD`

No need to manually configure database, Redis, storage, or domain settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Nextcloud | `nextcloud:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Nextcloud | 80 | - |
| `POSTGRES_USER` | Nextcloud | (secret) | - |
| `TRUSTED_PROXIES` | Nextcloud | 0.0.0.0/0 | - |
| `PHP_MEMORY_LIMIT` | Nextcloud | 512M | - |
| `PHP_UPLOAD_LIMIT` | Nextcloud | 512M | - |
| `OVERWRITEPROTOCOL` | Nextcloud | https | - |
| `POSTGRES_PASSWORD` | Nextcloud | (secret) | - |
| `OBJECTSTORE_S3_SSL` | Nextcloud | true | - |
| `OBJECTSTORE_S3_HOST` | Nextcloud | storage.railway.app | - |
| `REDIS_HOST_PASSWORD` | Nextcloud | (secret) | - |
| `NEXTCLOUD_ADMIN_USER` | Nextcloud | (secret) | - |
| `OBJECTSTORE_S3_SECRET` | Nextcloud | (secret) | - |
| `NEXTCLOUD_ADMIN_PASSWORD` | Nextcloud | (secret) | - |
| `OBJECTSTORE_S3_AUTOCREATE` | Nextcloud | true | - |
| `OBJECTSTORE_S3_USEPATH_STYLE` | Nextcloud | false | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nextcloud-complete-setup)
