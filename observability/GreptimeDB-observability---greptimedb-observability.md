# Deploy GreptimeDB observability on Railway

Authenticated GreptimeDB for durable metrics, logs, and traces.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/greptimedb-observability)

## About

GreptimeDB is an Apache-2.0 time-series database for metrics, logs, and traces. This template runs the official 1.1.4 standalone image with its embedded query dashboard, native authentication, and a persistent 5 GB volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GreptimeDB | `greptime/greptimedb:v1.1.4@sha256:9726587eac95d0360755254cd59a528dbf48abfdf268478aea6a644f62afe44c` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4000 | - |
| `GREPTIME_PASSWORD` | (secret) | Generated database and dashboard password. |
| `GREPTIME_USERNAME` | (secret) | Database and dashboard username. |
| `GREPTIMEDB_STANDALONE__ENABLE_TELEMETRY` | false | - |

## Configuration

- **Start command:** `/bin/bash -ec 'umask 077; printf "%s=%s\n" "$GREPTIME_USERNAME" "$GREPTIME_PASSWORD" >/tmp/greptimedb-users; exec greptime standalone start --http-addr 0.0.0.0:4000 --grpc-bind-addr 0.0.0.0:4001 --mysql-addr 0.0.0.0:4002 --postgres-addr 0.0.0.0:4003 --data-home /greptimedb_data --user-provider static_user_provider:file:/tmp/greptimedb-users'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/greptimedb_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/greptimedb-observability)
