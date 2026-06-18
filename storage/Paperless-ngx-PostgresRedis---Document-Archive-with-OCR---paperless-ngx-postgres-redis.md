# Deploy Paperless-ngx + Postgres/Redis - Document Archive with OCR on Railway

Paperless-ngx document archive with Postgres, Redis, Tika, and OCR.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-postgres-redis)

## About

Self-host Paperless-ngx with Postgres, Redis, Tika, Gotenberg, generated admin credentials, and persistent document storage.

- `paperless`: public Paperless-ngx web service
- `postgres`: private database for document metadata
- `redis`: private cache/broker service
- `tika` and `gotenberg`: private helpers for Office/email document conversion
- Persistent media/document volume
- Generated admin password, database password, and app secret

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperless | `ghcr.io/paperless-ngx/paperless-ngx:latest` | Web service |
| redis | `redis:8-alpine` | Database |
| gotenberg | `gotenberg/gotenberg:8.25` | Worker |
| postgres | `postgres:17-alpine` | Database |
| tika | `apache/tika:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PAPERLESS_ADMIN_USER` | paperless | (secret) |
| `PAPERLESS_SECRET_KEY` | paperless | (secret) |
| `PAPERLESS_ADMIN_PASSWORD` | paperless | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/paperless/media`
- **Volume:** `/data`
- **Start command:** `gotenberg --chromium-disable-javascript=true --chromium-allow-list=file:///tmp/.*`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperless-ngx-postgres-redis)
