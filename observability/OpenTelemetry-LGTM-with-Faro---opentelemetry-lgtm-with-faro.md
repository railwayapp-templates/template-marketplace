# Deploy OpenTelemetry LGTM with Faro on Railway

Deploy and Host the LGTM stack with Opentelemetry and Faro RUM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opentelemetry-lgtm-with-faro)

## About

OpenTelemetry LGTM with Faro is the full observability stack — Loki, Grafana, Tempo, Prometheus and an OpenTelemetry Collector — with a Grafana Alloy service added in front to receive browser and mobile telemetry. Backend services send OTLP to the collector as usual, while frontends send Faro payloads to Alloy, which normalizes and forwards them through the same pipeline.

Hosting this stack means running six services: an OpenTelemetry Collector as the ingest hub, an Alloy service dedicated to the Faro protocol, and Loki, Tempo, Prometheus and Grafana behind them. Alloy is needed because the Faro Web SDK posts its own JSON payload that no collector build can accept; it parses that and hands OTLP to the collector, so every signal still passes through one place before reaching storage.

On Railway the backends take volumes, the collector and Alloy get public domains for ingest, and Grafana arrives with datasources, correlation and a frontend dashboard already provisioned.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /grafana) | Web service |
| Prometheus | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /prometheus) | Database |
| Loki | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /loki) | Database |
| Alloy | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /alloy/faro) | Web service |
| OpenTelemetry Collector | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /otelcol/gateway) | Web service |
| Tempo | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /tempo) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Grafana | 3000 | HTTP port Grafana listens on. |
| `VERSION` | Grafana | 12.3.1 | Grafana image tag, passed as a build arg. |
| `GF_PATHS_DATA` | Grafana | /data/grafana | Grafana's data directory. Must match the volume mount path. |
| `GF_PLUGINS_PREINSTALL` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-geomap-panel,grafana-clock-panel | Plugins installed at startup, comma-separated. |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) | Username for the initial admin login. |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | LGTM! | Grafana's default instance name. |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) | Password for the initial admin login. **Mark as secret.** |
| `PORT` | Prometheus | 9090 | HTTP port Prometheus listens on. |
| `VERSION` | Prometheus | v3.8.0 | Prometheus image tag, passed as a build arg. |
| `PORT` | Loki | 3100 | HTTP port Loki listens on. |
| `VERSION` | Loki | 3.6.2 | Loki image tag, passed as a build arg. |
| `PORT` | Alloy | 12345 | Alloy's healthcheck port. |
| `VERSION` | Alloy | v1.18.1 | Alloy image tag, passed as a build arg. |
| `FARO_API_KEY` | Alloy | (secret) | Key browsers send as `x-api-key`. |
| `OTEL_UPSTREAM_PASSWORD` | Alloy | (secret) | Password for that line. Must match the gateway's htpasswd. |
| `OTEL_UPSTREAM_USERNAME` | Alloy | (secret) | Username for the gateway's htpasswd. Give Alloy its own line so it can be rotated alone. |
| `FARO_CORS_ALLOWED_ORIGINS` | Alloy | localhost | Comma-separated frontend origins. Replaces the localhost fallback. |
| `FARO_ALLOW_UNAUTHENTICATED` | Alloy | false | Set `true` instead to run an open endpoint. One of these two is required. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Alloy | - | The gateway to forward to. In the combined template, `http://opentelemetry-collector.railway.internal:4318`; in the standalone template, ask the user. |
| `PORT` | OpenTelemetry Collector | 13133 | OpenTelemetry Collector's healthcheck port. |
| `VERSION` | OpenTelemetry Collector | 0.139.0 | OpenTelemetry Collector image tag, passed as a build arg. |
| `PORT` | Tempo | 3200 | HTTP port Tempo listens on. |
| `VERSION` | Tempo | 2.9.0 | Tempo image tag, passed as a build arg. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/grafana`
- **Healthcheck:** `/metrics`
- **Volume:** `/data`
- **Healthcheck:** `/ready`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opentelemetry-lgtm-with-faro)
