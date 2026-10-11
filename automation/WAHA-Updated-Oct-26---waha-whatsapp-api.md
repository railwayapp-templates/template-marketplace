# Deploy WAHA [Updated Oct '26] on Railway

WhatsApp HTTP API. No per-message fees. Sessions survive redeploys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha-whatsapp-api)

## About

[WAHA](https://github.com/devlikeapro/waha) (WhatsApp HTTP API) turns WhatsApp into a REST API — send and receive messages, manage groups and contacts, wire up webhooks, run multiple sessions — without per-message fees or Meta Business approval. It's Apache-2.0, actively maintained, and has over 7,500 GitHub stars. This template deploys the official `devlikeapro/waha` image directly and fixes two real bugs found in Railway's own official WAHA template: a session-restart variable that doesn't exist in WAHA's codebase, and a healthcheck path that would 401 on every single probe.

This template runs `devlikeapro/waha` unmodified — no Dockerfile, no forked code, no custom start command. Everything this template adds is configuration: a pinned port that matches the domain's target port, a healthcheck path that's actually reachable without authentication, and the correct variable name for automatic session recovery after a redeploy.

Those sound like small details, but they're the difference between a template that *looks* configured and one that's actually been checked against the app's real behavior. Railway's reference `waha-api` template sets `WAHA_RESTART_ALL_SESSIONS=True` — a variable that doesn't exist anywhere in WAHA's source. It's silently ignored, which means a redeploy drops your WhatsApp session and nobody's told. This template uses the real variable, `WHATSAPP_RESTART_ALL_SESSIONS`, confirmed against WAHA's `config.service.ts` and verified live in deploy logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WAHA | `devlikeapro/waha` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the WAHA server listens on. Pinned to match the domain's target port — do not remove. |
| `WAHA_API_KEY` | (secret) | API key required on every /api/* and /health request, as the x-api-key header. |
| `WAHA_BASE_URL` | - | Internal base URL WAHA uses to build links (e.g. media URLs) within Railway's private network. |
| `WAHA_PRINT_QR` | False | Whether to also print the session login QR code to the logs (use the dashboard instead). |
| `WAHA_LOG_LEVEL` | info | Log verbosity. |
| `WAHA_LOG_FORMAT` | JSON | Log output format. |
| `WAHA_PUBLIC_URL` | - | Public base URL used for externally-reachable links. |
| `WAHA_MEDIA_STORAGE` | LOCAL | Where received media is stored (LOCAL, S3, or POSTGRESQL). |
| `WHATSAPP_FILES_FOLDER` | /app/.media | Scratch folder used for media conversion (voice/video). |
| `WAHA_DASHBOARD_ENABLED` | True | Enables the web dashboard at /dashboard for QR-code session login. |
| `WHATSAPP_START_SESSION` | default | Name of the WhatsApp session auto-started on boot. |
| `WAHA_DASHBOARD_PASSWORD` | (secret) | Basic-auth password for the dashboard. |
| `WAHA_DASHBOARD_USERNAME` | (secret) | Basic-auth username for the dashboard. |
| `WHATSAPP_DEFAULT_ENGINE` | WEBJS | WhatsApp engine to use. WEBJS (headless Chromium) is the default; switch to NOWEB for a lighter, browser-free engine on memory-constrained plans. |
| `WHATSAPP_FILES_LIFETIME` | 0 | Seconds before converted media files are deleted; 0 disables auto-deletion. |
| `WHATSAPP_SWAGGER_ENABLED` | True | Enables Swagger UI at /. |
| `WAHA_LOCAL_STORE_BASE_DIR` | /local/.sessions | Path on the volume where WhatsApp session data is persisted. Must stay under /local. |
| `WHATSAPP_SWAGGER_PASSWORD` | (secret) | Basic-auth password for Swagger UI. |
| `WHATSAPP_SWAGGER_USERNAME` | (secret) | Basic-auth username for Swagger UI. |
| `WHATSAPP_RESTART_ALL_SESSIONS` | True | This is the fixed variable name (the reference template uses the dead WAHA_RESTART_ALL_SESSIONS, which the app never reads). Automatically restarts stopped WhatsApp sessions after every redeploy. |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/local`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/waha-whatsapp-api)
