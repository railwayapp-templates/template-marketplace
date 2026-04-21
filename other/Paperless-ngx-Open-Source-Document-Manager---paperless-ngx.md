# Deploy Paperless-ngx | Open Source Document Manager on Railway

Self Host Paperless ngx. Scan, index, tag, OCR and archive documents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx?referralCode=QXdhdr)

Deploy Paperless-ngx on Railway to run a fully self-hosted document management system with automatic OCR, intelligent tagging, and full-text search. Self-host Paperless-ngx to transform physical documents into a searchable, organized digital archive — no SaaS vendor lock-in, no subscription fees, complete data privacy.

This Railway template pre-configures Paperless-ngx with PostgreSQL for document metadata storage, Redis for background task processing, and a persistent volume for document files. One click gives you a production-ready instance with admin authentication, OCR in 100+ languages, and Celery workers for asynchronous document processing.

![Paperless-ngx Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776701927/paperless-railway-architecture_di8wjc.png)

Paperless-ngx is a community-supported open-source document management system — the official successor to Paperless and Paperless-ng. It scans, indexes, and archives all your physical documents so you can search, tag, and retrieve them instantly.

Key features:

- **Automatic OCR** — Tesseract engine supports 100+ languages, extracting searchable text from scanned PDFs and images
- **Machine-learning classification** — auto-assigns tags, correspondents, and document types based on content
- **Full-text search** — find any document by content, metadata, dates, or custom fields
- **Multi-format support** — PDFs, images, plain text, Word, Excel, PowerPoint, and LibreOffice formats
- **Email ingestion** — automatically import documents from email attachments
- **Workflow automation** — trigger actions on document upload, matching, or scheduled intervals
- **Multi-user with permissions** — role-based access control with per-user document visibility

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Paperless-ngx | `paperlessngx/paperless-ngx:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Paperless-ngx | 8000 | HTTP server listening port |
| `PAPERLESS_URL` | Paperless-ngx | - | Public URL for CORS and links |
| `PAPERLESS_REDIS` | Paperless-ngx | - | Redis connection for Celery task queue |
| `PAPERLESS_DBHOST` | Paperless-ngx | - | PostgreSQL host address |
| `PAPERLESS_DBNAME` | Paperless-ngx | - | PostgreSQL database name |
| `PAPERLESS_DBPASS` | Paperless-ngx | - | PostgreSQL password |
| `PAPERLESS_DBPORT` | Paperless-ngx | - | PostgreSQL port |
| `PAPERLESS_DBUSER` | Paperless-ngx | - | PostgreSQL username |
| `PAPERLESS_DATA_DIR` | Paperless-ngx | /data/data | Application data directory |
| `PAPERLESS_TIME_ZONE` | Paperless-ngx | UTC | Container timezone |
| `PAPERLESS_ADMIN_MAIL` | Paperless-ngx | - | Create Superuser email address |
| `PAPERLESS_ADMIN_USER` | Paperless-ngx | (secret) | Create Superuser username |
| `PAPERLESS_MEDIA_ROOT` | Paperless-ngx | /data/media | Document storage directory |
| `PAPERLESS_SECRET_KEY` | Paperless-ngx | (secret) | Django secret key for sessions |
| `PAPERLESS_OCR_LANGUAGE` | Paperless-ngx | eng | Default OCR language |
| `PAPERLESS_ADMIN_PASSWORD` | Paperless-ngx | (secret) | Create Superuser password |
| `PAPERLESS_CONSUMPTION_DIR` | Paperless-ngx | /data/consume | Document intake directory |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/paperless-ngx)
