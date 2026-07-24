# Deploy Whatsapp API on Railway

One Click Self-Host Evolution API(WhatsApp REST API) on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp)

## About

Evolution API is an open-source WhatsApp REST API built on Baileys that enables applications to connect personal WhatsApp accounts through HTTP endpoints. It provides APIs for sending messages, receiving webhooks, managing contacts and groups, and automating WhatsApp workflows without requiring Meta's WhatsApp Business API approval process.

Hosting Evolution API on Railway provides a production-ready environment for running your own WhatsApp automation backend. This template deploys Evolution API alongside PostgreSQL for persistent storage and Redis for session management and caching. A Railway Volume stores WhatsApp authentication sessions so connected accounts remain authenticated across redeployments. Railway automatically provisions HTTPS, private networking, and environment variable management, allowing the API to securely communicate with PostgreSQL and Redis. As your messaging workload grows, Railway makes it easy to scale compute resources while continuing to manage infrastructure and networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Latest Evolution API | `evoapicloud/evolution-api:v2.3.7` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Latest Evolution API | 8080 | Run at Port |
| `SERVER_URL` | Latest Evolution API | - | Server URL |
| `CACHE_REDIS_URI` | Latest Evolution API | - | Redis connection URI |
| `DATABASE_PROVIDER` | Latest Evolution API | postgresql | Database providers |
| `CACHE_REDIS_ENABLED` | Latest Evolution API | true | Redis cache enable |
| `AUTHENTICATION_API_KEY` | Latest Evolution API | (secret) | Required: API key for authentication (use in header: apikey) |
| `DATABASE_CONNECTION_URI` | Latest Evolution API | - | Database connection URI |
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

[View on Railway →](https://railway.com/deploy/whatsapp)
