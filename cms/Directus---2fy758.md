# Deploy Directus on Railway

Directus [Oct '26] (Headless CMS/Strapi & Supabase Alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2fy758)

## About

Directus is an open source data platform that turns any SQL database into a REST and GraphQL API, with a full admin app (the Directus Data Studio) on top. Unlike most headless CMS tools, Directus does not own your data model: it introspects the tables you already have, keeps your schema clean and lets you walk away without a migration. This template deploys self hosted Directus on Railway with S3-compatible file storage and optional WebSockets (realtime) already wired.

Self hosting Directus means running the official `directus/directus` Docker image next to a SQL database, with persistent file storage, a public URL and the right environment variables. On a VPS you manage Docker, reverse proxy, TLS, backups and upgrades yourself. On Railway, this template provisions Directus and its database, connects them over the private network, generates secrets and exposes Directus on an HTTPS domain.

This template includes Directus, PostgreSQL, Redis and an S3-compatible bucket for file storage, all connected at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Directus | `directus/directus:latest` | Web service |
| PostGIS | `postgis/postgis:17-3.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis Host |
| `REDISPORT` | Redis | 6379 | Redis Port |
| `REDISUSER` | Redis | default | Redis User |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis Password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis Password |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `KEY` | Directus | - | Randomly generated key |
| `HOST` | Directus | :: | Host to listen on Private and Public network |
| `PORT` | Directus | 8055 | Port to use on the DIRECTUS_*_URL template strings |
| `REDIS` | Directus | - | Redis connection string |
| `SECRET` | Directus | (secret) | Secret string for this directus instance. |
| `DB_CLIENT` | Directus | pg | Type of DB |
| `LOG_STYLE` | Directus | raw | - |
| `PUBLIC_URL` | Directus | - | Railway setting, don't change! |
| `CACHE_STORE` | Directus | redis | Where to store the cache data. |
| `PRIVATE_URL` | Directus | - | Directus private URL for private networking |
| `DB_POOL__MAX` | Directus | 5 | DB Pool settings for Railway TCP Proxy |
| `DB_POOL__MIN` | Directus | 0 | DB Pool settings for Railway TCP Proxy |
| `CACHE_ENABLED` | Directus | true | Whether or not data caching is enabled. |
| `STORAGE_S3_KEY` | Directus | - | Bucket access key |
| `CACHE_AUTO_PURGE` | Directus | true | - |
| `STORAGE_LOCATIONS` | Directus | s3 | Use s3 or local |
| `STORAGE_S3_DRIVER` | Directus | s3 | - |
| `STORAGE_S3_REGION` | Directus | - | Bucket region |
| `STORAGE_S3_SECRET` | Directus | (secret) | Bucket secret |
| `WEBSOCKETS_ENABLED` | Directus | true | For real time features |
| `STORAGE_S3_ENDPOINT` | Directus | - | Bucket endpoint |
| `DB_CONNECTION_STRING` | Directus | - | DB Connection |
| `SYNCHRONIZATION_STORE` | Directus | redis | Synchronization in Directus refers to the process of coordinating actions across multiple instances or containers, it can be "memory" or "redis". |
| `STORAGE_S3_FORCE_PATH_STYLE` | Directus | true | - |
| `POSTGRES_DB` | PostGIS | railway | Default database created when image is started |
| `DATABASE_URL` | PostGIS | - | Public URL to connect to Postgres database |
| `POSTGRES_USER` | PostGIS | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | PostGIS | - | Private host |
| `PGPORT_PRIVATE` | PostGIS | 5432 | Private port |
| `POSTGRES_PASSWORD` | PostGIS | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | PostGIS | - | Private database URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Tags:** api, no-code, analytics, data

[View on Railway →](https://railway.com/deploy/2fy758)
