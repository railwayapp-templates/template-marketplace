# Deploy InfluxDB Time Series Database on Railway

Open-source time series database for metrics and real-time analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/influxdb-time-series-database)

## About

InfluxDB is an open-source time series database purpose-built for metrics, events, and real-time analytics. It ingests high-frequency writes, retains them under configurable retention policies, and answers range and aggregation queries fast enough to sit behind a live dashboard.

Hosting InfluxDB means running a stateful database that must keep its data directory intact across restarts and redeploys, expose an HTTP API and web UI, and be initialized once with an admin user, organization, and bucket. This template handles all three: the official InfluxDB 2.x image, a persistent volume mounted at `/var/lib/influxdb2`, and first-boot initialization driven by environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| influxdb | `influxdb:2.7` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DOCKER_INFLUXDB_INIT_PASSWORD` | (secret) |
| `DOCKER_INFLUXDB_INIT_USERNAME` | (secret) |
| `DOCKER_INFLUXDB_INIT_ADMIN_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/influxdb2`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/influxdb-time-series-database)
