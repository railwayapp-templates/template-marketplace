# Deploy Mainframe Monitoring Dashboard + Alerts on Railway

Unifi & APC Monitoring Dashboard with Telegram Alerts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mainframe-monitoring-dashboard-alerts)

## About

Mainframe Monitoring Dashboard + Alerts is an observability stack for z/OS environments that visualizes system health and triggers notifications when thresholds are breached. It typically tracks LPAR CPU, memory pressure, CICS/IMS/Db2 performance, job failures, and queue depth, helping teams detect incidents quickly and reduce operational risk.

Hosting this workload means running three core layers reliably: data ingestion, visualization, and alerting. In practice, you deploy a dashboard/API service, a metrics store, and an alert evaluation/notification service. Railway can host each component as separate services with managed networking, environment variables, and autoscaling controls. You also need secure credentials for upstream mainframe telemetry sources and downstream notification providers (email, Slack, PagerDuty, Opsgenie). Production setups should include health checks, persistent storage for time-series data, alert deduplication, and rollout-safe deploys so monitoring remains available during updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| landcare_chat | [KingRaver/landcare_chat](https://github.com/KingRaver/landcare_chat) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `FILTER_MODE` | landcare_chat | true |
| `ENABLED_ZONES` | landcare_chat | false |
| `UNIFI_API_KEY` | landcare_chat | (secret) |
| `SEND_SNAPSHOTS` | landcare_chat | false |
| `ENABLED_CAMERAS` | landcare_chat | false |
| `PERPLEXITY_API_KEY` | landcare_chat | (secret) |
| `PROTECT_WH_API_KEY` | landcare_chat | (secret) |
| `TELEGRAM_BOT_TOKEN` | landcare_chat | (secret) |
| `MAKE_WEBHOOK_SECRET` | landcare_chat | (secret) |
| `OPENWEATHER_API_KEY` | landcare_chat | (secret) |
| `VERCEL_WEBHOOK_SECRET` | landcare_chat | (secret) |
| `UNIFI_PROTECT_PASSWORD` | landcare_chat | (secret) |
| `UNIFI_PROTECT_USERNAME` | landcare_chat | (secret) |
| `ENABLE_INTERACTIVE_BUTTONS` | landcare_chat | true |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/mainframe-monitoring-dashboard-alerts)
