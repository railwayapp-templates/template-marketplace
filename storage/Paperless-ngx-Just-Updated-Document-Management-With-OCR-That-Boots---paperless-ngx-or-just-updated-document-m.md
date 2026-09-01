# Deploy Paperless-ngx | (Just Updated) Document Management With OCR That Boots on Railway

Boots on first deploy, seeds your admin, and OCRs at your real CPU count

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-or-just-updated-document-m)

## About

Paperless-ngx is an open-source document management system. It ingests scans, PDFs and
photographs, runs OCR over them, extracts dates, correspondents and tags, and gives you a
full-text-searchable archive of everything you would otherwise keep in a filing cabinet.

This template runs Paperless-ngx 3.1.1 as three services: the application on a persistent
volume, PostgreSQL, and Redis.

Paperless-ngx is a Django application with a Celery worker, and it needs three things to be
usable on a platform like Railway: a reachable Redis broker, a persistent volume for the
documents, and an administrator account. It has no signup page, and its password reset is an
emailed link, so an instance that boots without an account is an instance nobody can ever log
into. It also derives its OCR thread pool from the number of CPU cores it can see, which
inside a container is the host's core count rather than the plan's quota.

This template handles all four points: Redis is deployed with a working configuration and a
generated password, the data directory, media and consume folders all live under one volume,
the administrator is seeded before the port opens and re-applied on every boot, and the OCR
thread pool is sized from the container's actual CPU quota.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperless | `ghcr.io/bon5co/paperless-railway:3.1.1` | Web service |
| redis | `redis:8.2.1-alpine` | Database |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PAPERLESS_SECRET_KEY` | paperless | (secret) |
| `PAPERLESS_ADMIN_PASSWORD` | paperless | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/accounts/login/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperless-ngx-or-just-updated-document-m)
