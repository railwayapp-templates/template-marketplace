# Deploy Uptime Kuma on Railway

Self-hosted uptime monitoring with status pages and 90+ notifications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-3)

## About

Uptime Kuma is a self-hosted monitoring tool like Uptime Robot. It watches HTTP(s), TCP, ping, DNS, and keyword monitors on 20-second intervals, serves public status pages, and alerts through 90+ notification channels including Telegram, Discord, Slack, and email.

Hosting Uptime Kuma on Railway takes a single Docker service with no environment variables to set. The web UI listens on Railway's injected port, exposed automatically through the generated domain, and all state lives in an embedded SQLite database persisted on a Railway volume mounted at /app/data. There is no external database, cache, or other dependency to provision. On first visit, Uptime Kuma's built-in setup wizard creates your admin account in about 30 seconds; after that, monitors, status pages, and settings all survive redeploys because everything is stored on the attached volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| uptime-kuma | `louislam/uptime-kuma:2.4.0@sha256:91e963bfda569ba115206e843febb446f473ab525add4e08b2b9e3beffa16985` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-3)
