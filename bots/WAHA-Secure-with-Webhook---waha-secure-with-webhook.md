# Deploy WAHA Secure with Webhook on Railway

Secure WAHA for Railway with API auth, storage, and webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha-secure-with-webhook)

## About

WAHA Secure with Webhook is a Railway-ready setup for WAHA, a self-hosted WhatsApp HTTP API. It combines API-key protection, protected dashboard and Swagger access, persistent storage for sessions and media, and webhook delivery for incoming events so your app can process WhatsApp activity in real time.

Hosting WAHA Secure with Webhook on Railway means deploying WAHA as a containerized service with environment-based configuration, secure credentials, and a persistent volume. WAHA sessions represent connected WhatsApp accounts, so storage matters if you want sessions and local media to survive restarts or redeploys. WAHA can send events such as message to your backend through webhooks, which makes it easier to build bots, alerts, and workflow automations without polling. Railway templates package that setup into a reusable deployment, while Railway volumes provide the persistence WAHA needs for session and media data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WAHA Secure with Webhook | `devlikeapro/waha:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WAHA_API_KEY` | (secret) | API key used to secure WAHA’s REST API. Clients must send it in the X-Api-Key header. WAHA accepts either a plain secret or a sha512:-prefixed hash, and the hash form is the recommended production setup. |
| `WAHA_BASE_URL` | - | Base URL used to build the media.url field in webhook events.  |
| `WAHA_HOOK_URL` | http://backend:8080/webhook | Webhook destination WAHA posts events to. The official docs document this setting as WHATSAPP_HOOK_URL; it defines where subscribed webhook events are delivered. |
| `WAHA_PRINT_QR` | False | Controls whether login QR codes are printed into the service logs. Set it to False to keep Railway logs cleaner. |
| `WAHA_LOG_LEVEL` | info | Controls log verbosity. Supported levels are error, warn, info, debug, and trace; WAHA docs warn against debug and trace in production because they generate excessive logs. |
| `WAHA_LOG_FORMAT` | JSON | Controls log output format. PRETTY is the default and is easier locally, while JSON is better for centralized log processing. |
| `WAHA_HOOK_EVENTS` | message | Comma-separated list of webhook events to send. message subscribes only to message events; WAHA docs warn that subscribing to * or all events can generate a large number of requests in production. |
| `WAHA_MEDIA_STORAGE` | LOCAL | Selects where incoming media files are stored. WAHA supports local file storage, S3 storage, and PostgreSQL-backed media storage. |
| `WHATSAPP_FILES_FOLDER` | /data/.media | Local directory where downloaded WhatsApp media files are stored. Persist this path on a volume if you want files to survive restarts and redeploys. |
| `WAHA_DASHBOARD_ENABLED` | True | Enables or disables the built-in WAHA dashboard login UI. This is separate from API-key auth. |
| `WHATSAPP_START_SESSION` | default | Session name, or comma-separated session names, that WAHA should auto-start on launch. |
| `WAHA_DASHBOARD_PASSWORD` | (secret) | Password for the WAHA dashboard login. Use a generated value instead of example/default credentials. |
| `WAHA_DASHBOARD_USERNAME` | (secret) | Username for the WAHA dashboard login. Use a generated value instead of example/default credentials. |
| `WHATSAPP_DEFAULT_ENGINE` | WEBJS | Default WhatsApp engine for sessions. Supported values are WEBJS, NOWEB, and GOWS; the documented default is WEBJS. |
| `WHATSAPP_FILES_LIFETIME` | 0 | Number of seconds media files are kept before cleanup. Set it to 0 to disable automatic deletion. |
| `WHATSAPP_SWAGGER_ENABLED` | True | Enables or disables the built-in Swagger UI. This protects the docs panel only and does not replace API-key auth. |
| `WAHA_LOCAL_STORE_BASE_DIR` | /data/.sessions | Base directory for local WAHA session storage. This is where session state is kept when using local storage, and persistent storage is required if you want sessions to survive redeploys without rescanning QR codes. |
| `WAHA_RESTART_ALL_SESSIONS` | True | Restarts saved/stopped sessions after container restart. WAHA’s docs describe this behavior under WHATSAPP_RESTART_ALL_SESSIONS; if your image supports the WAHA_ alias, the meaning is the same. |
| `WHATSAPP_SWAGGER_PASSWORD` | (secret) | Password for Swagger UI login. Use a generated value instead of example/default credentials. |
| `WHATSAPP_SWAGGER_USERNAME` | (secret) | Username for Swagger UI login. Use a generated value instead of example/default credentials. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/waha-secure-with-webhook)
