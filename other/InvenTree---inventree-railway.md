# Deploy InvenTree on Railway

Inventory system for tracking parts, stock levels and orders

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inventree-railway)

## About

InvenTree is an open-source inventory management system for people who keep physical parts on shelves — electronics labs, hardware startups, makerspaces and small manufacturers. It gives you a searchable parts catalogue with internal part numbers, stock locations down to the individual bin, bills of materials, build orders that consume stock, and purchase and sales orders. All of it sits behind a documented REST API, so scanners, label printers and shop-floor scripts read the same data the interface does.

Self-host InvenTree on Railway and this template deploys the full production shape, not a single container: `inventree-server` runs the web application under gunicorn, `inventree-worker` runs the django-q2 background cluster behind pricing updates, notifications and report rendering, `Postgres` stores the catalogue and doubles as the task broker, `Redis` is the shared cache that lets the worker run more than one process, and an object storage bucket holds part images, attachments and PDFs so both containers see the same files.

![InvenTree server and worker services beside Postgres and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788387451/inventree-architecture.png)

Spreadsheets stop working as an inventory system the moment two people edit one, a part gets ordered twice, or somebody needs to know which build consumed the last twelve capacitors. InvenTree replaces that with a relational model — parts, stock items, locations, suppliers and orders referencing each other, with a full history of every stock movement.

Key capabilities:

- Hierarchical part categories and stock locations, with low-stock alerts
- Multi-level bills of materials, build orders, stock allocation and consumption
- Purchase and sales orders with per-supplier part pricing
- Barcode and QR support, plus label and report templates rendered to PDF
- Serial numbers, batch codes, expiry dates and full movement history
- A plugin framework and a REST API with a published OpenAPI schema

