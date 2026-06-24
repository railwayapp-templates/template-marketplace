# Deploy WAHA — Self-Hosted WhatsApp REST API on Railway

WhatsApp HTTP API. No per-message fees. Replaces Twilio.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha-api)

## About

With **6,600+ GitHub stars** and 1,500+ forks, WAHA (WhatsApp HTTP API) is the most-deployed open-source REST API for WhatsApp automation. Run it on Railway for under $5/month — compared to Twilio's $0.005 per message plus Meta template fees that scale to hundreds of dollars at volume.

&gt; **Important:** WAHA runs on top of WhatsApp Web and is not affiliated with or endorsed by WhatsApp/Meta. WhatsApp does not permit unofficial clients. Use at your own risk; accounts can be restricted. For business-critical workloads, consider the official [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp).

Hosted WhatsApp API providers charge per message or per session. Twilio's WhatsApp integration starts at **$0.005 per message** (plus Meta's per-template fee of up to $0.0499 per message) — a single campaign to 10,000 contacts can cost $500+ in API fees alone. WAHA is free and open source with no message limits, no per-session fees, and no license expiration.

Railway runs WAHA as a persistent Docker container with automatic restarts, environment variable management, and a generated HTTPS domain — no VPS configuration, no Nginx setup required.

Estimated Railway cost: **$2–$5/month** on the Starter plan for a single WhatsApp session.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WAHA | `devlikeapro/waha` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WAHA_API_KEY` | (secret) |
| `WAHA_PRINT_QR` | False |
| `WAHA_LOG_LEVEL` | info |
| `WAHA_LOG_FORMAT` | JSON |
| `WAHA_MEDIA_STORAGE` | LOCAL |
| `WHATSAPP_FILES_FOLDER` | /app/.media |
| `WAHA_DASHBOARD_ENABLED` | True |
| `WHATSAPP_START_SESSION` | default |
| `WAHA_DASHBOARD_PASSWORD` | (secret) |
| `WAHA_DASHBOARD_USERNAME` | (secret) |
| `WHATSAPP_DEFAULT_ENGINE` | WEBJS |
| `WHATSAPP_FILES_LIFETIME` | 0 |
| `WHATSAPP_SWAGGER_ENABLED` | True |
| `WAHA_LOCAL_STORE_BASE_DIR` | /local/.sessions |
| `WAHA_RESTART_ALL_SESSIONS` | True |
| `WHATSAPP_SWAGGER_PASSWORD` | (secret) |
| `WHATSAPP_SWAGGER_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/local`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/waha-api)
