# Deploy Uptime Kuma (Self-Hosted Uptime & Status Page) on Railway

Self-hosted uptime monitor & status page. UptimeRobot alternative, zero

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-self-hosted-uptime-and-statu)

## About

Uptime Kuma is the most popular self-hosted uptime monitoring tool — a free alternative to UptimeRobot, Pingdom and Better Stack. It checks HTTP(S), TCP, DNS, ping, Docker containers, databases and push-based heartbeats every 20 seconds, draws response-time charts, and alerts you through 90+ channels including Slack, Discord, Telegram, email, PagerDuty and webhooks. It also publishes beautiful public status pages.

This template runs the official `louislam/uptime-kuma:2` image (the v2 line with the new database engine and improved performance) as a single service with a public domain. All monitors, history and settings live in `/app/data`, which is mounted on a Railway volume so nothing is lost across redeploys or image updates. There are no variables to fill in: open your domain, create the admin account on first visit and start adding monitors. Uptime Kuma uses ~150 MB of RAM and one small container, making it one of the cheapest 24/7 services you can run on Railway. Because Railway runs in multiple regions, you can deploy this template twice to monitor from two locations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma:2` | Web service |

## Configuration

- **Healthcheck:** `/dashboard`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability · **Tags:** uptime-kuma, monitoring, status-page, uptime, alerts, observability, uptimerobot-alternative

[View on Railway →](https://railway.com/deploy/uptime-kuma-self-hosted-uptime-and-statu)
