# Deploy Sub2API on Railway

AI API Gateway for quota management and multi-provider routing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sub2api)

## About

Sub2API is a self-hosted AI API Gateway platform designed for quota management, user control, and multi-provider routing. It helps manage API keys, distribute quotas, and control access across multiple AI providers.

![Sub2API](https://opengraph.githubassets.com/4a3fa291732195ae8467266dd5a49902a29d66a2efa92dcdd854c9c7a7e035f3/Wei-Shaw/sub2api)

This template deploys Sub2API with PostgreSQL for data persistence and Redis for job queuing and caching. It is configured for simple deployment where users only need to set an admin password via the `ADMIN_PASSWORD` environment variable before deploying. The template includes all necessary services (PostgreSQL + Redis) and is designed to be production-ready with minimal configuration. Railway handles infrastructure, HTTPS, scaling, and monitoring automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Sub2API | `ghcr.io/wei-shaw/sub2api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
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
| `TZ` | Sub2API | UTC | - |
| `GIN_MODE` | Sub2API | release | - |
| `SERVER_PORT` | Sub2API | 8080 | - |
| `ADMIN_PASSWORD` | Sub2API | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sub2api)
