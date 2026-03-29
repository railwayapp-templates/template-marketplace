# Deploy Evolution API | Open Source Messaging Automation Platform on Railway

Self-host Evolution: Connect WhatsApp, Chatwoot, Typebot, Kafka & more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-evolution-api)

## About

Deploy Evolution API on Railway in under 60 seconds using a one-click template. Spin up a production-ready messaging backend with WhatsApp support, PostgreSQL persistence, Redis caching, and automatic SSL—no Docker setup required.

Evolution API is an open-source messaging automation platform that provides programmatic control over WhatsApp and other communication channels via a REST API. Built on top of libraries like Baileys and Whatsmeow, it enables developers to build scalable messaging workflows without relying entirely on Meta’s official Cloud API.

While WhatsApp is the primary channel, Evolution API is designed to work as an integration layer—connecting with tools like Chatwoot, Typebot, and AI platforms to create multi-channel communication systems.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Evolution API | `evoapicloud/evolution-api` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Evolution API | 8080 |
| `DATABASE_PROVIDER` | Evolution API | postgresql |
| `CACHE_REDIS_ENABLED` | Evolution API | true |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/self-host-evolution-api)
