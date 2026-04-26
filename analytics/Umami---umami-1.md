# Deploy Umami on Railway

Deploy and Host Umami with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-1)

## About

Umami is an open-source, privacy-focused alternative to Google Analytics. It collects essential website metrics without cookies or personal data tracking, making it GDPR-compliant by default. Lightweight, self-hosted, and beautifully simple to use.

Hosting Umami on Railway involves deploying a Next.js application backed by a PostgreSQL database and a Redis instance for caching and session management. The server processes page view and event data in real time, sent from a lightweight tracking script installed on your website. Railway makes this straightforward by provisioning both PostgreSQL and Redis as managed services, wiring them to your Umami instance via environment variables with minimal manual configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami-software/umami | `umamisoftware/umami:postgresql-latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_SECRET` | umami-software/umami | (secret) | - |
| `DATABASE_TYPE` | umami-software/umami | postgres | - |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami-software/umami | 1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-1)
