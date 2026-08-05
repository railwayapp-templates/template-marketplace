# Deploy Velix API — Self-Hosted WhatsApp REST API on Railway

Self-host a WhatsApp API — multi-number, webhooks & native n8n node

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/velix-whatsapp-api)

## About

Velix API is a self-hosted WhatsApp REST API built in Go — connect multiple WhatsApp numbers, send and receive messages over a clean REST interface, get real-time webhooks, and wire it into automations with a native n8n node and built-in Chatwoot integration. Because it's a single compiled Go binary, it's light on resources and fast to start. This template deploys it with PostgreSQL pre-wired, so you have a working WhatsApp automation backend on your own infrastructure in minutes.
---

Velix is a lean, automation-focused WhatsApp gateway, and a few things are worth understanding before you connect your first number.

**It's a lightweight Go binary — low RAM, fast start.** Velix compiles to a single binary, so it uses far less memory than browser-based WhatsApp APIs. That makes it inexpensive to run on Railway and well suited to hosting several instances without a heavy resource footprint.

**Multi-instance from one deployment.** Velix manages multiple WhatsApp numbers from a single service — each number is an instance you connect by scanning its QR code, then address independently through the REST API. One deployment can back several numbers for different projects or clients.

**Native n8n node and Chatwoot integration.** Velix ships a purpose-built n8n community node, so wiring WhatsApp into automation flows doesn't require hand-built HTTP calls — you drop the node in and connect. The built-in Chatwoot integration turns it into a live customer-support channel. This automation-first design is Velix's distinguishing feature. Incoming messages and status updates are pushed to a webhook URL you configure, so your app reacts in real time.

**Set the connection and data variables — verify names against the repo.** Velix uses PostgreSQL via a `DATABASE_URL` connection string (wired here), a public URL for webhooks and QR pairing, and an API key or token to secure the REST API. Because Velix is an early-stage project, confirm the exact environment-variable names against the current repository before publishing, as they may evolve between versions.

**Understand the unofficial-API trade-off.** Like Evolution API and Baileys, Velix connects through the WhatsApp Web protocol rather than Meta's official Cloud API. This is powerful and flexible, but WhatsApp can restrict numbers that send at high volume or cold-message strangers. Warm up new numbers, rate-limit sends, and avoid mass-messaging people who haven't contacted you. For regulated or large-scale commercial messaging, Meta's official Cloud API is the compliant choice.

Typical cost: **~$5–10/month** on Railway for the app and PostgreSQL — low, thanks to the lightweight Go binary. Velix is open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| velix-api | `ghcr.io/paulolinder/velix-api` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | velix-api | 8080 | - |
| `APP_ENV` | velix-api | production | - |
| `HTTP_PORT` | velix-api | 8080 | - |
| `LOG_LEVEL` | velix-api | info | - |
| `JWT_SECRET` | velix-api | (secret) | - |
| `ENGINE_STORE_PATH` | velix-api | /data/instances | - |
| `MEDIA_STORAGE_PATH` | velix-api | /data/media | - |
| `ENGINE_MAX_INSTANCES` | velix-api | 200 | - |
| `REGISTRATION_ENABLED` | velix-api | false | - |
| `ENGINE_AUTO_RECONNECT` | velix-api | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/velix-whatsapp-api)
