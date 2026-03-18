# Deploy Umami with cache on Railway

Umami makes it easy to collect, analyze, and understand your website data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-with-cache)

## About

Umami is a simple, fast, privacy-focused alternative to Google Analytics. This template includes Redis caching for improved performance when handling high-traffic analytics workloads.

Deploying Umami with cache on Railway gives you a complete web analytics stack with PostgreSQL for data storage and Redis for caching. Umami tracks pageviews, events, and user journeys without cookies—making it GDPR-compliant out of the box. The lightweight tracking script (~1KB) won't slow down your sites. Redis caching reduces database load and improves dashboard responsiveness for high-traffic sites.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| umami | `umamisoftware/umami:postgresql-latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `PORT` | umami | 3000 | - |
| `HOSTNAME` | umami | :: | - |
| `APP_SECRET` | umami | (secret) | - |
| `DATABASE_TYPE` | umami | postgres | - |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami | 1 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/umami-with-cache)
