# Deploy Gatus on Railway

Lightweight uptime monitor with alerts, dashboard, and latency history

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gatus-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/gatus-1)

![Gatus OG Image](https://raw.githubusercontent.com/INAPP-Mobile/gatus/master/og-image.svg)

Gatus is a beautiful, lightweight uptime monitoring dashboard. Deploy it on Railway in minutes to monitor your endpoints and get instant alerts when something goes down.

Gatus runs as a single Docker container on port 8080. Railway provides compute, TLS at the edge, and a public URL. All monitoring data (config, status history, metrics) is stored at `/data` — add a Railway Volume there to persist everything across restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gatus | `twinproduction/gatus:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Gatus listens on (default: 8080). Must match Railway's PORT. |
| `CONFIG_PATH` | /data/config.yaml | Path to the Gatus config file (default: /data/config.yaml). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/gatus-1)
