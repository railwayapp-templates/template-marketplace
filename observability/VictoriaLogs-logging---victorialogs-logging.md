# Deploy VictoriaLogs logging on Railway

Authenticated VictoriaLogs with durable 14-day log storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victorialogs-logging)

## About

VictoriaLogs ingests and queries structured logs through Elasticsearch, Loki, OpenTelemetry, and native HTTP APIs. This template runs the official 1.52.0 single-node release with a protected UI and 14-day durable retention.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VictoriaLogs | `victoriametrics/victoria-logs:v1.52.0@sha256:47b820890d64c4575a2a0a46415dcd8a4fd59a0f1fcd6a377693d7aea639442e` | Database |
| VictoriaLogs Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | VictoriaLogs | 9428 | - |
| `PORT` | VictoriaLogs Gateway | 8080 | - |
| `GATEWAY_CONFIG` | VictoriaLogs Gateway | :8080 {
  handle /healthz {
    rewrite * /health
    reverse_proxy http://__UPSTREAM__
  }
  @protected not path /healthz
  basic_auth @protected {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle {
    reverse_proxy http://__UPSTREAM__ {
      header_up -Authorization
    }
  }
} | - |
| `GATEWAY_PASSWORD` | VictoriaLogs Gateway | (secret) | Generated log UI and ingestion password. |
| `GATEWAY_USERNAME` | VictoriaLogs Gateway | (secret) | Log UI and ingestion username. |

## Configuration

- **Start command:** `/victoria-logs-prod -storageDataPath=/vlogs -retentionPeriod=14d -loggerFormat=json`
- **Healthcheck:** `/health`
- **Volume:** `/vlogs`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/victorialogs-logging)
