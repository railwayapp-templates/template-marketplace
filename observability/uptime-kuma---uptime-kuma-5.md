# Deploy uptime-kuma on Railway

Open-source self-hosted uptime monitoring. Unlimited monitors, 90+ channels

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-5)

## About

# Uptime-Kuma

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/xfsDpp)

A one-click Railway template for [Uptime Kuma](https://github.com/louislam/uptime-kuma) — the popular open-source, self-hosted uptime monitoring tool. Track your websites, APIs, databases, TCP ports, and more with a beautiful dashboard, unlimited monitors, and 90+ notification channels.

## Features

- **Unlimited monitors** — monitor HTTP(s), TCP, Ping, DNS, (and more) without artificial caps.
- **20‑second check intervals** — near real‑time status updates for critical services.
- **90+ notification channels** — receive alerts via Telegram, Discord, Slack, email, PagerDuty, webhooks, and many more.
- **Beautiful status pages** — build a public or private status page in minutes with a custom domain.
- **SSL certificate expiry tracking** — know when your certificates are about to expire.
- **Multi-lingual UI** — supports 20+ languages.
- **2FA & OAuth** — optional login security with two-factor authentication and GitHub/Google/Microsoft OAuth.
- **REST API & WebSocket** — integrate monitoring data into your own tools and dashboards.
- **Persistent storage** — data is stored in a Railway volume mounted at `/app/data`.

## Configuration

The template works out of the box with zero configuration. The table below lists supported environment variables for advanced setups.

| Variable | Description | Default |
|---|---|---|
| `UPTIME_KUMA_HOST` | Bind address for the web server | `0.0.0.0` |
| `UPTIME_KUMA_PORT` | Port the web server listens on | `3001` |
| `DATA_DIR` | Path to the data directory (persistent volume) | `/app/data` |
| `UPTIME_KUMA_DISABLE_FRAME_SAMEORIGIN` | Disable `X-Frame-Options: SAMEORIGIN` (set to `1` to allow embedding in iframes) | (empty) |

## Deploy and Host

Deploy and host your own Uptime Kuma instance on Railway in one click.

### About Hosting

Uptime Kuma runs as a single Docker container with a persistent volume for data storage. Railway provides the compute, networking, and storage infrastructure needed to keep your monitoring service online.

### Why Deploy

- **No infrastructure management** — Railway handles hosting, scaling, and updates
- **Persistent storage** — Your monitoring data persists across deployments
- **Free tier eligible** — Uptime Kuma runs within Railway's free tier limits
- **Custom domains** — Attach your own domain for the status page

### Common Use Cases

- Monitor website and API uptime for your SaaS products
- Track SSL certificate expiry for your domains
- Build a public status page for your organization
- Receive alerts via Telegram, Discord, Slack, or email when services go down

### Dependencies for

#### Deployment Dependencies

- A [Railway](https://railway.app) account
- (Optional) A custom domain for your status page

## License

[MIT](https://github.com/louislam/uptime-kuma/blob/master/LICENSE) — based on [Uptime Kuma](https://github.com/louislam/uptime-kuma/) by Louis Lam.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| uptime-kuma | `louislam/uptime-kuma:2.4.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Port UPTIME_KUMA listens on |
| `UPTIME_KUMA_SECRET_KEY` | (secret) | Secret key |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-5)
