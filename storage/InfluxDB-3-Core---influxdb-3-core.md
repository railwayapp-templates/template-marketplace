# Deploy InfluxDB 3 Core on Railway

Authenticated InfluxDB 3 Core with persistent Railway storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/influxdb-3-core)

## About

Deploy InfluxDB 3 Core v3.10.0 as one authenticated service with a persistent
`/data` volume.

This package generates a 64-character external bearer token and creates a
separate internal admin token that never leaves the volume. It exposes an
unauthenticated `/healthz` endpoint only for deployment health checks and runs
the steady-state database as UID/GID 1500.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| influxdb3-core | [l4time/railway-influxdb3-core-template](https://github.com/l4time/railway-influxdb3-core-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8181 | Internal HTTP port fixed to 8181; no user action required. |
| `INFLUXDB3_EXTERNAL_BEARER_TOKEN` | (secret) | 64-character generated bearer used for external API authentication; keep secret. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Go, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/influxdb-3-core)
