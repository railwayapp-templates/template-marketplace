# Deploy uptime-kuma on Railway

Deploy and Host uptime-kuma with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-2)

## About

Uptime Kuma is a self-hosted uptime monitoring tool — an open-source alternative to UptimeRobot. It watches your websites, APIs, TCP ports, and containers, alerts you through 90+ notification services (Slack, Telegram, Discord, email, webhooks), and publishes shareable status pages with response-time charts and certificate expiry tracking.

Uptime Kuma runs as a single lightweight Node.js container with an embedded SQLite database, so hosting it means one service and one persistent volume. This template deploys the official louislam/uptime-kuma image with a volume mounted at /app/data, where monitors, history, and settings live — data survives every redeploy. The app binds Railway's injected PORT automatically, and no environment variables are required: deploy, open the public URL, and create your admin account in the first-run setup wizard. Because monitoring only works if the monitor itself stays up, an always-on host with persistent storage is essential — exactly what this setup provides.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| uptime-kuma | `louislam/uptime-kuma:1` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/uptime-kuma-2)
