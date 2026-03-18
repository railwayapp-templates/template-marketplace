# Deploy Grafana Stack on Railway

One-click observability with Loki, Prometheus, Tempo, and Grafana

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/8TLSQD)

## About

A complete observability stack including Grafana, Loki, Prometheus, and Tempo - all pre-configured and ready to monitor your Railway applications with comprehensive dashboards, logging, metrics, and distributed tracing capabilities.

Hosting a Grafana Stack involves deploying four integrated observability services: Grafana for visualization and dashboards, Loki for log aggregation, Prometheus for metrics collection, and Tempo for distributed tracing. This template handles all the complex configuration and service interconnections automatically, providing persistent storage for all components and exposing internal URLs for easy integration with your other Railway applications. The stack comes pre-configured with useful Grafana plugins and sensible defaults for production use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | [MykalMachon/railway-grafana-stack](https://github.com/MykalMachon/railway-grafana-stack) (root: /grafana) | Web service |
| Loki | [MykalMachon/railway-grafana-stack](https://github.com/MykalMachon/railway-grafana-stack) (root: /loki) | Database |
| Prometheus | [MykalMachon/railway-grafana-stack](https://github.com/MykalMachon/railway-grafana-stack) (root: /prometheus) | Database |
| Tempo | [MykalMachon/railway-grafana-stack](https://github.com/MykalMachon/railway-grafana-stack) (root: /tempo) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Grafana | 3000 | Grafana HTTP Port. Do not change. |
| `VERSION` | Grafana | latest | Grafana's version or tag. This is set to latest by default. |
| `LOKI_INTERNAL_URL` | Grafana | - | The internal URL to Loki. Changing this will break your connection to Loki. |
| `GF_INSTALL_PLUGINS` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel | Plugins to automatically install when Grafana starts up for the first time |
| `TEMPO_INTERNAL_URL` | Grafana | - | The internal URL to Tempo. Changing this will break your connection to Loki. |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) | admin account username |
| `PROMETHEUS_INTERNAL_URL` | Grafana | - | The internal URL to Prometheus. Changing this will break your connection to Loki. |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | Grafana on Railway | A name for your Grafana instance |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) | The password for your admin user |
| `PORT` | Loki | 3100 | Loki HTTP Port. Do not change. |
| `VERSION` | Loki | latest | Loki's version or tag. This is set to latest by default. |
| `PORT` | Prometheus | 9090 | Prometheus HTTP Port. Do not change. |
| `VERSION` | Prometheus | latest | Prometheus's version or tag. This is set to latest by default. |
| `PORT` | Tempo | 3200 | Tempo HTTP Port. Do not change. |
| `VERSION` | Tempo | 2.9.0 | Tempo's version or tag. This is set to latest by default. |
| `INTERNAL_GRPC_INGEST` | Tempo | - | Tempo's trace/span ingest GRPC server |
| `INTERNAL_HTTP_INGEST` | Tempo | - | Tempo's trace/span ingest HTTP server |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana/`
- **Healthcheck:** `/ready`
- **Volume:** `/loki`
- **Healthcheck:** `/-/healthy`
- **Volume:** `/prometheus`
- **Volume:** `/var/tempo`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/8TLSQD)
