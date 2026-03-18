# Deploy VictoriaLogs on Railway

High-performance, cost-effective, scalable, open-source logs database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/victorialogs)

## About

VictoriaLogs is a high-performance, open-source logs database designed for efficiency and ease of use. It offers exceptional data compression and low resource usage, allowing you to ingest and query massive volumes of structured and unstructured logs without the high complexity or costs associated with traditional solutions like Elasticsearch or Loki.

Hosting VictoriaLogs on Railway requires configuring the official Docker container to handle dynamic networking and persistent storage. This template automatically provisions a persistent **Railway Volume** mounted at `/victoria-logs-data` to ensure your log data survives deployments and restarts. It also utilizes a custom shell-based startup command to properly handle environment variables for basic authentication and port binding. The result is a secure, persistent, and production-ready log management instance that scales vertically with your needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VictoriaLogs | `victoriametrics/victoria-logs:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9482 | The port the VictoriaLogs instance will listen to |
| `VL_PASSWORD` | (secret) | The password for the VictoriaLogs instance |
| `VL_USERNAME` | (secret) | The username for the VictoriaLogs instance |

## Configuration

- **Start command:** `/bin/sh -c "exec /victoria-logs-prod -httpListenAddr 0.0.0.0:$PORT -storageDataPath /victoria-logs-data -retentionPeriod 30d -httpAuth.username $VL_USERNAME -httpAuth.password $VL_PASSWORD -enableTCP6=true"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/victoria-logs-data`

**Category:** Observability

[View on Railway →](https://railway.com/template/victorialogs)
