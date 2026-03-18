# Deploy Grafana OpenTelemetry Stack on Railway

One-click Grafana/OTLP stack deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/faP63Y)

## About

The Grafana-OpenTelemetry Stack is a pre-configured collection of Grafana, OpenTelemetry Collector, and essential data sources (Tempo/Prometheus/Loki) for one-click deployment. This OTLP-based technology stack provides simple, direct access to application-layer telemetry data, enabling comprehensive observability with minimal setup.

Hosting this stack involves deploying a unified observability solution that integrates Grafana's visualization capabilities with OpenTelemetry's data collection. The stack includes Tempo for traces, Prometheus for metrics, and Loki for logs - all connected through the OpenTelemetry Collector. Once deployed, applications can be configured to send telemetry data to the collector endpoint, which processes and routes information to the appropriate backends. Railway manages the infrastructure complexity while providing automatic scaling and secure private networking between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | [wangxued/do-opentelemetry-collector](https://github.com/wangxued/do-opentelemetry-collector) (root: /grafana) | Web service |
| Prometheus | [wangxued/do-opentelemetry-collector](https://github.com/wangxued/do-opentelemetry-collector) (root: /prometheus) | Web service |
| Loki | [wangxued/do-opentelemetry-collector](https://github.com/wangxued/do-opentelemetry-collector) (root: /loki) | Database |
| Tempo | [wangxued/do-opentelemetry-collector](https://github.com/wangxued/do-opentelemetry-collector) (root: /tempo) | Database |
| Otel-Collector | [wangxued/do-opentelemetry-collector](https://github.com/wangxued/do-opentelemetry-collector) (root: /opentelemetry) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Grafana | 3000 |
| `GF_INSTALL_PLUGINS` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | Grafana on Railway |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) |
| `PORT` | Prometheus | 9090 |
| `PORT` | Otel-Collector | 4318 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`
- **Volume:** `/prometheus`
- **Volume:** `/tmp/loki`
- **Volume:** `/var/tempo`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/faP63Y)
