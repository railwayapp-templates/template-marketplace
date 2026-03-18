# Deploy Grafana, Loki and Prometheus with OTEL Collector on Railway

Grafana, Loki and Prometheus with a centralized OTEL Collector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-loki-and-prometheus-with-otel-co)

## About

A complete observability stack combining OpenTelemetry Collector, Grafana, Prometheus, Loki, and Tempo. This unified solution enables comprehensive application monitoring across metrics, logs, and distributed traces. The OTel Collector acts as a central telemetry hub, processing and routing data to specialized backends, all visualized through Grafana dashboards.

Deploying this stack involves configuring four interconnected services: the OpenTelemetry Collector receives telemetry data via OTLP protocols (HTTP/gRPC), Prometheus stores metrics via remote write, Loki aggregates logs, and Tempo manages distributed traces. Grafana serves as the visualization layer with pre-configured datasources. Services communicate internally via private networking, with only Grafana exposed publicly. Each component runs containerized with dedicated configuration files. The architecture assumes application-level OpenTelemetry instrumentation sends data to the collector, which then batches and routes it to appropriate backends for storage and analysis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tempo | [biancarosa/railway-grafana-stack](https://github.com/biancarosa/railway-grafana-stack) (root: /tempo) | Database |
| Grafana | [biancarosa/railway-grafana-stack](https://github.com/biancarosa/railway-grafana-stack) (root: /grafana) | Database |
| Loki | [biancarosa/railway-grafana-stack](https://github.com/biancarosa/railway-grafana-stack) (root: /loki) | Web service |
| Prometheus | [biancarosa/railway-grafana-stack](https://github.com/biancarosa/railway-grafana-stack) (root: /prometheus) | Database |
| OTEL Collector | [biancarosa/railway-grafana-stack](https://github.com/biancarosa/railway-grafana-stack) (root: /otel-collector) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Tempo | 3200 |
| `VERSION` | Tempo | latest |
| `INTERNAL_GRPC_INGEST_PORT` | Tempo | 4317 |
| `INTERNAL_HTTP_INGEST_PORT` | Tempo | 4318 |
| `PORT` | Grafana | 3000 |
| `VERSION` | Grafana | latest |
| `GF_INSTALL_PLUGINS` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | Grafana on Railway |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) |
| `PORT` | Loki | 3100 |
| `VERSION` | Loki | latest |
| `PORT` | Prometheus | 9090 |
| `VERSION` | Prometheus | latest |

## Configuration

- **Healthcheck:** `/ready`
- **Volume:** `/var/tempo`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/grafana/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/loki`
- **Start command:** `prometheus --config.file=/etc/prometheus/prom.yml --storage.tsdb.path=/prometheus --web.enable-remote-write-receiver`
- **Healthcheck:** `/-/healthy`
- **Volume:** `/prometheus`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-loki-and-prometheus-with-otel-co)
