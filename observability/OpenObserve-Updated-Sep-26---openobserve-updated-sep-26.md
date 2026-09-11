# Deploy OpenObserve [Updated Sep '26] on Railway

Observability in one binary: logs, metrics, traces, RUM. Data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openobserve-updated-sep-26)

## About

OpenObserve is an open source observability platform for logs, metrics, traces,
RUM and session replay. It ships as a single Rust binary and stores data as
compressed Parquet, which is why its authors measure roughly 140x lower storage
cost than an Elasticsearch based stack for the same data.

This template runs OpenObserve v0.92.2 as one service backed by a Railway volume
mounted at `/data`. It runs in local mode, so metadata lives in an embedded
store and data lives on the volume. No Postgres, no etcd and no object storage
bucket are involved, and there is nothing to wire together after deploy.

The root user is created on first boot from two variables. You supply the login
email, the password is generated for you, and both stay visible in the service's
Variables tab so you can retrieve them at any time. Telemetry to the upstream
vendor is turned off.

Ingestion works over several protocols on the same instance: OpenTelemetry OTLP
for logs, traces and metrics, a plain JSON endpoint, Elasticsearch `_bulk` and
Loki. Most collectors and shippers you already run can point at it with only a
URL and a basic auth header changed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenObserve | `openobserve/openobserve:v0.92.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5080 | - |
| `RUST_LOG` | info | - |
| `ZO_DATA_DIR` | /data | - |
| `ZO_HTTP_PORT` | 5080 | - |
| `ZO_TELEMETRY` | false | - |
| `ZO_LOCAL_MODE` | true | - |
| `ZO_ROOT_USER_EMAIL` | admin@example.com | Login email for the OpenObserve root user. Change it to your own address. |
| `ZO_HTTP_IPV6_ENABLED` | true | - |
| `ZO_LOCAL_MODE_STORAGE` | disk | - |
| `ZO_ROOT_USER_PASSWORD` | (secret) | Root user password. Generated for you; copy it from this variable to log in. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openobserve-updated-sep-26)
