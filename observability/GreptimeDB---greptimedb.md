# Deploy GreptimeDB on Railway

GreptimeDB 1.2 observability database for metrics, logs and traces.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/greptimedb)

## About

GreptimeDB is an open-source observability database that stores metrics, logs and traces in one engine and queries them with SQL and PromQL. It ingests Prometheus remote write, OpenTelemetry, InfluxDB line protocol, Loki and Elasticsearch formats, and speaks the MySQL and PostgreSQL wire protocols, so Grafana and existing drivers work.

This template deploys GreptimeDB v1.2.1 in standalone mode with its data on a Railway volume. Authentication is enabled with a static `admin` user and a password generated at deploy time, and applies to HTTP, MySQL and Postgres. The HTTP API and web dashboard are on the public domain, and the PostgreSQL protocol is exposed through a Railway TCP proxy. All protocols also listen privately on IPv4 and IPv6. The health endpoint is open for Railway's health check. Storage grows with data; watch the volume on the Hobby plan. Back up the volume regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| greptimedb | `greptime/greptimedb:v1.2.1` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4000 |
| `GREPTIME_PASSWORD` | (secret) |
| `GREPTIME_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -c 'exec greptime standalone start --data-home /greptimedb_data --http-addr "[::]:4000" --grpc-bind-addr "[::]:4001" --mysql-addr "[::]:4002" --postgres-addr "[::]:4003" --user-provider "static_user_provider:cmd:$GREPTIME_USERNAME=$GREPTIME_PASSWORD"'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 4003
- **Volume:** `/greptimedb_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/greptimedb)
