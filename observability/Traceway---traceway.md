# Deploy Traceway on Railway

OpenTelemetry observability with persistent single-node storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traceway)

## About

Traceway is an OpenTelemetry-native observability platform for logs, traces, metrics, session replay, exceptions, AI tracing, and on-call alerting. This template deploys the first-party `v1.9.11-sqlite` image as a durable, single-node Railway service.

Open the generated public domain and register the first account. That account becomes the owner of the self-hosted organization; later users should be invited from inside Traceway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| traceway | `ghcr.io/tracewayapp/traceway:v1.9.11-sqlite` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8082 | Port used by Railway networking and health checks. Keep it aligned with PORTS. |
| `PORTS` | 8082 | HTTP listener used by Traceway. Keep it aligned with Railway PORT. |
| `JWT_SECRET` | (secret) | Random 64-character session-signing key generated per deployment. Do not rotate it on an existing deployment. |
| `APP_BASE_URL` | - | Public HTTPS origin used in reset and notification links. Keep the Traceway service reference unchanged. |
| `SQLITE_RETENTION_DAYS` | 30 | Days to retain SQLite telemetry rows. Set to 0 only to disable pruning. |
| `SESSION_RECORDING_RETENTION_DAYS` | 30 | Days to retain local session recordings under /data. Set to 0 only to disable pruning. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/traceway)
