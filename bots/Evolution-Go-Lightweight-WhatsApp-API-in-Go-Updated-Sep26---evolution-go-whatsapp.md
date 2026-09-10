# Deploy Evolution Go — Lightweight WhatsApp API in Go [ Updated Sep'26 ] on Railway

Self-host Evolution Go — fast, low-resource WhatsApp REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-go-whatsapp)

## About

Evolution Go is a high-performance WhatsApp API built in Go — part of the Evolution ecosystem, rewritten for speed and a tiny footprint. Built on the whatsmeow library (native WhatsApp protocol, no headless browser), it sends and receives messages, manages groups, handles media, and streams events over webhooks, WebSocket, RabbitMQ, or NATS, all through a clean REST API with Swagger docs. This template deploys Evolution Go with a persistent volume and API-key authentication — a fast, resource-efficient WhatsApp REST backend, ideal when you want minimal RAM and cost over the full-featured Node stack.

---

Evolution Go trades the full Node feature set for speed and efficiency, and knowing what that means is the key — this template sets it up correctly.

**Go and whatsmeow — the performance story.** Where the original Evolution API is a Node/Baileys stack, Evolution Go is a compiled Go binary on the whatsmeow library, which speaks WhatsApp's native WebSocket protocol directly — no headless Chromium. The result is a tiny memory footprint, fast startup, and efficient concurrency, so it runs cheaply and scales well. The reason to choose Evolution Go: the same ecosystem, far lighter.

**Set the API key — the endpoints control WhatsApp.** Evolution Go's REST endpoints can read and send messages on connected accounts, so a public deployment must be authenticated. This template sets an `AUTHENTICATION_API_KEY` that every request presents, so only your applications can create instances and send messages. Keep it secret and rotate it if exposed.

**Persistence is optional — go even lighter, or add Postgres.** Evolution Go can run without a database for the leanest setup, or with PostgreSQL for durable message and instance storage. This template includes Postgres, and a volume holds WhatsApp session data so accounts stay linked across redeploys. For media, it supports MinIO or S3-compatible storage.

**Events your way — webhooks, WebSocket, and queues.** Beyond webhooks, Evolution Go delivers real-time message and status events over WebSocket, RabbitMQ/AMQP, or NATS, so it slots into event-driven and microservice architectures directly, not just simple webhook flows.

**Pair a device with a QR code, and pin the version.** Create an instance and Evolution Go generates a QR code to link a WhatsApp account. Use a dedicated number, warm it up, and keep outbound volume measured to protect the account, and explore every endpoint through the built-in Swagger UI. Evolution Go is the newer, Go-based ecosystem member and is actively developed, so pin the image version and check the repository for current environment variables before deploying and upgrading.

Typical cost: **~$5–10/month** on Railway — Evolution Go's Go footprint is genuinely light, often less than the Node stack for the same workload. It's open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Evolution Go | `evoapicloud/evolution-go` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Evolution Go | 8080 | PORT |
| `LOGTYPE` | Evolution Go | console | LOGTYPE |
| `WA_DEBUG` | Evolution Go | INFO | WA Debug |
| `SERVER_URL` | Evolution Go | - | SERVER URL |
| `CLIENT_NAME` | Evolution Go | - | CLIENT NAME |
| `SERVER_PORT` | Evolution Go | 8080 | SERVER PORT |
| `GLOBAL_API_KEY` | Evolution Go | (secret) | GLOBAL API KEY |
| `POSTGRES_AUTH_DB` | Evolution Go | - | POSTGRES AUTH DB |
| `POSTGRES_USERS_DB` | Evolution Go | - | POSTGRES USERS DB |
| `DATABASE_SAVE_MESSAGES` | Evolution Go | true | DATABASE SAVE MESSAGES |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-go-whatsapp)
