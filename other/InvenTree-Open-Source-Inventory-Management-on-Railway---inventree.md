# Deploy InvenTree | Open-Source Inventory Management on Railway on Railway

Self-host InvenTree. Track parts, stock, orders, and suppliers .

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inventree)

## About

Deploy InvenTree on Railway to get a production-ready open-source inventory management system running in minutes. Self-host InvenTree with full control over your parts data, stock levels, and supply chain — no vendor lock-in, no seat fees.

This Railway template pre-configures InvenTree with PostgreSQL for data persistence, Redis for caching and task queuing, MinIO for shared media file storage between the web server and background worker, and a dedicated worker service for asynchronous tasks. The web service ships as a custom image that bundles InvenTree's Django app with an nginx front-end so the React SPA's static assets are served correctly out of the box.

![InvenTree Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777473025/864c6afa-be16-432d-8f50-541b18eb9ab6.png)

InvenTree is an open-source inventory management system built with Python/Django, designed for tracking parts, managing stock, handling bills of materials (BOMs), and processing purchase and sales orders. It targets electronics manufacturers, hardware startups, maker spaces, and any organization that needs structured part tracking with supplier management.

Key features of self-hosted InvenTree include:

- **Hierarchical parts and stock locations** with parametric data, attachments, and notes
- **Multi-level BOM management** with substitution parts and validated consistency checks
- **Build/manufacturing orders** tracking progress from allocation through completion
- **Purchase and sales order workflows** with multi-currency and multi-supplier support
- **RESTful API** with a Python client library for automation and integration
- **Plugin architecture** supporting label printers (Brother, DYMO, Zebra), notification channels (Discord, Slack, Teams), and EDA tools (KiCad)
- **Mobile companion app** (iOS/Android) for barcode scanning and stock adjustments

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `minio/minio:latest` | Database |
| InvenTree | [praveen-ks-2001/inventree-railway-template](https://github.com/praveen-ks-2001/inventree-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| InventTree-Worker | [praveen-ks-2001/inventree-railway-template](https://github.com/praveen-ks-2001/inventree-railway-template) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MinIO | 9000 | MinIO API port |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO admin username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO admin password |
| `PORT` | InvenTree | 8080 | Public nginx port |
| `INVENTREE_DEBUG` | InvenTree | False | Disable debug mode |
| `INVENTREE_DB_HOST` | InvenTree | - | Postgres host |
| `INVENTREE_DB_NAME` | InvenTree | - | Postgres database name |
| `INVENTREE_DB_PORT` | InvenTree | - | Postgres port |
| `INVENTREE_DB_USER` | InvenTree | (secret) | Postgres user |
| `INVENTREE_SITE_URL` | InvenTree | - | Public-facing URL |
| `INVENTREE_WEB_ADDR` | InvenTree | 127.0.0.1 | Bind gunicorn to loopback |
| `INVENTREE_WEB_PORT` | InvenTree | 8000 | Internal gunicorn port |
| `INVENTREE_DB_ENGINE` | InvenTree | postgresql | Database backend engine |
| `INVENTREE_LOG_LEVEL` | InvenTree | WARNING | Logging verbosity |
| `INVENTREE_ADMIN_USER` | InvenTree | (secret) | Initial admin username |
| `INVENTREE_CACHE_HOST` | InvenTree | - | Redis host |
| `INVENTREE_CACHE_PORT` | InvenTree | - | Redis port |
| `INVENTREE_SECRET_KEY` | InvenTree | (secret) | Cryptographic signing key |
| `INVENTREE_ADMIN_EMAIL` | InvenTree | - | Initial admin email |
| `INVENTREE_AUTO_UPDATE` | InvenTree | True | Run migrations on startup |
| `INVENTREE_DB_PASSWORD` | InvenTree | (secret) | Postgres password |
| `INVENTREE_ALLOWED_HOSTS` | InvenTree | * | Allowed HTTP hosts |
| `INVENTREE_CACHE_ENABLED` | InvenTree | True | Enable Redis caching |
| `INVENTREE_S3_ACCESS_KEY` | InvenTree | - | MinIO access key |
| `INVENTREE_S3_SECRET_KEY` | InvenTree | (secret) | MinIO secret key |
| `INVENTREE_ADMIN_PASSWORD` | InvenTree | (secret) | Initial admin password |
| `INVENTREE_CACHE_PASSWORD` | InvenTree | (secret) | Redis auth password |
| `INVENTREE_S3_BUCKET_NAME` | InvenTree | inventree | MinIO bucket name |
| `INVENTREE_STORAGE_TARGET` | InvenTree | s3 | MinIO for media files |
| `INVENTREE_PLUGINS_ENABLED` | InvenTree | True | Enable plugin system |
| `INVENTREE_S3_ENDPOINT_URL` | InvenTree | - | MinIO endpoint |
| `INVENTREE_TRUSTED_ORIGINS` | InvenTree | - | CSRF trusted origins |
| `INVENTREE_GUNICORN_WORKERS` | InvenTree | 2 | Gunicorn worker processes |
| `INVENTREE_USE_X_FORWARDED_HOST` | InvenTree | True | Trust X-Forwarded-Host header |
| `INVENTREE_USE_X_FORWARDED_PORT` | InvenTree | True | Trust X-Forwarded-Port header |
| `INVENTREE_USE_X_FORWARDED_PROTO` | InvenTree | True | Trust X-Forwarded-Proto header |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `INVENTREE_DEBUG` | InventTree-Worker | False | Disable debug mode |
| `INVENTREE_DB_HOST` | InventTree-Worker | - | Postgres host |
| `INVENTREE_DB_NAME` | InventTree-Worker | - | Postgres database name |
| `INVENTREE_DB_PORT` | InventTree-Worker | - | Postgres port |
| `INVENTREE_DB_USER` | InventTree-Worker | (secret) | Postgres user |
| `INVENTREE_SITE_URL` | InventTree-Worker | - | Server public URL |
| `INVENTREE_DB_ENGINE` | InventTree-Worker | postgresql | Database backend engine |
| `INVENTREE_LOG_LEVEL` | InventTree-Worker | WARNING | Logging verbosity |
| `INVENTREE_CACHE_HOST` | InventTree-Worker | - | Redis host |
| `INVENTREE_CACHE_PORT` | InventTree-Worker | - | Redis port |
| `INVENTREE_SECRET_KEY` | InventTree-Worker | (secret) | Shared signing key |
| `INVENTREE_AUTO_UPDATE` | InventTree-Worker | False | Skip migrations on worker |
| `INVENTREE_DB_PASSWORD` | InventTree-Worker | (secret) | Postgres password |
| `INVENTREE_ALLOWED_HOSTS` | InventTree-Worker | * | Allowed HTTP hosts |
| `INVENTREE_CACHE_ENABLED` | InventTree-Worker | True | Enable Redis caching |
| `INVENTREE_S3_ACCESS_KEY` | InventTree-Worker | - | MinIO access key |
| `INVENTREE_S3_SECRET_KEY` | InventTree-Worker | (secret) | MinIO secret key |
| `INVENTREE_CACHE_PASSWORD` | InventTree-Worker | (secret) | Redis auth password |
| `INVENTREE_S3_BUCKET_NAME` | InventTree-Worker | inventree | MinIO bucket name |
| `INVENTREE_STORAGE_TARGET` | InventTree-Worker | s3 | MinIO for media files |
| `INVENTREE_PLUGINS_ENABLED` | InventTree-Worker | True | Enable plugin system |
| `INVENTREE_S3_ENDPOINT_URL` | InventTree-Worker | - | MinIO endpoint |
| `INVENTREE_TRUSTED_ORIGINS` | InventTree-Worker | - | CSRF trusted origins |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Start command:** `minio server /data --console-address :9001`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/home/inventree/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `invoke worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/inventree)
