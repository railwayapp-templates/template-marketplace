# Deploy Paperless-ngx OCR on Railway

Tesseract OCR and PDF/A archives for every scan

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-paperless-ngx-ocr-on-railway)

## About

Paperless-ngx OCR turns receipts, invoices, and bills into a searchable archive you control. This Railway stack runs Paperless-ngx 3.3.0 with Tesseract OCR, Postgres, and Redis.

Paperless-ngx is GPL-3.0 document management for scanning, indexing, and retrieving paper. OCRmyPDF with Tesseract creates an original and a PDF/A copy with a hidden text layer; search runs on that layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperless-ngx | `ghcr.io/paperless-ngx/paperless-ngx:3.3.0` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser / role created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for POSTGRES_USER. |
| `PORT` | paperless-ngx | 8000 | HTTP listen port for the Paperless-ngx web UI (8000). |
| `USERMAP_GID` | paperless-ngx | 1000 | Linux GID used for files on the Paperless volume. |
| `USERMAP_UID` | paperless-ngx | 1000 | Linux UID used for files on the Paperless volume. |
| `PAPERLESS_URL` | paperless-ngx | - | Public HTTPS URL of this Paperless instance. |
| `PAPERLESS_PORT` | paperless-ngx | 8000 | Paperless web port; keep aligned with PORT. |
| `PAPERLESS_REDIS` | paperless-ngx | - | Redis URL used as the Celery broker. |
| `PAPERLESS_DBHOST` | paperless-ngx | - | Postgres hostname from the Postgres service. |
| `PAPERLESS_DBNAME` | paperless-ngx | - | Postgres database name. |
| `PAPERLESS_DBPASS` | paperless-ngx | - | Postgres password from the Postgres service. |
| `PAPERLESS_DBPORT` | paperless-ngx | - | Postgres port from the Postgres service. |
| `PAPERLESS_DBUSER` | paperless-ngx | - | Postgres username. |
| `PAPERLESS_DATA_DIR` | paperless-ngx | /usr/src/paperless/data | Root data directory on the persistent volume. |
| `PAPERLESS_DBENGINE` | paperless-ngx | postgresql | Database engine. Use postgresql on Railway. |
| `PAPERLESS_TIME_ZONE` | paperless-ngx | UTC | Application timezone (e.g. UTC). |
| `PAPERLESS_ADMIN_MAIL` | paperless-ngx | admin@example.com | Email for the initial admin user. |
| `PAPERLESS_ADMIN_USER` | paperless-ngx | (secret) | Initial admin username, created on first boot only. |
| `PAPERLESS_MEDIA_ROOT` | paperless-ngx | /usr/src/paperless/data/media | Path for stored documents and thumbnails. |
| `PAPERLESS_SECRET_KEY` | paperless-ngx | (secret) | Django secret key; keep stable across redeploys. |
| `PAPERLESS_OCR_LANGUAGE` | paperless-ngx | eng | Tesseract OCR language code (e.g. eng). |
| `PAPERLESS_TASK_WORKERS` | paperless-ngx | 1 | Number of Celery worker processes. |
| `PAPERLESS_ADMIN_PASSWORD` | paperless-ngx | (secret) | Initial admin password, created on first boot only. |
| `PAPERLESS_CONSUMPTION_DIR` | paperless-ngx | /usr/src/paperless/data/consume | Drop folder watched for new documents to ingest. |
| `PAPERLESS_WEBSERVER_WORKERS` | paperless-ngx | 1 | Number of web server worker processes. |
| `PAPERLESS_THREADS_PER_WORKER` | paperless-ngx | 1 | Threads per Celery worker process. |
| `REDISHOST` | Redis | - | Redis hostname for private-network clients. |
| `REDISPORT` | Redis | 6379 | Redis port (usually 6379). |
| `REDISUSER` | Redis | default | Redis username, if authentication requires one. |
| `REDIS_URL` | Redis | - | Full Redis connection URL for clients. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (alternate export name). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/paperless/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/deploy-paperless-ngx-ocr-on-railway)
