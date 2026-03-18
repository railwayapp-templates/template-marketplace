# Deploy Evolution API - Open-Source WhatsApp Business Automation on Railway

Self-host Evolution: open-source WhatsApp Business API with full control

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-whatsapp-automation)

## About

Deploy Evolution API on Railway in under 60 seconds with this one-click template. Get a production-ready WhatsApp Business API with PostgreSQL persistence, Redis caching, and automatic SSL certificates—no Docker knowledge required.

Evolution API is an open-source WhatsApp Business API that enables programmatic control of WhatsApp accounts through a RESTful interface. Built on the Baileys and Whatsmeow libraries, it provides enterprise-grade messaging automation without the complexity of Meta's official Cloud API.

**Key features:**

- **Multi-instance management**: Run multiple WhatsApp accounts from a single deployment
- **QR code authentication**: Connect accounts via web-based QR scanning
- **Webhook support**: Real-time message events for chatbot integration
- **Media handling**: Send/receive images, videos, documents, and audio
- **Group management**: Create groups, add/remove participants programmatically
- **Message scheduling**: Queue messages for delayed delivery
- **PostgreSQL persistence**: Store messages, contacts, and instance data
- **Redis caching**: Improve performance for high-volume messaging

This template deploys Evolution API (`evoapicloud/evolution-api`) with PostgreSQL 17 and Redis 8.2.1, fully configured with private networking between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| evolution-api | `evoapicloud/evolution-api` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | evolution-api | 8080 |
| `DATABASE_PROVIDER` | evolution-api | postgresql |
| `CACHE_REDIS_ENABLED` | evolution-api | true |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-whatsapp-automation)
