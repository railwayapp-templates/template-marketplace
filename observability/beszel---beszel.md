# Deploy beszel on Railway

Beszel — lightweight server monitoring with historical data and alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beszel)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/beszel)

![Beszel OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-beszel/main/og-image.svg)

Beszel is a lightweight server monitoring platform with historical data, Docker stats, and alert functions. Deploy it on Railway in minutes to start monitoring your servers — no external database required.

Beszel runs as a single Docker container (hub) on port 8090. Railway provides compute, TLS at the edge, and a public URL. The hub stores all monitoring data at `/beszel_data` — add a Railway Volume there to persist metrics across restarts. Agents run on your monitored servers and stream data to the hub via WebSocket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beszel | `henrygd/beszel:0.18.7` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8090 | Port Beszel listens on (default: 8090, hardcoded upstream). Must match Railway's PORT. |
| `APP_URL` | - | Public URL of your Beszel hub (e.g., https://your-app.up.railway.app). Used for links in emails and notifications. |
| `AUTO_LOGIN` | (secret) | Email of a user to auto-authenticate (skip login page). Leave empty to require login. |
| `DISABLE_PASSWORD_AUTH` | (secret) | Set to true to disable password auth and use OAuth/OIDC only. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/beszel_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/beszel)
