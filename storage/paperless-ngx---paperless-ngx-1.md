# Deploy paperless-ngx on Railway

Self-hosted document archive with OCR, search, and tagging in one web app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-1)

## About

Paperless-ngx runs well on Railway as a Docker-based web service backed by managed Postgres and Redis, giving you quick browser access to document ingestion, OCR, and search.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webserver | `ghcr.io/paperless-ngx/paperless-ngx:2.20.15` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | webserver | 8000 |
| `PAPERLESS_DATA_DIR` | webserver | /usr/src/paperless/data |
| `PAPERLESS_DBENGINE` | webserver | postgresql |
| `PAPERLESS_ADMIN_MAIL` | webserver | admin@example.com |
| `PAPERLESS_ADMIN_USER` | webserver | (secret) |
| `PAPERLESS_MEDIA_ROOT` | webserver | /usr/src/paperless/data/media |
| `PAPERLESS_SECRET_KEY` | webserver | (secret) |
| `PAPERLESS_ADMIN_PASSWORD` | webserver | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/paperless/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paperless-ngx-1)
