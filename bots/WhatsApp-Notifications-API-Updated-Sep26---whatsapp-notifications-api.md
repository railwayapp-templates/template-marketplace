# Deploy WhatsApp Notifications API [Updated Sep'26] on Railway

Self-host WhatsApp order alerts, reminders & OTPs — no Meta approval

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-notifications-api)

## About

Evolution API turns any WhatsApp number into a programmable notifications channel — send order updates, appointment reminders, alerts, OTPs, and broadcasts to your customers over a simple REST API, with no Meta Business approval and no per-message fees. Built on the Baileys library, it connects a real WhatsApp account over HTTP so your app, backend, or automation fires a message with a single API call. This template deploys Evolution API with PostgreSQL, Redis, and persistent session storage pre-wired and API-key authentication enabled — so you're sending programmatic WhatsApp notifications in minutes.

---

Evolution API is a capable messaging backend, and a few specifics make it a secure, reliable notifications channel — all handled here.

**Send a notification with a single API call.** The core workflow is simple: POST to Evolution API with a number and a message, and it delivers over WhatsApp. Fire order confirmations from your e-commerce backend, appointment reminders from your booking system, alerts from your monitoring stack, or OTPs from your auth flow — any system that can make an HTTP request can send a WhatsApp message, with no SDK required.

**API-key authentication from boot — don't run it open.** Evolution API's endpoints control a WhatsApp account that can send messages to your customers, so an unauthenticated deployment is a real risk. This template sets a strong `AUTHENTICATION_API_KEY` that every request must present in the `apikey` header, so only your systems can send messages. Keep it secret and rotate it if exposed.

**No Meta approval, no per-message fees — and mind account limits.** Because it uses Baileys (a WhatsApp Web connection), Evolution API needs no Meta Business approval and charges nothing per message — a major saving over official providers at notification volume. In return, respect WhatsApp's usage limits: use a dedicated business number (not personal), warm it up gradually, keep content transactional and expected, and pace sending, since aggressive blasting to unengaged numbers risks the account.

**Delivery events over webhooks, on a reliable stack.** Configure a webhook URL and Evolution API streams sent, delivered, and read receipts plus inbound replies in real time, so your system can track notification delivery and handle responses — the basis for two-way flows. This template wires PostgreSQL for durable message and contact history and Redis for instance state, the combination that keeps one or many instances sending reliably. `SERVER_URL` is set to your Railway domain so webhooks and media resolve, and both databases persist across redeploys.

Typical cost: **~$10–15/month** on Railway for the gateway, Postgres, and Redis — flat, regardless of how many notifications you send, versus per-message pricing that scales with volume. Evolution API is free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Evolution API | `evoapicloud/evolution-api:v2.3.7` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Evolution API | 8080 | PORT |
| `SERVER_URL` | Evolution API | - | SERVER URL |
| `CACHE_REDIS_URI` | Evolution API | - | Redis connection URI |
| `DATABASE_PROVIDER` | Evolution API | postgresql | Database provider |
| `CACHE_REDIS_ENABLED` | Evolution API | true | Redis cache enabled |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | Required: API key for authentication (use in header: apikey) |
| `DATABASE_CONNECTION_URI` | Evolution API | - | Database connection URI |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/whatsapp-notifications-api)
