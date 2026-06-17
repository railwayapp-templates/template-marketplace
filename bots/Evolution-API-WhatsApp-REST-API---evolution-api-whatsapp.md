# Deploy Evolution API — WhatsApp REST API on Railway

WhatsApp REST API — no Meta approval, no per-message fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-whatsapp)

## About

Evolution API is an open-source WhatsApp REST API with **8.7k+ GitHub stars** — built on Baileys and Whatsmeow, it gives developers programmatic control of WhatsApp accounts through a RESTful interface without requiring Meta's Business API approval. Send messages, manage groups, receive webhooks, and connect AI agents — all through a self-hosted backend you fully control.

---

Running Evolution API in production requires PostgreSQL for session state, Redis for caching, and a persistent volume at `/evolution/instances` for WhatsApp authentication data. Without a managed host, you're configuring Docker Compose, inter-service networking, SSL, volume mounts, and database backups manually.

Railway handles all of it. Sessions persist in PostgreSQL — instances reconnect after restarts without re-scanning the QR code.

Typical cost: **~$5–10/month** on Railway's Hobby plan for all three services. No per-message fees. Twilio WhatsApp charges $0.005–$0.085 per message — at 10,000 messages/month that's $50–$850 in API costs alone.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Evolution API | `evoapicloud/evolution-api:v2.3.7` | Web service |

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
| `PORT` | Evolution API | 8080 | Port |
| `SERVER_URL` | Evolution API | - | Server URL |
| `CACHE_REDIS_URI` | Evolution API | - | Redis connection URI |
| `DATABASE_PROVIDER` | Evolution API | postgresql | Database provider |
| `CACHE_REDIS_ENABLED` | Evolution API | true | Redis cache enabled |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | Required: API key for authentication (use in header: apikey) |
| `DATABASE_CONNECTION_URI` | Evolution API | - | Database connection URI |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-whatsapp)
