# Deploy grafana on Railway

Beautiful dashboards and alerting for metrics, logs and traces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-2)

## About

Grafana is the open-source standard for visualizing and alerting on operational data. It turns metrics, logs, and traces from many sources into rich, interactive dashboards. This template runs Grafana OSS on Railway with persistent storage and HTTPS, ready to use right after deploy.

Hosting Grafana yourself gives you full control over your dashboards, data sources, users, and alert rules without per-seat pricing or vendor lock-in. Grafana connects to Prometheus, Loki, PostgreSQL, Elasticsearch, CloudWatch, and many more back ends, then renders time-series panels, tables, heatmaps, and alerts in one place. On Railway the service boots behind managed HTTPS and stores its database and installed plugins on a persistent volume, so dashboards, users, and settings survive restarts and redeploys. The first boot runs database migrations and installs the bundled plugins, which takes about a minute before the login page is ready.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | `grafana/grafana-oss:13.0.2` | Web service |

## Configuration

- **Start command:** `sh -c 'GF_SERVER_HTTP_PORT=$PORT exec /run.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grafana-2)
