# Deploy SigNoz on Railway

SigNoz is an single tool for APM, logs, traces, metrics & alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/signoz)

## About

[SigNoz](https://signoz.io) is an open-source observability platform that lets you collect, store, and analyze your application's **traces, metrics, and logs** using the OpenTelemetry standard.

Deploying this template provisions the SigNoz stack:

- **SigNoz** (UI and query service)
- **SigNoz OpenTelemetry Collector** (ingester)
- **ClickHouse** (telemetry store)
- **ClickHouse Keeper** (coordination)
- **Schema migrator** (one-time job that prepares the ClickHouse schema)

The template wires these services together with the environment variables, health checks, and persistent storage they need. Point your application's OpenTelemetry SDK or agent at the collector's ingest endpoint, and SigNoz begins visualizing your service dependencies, latency, and errors.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| signoz-telemetrystore-migrator | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /deployment/telemetrystore-migrator) | Worker |
| signoz-signoz | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /deployment/signoz) | Web service |
| signoz-telemetrykeeper-clickhousekeeper | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /deployment/telemetrykeeper) | Database |
| signoz-telemetrystore-clickhouse | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /deployment/telemetrystore) | Database |
| signoz-ingester | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /deployment/ingester) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | signoz-signoz | 8080 |
| `PORT` | signoz-telemetrykeeper-clickhousekeeper | 9182 |
| `PORT` | signoz-telemetrystore-clickhouse | 8123 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/signoz/`
- **Volume:** `/var/lib/clickhouse-keeper/`
- **Volume:** `/var/lib/clickhouse/`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/signoz)
