# Deploy WhatsMiau — Lightweight WhatsApp REST API (Go) on Railway

Self-host a lightweight Go WhatsApp REST API. Evolution-compatible routes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsmiau-whatsapp-api)

## About

WhatsMiau is a lightweight, self-hosted WhatsApp REST API built in Go with the Whatsmeow
library — connect a personal WhatsApp account over HTTP with no Meta Business API approval.
Send messages, manage groups, receive webhooks, and automate workflows through a clean REST
interface. Because it uses Whatsmeow's native WebSocket protocol instead of a headless browser,
it runs in a tiny footprint — no Chromium, low RAM, fast startup.

Its standout feature: **WhatsMiau is route-compatible with Evolution API**, so existing Evolution
integrations migrate with minimal changes. Self-host on Railway for ~$5–10/month flat — no
per-message fees, no per-conversation billing, and your instance data on infrastructure you own.

---

WhatsMiau needs three things to run in production: a PostgreSQL database for instances and data,
Redis for session storage and caching, and a persistent volume for WhatsApp auth state. The API
listens on port `8080` and exposes REST endpoints for creating instances, connecting via QR code,
sending messages, and configuring webhooks. Wiring that by hand on a VPS means Docker Compose,
a database, Redis, and volume management.

Railway provisions all of it — PostgreSQL, Redis, the app, and a persistent volume — over private
networking with automatic SSL and scaling. The Whatsmeow engine keeps the whole stack light: no
headless browser, so it uses a fraction of the RAM of Puppeteer-based WhatsApp APIs.

> **Account-safety note:** WhatsMiau connects a personal WhatsApp account through an unofficial
> API. WhatsApp/Meta detects and bans accounts that automate messaging or send bulk/unsolicited
> messages, and 2026 terms restrict unofficial API use. Use a dedicated number you can afford to
> lose, warm it up gradually, message only opted-in contacts, and respect rate limits. For
> officially sanctioned high-volume sending, use the WhatsApp Business API. This risk is inherent
> to all unofficial WhatsApp APIs, not specific to this template.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the API, PostgreSQL, and Redis.
WhatsMiau is open source — you pay only compute, with no per-message or per-conversation fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Whatsmiau | `impedr029/whatsmiau:v0.5.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `PORT` | Whatsmiau | 8080 | - |
| `API_KEY` | Whatsmiau | (secret) | - |
| `REDIS_TLS` | Whatsmiau | false | - |
| `DIALECT_DB` | Whatsmiau | postgres | - |
| `REDIS_PASSWORD` | Whatsmiau | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/whatsmiau-whatsapp-api)
