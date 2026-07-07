# Deploy changedetection.io on Railway

ChangeDetection.io — monitor website changes with alerts and history.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/changedetectionio-1)

## About

One-click deploy on Railway. Single container, built-in SQLite. TLS at edge, auto-restart.

Single container with SQLite. No external DB needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| changedetection.io | [INAPP-Mobile/railway-changedetection.io](https://github.com/INAPP-Mobile/railway-changedetection.io) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for scheduled checking (e.g., America/New_York, Europe/London). |
| `PORT` | 5000 | HTTP listen port (default: 5000). Railway sets this automatically. |
| `BASE_URL` | - | Public URL of your instance (e.g., https://your-app.up.railway.app). Appears in notification alerts. |
| `LOGGER_LEVEL` | DEBUG | Log level: TRACE, DEBUG, INFO, SUCCESS, WARNING, ERROR, CRITICAL. |
| `FETCH_WORKERS` | 10 | Number of parallel fetch workers for monitoring checks (default: 10). |
| `DISABLE_VERSION_CHECK` | false | Set to true to disable telemetry and version check. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datastore`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/changedetectionio-1)
