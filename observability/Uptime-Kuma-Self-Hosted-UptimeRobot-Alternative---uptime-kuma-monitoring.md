# Deploy Uptime Kuma — Self-Hosted UptimeRobot Alternative on Railway

Unlimited monitors, 20s intervals, free status pages. No commercial-use ban

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-monitoring)

## About

![Uptime Kuma monitoring dashboard](https://user-images.githubusercontent.com/1336778/212262296-e6205815-ad62-488c-83ec-a5b0d0689f7c.jpg)

Uptime Kuma is the most popular open-source uptime monitor — **85k+ GitHub stars** — with
unlimited monitors, 20-second check intervals, beautiful status pages, and 90+ notification
channels (Telegram, Discord, Slack, PagerDuty, email, webhooks). The 2.x line adds MariaDB
support, Globalping worldwide probes, and domain expiry monitoring alongside HTTP(s), TCP, DNS,
ping, Docker, and game-server checks.

**UptimeRobot's free tier is now restricted to personal, non-commercial use** — and its paid
plans start at $7/month for just 10 monitors at 1-minute intervals. Uptime Kuma on Railway gives
you unlimited monitors at 20-second intervals for ~$2–5/month flat, with every check and status
page owned by you.

---

The one rule of uptime monitoring: the monitor must not go down with the thing it monitors.
Running Uptime Kuma on the same VPS as your apps creates exactly that blind spot. Railway runs
it as an independent managed container with automatic HTTPS and a persistent volume — separate
from the infrastructure it watches, with zero server maintenance.

The decisive advantage over SaaS monitors: UptimeRobot's external probes cannot reach private
IPs, localhost, or internal services. Uptime Kuma deployed on Railway can monitor anything your
Railway project can reach — including other services over Railway's private network.

Typical cost: **~$2–5/month** on Railway's Hobby plan. UptimeRobot Solo is $7/month for 10
monitors at 1-minute intervals, and its free tier now prohibits commercial use. Commercial
status-page tools charge $20–100/month for what Uptime Kuma includes free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma` | Database |

## Configuration

- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-monitoring)
