# Deploy New API on Railway

OpenAI-compatible API gateway for multiple LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/new-api)

## About

New API is an open-source AI gateway that fronts multiple model providers with one OpenAI-compatible API. It handles routing, tokens, quotas, and provider aggregation.

This template runs `calciumion/new-api:latest` on port 8080, plus Postgres 18 and Redis 8.2.1 on Railway's private network. The app takes `SQL_DSN` from Postgres and `REDIS_CONN_STRING` from Redis. Postgres and Redis keep data on volumes. Timezone defaults to `Asia/Shanghai`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| New API Frontend | `calciumion/new-api:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | New API Frontend | Asia/Shanghai | - |
| `SQL_DSN` | New API Frontend | - | Your PG url |
| `ERROR_LOG_ENABLED` | New API Frontend | true | - |
| `REDIS_CONN_STRING` | New API Frontend | - | Your redis internal url |
| `BATCH_UPDATE_ENABLED` | New API Frontend | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/new-api)
