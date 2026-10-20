# Deploy WAHA | WhatsApp HTTP API (GOWS Engine) for n8n, Chatwoot and Bots on Railway

WhatsApp HTTP API: GOWS engine, sessions survive redeploys, locked down

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/waha-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=waha-production)

[WAHA](https://github.com/devlikeapro/waha) (WhatsApp HTTP API) connects a WhatsApp number to a REST API. Scan a QR code once, then send and receive messages, media, reactions and group events from n8n, Chatwoot, Make, or your own code through HTTP calls and webhooks. This template runs the official WAHA Core image on the GOWS engine.

It's one service and a Railway volume.

- **GOWS engine, no browser.** WAHA's default engine (WEBJS) drives a headless Chrome. This template uses GOWS, WAHA's Go engine that speaks the WhatsApp protocol directly: a smaller image (770 MB instead of 1.1 GB), no Chromium processes, and about 250 MB of RAM in our tests.
- **Sessions survive redeploys.** The linked-device session and downloaded media are stored on the volume, so redeploys and image updates don't log your number out.
- **Locked from the first boot.** The API needs the generated `WAHA_API_KEY`, and the dashboard and Swagger docs need a generated password. Nothing is open by default.
- **Pinned version.** The template uses a specific WAHA release, not `latest`, so a redeploy never upgrades you by surprise.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WAHA | `devlikeapro/waha:gows-2026.9.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port Railway routes to - leave as is |
| `WAHA_API_KEY` | (secret) | API key - send it as the X-Api-Key header (also the key the dashboard asks for) |
| `WAHA_BASE_URL` | - | Public URL used in webhook media links |
| `WAHA_PRINT_QR` | False | Don't print QR codes into the logs |
| `WAHA_LOG_FORMAT` | JSON | Structured logs for Railway's log viewer |
| `UV_THREADPOOL_SIZE` | 16 | Node I/O threads (the image would size it from the host's 48 cores) |
| `WHATSAPP_FILES_FOLDER` | /app/data/media | Downloaded media on the volume |
| `WAHA_DASHBOARD_PASSWORD` | (secret) | Dashboard and Swagger password |
| `WAHA_DASHBOARD_USERNAME` | (secret) | Dashboard and Swagger login |
| `WHATSAPP_DEFAULT_ENGINE` | GOWS | GOWS = lightweight Go engine, no browser. WEBJS needs the Chrome image and far more RAM |
| `WAHA_LOCAL_STORE_BASE_DIR` | /app/data/sessions | WhatsApp sessions on the volume, so redeploys don't log you out |
| `WHATSAPP_SWAGGER_PASSWORD` | (secret) | Swagger password (same as the dashboard) |
| `WHATSAPP_SWAGGER_USERNAME` | (secret) | Swagger login (same as the dashboard) |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/waha-production)
