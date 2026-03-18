# Deploy Evolution API on Railway

Deploy Evolution API on Railway. WhatsApp REST API. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-4)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vArFEN?referralCode=9uHSFr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Evolution API is an open-source WhatsApp REST API built on Baileys. Connect a personal WhatsApp account via HTTP endpoints without Meta's Business API approval. Send messages, manage groups, receive webhooks, and automate workflows—all through a simple REST interface.

Hosting Evolution API requires a PostgreSQL database for persistence (instances, messages, contacts, chats), Redis for cache and session management, and a persistent volume for WhatsApp instance authentication data. The API listens on port 8080 and exposes REST endpoints for instance creation, QR code connection, messaging, and webhook configuration. Railway provisions all services and handles networking, SSL, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Evolution API | `evoapicloud/evolution-api:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Evolution API | 8080 | Port |
| `SERVER_URL` | Evolution API | - | Server URL |
| `CACHE_REDIS_URI` | Evolution API | - | Redis connection URI |
| `DATABASE_PROVIDER` | Evolution API | postgresql | Database provider |
| `CACHE_REDIS_ENABLED` | Evolution API | true | Redis cache enabled |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | Required: API key for authentication (use in header: apikey) |
| `DATABASE_CONNECTION_URI` | Evolution API | - | Database connection URI |
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

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-4)
