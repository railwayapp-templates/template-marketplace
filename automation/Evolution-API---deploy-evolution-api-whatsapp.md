# Deploy Evolution API on Railway

Self-hosted WhatsApp API with manager UI, Postgres & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-evolution-api-whatsapp)

## About

Evolution API v2.3.7 is an open-source WhatsApp integration layer you can self-host. This Railway template pins the official image, wires Postgres and Redis, and exposes the manager at /manager. You get a multi-instance WhatsApp API with zero deploy-time input, ready for messages, webhooks, and integrations.

Evolution API is Node.js and TypeScript under an Apache-2.0 based license. It connects through Baileys, the free but unofficial WhatsApp Web protocol, or the official WhatsApp Business Cloud API. The Railway template runs evolution-api on port 8080, Postgres for persistence, and Redis for cache.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evolution-api | `evoapicloud/evolution-api:v2.3.7@sha256:1bd8afc4a6cf48822e6cf02469aeae7bd35a12a6b616eacd1291926307f4d339` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private host of Redis. |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | Redis user. |
| `REDIS_URL` | Redis | - | Private connection URL used by Evolution API. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated per deploy. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private connection URL used by Evolution API. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy. |
| `PORT` | evolution-api | 8080 | Port Railway routes to (8080). |
| `LANGUAGE` | evolution-api | en | Language for API messages. |
| `LOG_LEVEL` | evolution-api | ERROR,WARN,INFO | Log levels to print. |
| `SERVER_URL` | evolution-api | - | Public HTTPS URL of this service. |
| `LOG_BAILEYS` | evolution-api | error | Baileys library log level. |
| `SERVER_PORT` | evolution-api | 8080 | API listen port (8080). |
| `SERVER_TYPE` | evolution-api | http | Server protocol (http; Railway adds HTTPS). |
| `DEL_INSTANCE` | evolution-api | false | Minutes before deleting disconnected instances; false keeps them. |
| `QRCODE_LIMIT` | evolution-api | 30 | How many QR codes to generate before giving up. |
| `CACHE_REDIS_URI` | evolution-api | - | Redis connection from the Redis service. |
| `DATABASE_ENABLED` | evolution-api | true | Store data in Postgres. |
| `DATABASE_PROVIDER` | evolution-api | postgresql | Database type (postgresql). |
| `TELEMETRY_ENABLED` | evolution-api | false | Send telemetry; off. |
| `CACHE_LOCAL_ENABLED` | evolution-api | false | In-memory cache; off when Redis is used. |
| `CACHE_REDIS_ENABLED` | evolution-api | true | Use Redis as cache. |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) | Global API key; send as apikey header and use for /manager login. |
| `CACHE_REDIS_PREFIX_KEY` | evolution-api | evolution | Prefix for Redis keys. |
| `DATABASE_CONNECTION_URI` | evolution-api | - | Postgres connection from the Postgres service. |
| `DATABASE_SAVE_DATA_CHATS` | evolution-api | true | Save chats to Postgres. |
| `CONFIG_SESSION_PHONE_NAME` | evolution-api | Chrome | Browser name shown in WhatsApp Linked devices. |
| `DATABASE_SAVE_DATA_LABELS` | evolution-api | true | Save labels to Postgres. |
| `CACHE_REDIS_SAVE_INSTANCES` | evolution-api | false | Keep instance sessions in Redis. |
| `CONFIG_SESSION_PHONE_CLIENT` | evolution-api | Evolution API | Client name shown in WhatsApp Linked devices. |
| `DATABASE_SAVE_DATA_CONTACTS` | evolution-api | true | Save contacts to Postgres. |
| `DATABASE_SAVE_DATA_HISTORIC` | evolution-api | true | Save message history sync to Postgres. |
| `DATABASE_SAVE_DATA_INSTANCE` | evolution-api | true | Save instances to Postgres. |
| `DATABASE_SAVE_MESSAGE_UPDATE` | evolution-api | true | Save message status updates to Postgres. |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | evolution-api | true | Save new messages to Postgres. |
| `DATABASE_CONNECTION_CLIENT_NAME` | evolution-api | evolution_exchange | Client name that separates data per install. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/deploy-evolution-api-whatsapp)
