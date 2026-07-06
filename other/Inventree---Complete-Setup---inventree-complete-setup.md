# Deploy Inventree - Complete Setup on Railway

[Jul'26] Deploy InvenTree with worker, Redis, Postgres & Railway Bucket 📦

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inventree-complete-setup)

## About

InvenTree is an open-source inventory management system for tracking parts, stock, suppliers, purchase orders, sales orders, and manufacturing workflows. It helps teams manage physical inventory and production data from a centralized web interface, with background workers handling asynchronous jobs and scheduled tasks.

Hosting InvenTree involves running the main web application together with the services it needs for database storage, caching, background jobs, and persistent file uploads. This Railway template includes Postgres for application data, Redis for cache and queue coordination, an InvenTree worker service for background processing, and Railway Bucket for storing uploaded files and media. Splitting the worker from the main app makes the deployment better suited for production-style inventory workflows, where long-running or asynchronous tasks should not block the web service. Railway connects these services in one deployable stack so you can launch InvenTree without manually managing infrastructure.

![Imgur](https://imgur.com/401lnWx.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Inventree Worker | `inventree/inventree:stable` | Worker |
| InvenTree | `inventree/inventree:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `INVENTREE_DEBUG` | Inventree Worker | False | - |
| `INVENTREE_DB_USER` | Inventree Worker | (secret) | - |
| `INVENTREE_CACHE_DB` | Inventree Worker | 0 | - |
| `INVENTREE_DB_ENGINE` | Inventree Worker | postgresql | - |
| `INVENTREE_EMAIL_SSL` | Inventree Worker | False | - |
| `INVENTREE_EMAIL_TLS` | Inventree Worker | True | - |
| `INVENTREE_BACKUP_DIR` | Inventree Worker | /home/inventree/data/backup | - |
| `INVENTREE_DB_TIMEOUT` | Inventree Worker | 10 | - |
| `INVENTREE_EMAIL_PORT` | Inventree Worker | 587 | - |
| `INVENTREE_MEDIA_ROOT` | Inventree Worker | /home/inventree/data/media | - |
| `INVENTREE_S3_VIRTUAL` | Inventree Worker | False | - |
| `INVENTREE_SECRET_KEY` | Inventree Worker | (secret) | - |
| `INVENTREE_AUTO_UPDATE` | Inventree Worker | False | - |
| `INVENTREE_DB_PASSWORD` | Inventree Worker | (secret) | - |
| `INVENTREE_S3_LOCATION` | Inventree Worker | inventree | - |
| `INVENTREE_STATIC_ROOT` | Inventree Worker | /home/inventree/data/static | - |
| `INVENTREE_S3_OVERWRITE` | Inventree Worker | False | - |
| `INVENTREE_ALLOWED_HOSTS` | Inventree Worker | * | - |
| `INVENTREE_CACHE_ENABLED` | Inventree Worker | True | - |
| `INVENTREE_CACHE_TIMEOUT` | Inventree Worker | 3 | - |
| `INVENTREE_S3_SECRET_KEY` | Inventree Worker | (secret) | - |
| `INVENTREE_S3_VERIFY_SSL` | Inventree Worker | True | - |
| `INVENTREE_CACHE_PASSWORD` | Inventree Worker | (secret) | - |
| `INVENTREE_S3_DEFAULT_ACL` | Inventree Worker | private | - |
| `INVENTREE_STORAGE_TARGET` | Inventree Worker | s3 | - |
| `INVENTREE_COOKIE_SAMESITE` | Inventree Worker | Lax | - |
| `INVENTREE_BACKGROUND_RETRY` | Inventree Worker | 300 | - |
| `INVENTREE_DB_TCP_KEEPALIVES` | Inventree Worker | 1 | - |
| `INVENTREE_BACKGROUND_TIMEOUT` | Inventree Worker | 90 | - |
| `INVENTREE_BACKGROUND_WORKERS` | Inventree Worker | 4 | - |
| `INVENTREE_CACHE_TCP_KEEPALIVE` | Inventree Worker | True | - |
| `INVENTREE_USE_X_FORWARDED_HOST` | Inventree Worker | True | - |
| `INVENTREE_USE_X_FORWARDED_PORT` | Inventree Worker | True | - |
| `INVENTREE_CACHE_CONNECT_TIMEOUT` | Inventree Worker | 5 | - |
| `INVENTREE_CORS_ORIGIN_ALLOW_ALL` | Inventree Worker | False | - |
| `INVENTREE_SESSION_COOKIE_SECURE` | Inventree Worker | True | - |
| `INVENTREE_USE_X_FORWARDED_PROTO` | Inventree Worker | True | - |
| `INVENTREE_DB_TCP_KEEPALIVES_IDLE` | Inventree Worker | 1 | - |
| `INVENTREE_BACKGROUND_MAX_ATTEMPTS` | Inventree Worker | 5 | - |
| `INVENTREE_DB_TCP_KEEPALIVES_COUNT` | Inventree Worker | 5 | - |
| `INVENTREE_DB_TCP_KEEPALIVES_INTERVAL` | Inventree Worker | 1 | - |
| `PORT` | InvenTree | 8000 | - |
| `INVENTREE_DEBUG` | InvenTree | False | - |
| `INVENTREE_DB_USER` | InvenTree | (secret) | - |
| `INVENTREE_CACHE_DB` | InvenTree | 0 | - |
| `INVENTREE_WEB_ADDR` | InvenTree | 0.0.0.0 | - |
| `INVENTREE_WEB_PORT` | InvenTree | 8000 | - |
| `INVENTREE_ADMIN_URL` | InvenTree | admin | - |
| `INVENTREE_DB_ENGINE` | InvenTree | postgresql | - |
| `INVENTREE_EMAIL_SSL` | InvenTree | False | - |
| `INVENTREE_EMAIL_TLS` | InvenTree | True | - |
| `INVENTREE_ADMIN_USER` | InvenTree | (secret) | - |
| `INVENTREE_BACKUP_DIR` | InvenTree | /home/inventree/data/backup | - |
| `INVENTREE_DB_TIMEOUT` | InvenTree | 10 | - |
| `INVENTREE_EMAIL_PORT` | InvenTree | 587 | - |
| `INVENTREE_MEDIA_ROOT` | InvenTree | /home/inventree/data/media | - |
| `INVENTREE_S3_VIRTUAL` | InvenTree | False | - |
| `INVENTREE_SECRET_KEY` | InvenTree | (secret) | - |
| `INVENTREE_AUTO_UPDATE` | InvenTree | True | - |
| `INVENTREE_DB_PASSWORD` | InvenTree | (secret) | - |
| `INVENTREE_S3_LOCATION` | InvenTree | inventree | - |
| `INVENTREE_STATIC_ROOT` | InvenTree | /home/inventree/data/static | - |
| `INVENTREE_S3_OVERWRITE` | InvenTree | False | - |
| `INVENTREE_ADMIN_ENABLED` | InvenTree | True | - |
| `INVENTREE_ALLOWED_HOSTS` | InvenTree | * | - |
| `INVENTREE_CACHE_ENABLED` | InvenTree | True | - |
| `INVENTREE_CACHE_TIMEOUT` | InvenTree | 3 | - |
| `INVENTREE_S3_SECRET_KEY` | InvenTree | (secret) | - |
| `INVENTREE_S3_VERIFY_SSL` | InvenTree | True | - |
| `INVENTREE_ADMIN_PASSWORD` | InvenTree | (secret) | - |
| `INVENTREE_CACHE_PASSWORD` | InvenTree | (secret) | - |
| `INVENTREE_EMAIL_PASSWORD` | InvenTree | (secret) | - |
| `INVENTREE_EMAIL_USERNAME` | InvenTree | (secret) | - |
| `INVENTREE_S3_DEFAULT_ACL` | InvenTree | private | - |
| `INVENTREE_STORAGE_TARGET` | InvenTree | s3 | - |
| `INVENTREE_COOKIE_SAMESITE` | InvenTree | Lax | - |
| `INVENTREE_BACKGROUND_RETRY` | InvenTree | 300 | - |
| `INVENTREE_DB_TCP_KEEPALIVES` | InvenTree | 1 | - |
| `INVENTREE_BACKGROUND_TIMEOUT` | InvenTree | 90 | - |
| `INVENTREE_BACKGROUND_WORKERS` | InvenTree | 4 | - |
| `INVENTREE_CACHE_TCP_KEEPALIVE` | InvenTree | True | - |
| `INVENTREE_USE_X_FORWARDED_HOST` | InvenTree | True | - |
| `INVENTREE_USE_X_FORWARDED_PORT` | InvenTree | True | - |
| `INVENTREE_CACHE_CONNECT_TIMEOUT` | InvenTree | 5 | - |
| `INVENTREE_CORS_ORIGIN_ALLOW_ALL` | InvenTree | False | - |
| `INVENTREE_SESSION_COOKIE_SECURE` | InvenTree | True | - |
| `INVENTREE_USE_X_FORWARDED_PROTO` | InvenTree | True | - |
| `INVENTREE_DB_TCP_KEEPALIVES_IDLE` | InvenTree | 1 | - |
| `INVENTREE_BACKGROUND_MAX_ATTEMPTS` | InvenTree | 5 | - |
| `INVENTREE_DB_TCP_KEEPALIVES_COUNT` | InvenTree | 5 | - |
| `INVENTREE_DB_TCP_KEEPALIVES_INTERVAL` | InvenTree | 1 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -lc 'invoke wait && invoke worker'`
- **Start command:** `bash -lc 'python3 -m pip install --no-cache-dir pip-licenses && export PATH="/usr/local/bin:/root/.local/bin:$PATH" && invoke update --skip-backup && cd /home/inventree/src/backend/InvenTree && gunicorn InvenTree.wsgi:application --bind 0.0.0.0:${PORT:-8000}'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/inventree/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/inventree-complete-setup)
