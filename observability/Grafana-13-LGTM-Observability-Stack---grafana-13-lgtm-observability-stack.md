# Deploy Grafana 13 LGTM Observability Stack on Railway

Logs, metrics and traces with Grafana, Loki, Tempo and Prometheus.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-13-lgtm-observability-stack)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-13-lgtm-observability-stack?referralCode=20H68q)

LGTM is Grafana's open-source observability stack: Loki for logs, Grafana for dashboards, Tempo for traces and Mimir for metrics, here replaced by single-node Prometheus. This community template deploys Grafana, Loki, Tempo and Prometheus plus Grafana Alloy as a single OpenTelemetry endpoint, with logs and traces stored in Railway Buckets and the datasources linked to each other.

A self-hosted LGTM stack needs more than four containers: Loki and Tempo need object storage and retention, Prometheus needs a way to receive pushed metrics, applications need one place to send OpenTelemetry data, and Grafana needs datasources that link a slow trace to its logs and metrics. This template wires that up on Railway. Alloy receives OTLP from your services over the private network, or from anywhere through a token-protected public endpoint, and routes traces to Tempo, logs to Loki and metrics to Prometheus. Loki and Tempo keep their data in Railway Buckets, Tempo generates request-rate and service-graph metrics from your traces, and Grafana opens with everything provisioned.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tempo | [baranberkay96/grafana-lgtm-railway](https://github.com/baranberkay96/grafana-lgtm-railway) (branch: main) (root: /services/tempo) | Database |
| alloy | [baranberkay96/grafana-lgtm-railway](https://github.com/baranberkay96/grafana-lgtm-railway) (branch: main) (root: /services/alloy) | Web service |
| loki | [baranberkay96/grafana-lgtm-railway](https://github.com/baranberkay96/grafana-lgtm-railway) (branch: main) (root: /services/loki) | Database |
| prometheus | [baranberkay96/grafana-lgtm-railway](https://github.com/baranberkay96/grafana-lgtm-railway) (branch: main) (root: /services/prometheus) | Database |
| grafana | [baranberkay96/grafana-lgtm-railway](https://github.com/baranberkay96/grafana-lgtm-railway) (branch: main) (root: /services/grafana) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tempo | 3200 | Tempo HTTP port; /ready is the healthcheck. |
| `S3_BUCKET` | tempo | - | Bucket name of TempoBucket (reference). |
| `S3_REGION` | tempo | - | Region of the TempoBucket bucket (reference). |
| `S3_ENDPOINT` | tempo | - | S3 endpoint of the TempoBucket Railway Bucket (reference). |
| `TEMPO_LOG_LEVEL` | tempo | warn | Tempo log level. |
| `TEMPO_RETENTION` | tempo | 336h | Delete traces older than this (14 days). |
| `S3_ACCESS_KEY_ID` | tempo | - | Access key of TempoBucket (reference). |
| `S3_SECRET_ACCESS_KEY` | tempo | (secret) | Secret key of TempoBucket (reference). |
| `PROMETHEUS_REMOTE_WRITE_URL` | tempo | - | Where the metrics-generator writes span and service-graph metrics. |
| `PORT` | alloy | 12345 | Alloy HTTP server (UI, metrics, /-/ready healthcheck); private only. |
| `OTLP_PUBLIC_TOKEN` | alloy | (secret) | Bearer token required on the public OTLP endpoint. |
| `ALLOY_MEMORY_LIMIT` | alloy | 1GiB | Alloy refuses new data above this memory use (memory_limiter). |
| `LOKI_OTLP_ENDPOINT` | alloy | - | Loki OTLP endpoint (logs). |
| `OTLP_PUBLIC_ENDPOINT` | alloy | - | OTLP/HTTP endpoint for apps outside Railway (send the bearer token). |
| `TEMPO_OTLP_GRPC_ENDPOINT` | alloy | - | Tempo OTLP gRPC receiver (traces). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | alloy | - | OTLP/HTTP endpoint for services in this project; reference it as ${{alloy.OTEL_EXPORTER_OTLP_ENDPOINT}}. |
| `PROMETHEUS_REMOTE_WRITE_URL` | alloy | - | Prometheus remote-write receiver (metrics). |
| `PORT` | loki | 3100 | Loki HTTP port; /ready is the healthcheck. |
| `S3_BUCKET` | loki | - | Bucket name of LokiBucket (reference). |
| `S3_REGION` | loki | - | Region of the LokiBucket bucket (reference). |
| `S3_ENDPOINT` | loki | - | S3 endpoint of the LokiBucket Railway Bucket (reference). |
| `LOKI_PUSH_URL` | loki | - | Loki push API for log shippers in this project; reference it as ${{loki.LOKI_PUSH_URL}}. |
| `LOKI_LOG_LEVEL` | loki | warn | Loki log level. |
| `S3_ACCESS_KEY_ID` | loki | - | Access key of LokiBucket (reference). |
| `S3_SECRET_ACCESS_KEY` | loki | (secret) | Secret key of LokiBucket (reference). |
| `LOKI_RETENTION_PERIOD` | loki | 744h | Delete logs older than this (31 days). |
| `LOKI_INGESTION_RATE_MB` | loki | 16 | Per-tenant ingestion rate limit (MB/s). |
| `LOKI_INGESTION_BURST_MB` | loki | 32 | Per-tenant ingestion burst (MB). |
| `PORT` | prometheus | 9090 | Prometheus HTTP port; /-/ready is the healthcheck. |
| `LOKI_HOST` | prometheus | - | Loki private host (scraped). |
| `ALLOY_HOST` | prometheus | - | Alloy private host (scraped). |
| `TEMPO_HOST` | prometheus | - | Tempo private host (scraped). |
| `GRAFANA_HOST` | prometheus | - | Grafana private host (scraped). |
| `SCRAPE_INTERVAL` | prometheus | 15s | Scrape and rule evaluation interval. |
| `EXTRA_SCRAPE_TARGETS` | prometheus | - | Optional comma-separated host:port list of your services exposing /metrics, e.g. ${{api.RAILWAY_PRIVATE_DOMAIN}}:8080. |
| `PROMETHEUS_RETENTION_SIZE` | prometheus | 4GB | Cap the TSDB size on the volume (oldest blocks go first). |
| `PROMETHEUS_RETENTION_TIME` | prometheus | 15d | Delete samples older than this. |
| `PROMETHEUS_REMOTE_WRITE_URL` | prometheus | - | Remote-write URL for other services; reference it as ${{prometheus.PROMETHEUS_REMOTE_WRITE_URL}}. |
| `PORT` | grafana | 3000 | Grafana HTTP port; /api/health is the healthcheck. |
| `LOKI_URL` | grafana | - | Loki datasource URL (private network). |
| `TEMPO_URL` | grafana | - | Tempo datasource URL (private network). |
| `PROMETHEUS_URL` | grafana | - | Prometheus datasource URL (private network). |
| `GF_DATABASE_WAL` | grafana | true | SQLite write-ahead logging for fewer lock errors. |
| `GF_SERVER_ROOT_URL` | grafana | - | Public URL used in links and redirects. |
| `GF_SECURITY_ADMIN_USER` | grafana | (secret) | Admin login, created on first start. |
| `GF_USERS_ALLOW_SIGN_UP` | grafana | false | No self sign-up; invite users from Administration. |
| `GF_DEFAULT_INSTANCE_NAME` | grafana | Grafana on Railway | Instance name shown in Grafana. |
| `GF_SECURITY_COOKIE_SECURE` | grafana | true | Session cookies only over HTTPS. |
| `GF_SECURITY_ADMIN_PASSWORD` | grafana | (secret) | Admin password, applied on first start only (change it later in Grafana). |
| `GF_ANALYTICS_REPORTING_ENABLED` | grafana | false | Do not send usage statistics to Grafana Labs. |

## Configuration

- **Healthcheck:** `/ready`
- **Volume:** `/var/tempo`
- **Healthcheck:** `/-/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/loki`
- **Volume:** `/prometheus`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/grafana`

**Category:** Observability · **Tags:** grafana, loki, tempo, prometheus, alloy · **Languages:** Shell, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/grafana-13-lgtm-observability-stack)
