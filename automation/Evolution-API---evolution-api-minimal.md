# Deploy Evolution API on Railway

Low-cost WhatsApp HTTP REST API with PostgreSQL and Redis. It works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-minimal)

## About

Evolution API — Minimal Instance is a simple, low-cost Evolution API deployment template for Railway. It includes the core services needed to run Evolution API with PostgreSQL, Redis, and persistent volume storage, giving you a lightweight WhatsApp automation backend that is easy to deploy, manage, and scale without complex server configuration.

![Imgur](https://imgur.com/CnEqhtC.png)

Hosting Evolution API — Minimal Instance on Railway gives you a fast way to run Evolution API with the required supporting services already connected. PostgreSQL stores application data such as instances, messages, contacts, and session-related information, while Redis provides caching for better performance and reliability. Railway handles the infrastructure layer, including service deployment, networking, environment variables, public domain setup, and persistent storage.

This template is designed for users who want the cheapest and simplest way to deploy Evolution API while still keeping the important production dependencies in place. Once deployed, you can access the API, open the manager, connect WhatsApp instances, and start building automation workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evolution-api | `evoapicloud/evolution-api:latest` | Web service |

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
| `PORT` | evolution-api | 8080 | - |
| `DATABASE_PROVIDER` | evolution-api | postgresql | - |
| `CACHE_REDIS_ENABLED` | evolution-api | true | - |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-minimal)
