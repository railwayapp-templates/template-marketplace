# Deploy FastAPI with postgres on Railway

[Jul'26] Deploy a FastAPI starter backend with PostgreSQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-postgres-redis)

## About

FastAPI Starter with PostgreSQL and Redis is a ready-to-deploy backend template for building modern API services. It combines FastAPI as the application layer, PostgreSQL as the primary relational database, and Redis as the caching or temporary data layer.

This template provides a practical backend foundation for building API-based applications on Railway. FastAPI handles HTTP requests, routing, validation, and API responses. PostgreSQL stores persistent application data such as users, transactions, records, products, logs, or business entities. Redis improves performance by storing temporary data such as cache, sessions, rate-limit counters, background job states, or short-lived tokens.

Together, these three components create a clean and scalable backend stack. FastAPI serves the API, PostgreSQL keeps the main data reliable, and Redis reduces unnecessary database load for frequently accessed or temporary data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fastapi-postgresql | [codestorm-official/fastapi-postgresql](https://github.com/codestorm-official/fastapi-postgresql) | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | fastapi-postgresql | 8000 | - |
| `APP_NAME` | fastapi-postgresql | fastapi-pg-redis | - |
| `LOG_LEVEL` | fastapi-postgresql | INFO | - |
| `ENVIRONMENT` | fastapi-postgresql | development | - |
| `CACHE_TTL_SECONDS` | fastapi-postgresql | 60 | - |
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

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/fastapi-postgres-redis)
