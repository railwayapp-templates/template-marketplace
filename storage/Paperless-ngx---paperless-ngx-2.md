# Deploy Paperless-ngx on Railway

Searchable document archive with OCR, tagging, and automated workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-2)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-2)

**Published on Railway:** https://railway.com/deploy/paperless-ngx-2 (category: Storage).

Paperless-ngx is a community-supported document management system that turns scans, PDFs, images, email, and Office files into a searchable archive. It applies OCR, preserves originals, creates archival renditions when appropriate, and helps organize documents with tags, correspondents, document types, custom fields, and automated workflows.

Hosting Paperless-ngx requires the web application, PostgreSQL for relational data, Redis for background jobs and scheduling, and persistent storage for the search index, originals, thumbnails, exports, and the consumption inbox. This template also includes Apache Tika and Gotenberg for parsing email and Office documents. Only Paperless-ngx receives a public Railway domain; all four dependencies remain private. The application image runs migrations and search-index checks during startup, creates a generated administrator on an empty database, and uses Tesseract for English OCR. Railway references supply private endpoints, while generated template values protect the administrator, Django signing key, and PostgreSQL credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gotenberg | `gotenberg/gotenberg:7.10` | Worker |
| Paperless-ngx | `ghcr.io/paperless-ngx/paperless-ngx:3.0.4` | Web service |
| Redis | `redis:7` | Database |
| Postgres | `postgres:16` | Database |
| Tika | `apache/tika:3.2.3.0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Gotenberg | 3000 |
| `PORT` | Paperless-ngx | 8000 |
| `USERMAP_GID` | Paperless-ngx | 1000 |
| `USERMAP_UID` | Paperless-ngx | 1000 |
| `PAPERLESS_PORT` | Paperless-ngx | 8000 |
| `PAPERLESS_DATA_DIR` | Paperless-ngx | /usr/src/paperless/export/data |
| `PAPERLESS_DBENGINE` | Paperless-ngx | postgresql |
| `PAPERLESS_OCR_MODE` | Paperless-ngx | auto |
| `PAPERLESS_BIND_ADDR` | Paperless-ngx | 0.0.0.0 |
| `PAPERLESS_TIME_ZONE` | Paperless-ngx | UTC |
| `PAPERLESS_ADMIN_MAIL` | Paperless-ngx | root@localhost |
| `PAPERLESS_ADMIN_USER` | Paperless-ngx | (secret) |
| `PAPERLESS_MEDIA_ROOT` | Paperless-ngx | /usr/src/paperless/export/media |
| `PAPERLESS_SECRET_KEY` | Paperless-ngx | (secret) |
| `PAPERLESS_OCR_LANGUAGE` | Paperless-ngx | eng |
| `PAPERLESS_TIKA_ENABLED` | Paperless-ngx | 1 |
| `PAPERLESS_ADMIN_PASSWORD` | Paperless-ngx | (secret) |
| `PAPERLESS_CONSUMPTION_DIR` | Paperless-ngx | /usr/src/paperless/export/consume |
| `PAPERLESS_ACCOUNT_ALLOW_SIGNUPS` | Paperless-ngx | false |
| `PAPERLESS_ARCHIVE_FILE_GENERATION` | Paperless-ngx | auto |
| `PAPERLESS_ENABLE_HTTP_REMOTE_USER` | Paperless-ngx | (secret) |
| `POSTGRES_DB` | Postgres | paperless |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Tika | 9998 |

## Configuration

- **Start command:** `gotenberg --chromium-disable-javascript=true --chromium-allow-list=file:///tmp/.*`
- **Healthcheck:** `/health`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/paperless/export`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/tika`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperless-ngx-2)
