# Deploy Evolution API — WhatsApp REST API on Railway

The Most Powerful WhatsApp REST API. Self-Hosted. Scalable. Reliable.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-by-evoapicloud)

## About

Evolution API is a self-hosted REST API for WhatsApp and multi-channel messaging. It supports WhatsApp Web through Baileys as well as the official WhatsApp Cloud API, while providing integrations with tools such as Typebot, Chatwoot, Dify, OpenAI, Kafka, RabbitMQ, S3-compatible storage, and more.

This template deploys a complete Evolution API stack with **PostgreSQL**, **Redis**, and persistent instance storage.

Evolution API exposes a REST API for creating and managing WhatsApp instances, sending and receiving messages, handling contacts, groups, webhooks, and integrations.

PostgreSQL stores persistent application and messaging data, while Redis provides caching and instance-related runtime data. A dedicated persistent volume mounted at `/evolution/instances` keeps Evolution API instance files available across restarts and redeployments.

The official Evolution API Docker Compose configuration uses the same core architecture: Evolution API, Redis, PostgreSQL, and persistent instance storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Evolution | `evoapicloud/evolution-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Redis private hostname within Railway |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Default Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias for the generated Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Evolution | 8080 | Railway public service port |
| `SERVER_URL` | Evolution | - | Public URL used by Evolution API |
| `SERVER_PORT` | Evolution | 8080 | Internal Evolution API server port |
| `CACHE_REDIS_URI` | Evolution | - | Redis connection URI |
| `DATABASE_PROVIDER` | Evolution | postgresql | Database engine used by Evolution API |
| `CACHE_LOCAL_ENABLED` | Evolution | false | Disable local in-memory cache |
| `CACHE_REDIS_ENABLED` | Evolution | true | Enable Redis cache |
| `AUTHENTICATION_API_KEY` | Evolution | (secret) | Global API key used in the apikey request header |
| `CACHE_REDIS_PREFIX_KEY` | Evolution | evolution | Prefix used for Redis keys |
| `DATABASE_CONNECTION_URI` | Evolution | - | PostgreSQL connection URI |
| `DATABASE_SAVE_DATA_CHATS` | Evolution | true | Persist chat data |
| `CACHE_REDIS_SAVE_INSTANCES` | Evolution | false | Do not persist instance data directly in Redis |
| `DATABASE_SAVE_DATA_CONTACTS` | Evolution | true | Persist WhatsApp contacts |
| `DATABASE_SAVE_DATA_HISTORIC` | Evolution | true | Persist historical messaging data |
| `DATABASE_SAVE_DATA_INSTANCE` | Evolution | true | Persist instance data |
| `DATABASE_SAVE_MESSAGE_UPDATE` | Evolution | true | Persist message status and update events |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | Evolution | true | Persist new incoming/outgoing messages |
| `DATABASE_CONNECTION_CLIENT_NAME` | Evolution | evolution | PostgreSQL client/application identifier |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-by-evoapicloud)
