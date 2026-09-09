# Deploy OpenTelemetry LGTM on Railway

Deploy and Host the Grafana LGTM stack with Opentelemetry Collector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opentelemetry-lgtm)

## About

OpenTelemetry LGTM (Loki, Grafana, Tempo, Mimir/Prometheus) is a production-ready observability stack that unifies logs, metrics, traces, and visualization. It provides end-to-end visibility into modern distributed systems using open standards, enabling teams to monitor performance, troubleshoot issues, and understand system behavior at scale.

Hosting OpenTelemetry LGTM involves deploying and wiring together multiple observability components: an OpenTelemetry Collector for ingestion, Prometheus for metrics, Loki for logs, Tempo for traces, and Grafana for visualization.

On Railway, this template deploys all components with private service networking, preconfigured endpoints, and minimal manual setup. Railway handles service discovery, environment variable injection, scaling, and lifecycle management, allowing you to run a full observability platform without maintaining infrastructure. The result is a centralized, scalable telemetry backend ready to ingest OTLP data from any application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenTelemetry Collector | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /otelcol/gateway) | Web service |
| Tempo | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /tempo) | Database |
| Grafana | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /grafana) | Web service |
| Loki | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /loki) | Database |
| Prometheus | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /prometheus) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenTelemetry Collector | 13133 | OpenTelemetry Collector's healthcheck port. |
| `VERSION` | OpenTelemetry Collector | 0.139.0 | OpenTelemetry Collector image tag, passed as a build arg. |
| `PORT` | Tempo | 3200 | HTTP port Tempo listens on. |
| `VERSION` | Tempo | 2.9.0 | Tempo image tag, passed as a build arg. |
| `PORT` | Grafana | 3000 | HTTP port Grafana listens on. |
| `VERSION` | Grafana | 12.3.1 | Grafana image tag, passed as a build arg. |
| `GF_PATHS_DATA` | Grafana | /data/grafana | Grafana's data directory. Must match the volume mount path. |
| `GF_PLUGINS_PREINSTALL` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-geomap-panel,grafana-clock-panel | Plugins installed at startup, comma-separated. |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) | Username for the initial admin login. |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | LGTM! | Grafana's default instance name. |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) | Password for the initial admin login. **Mark as secret.** |
| `PORT` | Loki | 3100 | HTTP port Loki listens on. |
| `VERSION` | Loki | 3.6.2 | Loki image tag, passed as a build arg. |
| `PORT` | Prometheus | 9090 | HTTP port Prometheus listens on. |
| `VERSION` | Prometheus | v3.8.0 | Prometheus image tag, passed as a build arg. |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/data/grafana`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opentelemetry-lgtm)