The two application services run the same image in different roles: the web service serves the interface and the API, the worker consumes the task queue. Splitting them matters because report generation and pricing updates are slow enough to make the interface feel broken if they run in the request path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inventree-server | `inventree/inventree:stable` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| inventree-worker | `inventree/inventree:stable` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | inventree-server | 8000 | Port Railway health-checks |
| `INVENTREE_DEBUG` | inventree-server | False | Production mode |
| `INVENTREE_DB_HOST` | inventree-server | - | Private database hostname |
| `INVENTREE_DB_NAME` | inventree-server | - | Application database name |
| `INVENTREE_DB_PORT` | inventree-server | - | Database port |
| `INVENTREE_DB_USER` | inventree-server | (secret) | Database username |
| `INVENTREE_SITE_URL` | inventree-server | - | Public URL and CSRF trusted origin |
| `INVENTREE_WEB_ADDR` | inventree-server | 0.0.0.0 | gunicorn bind address |
| `INVENTREE_WEB_PORT` | inventree-server | 8000 | gunicorn listening port |
| `INVENTREE_DB_ENGINE` | inventree-server | postgresql | Database backend selector |
| `INVENTREE_LOG_LEVEL` | inventree-server | WARNING | Console log verbosity |
| `INVENTREE_ADMIN_USER` | inventree-server | (secret) | First superuser username |
| `INVENTREE_CACHE_HOST` | inventree-server | - | Private Redis hostname |
| `INVENTREE_CACHE_PORT` | inventree-server | - | Redis port |
| `INVENTREE_S3_VIRTUAL` | inventree-server | False | Path-style addressing, required here |
| `INVENTREE_SECRET_KEY` | inventree-server | (secret) | Django signing key, shared with worker |
| `INVENTREE_ADMIN_EMAIL` | inventree-server | admin@example.org | First superuser email |
| `INVENTREE_AUTO_UPDATE` | inventree-server | False | Migrations run from the start command |
| `INVENTREE_DB_PASSWORD` | inventree-server | (secret) | Database password |
| `INVENTREE_S3_LOCATION` | inventree-server | media | Key prefix inside the bucket |
| `INVENTREE_STATIC_ROOT` | inventree-server | /home/inventree/static | Static files kept off the volume |
| `INVENTREE_CACHE_ENABLED` | inventree-server | True | Enable the shared Redis cache |
| `INVENTREE_S3_ACCESS_KEY` | inventree-server | - | Bucket access key |
| `INVENTREE_S3_SECRET_KEY` | inventree-server | (secret) | Bucket secret key |
| `INVENTREE_ADMIN_PASSWORD` | inventree-server | (secret) | First superuser password, change after login |
| `INVENTREE_CACHE_PASSWORD` | inventree-server | (secret) | Redis auth password |
| `INVENTREE_S3_BUCKET_NAME` | inventree-server | - | Bucket name |
| `INVENTREE_S3_DEFAULT_ACL` | inventree-server | private | Objects are never public |
| `INVENTREE_S3_REGION_NAME` | inventree-server | - | Bucket region |
| `INVENTREE_STORAGE_TARGET` | inventree-server | s3 | Store media in object storage |
| `INVENTREE_COOKIE_SAMESITE` | inventree-server | lax | SameSite attribute on cookies |
| `INVENTREE_PLUGINS_ENABLED` | inventree-server | True | Allow third-party plugins |
| `INVENTREE_S3_ENDPOINT_URL` | inventree-server | - | S3 endpoint with scheme |
| `INVENTREE_GUNICORN_TIMEOUT` | inventree-server | 90 | Request timeout in seconds |
| `INVENTREE_GUNICORN_WORKERS` | inventree-server | 4 | Web worker processes |
| `INVENTREE_USE_X_FORWARDED_HOST` | inventree-server | True | Trust the edge Host header |
| `INVENTREE_USE_X_FORWARDED_PORT` | inventree-server | True | Trust the edge port header |
| `INVENTREE_SESSION_COOKIE_SECURE` | inventree-server | True | Secure flag on session cookies |
| `INVENTREE_USE_X_FORWARDED_PROTO` | inventree-server | True | Detect HTTPS behind the edge |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `INVENTREE_DEBUG` | inventree-worker | False | Production mode |
| `INVENTREE_DB_HOST` | inventree-worker | - | Private database hostname |
| `INVENTREE_DB_NAME` | inventree-worker | - | Application database name |
| `INVENTREE_DB_PORT` | inventree-worker | - | Database port |
| `INVENTREE_DB_USER` | inventree-worker | (secret) | Database username |
| `INVENTREE_SITE_URL` | inventree-worker | - | Public URL used in notifications |
| `INVENTREE_DB_ENGINE` | inventree-worker | postgresql | Database backend selector |
| `INVENTREE_LOG_LEVEL` | inventree-worker | WARNING | Console log verbosity |
| `INVENTREE_CACHE_HOST` | inventree-worker | - | Private Redis hostname |
| `INVENTREE_CACHE_PORT` | inventree-worker | - | Redis port |
| `INVENTREE_S3_VIRTUAL` | inventree-worker | False | Path-style addressing, required here |
| `INVENTREE_SECRET_KEY` | inventree-worker | (secret) | Must match the web service |
| `INVENTREE_AUTO_UPDATE` | inventree-worker | False | Web service owns migrations |
| `INVENTREE_DB_PASSWORD` | inventree-worker | (secret) | Database password |
| `INVENTREE_S3_LOCATION` | inventree-worker | media | Key prefix inside the bucket |
| `INVENTREE_STATIC_ROOT` | inventree-worker | /home/inventree/static | Static files kept off the volume |
| `INVENTREE_CACHE_ENABLED` | inventree-worker | True | Required for multiple background workers |
| `INVENTREE_S3_ACCESS_KEY` | inventree-worker | - | Bucket access key |
| `INVENTREE_S3_SECRET_KEY` | inventree-worker | (secret) | Bucket secret key |
| `INVENTREE_CACHE_PASSWORD` | inventree-worker | (secret) | Redis auth password |
| `INVENTREE_S3_BUCKET_NAME` | inventree-worker | - | Bucket name |
| `INVENTREE_S3_DEFAULT_ACL` | inventree-worker | private | Objects are never public |
| `INVENTREE_S3_REGION_NAME` | inventree-worker | - | Bucket region |
| `INVENTREE_STORAGE_TARGET` | inventree-worker | s3 | Store media in object storage |
| `INVENTREE_PLUGINS_ENABLED` | inventree-worker | True | Allow third-party plugins |
| `INVENTREE_S3_ENDPOINT_URL` | inventree-worker | - | S3 endpoint with scheme |
| `INVENTREE_BACKGROUND_TIMEOUT` | inventree-worker | 90 | Task timeout in seconds |
| `INVENTREE_BACKGROUND_WORKERS` | inventree-worker | 4 | django-q2 worker processes |
| `INVENTREE_USE_X_FORWARDED_HOST` | inventree-worker | True | Trust the edge Host header |
| `INVENTREE_USE_X_FORWARDED_PORT` | inventree-worker | True | Trust the edge port header |
| `INVENTREE_USE_X_FORWARDED_PROTO` | inventree-worker | True | Detect HTTPS behind the edge |

## Configuration

- **Start command:** `/bin/bash ./init.sh /bin/bash -c "invoke migrate && invoke static && exec gunicorn -c ./gunicorn.conf.py InvenTree.wsgi -b 0.0.0.0:8000 --chdir /home/inventree/src/backend/InvenTree"`
- **Healthcheck:** `/api/system/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/inventree/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/bash ./init.sh /bin/bash -c "for i in 1 2 3 4 5 6 7 8 9 10 11 12; do invoke worker && break; echo 'worker exited - retrying in 15s'; sleep 15; done"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/inventree-railway)
