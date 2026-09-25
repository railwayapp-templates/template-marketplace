# Deploy VictoriaLogs on Railway

VictoriaLogs 1.52 fast log database with LogsQL, Loki and OTLP ingestion.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victorialogs-1)

## About

VictoriaLogs is a fast, resource-efficient open-source log database from the VictoriaMetrics team. It ingests logs through Elasticsearch, Loki, OpenTelemetry, syslog and JSON line APIs, stores them compactly with high-cardinality fields, and queries them with LogsQL from a built-in web UI, Grafana or the HTTP API.

This template deploys VictoriaLogs v1.52.0 from the official image with its data on a Railway volume. Built-in HTTP basic authentication with a generated password protects ingestion, queries and the web UI, while `/health` stays open for Railway. Logs are kept for 14 days and total disk use is capped at 4 GiB, so the volume stays within the Hobby limit; raise both for more history. The server listens on IPv4 and IPv6, so shippers on Railway send logs over the private network. A single small service handles ingestion, storage, queries and the UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| victorialogs | `victoriametrics/victoria-logs:v1.52.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9428 |
| `VL_PASSWORD` | (secret) |
| `VL_USERNAME` | (secret) |
| `VL_RETENTION` | 14d |
| `VL_MAX_DISK_SPACE` | 4GiB |

## Configuration

- **Start command:** `/victoria-logs-prod -storageDataPath=/vlogs -httpListenAddr=:9428 -enableTCP6 -retentionPeriod=%{VL_RETENTION} -retention.maxDiskSpaceUsageBytes=%{VL_MAX_DISK_SPACE} -httpAuth.username=%{VL_USERNAME} -httpAuth.password=%{VL_PASSWORD}`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/vlogs`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/victorialogs-1)
