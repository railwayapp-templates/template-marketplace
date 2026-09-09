# Deploy Grafana Alloy LGTM on Railway

Deploy and Host the Grafana LGTM stack with Alloy and Faro RUM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-alloy-lgtm)

## About

Grafana Alloy LGTM is a complete observability stack — Loki for logs, Tempo for traces, Prometheus for metrics, and Grafana for visualization — fronted by Grafana Alloy instead of an OpenTelemetry Collector. Alloy accepts both browser telemetry from the Faro Web SDK and standard OTLP from your services, so frontend and backend observability arrive through one gateway.

Hosting this stack means running five services: Alloy as the ingest gateway, and Loki, Tempo, Prometheus and Grafana behind it on the private network. Alloy replaces the collector here because the Faro Web SDK posts its own payload that no collector build can accept — running Alloy as the gateway avoids deploying a second service purely to relay what Alloy already parsed.

On Railway the three backends each take a volume, Grafana ships with datasources and a frontend dashboard already provisioned, and every cross-service address is wired through private networking. Grafana and the Alloy gateway get public domains; nothing else is exposed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Prometheus | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /prometheus) | Database |
| Loki | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /loki) | Database |
| Alloy | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /alloy/gateway) | Web service |
| Grafana | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /grafana) | Web service |
| Tempo | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /tempo) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Prometheus | 9090 | HTTP port Prometheus listens on. |
| `VERSION` | Prometheus | v3.8.0 | Prometheus image tag, passed as a build arg. |
| `PORT` | Loki | 3100 | HTTP port Loki listens on. |
| `VERSION` | Loki | 3.6.2 | Loki image tag, passed as a build arg. |
| `PORT` | Alloy | 12345 | Alloy's healthcheck port. |
| `VERSION` | Alloy | v1.18.1 | Alloy image tag, passed as a build arg. |
| `FARO_API_KEY` | Alloy | (secret) | Key browsers send as `x-api-key`. Filters noise; the rate limit, payload cap and CORS list are the real controls. |
| `OTEL_INGEST_PASSWORD` | Alloy | (secret) | Password for that receiver. Producers send `Authorization: Basic <base64 user:password>`. |
| `OTEL_INGEST_USERNAME` | Alloy | (secret) | Username for the OTLP receiver on 4318. **Required** — the service will not start without it. |
| `FARO_CORS_ALLOWED_ORIGINS` | Alloy | localhost | Comma-separated frontend origins. Replaces the localhost fallback, so production does not keep localhost allowed. |
| `FARO_ALLOW_UNAUTHENTICATED` | Alloy | false | Set `true` instead to run an open endpoint. One of these two is required. |
| `PORT` | Grafana | 3000 | HTTP port Grafana listens on. |
| `VERSION` | Grafana | 12.3.1 | Grafana image tag, passed as a build arg. |
| `GF_PATHS_DATA` | Grafana | /data/grafana | Grafana's data directory. Must match the volume mount path. |
| `GF_PLUGINS_PREINSTALL` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-geomap-panel,grafana-clock-panel | Plugins installed at startup, comma-separated. |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) | Username for the initial admin login. |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | Alloy LGTM! | Grafana's default instance name. |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) | Password for the initial admin login. **Mark as secret.** |
| `PORT` | Tempo | 3200 | HTTP port Tempo listens on. |
| `VERSION` | Tempo | 2.9.0 | Tempo image tag, passed as a build arg. |

## Configuration

- **Healthcheck:** `/metrics`
- **Volume:** `/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`
- **Volume:** `/data/grafana`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-alloy-lgtm)
