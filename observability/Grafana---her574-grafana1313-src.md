# Deploy Grafana on Railway

Grafana 13.1.3 observability dashboards, logs, and alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/her574-grafana1313-src)

## About

Grafana is an open-source observability platform for querying, visualizing, and alerting on metrics, logs, traces, and other time-series data. Teams use dashboards, Explore, alert rules, and data-source integrations to understand application health. This template runs the official Grafana OSS 13.1.3 image with Railway networking and persistent storage.

Railway runs the official Grafana OSS image as one service listening on port 3000. A Railway-provided public domain exposes the web UI and `/api/health` readiness endpoint. A persistent volume is mounted at `/var/lib/grafana` so the built-in SQLite database, dashboards, alert rules, and installed plugins survive restarts. The template generates the admin password at deployment time with Railway's `secret(32)` function and keeps sign-ups disabled by default. Set up external data sources from Grafana after deployment; this template does not provision or require a separate database. The source is pinned to Grafana 13.1.3 for repeatable deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | `grafana/grafana@sha256:ab5cb380e3ff3172d6c8bd2e7cfd31cce977d2881b260e1f5bc089bf0b759b43` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `GF_SECURITY_ADMIN_USER` | (secret) |
| `GF_USERS_ALLOW_SIGN_UP` | false |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/her574-grafana1313-src)
