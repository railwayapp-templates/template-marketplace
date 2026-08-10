# Deploy Gigapipe observability on Railway

Protected Gigapipe logs, metrics, traces, and profiles.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gigapipe-observability)

## About

Gigapipe is an open-source polyglot observability service, formerly qryn, that accepts and queries logs, metrics, traces, and profiles through familiar telemetry APIs. This template pairs its embedded explorer and API service with durable ClickHouse storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:26.3.16.16-alpine@sha256:b45ab149f0d331b944b4aa2ccdd47d0242238fd39e68ec524ad63338e4b9d8f8` | Database |
| Gigapipe Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| Gigapipe | `ghcr.io/metrico/gigapipe:v5.1.1@sha256:2392ec7f1b1c4e6eecf5565ccf74a8eb3b8d46b7f0fb952e4d765e00e23626a7` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ClickHouse | 8123 | - |
| `CLICKHOUSE_DB` | ClickHouse | gigapipe | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Generated password for private observability storage. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | - |
| `PORT` | Gigapipe Gateway | 8080 | - |
| `GATEWAY_CONFIG` | Gigapipe Gateway | :8080 {
  handle /healthz {
    rewrite * /ready
    reverse_proxy http://__UPSTREAM__ {
      header_up Authorization "Basic __UPSTREAM_AUTH__"
    }
  }
  @protected not path /healthz
  basic_auth @protected {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle {
    reverse_proxy http://__UPSTREAM__
  }
} | - |
| `GATEWAY_PASSWORD` | Gigapipe Gateway | (secret) | - |
| `GATEWAY_USERNAME` | Gigapipe Gateway | (secret) | - |
| `PORT` | Gigapipe | 3100 | - |
| `LOG_LEVEL` | Gigapipe | info | - |
| `QRYN_LOGIN` | Gigapipe | (secret) | Username for the explorer and telemetry APIs. |
| `SAMPLES_DAYS` | Gigapipe | 14 | Retention period for logs, metrics, traces, and profiles. |
| `QRYN_PASSWORD` | Gigapipe | (secret) | Generated password for the explorer and telemetry APIs. |
| `CLICKHOUSE_PORT` | Gigapipe | 9000 | - |

## Configuration

- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; upstream_auth="$(printf "%s:%s" "$GATEWAY_USERNAME" "$GATEWAY_PASSWORD" | base64 | tr -d "\n")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM_AUTH__|$upstream_auth|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/gigapipe-observability)
