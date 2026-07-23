# Deploy Evolution API [Updated Jul '26] on Railway

Evolution API [Jul '26] (WhatsApp REST API, No Meta Approval) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-updated-jul-26)

## About

Evolution API is an open-source WhatsApp REST API built on the Baileys library. It connects a real WhatsApp number over HTTP - no Meta Business API approval, no per-conversation fees, no waitlist. This template deploys the API with Postgres, Redis, and persistent session storage pre-wired, so you're sending your first message in minutes.

Meta's official WhatsApp Business API requires business verification, a message template review process, and per-conversation pricing that adds up fast once you're past a few hundred chats a month. Evolution API skips all of that: it connects like a regular WhatsApp Web session, authenticated by scanning a QR code, then exposes that connection as a normal REST API. You get `POST /message/sendText`, webhook events for incoming messages, group management endpoints, and multi-instance support for running several numbers from one server. This template runs it self-hosted on Railway, so your message history, contacts, and API keys never touch a third party's infrastructure. Postgres persists everything; Redis handles caching and session state; a Railway Volume keeps your WhatsApp auth data alive across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| evolution-api-railway | [shruti060701/evolution-api-railway](https://github.com/shruti060701/evolution-api-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup (same value as `PGDATABASE`) |
| `DATABASE_URL` | Postgres | - | The primary database connection string, over Railway's private network. Auto-set. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the Postgres superuser. Auto-generated. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public database connection string for external access outside Railway. Auto-set. |
| `REDISHOST` | Redis | - | Public Redis connection string for external access outside Railway. Auto-set. |
| `REDISPORT` | Redis | 6379 | Port the Redis service listens on. |
| `REDISUSER` | Redis | default | Username for connecting to Redis. |
| `REDIS_URL` | Redis | - | Redis connection string over Railway's private network. Auto-set. Used by `CACHE_REDIS_URI` on the app service. |
| `REDISPASSWORD` | Redis | (secret) | Password for connecting to Redis. Auto-generated. |
| `REDIS_PASSWORD` | Redis | (secret) | Password for connecting to Redis. Auto-generated. |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection string for external access outside Railway. Auto-set. |
| `LANGUAGE` | evolution-api-railway | en | Default language for instance-facing messages. |
| `SERVER_URL` | evolution-api-railway | - | Public URL for webhook callbacks and QR metadata. |
| `CACHE_REDIS_URI` | evolution-api-railway | - | Redis connection string. Auto-set from the Redis service. |
| `DATABASE_PROVIDER` | evolution-api-railway | postgresql | Database driver Evolution API uses. |
| `CACHE_REDIS_ENABLED` | evolution-api-railway | true | Enables Redis caching for connection state. |
| `AUTHENTICATION_API_KEY` | evolution-api-railway | (secret) | Global API key required in the `apikey` header on every request. Auto-generated. |
| `DATABASE_CONNECTION_URI` | evolution-api-railway | - | Postgres connection string. Auto-set from the Postgres service. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Bots · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/evolution-api-updated-jul-26)
