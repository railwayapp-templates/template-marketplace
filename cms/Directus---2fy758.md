# Deploy Directus on Railway

Turn any SQL database into an API. Optional S3 and WebSockets Included!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/2fy758)

## About

Directus is the world's first Open Data Platform for instantly turning any SQL database into an API with a beautiful CMS dashboard.

Directus enables you to design and build a REST + GraphQL API in minutes and enables anyone to author content, manage media, and visualize data. Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default. This is done so that there are no egress fees for the database. If you want to enable access from outside of the private network you can go to the databases settings page to enable TCP proxying and enter the internal port 5432. The TCP proxy can be again removed at any point to close off external access.

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
- **Healthcheck:** `/server/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Tags:** api, no-code, analytics, data

[View on Railway →](https://railway.com/template/2fy758)
