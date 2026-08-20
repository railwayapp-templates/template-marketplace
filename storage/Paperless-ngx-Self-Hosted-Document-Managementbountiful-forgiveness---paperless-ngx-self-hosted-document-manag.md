# Deploy Paperless-ngx (Self-Hosted Document Management)bountiful-forgiveness on Railway

Self-hosted document management with OCR — scan, index, archive.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-self-hosted-document-manag)

## About

Paperless-ngx is a powerful open-source document management system that turns your paper and PDF clutter into a searchable, tagged digital archive. It OCRs every document, extracts text, and lets you find any file in seconds — a self-hosted alternative to Evernote, DocuWare, and paper filing cabinets. This template deploys the full, reliable stack: the Paperless-ngx web app, a managed PostgreSQL database, a Redis task queue, plus Gotenberg and Apache Tika for converting Office and email documents. Private networking, persistent document storage, and CSRF-safe public access are all wired up out of the box. [Updated August '26]

Paperless-ngx needs several coordinated services: PostgreSQL for metadata, Redis for its async task queue, and Gotenberg plus Tika to convert Office documents and emails into archivable PDFs. This template provisions all of them, connects them over Railway's private network, and mounts a persistent volume for your documents. The public URL, allowed hosts, and CSRF trusted origins are configured automatically so logins work behind Railway's TLS proxy — the single most common cause of failed Paperless deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotenberg | `gotenberg/gotenberg:8.34` | Worker |
| paperless-ngx | `ghcr.io/paperless-ngx/paperless-ngx:2.20.15` | Web service |
| tika | `apache/tika:3.3.1.0-full` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PAPERLESS_URL` | paperless-ngx | - | Public URL of your Paperless instance; sets allowed hosts and CSRF. |
| `PAPERLESS_PORT` | paperless-ngx | 8000 | Internal port Paperless listens on. |
| `PAPERLESS_REDIS` | paperless-ngx | - | Redis broker connection URL used for the async task queue. |
| `PAPERLESS_DBHOST` | paperless-ngx | - | Private hostname of the Postgres service. |
| `PAPERLESS_DBNAME` | paperless-ngx | - | Postgres database name. |
| `PAPERLESS_DBPASS` | paperless-ngx | - | Postgres password. |
| `PAPERLESS_DBPORT` | paperless-ngx | - | Postgres port. |
| `PAPERLESS_DBUSER` | paperless-ngx | - | Postgres username. |
| `PAPERLESS_DBENGINE` | paperless-ngx | postgresql | Database backend; use PostgreSQL for production. |
| `PAPERLESS_TIME_ZONE` | paperless-ngx | UTC | Time zone used for dates and scheduling. |
| `PAPERLESS_ADMIN_USER` | paperless-ngx | (secret) | Username of the initial admin account, created on first boot. |
| `PAPERLESS_SECRET_KEY` | paperless-ngx | (secret) | Django secret key for sessions and signing; auto-generated. |
| `PAPERLESS_OCR_LANGUAGE` | paperless-ngx | eng | Default OCR language for document text recognition. |
| `PAPERLESS_TIKA_ENABLED` | paperless-ngx | 1 | Enable Apache Tika to parse office and email documents. |
| `PAPERLESS_TIKA_ENDPOINT` | paperless-ngx | - | Private URL of the Tika service. |
| `PAPERLESS_ADMIN_PASSWORD` | paperless-ngx | (secret) | Password of the initial admin account; auto-generated, change after first login. |
| `PAPERLESS_CSRF_TRUSTED_ORIGINS` | paperless-ngx | - | Trusted origin for CSRF protection behind Railway's TLS proxy. |
| `PAPERLESS_TIKA_GOTENBERG_ENDPOINT` | paperless-ngx | - | Private URL of the Gotenberg conversion service. |
| `POSTGRES_DB` | Postgres | railway | Name of the default database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection string for clients. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, auto-generated (alphanumeric for safe connection strings). |
| `REDISHOST` | Redis | - | Private hostname of this Redis service. |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | Redis username. |
| `REDIS_URL` | Redis | - | Full Redis connection string for clients. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, auto-generated (alphanumeric for safe connection strings). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/paperless/media`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperless-ngx-self-hosted-document-manag)
