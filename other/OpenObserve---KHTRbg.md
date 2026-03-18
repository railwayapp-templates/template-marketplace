# Deploy OpenObserve on Railway

Full stack observability​

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/KHTRbg)

## About

<p align="center">
    <a href="https://openobserve.ai/">
        <img alt="chatwoot logo" src="https://openobserve.ai/img/logo/logo_horizontal.svg" style="border-radius: 5px; width: 800px;">
    </a>
</p>

<h3 align="center">Full stack observability</h3><br>

OpenObserve is a cloud native observability platform built specifically for logs, metrics, traces, analytics, RUM (Real User Monitoring - Performance, Errors, Session Replay) designed to work at petabyte scale.

It is very simple and easy to operate as opposed to Elasticsearch which requires a couple dozen knobs to understand and tune which you can get up and running in under 2 minutes.

It is a drop-in replacement for Elasticsearch if you are just ingesting data using APIs and searching using kibana (Kibana is not supported nor required with OpenObserve. OpenObserve provides its own UI which does not require separate installation unlike kibana).

## Features:

Some of the features are:

1. Logs, Metrics, Traces 
1. OpenTelemetry support for logs, metrics traces (OTLP)
1. RUM (Real user Monitoring) - Performance, Errors, Session Replay
1. Alerts, Dashboards (14 different chart types (time series, bar, geo maps, heatmap, scatter, table, pie, etc.)
1. Ingest and Query functions to aid advanced capabilities like enrichment, redaction, log reduction, compliance, etc. e.g. you can use ingest functions to redact sensitive data like email IDs, AWS keys, etc. from logs before the get stored in logs.
1. Advanced Embedded GUI
1. SQL for Logs and Traces. SQL and PromQL for metrics. No need to learn yet another query language.
1. Single binary for installation &amp; running. Binaries available under [releases](https://github.com/openobserve/openobserve/releases) for multiple platforms.
1. Storage in local Disk, s3, MinIO, GCS, Azure Blob Storage
1. High availability and clustering
1. Drop in replacement for elasticsearch
1. Dynamic Schema
1. Out of the box authentication
1. Vastly easier to operate
1. Seamless upgrades
1. UI in 11 supported languages (English, Turkish, German, French, Spanish, Portuguese, Chinese, Japanese, Korean, Italian, Dutch)

# Screenshots

## Home

![Home](https://github.com/openobserve/openobserve/raw/main/screenshots/zo_home.png)

## Logs

![Home](https://github.com/openobserve/openobserve/raw/main/screenshots/logs.webp)


## Visualization and dashboard

![Dashboard](https://github.com/openobserve/openobserve/raw/main/screenshots/dashboard.png)

## Alerts

### Real time alerts

![Alerts Realtime](https://github.com/openobserve/openobserve/raw/main/screenshots/alert_realtime.jpg)

### Scheduled alerts

![Alerts Scheduled](https://github.com/openobserve/openobserve/raw/main/screenshots/alert_scheduled.jpg)

## Streams

![Home](https://github.com/openobserve/openobserve/raw/main/screenshots/zo_streams.png)

## Ingestion

![Home](https://github.com/openobserve/openobserve/raw/main/screenshots/ingestion.webp)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenObserve | `openobserve/openobserve` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5080 | The port OpenObserve listens on |
| `ZO_DATA_DIR` | - | Data directory |
| `ZO_ENDPOINT` | - | Public endpoint |
| `ZO_TELEMETRY` | false | Send anonymous telemetry info for improving OpenObserve |
| `ZO_ROOT_USER_EMAIL` | - | Email of first/super admin user |
| `ZO_PRIVATE_ENDPOINT` | - | Private endpoint |
| `ZO_HTTP_IPV6_ENABLED` | true | Enable IPv6 support |
| `ZO_ROOT_USER_PASSWORD` | (secret) | Password for first/super admin user |

## Configuration

- **Healthcheck:** `/web/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/KHTRbg)
