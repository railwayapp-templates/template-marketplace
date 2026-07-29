# Deploy Uptime Kuma on Railway

Self-hosted uptime monitoring with status pages and rich notifications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-4)

## About

Uptime Kuma is a self-hosted uptime monitoring tool, comparable to Uptime Robot. It monitors HTTP(s), TCP, DNS, ping, and push targets on configurable intervals, presents results through a fast reactive web UI and public status pages, and alerts you through 70+ notification services including Telegram, Discord, and Slack.

Uptime Kuma ships as a single Docker image with an embedded SQLite database, so hosting requires no external database or supporting services. All monitors, status pages, and settings live under `/app/data`, which must be backed by a persistent volume so data survives redeploys. The web UI listens on port 3001 and serves both the dashboard and its websocket connections, so it works behind Railway's edge proxy without extra configuration. First-run setup (choosing SQLite and creating the admin account) happens in the browser right after deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma:2.4.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-4)
