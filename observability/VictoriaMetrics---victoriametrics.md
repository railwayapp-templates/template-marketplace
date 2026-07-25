# Deploy VictoriaMetrics on Railway

Persistent, secure time-series database with built-in VMUI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victoriametrics)

## About

VictoriaMetrics is a fast, cost-effective time-series database and monitoring solution. This template deploys its single-node edition with persistent storage, a generated Basic Authentication password, built-in VMUI, Prometheus-compatible APIs, self-monitoring, and an HTTP health check.

Hosting VictoriaMetrics provides durable storage and fast queries for infrastructure, application, and business metrics. Railway builds a thin wrapper around the pinned official container, provisions a persistent volume, assigns a public HTTPS domain, and monitors the dedicated health endpoint. Protected endpoints require generated credentials, while the integrated VMUI provides immediate querying and visualization without requiring Grafana. The single-node edition is appropriate for compact production installations and can later receive metrics from Prometheus, vmagent, OpenTelemetry-compatible collectors, or direct HTTP imports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VictoriaMetrics | [monotykamary/railway-template-victoriametrics](https://github.com/monotykamary/railway-template-victoriametrics) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8428 | HTTP port used by VictoriaMetrics and the Railway public domain. |
| `VM_PASSWORD` | (secret) | Generated Basic Authentication password for VMUI and HTTP APIs. |
| `VM_USERNAME` | (secret) | Basic Authentication username for protected HTTP endpoints. |
| `VM_RETENTION_PERIOD` | 1y | Duration that stored metrics are retained, such as 30d, 6M, or 1y. |
| `VM_SELF_SCRAPE_INTERVAL` | 10s | Interval for scraping VictoriaMetrics' own operational metrics. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/victoria-metrics-data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/victoriametrics)
