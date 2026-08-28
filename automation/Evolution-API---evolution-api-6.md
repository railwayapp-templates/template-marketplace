# Deploy Evolution API on Railway

Deploy Evolution API on Railway. WhatsApp REST API. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-6)

## About

Evolution API is an open-source WhatsApp REST API built on Baileys. Connect a personal WhatsApp account via HTTP endpoints without Meta's Business API approval. Send messages, manage groups, receive webhooks, and automate workflows—all through a simple REST interface.

Hosting Evolution API requires a PostgreSQL database for persistence (instances, messages, contacts, chats), Redis for cache and session management, and a persistent volume for WhatsApp instance authentication data. The API listens on port 8080 and exposes REST endpoints for instance creation, QR code connection, messaging, and webhook configuration. Railway provisions all services and handles networking, SSL, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evolution_api | `evoapicloud/evolution-api:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | The host of Redis |
| `REDISPORT` | Redis | 6379 | The port which Redis is running against |
| `REDISUSER` | Redis | default | The Redis user |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | The password of Redis cluster |
| `REDIS_PASSWORD` | Redis | (secret) | The password secret generated  |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `SERVER_URL` | evolution_api | - | URL of Evolution API |
| `CACHE_REDIS_URI` | evolution_api | - | URI of Redis |
| `DATABASE_PROVIDER` | evolution_api | postgres | The name of the postgres database |
| `CACHE_REDIS_ENABLED` | evolution_api | true | Flag to enable redis usage |
| `AUTHENTICATION_API_KEY` | evolution_api | (secret) | Secret to authenticate in the API |
| `DATABASE_CONNECTION_URI` | evolution_api | - | URI of database |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-6)
