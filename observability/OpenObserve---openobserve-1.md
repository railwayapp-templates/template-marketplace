# Deploy OpenObserve on Railway

OpenObserve 1.0 logs, metrics and traces platform with SQL and OTLP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openobserve-1)

## About

OpenObserve is an open-source observability platform for logs, metrics, traces, real user monitoring and dashboards. It ingests OpenTelemetry, Elasticsearch, Loki, Prometheus and JSON data, stores it in compressed columnar files, and lets you search with SQL or PromQL, build dashboards, and set alerts from one web UI.

This template deploys OpenObserve v1.0.3 in single-node mode from the official image, with data on a Railway volume. The root user is created from environment variables with a generated password that meets OpenObserve's complexity rules. Every API and UI request needs authentication, and telemetry is off. Data older than 30 days is removed by compaction. The server listens on IPv4 and IPv6, so applications and OpenTelemetry collectors on Railway send data over the private network. It fits the Hobby plan for small volumes. Use ingestion-only service accounts for applications instead of the root user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openobserve | `openobserve/openobserve:v1.0.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5080 |
| `ZO_DATA_DIR` | /data |
| `ZO_HTTP_PORT` | 5080 |
| `ZO_TELEMETRY` | false |
| `ZO_ROOT_USER_EMAIL` | admin@example.com |
| `ZO_HTTP_IPV6_ENABLED` | true |
| `ZO_ROOT_USER_PASSWORD` | (secret) |
| `ZO_COMPACT_DATA_RETENTION_DAYS` | 30 |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openobserve-1)
