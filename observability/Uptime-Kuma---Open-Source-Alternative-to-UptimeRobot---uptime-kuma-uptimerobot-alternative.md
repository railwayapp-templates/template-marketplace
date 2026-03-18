# Deploy Uptime Kuma - Open Source Alternative to UptimeRobot on Railway

Self-host Uptime Kuma for real-time uptime monitoring and alerts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-uptimerobot-alternative)

## About

Deploy **Uptime Kuma** on Railway in under 60 seconds with this one-click template. Get a production-ready, self-hosted monitoring dashboard with automatic SSL, persistent storage, and zero infrastructure management. This template uses the official louislam/uptime-kuma:1 Docker image and provisions everything you need to monitor your services, websites, and APIs from a single elegant interface.

Uptime Kuma is an open-source, self-hosted monitoring tool that tracks the availability and performance of your web services, APIs, servers, and Docker containers. Created as a modern alternative to commercial uptime monitors, it combines powerful monitoring capabilities with an exceptionally clean UI that developers actually enjoy using.


**Key Features:**
- **Multi-Protocol Monitoring** — HTTP(s), TCP, ping, DNS, WebSocket, Docker containers
- **90+ Notification Integrations** — Uptime Kuma provides Discord, Slack, Telegram, email, webhooks via Apprise
- **Public Status Pages** — Share uptime dashboards with clients or teams
- **Lightweight Architecture** — Runs on SQLite, requiring minimal resources (512MB RAM)
- **Push Monitors** — Heartbeat endpoints for cron jobs and scheduled tasks
- **Certificate Monitoring** — Track SSL/TLS expiration automatically
- **Two-Factor Authentication** — Secure your dashboard with 2FA
- **Prometheus Metrics** — Export data via `/metrics` endpoint

Single Node.js application with embedded SQLite stored at `/app/data` — your entire monitoring configuration lives in one file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-uptimerobot-alternative)
