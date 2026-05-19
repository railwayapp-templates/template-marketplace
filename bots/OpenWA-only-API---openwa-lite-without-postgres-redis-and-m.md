# Deploy OpenWA (only API) on Railway

Deploy OpenWA on Railway. WhatsApp REST API. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwa-lite-without-postgres-redis-and-m)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/YZhYHa?referralCode=9uHSFr&utm_medium=integration&utm_source=template&utm_campaign=generic)

OpenWA is an open-source WhatsApp automation platform built on top of WhatsApp Web. Connect personal or business WhatsApp accounts through a REST API to send messages, manage chats, receive webhooks, and automate workflows without requiring Meta Business API approval.

Hosting OpenWA on Railway requires a persistent volume to store WhatsApp authentication sessions, media, plugins, and SQLite database files. The API runs on port `2785` and exposes REST endpoints for session management, messaging, automation, and webhook integrations.

This template uses the prebuilt Docker image:
```txt
ghcr.io/rmyndharis/openwa:latest
```

Railway provisions networking, SSL, deployments, and persistent storage automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenWA API | `ghcr.io/rmyndharis/openwa:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 2785 |
| `NODE_ENV` | production |
| `LOG_LEVEL` | info |
| `ENGINE_TYPE` | whatsapp-web.js |
| `PLUGINS_DIR` | /app/data/plugins |
| `STORAGE_TYPE` | local |
| `DATABASE_NAME` | /app/data/openwa.sqlite |
| `DATABASE_TYPE` | sqlite |
| `REDIS_ENABLED` | false |
| `PUPPETEER_ARGS` | --no-sandbox,--disable-setuid-sandbox,--disable-dev-shm-usage,--disable-gpu |
| `RATE_LIMIT_MAX` | 100 |
| `RATE_LIMIT_TTL` | 60 |
| `PLUGINS_ENABLED` | true |
| `WEBHOOK_TIMEOUT` | 10000 |
| `SESSION_DATA_PATH` | /app/data/sessions |
| `PUPPETEER_HEADLESS` | true |
| `STORAGE_LOCAL_PATH` | /app/data/media |
| `WEBHOOK_MAX_RETRIES` | 3 |
| `WEBHOOK_RETRY_DELAY` | 5000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/openwa-lite-without-postgres-redis-and-m)
