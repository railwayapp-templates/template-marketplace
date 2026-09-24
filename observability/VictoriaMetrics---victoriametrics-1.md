# Deploy VictoriaMetrics on Railway

VictoriaMetrics 1.152 Prometheus-compatible metrics DB with auth and OTLP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victoriametrics-1)

## About

VictoriaMetrics is a fast, cost-efficient open-source time series database and a drop-in Prometheus replacement. It accepts metrics through Prometheus remote write, the Prometheus text format, InfluxDB line protocol and OpenTelemetry. You query it with PromQL-compatible MetricsQL from Grafana or from its built-in vmui web interface for exploring data.

This template deploys single-node VictoriaMetrics v1.152.0 with a Railway volume at `/storage` and a public domain. Every endpoint except the `/health` and `/ping` checks requires HTTP basic auth, using the `admin` user and a password generated at deploy time. Metrics are kept for 30 days by default. VictoriaMetrics compresses data heavily, so a Hobby volume (5 GB) holds a lot of metrics for small projects, but watch disk use as series grow. It also listens on Railway's private network over IPv6, so services and Grafana in the same project can reach it without the public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| victoriametrics | `victoriametrics/victoria-metrics:v1.152.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8428 |
| `enableTCP6` | true |
| `retentionPeriod` | 30d |
| `httpAuth_password` | (secret) |
| `httpAuth_username` | (secret) |

## Configuration

- **Start command:** `/victoria-metrics-prod -envflag.enable -storageDataPath=/storage`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/victoriametrics-1)
