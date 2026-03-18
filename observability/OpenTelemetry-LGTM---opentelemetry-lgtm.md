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
| OpenTelemetry Collector | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /otelcol) | Web service |
| Tempo | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /tempo) | Database |
| Grafana | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /grafana) | Web service |
| Loki | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /loki) | Database |
| Prometheus | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /prometheus) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Tempo | 3200 |
| `VERSION` | Tempo | 2.9.0 |
| `PORT` | Grafana | 3000 |
| `VERSION` | Grafana | 12.3.1 |
| `GF_PATHS_DATA` | Grafana | /data/grafana |
| `GF_PLUGINS_PREINSTALL` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-geomap-panel,grafana-clock-panel |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | LGTM! |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) |
| `PORT` | Loki | 3100 |
| `VERSION` | Loki | 3.6.2 |
| `PORT` | Prometheus | 9090 |
| `VERSION` | Prometheus | v3.8.0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/data/grafana`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/opentelemetry-lgtm)
