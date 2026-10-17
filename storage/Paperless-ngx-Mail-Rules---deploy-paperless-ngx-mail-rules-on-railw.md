# Deploy Paperless-ngx Mail Rules on Railway

Auto-file email attachments with IMAP mail rules

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-paperless-ngx-mail-rules-on-railw)

## About

Paperless-ngx turns e-mailed invoices and photographed receipts into a searchable OCR archive. I rely on its mail rules: add an IMAP account, match an invoice sender, and Paperless consumes, tags, and files the PDF. Railway runs Paperless-ngx 3.3.0, Postgres, and Redis.

Paperless-ngx is a GPL-3.0 archive with OCR, tags, correspondents, types, custom fields, workflows, saved views, and IMAP rules. This template runs ghcr.io/paperless-ngx/paperless-ngx:3.3.0 with Postgres and Redis, volume /usr/src/paperless/data. Admin credentials and secret key are Railway variables. v3 uses Tantivy search.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperless-ngx | `ghcr.io/paperless-ngx/paperless-ngx:3.3.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser / role created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for POSTGRES_USER. |
| `REDISHOST` | Redis | - | Redis hostname for private-network clients. |
| `REDISPORT` | Redis | 6379 | Redis port (usually 6379). |
| `REDISUSER` | Redis | default | Redis username, if authentication requires one. |
| `REDIS_URL` | Redis | - | Full Redis connection URL for clients. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (alternate export name). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/paperless/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/deploy-paperless-ngx-mail-rules-on-railw)
