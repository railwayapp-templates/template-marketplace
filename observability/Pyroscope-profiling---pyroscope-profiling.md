# Deploy Pyroscope profiling on Railway

Protected continuous profiling with durable Pyroscope storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pyroscope-profiling)

## About

Grafana Pyroscope stores continuous CPU and memory profiles and renders flamegraphs over time. This template runs the official 2.0.2 single-binary release with a protected UI, protected ingestion APIs, and durable profile storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pyroscope | `grafana/pyroscope:2.0.2@sha256:644515bfa06cb3779b8666514b1bab2295bd11f1e1a53834bd9584a43f77c4f5` | Database |
| Pyroscope Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Pyroscope | 4040 | - |
| `PORT` | Pyroscope Gateway | 8080 | - |
| `GATEWAY_CONFIG` | Pyroscope Gateway | :8080 {
  handle /healthz {
    rewrite * /ready
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
| `GATEWAY_PASSWORD` | Pyroscope Gateway | (secret) | Generated profile UI and ingestion password. |
| `GATEWAY_USERNAME` | Pyroscope Gateway | (secret) | Profile UI and ingestion username. |

## Configuration

- **Start command:** `/usr/bin/pyroscope -config.file=/etc/pyroscope/config.yaml -pyroscopedb.data-path=/data -compactor.data-dir=/data/compactor -metastore.data-dir=/data/metastore/data -metastore.raft.dir=/data/metastore/raft -metastore.raft.snapshots-dir=/data/metastore/snapshots -embedded-grafana.data-path=/data/grafana -pyroscopedb.retention-policy-min-free-disk-gb=1 -retention-period=14d -self-profiling.disable-push=true`
- **Healthcheck:** `/ready`
- **Volume:** `/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/pyroscope-profiling)
