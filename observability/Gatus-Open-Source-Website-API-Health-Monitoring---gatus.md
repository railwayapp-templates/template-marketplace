# Deploy Gatus | Open Source Website & API Health Monitoring on Railway

Self Host Gatus.  Health checks  - HTTP, DNS, TCP, ICMP probes & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gatus)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gatus?referralCode=QXdhdr)

Gatus is an open-source, developer-oriented health dashboard that continuously probes your endpoints over HTTP, ICMP, TCP, DNS, gRPC, WebSocket, SSH, and more, then surfaces the results on a public-or-private status page and alerts you through Slack, Discord, PagerDuty, Telegram, email, and dozens of other providers. Unlike heavier observability stacks, Gatus is a single Go binary configured by a single YAML file — perfect for monitoring your own SaaS, APIs, databases, and internal services without standing up Prometheus + Alertmanager + Grafana.

This Railway template lets you deploy Gatus on Railway in one click. The template builds a hardened Alpine image from `twinproduction/gatus:stable`, attaches a Railway volume for the embedded SQLite database, exposes a public HTTPS domain, and ships a configurable `GATUS_CONFIG_YAML` environment variable so you can paste your full Gatus configuration into the Railway dashboard without ever touching a shell.

Gatus is a YAML-driven uptime monitor that runs as a single static binary. Each endpoint definition specifies a target URL, a probe interval, and a list of conditions (e.g. `[STATUS] == 200`, `[RESPONSE_TIME] &lt; 500`, `[BODY].status == UP`). When any condition fails, Gatus triggers alerts and updates the status page.

Key features:

- Probes over HTTP, ICMP (ping), TCP, DNS, gRPC, WebSocket, SSH, STARTTLS, TLS
- 25+ alerting providers including Slack, Discord, Teams, PagerDuty, Telegram, email, generic webhooks
- Built-in OIDC and HTTP basic auth for protecting the status page
- Endpoint groups, maintenance windows, response-body assertions, and certificate-expiry checks
- Per-endpoint history with response-time graphs and uptime percentages

This template runs a single Gatus service backed by an embedded SQLite database on a Railway volume — no external Postgres required for small-to-medium dashboards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gatus | [praveen-ks-2001/gatus-railway](https://github.com/praveen-ks-2001/gatus-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port Gatus listens on |
| `GATUS_CONFIG_PATH` | /data/config.yaml | Path to the config file |
| `GATUS_CONFIG_YAML` | - | Optional full YAML, overrides default at boot |
| `GATUS_ADMIN_PASSWORD` | (secret) | Optional basic-auth password |
| `GATUS_ADMIN_USERNAME` | (secret) | Optional basic-auth username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gatus)
