# Deploy Umami on Railway

Privacy-first analytics to track website traffic without selling your data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-software)

## About

Umami is a simple, fast, and privacy-focused alternative to Google Analytics. It provides essential website analytics without tracking users across the web or selling your data. Lightweight, open-source, and easy to self-host.

![Umami](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/umami-software/umami)

Umami gives you full ownership of your analytics data while remaining GDPR-compliant by default. Using the official Docker image `ghcr.io/umami-software/umami:postgresql-latest`, deployment becomes very straightforward. On Railway, you get a complete production setup with PostgreSQL + Redis in just one click — no complex configuration needed.

![Umami](https://imgur.com/gdMnPDX.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | `ghcr.io/umami-software/umami:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TRACK_BOT` | umami | true | - |
| `APP_SECRET` | umami | (secret) | - |
| `DATABASE_TYPE` | umami | postgresql | - |
| `DISABLE_TELEMETRY` | umami | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-software)
