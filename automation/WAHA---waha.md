# Deploy WAHA on Railway

Deploy WAHA: WhatsApp HTTP API with dashboard and Swagger UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha)

## About

What is WAHA?

WAHA (WhatsApp HTTP API) is a lightweight automation layer for WhatsApp Web that provides a REST and WebSocket API to send/receive messages, manage sessions, and integrate chatbots or workflows. It exposes a dashboard and API endpoints for programmatic control of WhatsApp instances.

Hosting WAHA means running the WAHA service (a Node.js-based WebJS engine) on a platform like Railway, managing its persistent session storage and media, and securing access with API keys or credentials. Typical hosting tasks include provisioning a runtime (Node.js), attaching storage or a database for session and media files, setting environment variables (API keys, base URL), and configuring any reverse proxy or custom domain. Railway simplifies this by providing environment variable management, an easy deployment workflow, and built-in scaling options.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| devlikeapro/waha | `devlikeapro/waha` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WAHA_API_KEY` | (secret) | **Primary API key** used to authenticate API calls to WAHA. It’s auto-generated using Railway’s `secret()` function for uniqueness and security. |
| `WAHA_BASE_URL` | - | Base URL of your deployed WAHA instance. It’s automatically set to use your Railway private domain. |
| `WAHA_PRINT_QR` | False | Whether to print QR codes in logs for manual session pairing (`False` by default). |
| `WAHA_LOG_LEVEL` | info | Log verbosity level (`info` by default). |
| `WAHA_LOG_FORMAT` | JSON | Format of application logs (`JSON` for structured output). |
| `WAHA_MEDIA_STORAGE` | LOCAL | Storage backend for files and media (`LOCAL` by default). |
| `WHATSAPP_FILES_FOLDER` | /app/.media | Path to the folder where WhatsApp files are stored (`/app/.media`). |
| `WAHA_DASHBOARD_ENABLED` | True | Enables the management dashboard (`True` by default). |
| `WHATSAPP_START_SESSION` | default | Name of the WhatsApp session that is automatically started on service boot. |
| `WAHA_DASHBOARD_PASSWORD` | (secret) | Dashboard password, automatically generated during deployment. |
| `WAHA_DASHBOARD_USERNAME` | (secret) | Username for the WAHA web dashboard (default: `admin`). |
| `WHATSAPP_DEFAULT_ENGINE` | WEBJS | Default WhatsApp automation engine (`WEBJS`). Supports connecting multiple WhatsApp accounts. |
| `WHATSAPP_FILES_LIFETIME` | 0 | Lifetime (in seconds) before media files are deleted. `0` means no expiration. |
| `WHATSAPP_SWAGGER_ENABLED` | True | Enables the Swagger API documentation (`True` by default). |
| `WAHA_LOCAL_STORE_BASE_DIR` | /local/.sessions | Base directory used to persist WhatsApp session data on disk. |
| `WAHA_RESTART_ALL_SESSIONS` | True | Forces all existing WhatsApp sessions to restart when WAHA starts. |
| `WHATSAPP_SWAGGER_PASSWORD` | (secret) | Password to access the Swagger UI, automatically generated and unique per deployment. |
| `WHATSAPP_SWAGGER_USERNAME` | (secret) | Username to access the Swagger UI (default: `admin`). |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/local`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/waha)
