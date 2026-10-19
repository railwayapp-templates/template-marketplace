# Deploy Evolution API Messaging Starter on Railway

Messaging integration API with Postgres, private Redis and generated auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-messaging-starter)

## About

Messaging integration API with Postgres, private Redis and generated auth.

This deployment fork provisions Evolution API, Redis, Postgres. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:87184beace8ec657a760401a466a13c5b689066b31b77993103b4771933a9d31` | Database |
| Evolution API | `evoapicloud/evolution-api@sha256:966625532d9076a2381e973a271307d107e6f070450de3abeeea8bd18be07252` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Evolution API | 8080 | Port |
| `SERVER_URL` | Evolution API | - | Server URL |
| `CACHE_REDIS_URI` | Evolution API | - | Redis connection URI |
| `DATABASE_PROVIDER` | Evolution API | postgresql | Database provider |
| `CACHE_REDIS_ENABLED` | Evolution API | true | Redis cache enabled |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | Required: API key for authentication (use in header: apikey) |
| `DATABASE_CONNECTION_URI` | Evolution API | - | Database connection URI |

## Configuration

- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-messaging-starter)
