# Deploy Grafana on Railway

Self-hosted Grafana dashboards with persistent storage and healthchecks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-1)

## About

Grafana is an open-source analytics and observability dashboard for visualizing metrics, logs, traces, and operational data. This template deploys Grafana with persistent storage, generated admin credentials, and a clean Railway healthcheck.

This template runs the official Grafana Docker image behind a Railway public domain. A persistent volume is mounted at /var/lib/grafana so dashboards, SQLite metadata, plugins, and runtime state survive restarts and redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | `grafana/grafana:13.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `GF_LOG_MODE` | console |
| `GF_PATHS_DATA` | /var/lib/grafana |
| `GF_PATHS_PLUGINS` | /var/lib/grafana/plugins |
| `GF_SERVER_HTTP_ADDR` | 0.0.0.0 |
| `GF_SERVER_HTTP_PORT` | 3000 |
| `GF_SECURITY_ADMIN_USER` | (secret) |
| `GF_SECURITY_SECRET_KEY` | (secret) |
| `GF_USERS_ALLOW_SIGN_UP` | false |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) |
| `GF_ANALYTICS_REPORTING_ENABLED` | false |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grafana-1)
