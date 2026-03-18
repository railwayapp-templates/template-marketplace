# Deploy VictoriaTraces on Railway

Database designed for storing and querying distributed tracing data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/victoriatraces)

## About

VictoriaTraces is an open-source, resource-efficient database for storing and querying distributed tracing data. Built by the VictoriaMetrics team, it uses up to 3.7x less RAM and 2.6x less CPU than alternatives like Grafana Tempo, while supporting OpenTelemetry ingestion and Jaeger-compatible querying for seamless integration with existing tools.

Hosting VictoriaTraces involves deploying its lightweight binary or Docker image, which runs as a single-node all-in-one service by default (ideal for most use cases) or in cluster mode for horizontal scaling. It ingests traces via OpenTelemetry Protocol (OTLP over HTTP/gRPC), stores them efficiently with high compression, and exposes Jaeger Query APIs plus a built-in VMUI for exploration. Configuration is done via command-line flags for retention, storage path, and optional HTTP authentication. No external dependencies like object storage or databases are required, making it simple to run on platforms like Railway with persistent volume for data and easy scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VictoriaTraces | `victoriametrics/victoria-traces` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 10428 | The port for the VictoriaTraces instance |
| `VT_PASSWORD` | (secret) | The password for the VictoriaTraces instance |
| `VT_USERNAME` | (secret) | The username for the VictoriaTraces instance |

## Configuration

- **Start command:** `/bin/sh -c "exec /victoria-traces-prod -httpListenAddr 0.0.0.0:$PORT -storageDataPath /victoria-traces-data -retentionPeriod 30d -httpAuth.username $VT_USERNAME -httpAuth.password $VT_PASSWORD -enableTCP6=true"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/victoria-traces-data`

**Category:** Observability

[View on Railway →](https://railway.com/template/victoriatraces)
