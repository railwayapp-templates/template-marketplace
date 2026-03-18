# Deploy Victoria monitoring stack on Railway

Grafana, VictoriaMetrics monitoring with Caddy API-key proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victoria-monitoring-stack)

## About

VictoriaMetrics is a high-performance, cost-effective time series database and monitoring solution. This stack combines VictoriaMetrics for metric storage, vmagent for scraping Prometheus-compatible metrics from your applications, Grafana for visualization, and an auth proxy for secure external access—providing a complete observability platform.

Hosting VictoriaMetrics requires orchestrating multiple services: a time series database for storing metrics, a scraping agent to collect data from application endpoints, a visualization layer, and secure access controls. This template handles the complexity by pre-configuring service discovery between components using Railway's internal networking. VictoriaMetrics stores metrics with configurable retention, vmagent dynamically scrapes targets defined via environment variables, Grafana comes pre-provisioned with the VictoriaMetrics datasource, and a Caddy-based auth proxy secures external write/query access with API key authentication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| auth-proxy | [thealish/railway-victoriametrics-template](https://github.com/thealish/railway-victoriametrics-template) (root: /auth-proxy) | Web service |
| grafana | [thealish/railway-victoriametrics-template](https://github.com/thealish/railway-victoriametrics-template) (root: /grafana) | Web service |
| victoriametrics | [thealish/railway-victoriametrics-template](https://github.com/thealish/railway-victoriametrics-template) (root: /victoriametrics) | Worker |
| vmagent | [thealish/railway-victoriametrics-template](https://github.com/thealish/railway-victoriametrics-template) (root: /vmagent) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | auth-proxy | - | port |
| `API_KEY` | auth-proxy | (secret) | api key for external access |
| `PORT` | grafana | - | port |
| `PORT` | victoriametrics | - | port |
| `PORT` | vmagent | - | port |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/victoria-monitoring-stack)
