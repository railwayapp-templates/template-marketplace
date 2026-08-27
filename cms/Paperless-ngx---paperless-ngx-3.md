# Deploy Paperless-ngx on Railway

Paperless-ngx — document management with OCR and full-text search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-3)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/tududi)

![Tududi OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-tududi/main/og-image.svg)

Tududi is a calm, open-source task management system for organizing life and work. Deploy it on Railway to capture, organize, and track your tasks with a clean, distraction-free interface.

Tududi runs as a single Docker container on port 9292. Railway provides compute, TLS at the edge, and a public URL. Data is stored in `/usr/src/app/tududi_db` — add a Railway Volume there for persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperless-ngx | [INAPP-Mobile/paperless-ngx-railway](https://github.com/INAPP-Mobile/paperless-ngx-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | Redis | - | Redis/Valkey connection URL with password. Auto-shared with the Paperless service as PAPERLESS_REDIS. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. Auto-generated. Used in REDIS_URL for auth. |
| `POSTGRES_DB` | Postgres | paperless | Initial database created on first boot. Also used as PGDATABASE for Paperless-ngx. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name. Also used by Paperless-ngx to connect (PGUSER). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password. Auto-generated. Also used by Paperless-ngx to connect (PGPASSWORD). |
| `PORT` | paperless-ngx | 8000 | Port for the Paperless-ngx web server. |
| `PAPERLESS_URL` | paperless-ngx | - | Public URL for Paperless-ngx. Auto-configured via Railway public domain. |
| `PAPERLESS_REDIS` | paperless-ngx | - | Redis connection string for Celery broker. Auto-detected from the Redis companion service. |
| `PAPERLESS_DBHOST` | paperless-ngx | - | PostgreSQL host. Auto-detected from the Postgres companion service (PGHOST). |
| `PAPERLESS_DBNAME` | paperless-ngx | - | PostgreSQL database name. Auto-detected from the Postgres companion service (PGDATABASE). |
| `PAPERLESS_DBPASS` | paperless-ngx | - | PostgreSQL password. Auto-detected from the Postgres companion service (PGPASSWORD). |
| `PAPERLESS_DBPORT` | paperless-ngx | - | PostgreSQL port. Auto-detected from the Postgres companion service (PGPORT). |
| `PAPERLESS_DBUSER` | paperless-ngx | - | PostgreSQL username. Auto-detected from the Postgres companion service (PGUSER). |
| `PAPERLESS_DBENGINE` | paperless-ngx | postgresql | Database engine to use. |
| `PAPERLESS_TIME_ZONE` | paperless-ngx | UTC | Timezone for Paperless-ngx operations. |
| `PAPERLESS_DB_OPTIONS` | paperless-ngx | {"sslmode": "prefer"} | PostgreSQL connection options (JSON). Sets SSL mode to prefer. |
| `PAPERLESS_SECRET_KEY` | paperless-ngx | (secret) | Secret key for session tokens and signing. Auto-generated on first deploy. |
| `PAPERLESS_OCR_LANGUAGE` | paperless-ngx | eng | Default language for OCR. Set to the language most of your documents are written in. |
| `PAPERLESS_OCR_LANGUAGES` | paperless-ngx | eng | Additional OCR languages to install, space-separated. |
| `PAPERLESS_CONSUMER_RECURSIVE` | paperless-ngx | true | Whether the document consumer recursively scans subdirectories. |
| `PAPERLESS_CONSUMER_POLLING_INTERVAL` | paperless-ngx | 0 | Polling interval (seconds) for the consumer. 0 = event-driven (recommended). |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/paperless-ngx-3)
