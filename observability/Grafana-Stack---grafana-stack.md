# Deploy Grafana Stack on Railway

Pre-wired observability — Grafana dashboards, Prometheus metrics, Loki logs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-stack)

## About

A complete observability stack bundling Grafana for dashboards, Prometheus for metrics collection, and Loki for log aggregation. All three services come pre-wired with datasource provisioning and private networking configured out of the box.

Running a full observability stack typically involves configuring three separate services and wiring them together — datasource URLs, scrape targets, and network access between components. This template eliminates that setup. Grafana deploys with Prometheus and Loki datasources pre-provisioned. Prometheus is configured to scrape itself and Grafana by default. Loki runs in single-instance mode with filesystem storage. All three services communicate over Railway's private network and each has its own persistent volume for data retention. You can extend it by forking the repo and adding custom scrape targets or dashboards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | [Sokanon/railway-grafana-stack](https://github.com/Sokanon/railway-grafana-stack) (root: packages/grafana) | Worker |
| loki | [Sokanon/railway-grafana-stack](https://github.com/Sokanon/railway-grafana-stack) (root: packages/loki) | Worker |
| prometheus | [Sokanon/railway-grafana-stack](https://github.com/Sokanon/railway-grafana-stack) (root: packages/prometheus) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | grafana | 3000 | Grafana HTTP Port |
| `GF_SERVER_HTTP_PORT` | grafana | 3000 | Grafana Internal Port |
| `GF_SECURITY_ADMIN_PASSWORD` | grafana | (secret) | - |
| `PORT` | loki | 3100 | Loki Port |
| `PORT` | prometheus | 9090 | Prometheus Port |

## Configuration

- **Healthcheck:** `/api/health`
- **Healthcheck:** `/ready`

**Category:** Observability · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/grafana-stack)
