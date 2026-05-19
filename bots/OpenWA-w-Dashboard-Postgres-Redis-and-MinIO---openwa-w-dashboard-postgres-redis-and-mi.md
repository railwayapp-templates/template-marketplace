# Deploy OpenWA (w/ Dashboard, Postgres, Redis and MinIO) on Railway

Deploy OpenWA on Railway. WhatsApp REST API. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwa-w-dashboard-postgres-redis-and-mi)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Y7Uecc?referralCode=9uHSFr&utm_medium=integration&utm_source=template&utm_campaign=generic)

OpenWA is an open-source WhatsApp automation platform built on top of WhatsApp Web. Connect personal or business WhatsApp accounts through a REST API to send messages, manage chats, receive webhooks, and automate workflows without requiring Meta Business API approval.

Hosting OpenWA on Railway requires persistent storage for WhatsApp authentication sessions, media files, plugins, and database data. This template provisions a complete OpenWA stack including PostgreSQL, Redis, MinIO object storage, and the OpenWA Dashboard.

This template uses the prebuilt Docker images:
```txt
ghcr.io/rmyndharis/openwa:latest
ghcr.io/douglasrubims/openwa-dashboard:latest
```

Railway provisions networking, SSL, deployments, private networking, and persistent storage automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `minio/minio` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| OpenWA Dashboard | `ghcr.io/douglasrubims/openwa-dashboard:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| OpenWA API | `ghcr.io/rmyndharis/openwa:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | MinIO | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |
| `POSTGRES_DB` | Postgres | openwa | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | OpenWA API | 2785 | - |
| `NODE_ENV` | OpenWA API | production | - |
| `LOG_LEVEL` | OpenWA API | info | - |
| `S3_BUCKET` | OpenWA API | openwa | - |
| `REDIS_PORT` | OpenWA API | 6379 | - |
| `ENGINE_TYPE` | OpenWA API | whatsapp-web.js | - |
| `PLUGINS_DIR` | OpenWA API | /app/data/plugins | - |
| `STORAGE_TYPE` | OpenWA API | s3 | - |
| `DATABASE_TYPE` | OpenWA API | postgres | - |
| `REDIS_ENABLED` | OpenWA API | true | - |
| `S3_SECRET_KEY` | OpenWA API | (secret) | - |
| `PUPPETEER_ARGS` | OpenWA API | --no-sandbox,--disable-setuid-sandbox,--disable-dev-shm-usage,--disable-gpu | - |
| `RATE_LIMIT_MAX` | OpenWA API | 100 | - |
| `RATE_LIMIT_TTL` | OpenWA API | 60 | - |
| `PLUGINS_ENABLED` | OpenWA API | true | - |
| `WEBHOOK_TIMEOUT` | OpenWA API | 10000 | - |
| `DATABASE_PASSWORD` | OpenWA API | (secret) | - |
| `DATABASE_USERNAME` | OpenWA API | (secret) | - |
| `SESSION_DATA_PATH` | OpenWA API | /app/data/sessions | - |
| `PUPPETEER_HEADLESS` | OpenWA API | true | - |
| `WEBHOOK_MAX_RETRIES` | OpenWA API | 3 | - |
| `WEBHOOK_RETRY_DELAY` | OpenWA API | 5000 | - |
| `DATABASE_SYNCHRONIZE` | OpenWA API | false | - |

## Configuration

- **Start command:** `minio server /data --console-address ":9001"`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/app/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/openwa-w-dashboard-postgres-redis-and-mi)
