# Deploy Restate durable workflows on Railway

Durable workflows and virtual objects with authenticated ingress and state.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/restate-durable-workflows)

## About

Restate is a durable execution server for resilient services, virtual objects, workflows, timers, and reliable messaging.

This template runs Restate 1.7.2 as a persistent single node with a fixed identity and a private 5 GB data volume. An authenticated Caddy gateway exposes the operator UI and an `/invoke/` route while Restate's admin, ingress, and fabric ports remain private.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Restate | `ghcr.io/restatedev/restate:1.7.2@sha256:d39111bd494dd7cf4e107c913c89e38572f454292805ad0b9a0f0485a91e4b24` | Database |
| Restate Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Restate | 9070 | Private admin listener used by Railway health checks. |
| `RESTATE_NODE_NAME` | Restate | restate-1 | Stable node identity that selects the persisted data directory; do not change after initialization. |
| `RESTATE_LISTEN_MODE` | Restate | tcp | Uses TCP listeners required by Railway private networking. |
| `RESTATE_CLUSTER_NAME` | Restate | railway-restate | Stable single-node cluster name. |
| `RESTATE_DISABLE_TELEMETRY` | Restate | true | Disables Restate telemetry by default. |
| `RESTATE_ADVERTISED_ADDRESS` | Restate | http://127.0.0.1:5122/ | Private fabric address; never expose this listener publicly. |
| `RESTATE_LOG_DISABLE_ANSI_CODES` | Restate | true | Keeps Railway logs free of terminal escape codes. |
| `RESTATE_ADMIN__ADVERTISED_ADDRESS` | Restate | - | Authenticated public gateway URL shown to operators and the Web UI. |
| `RESTATE_ROCKSDB_TOTAL_MEMORY_SIZE` | Restate | 256.0 MiB | RocksDB memory budget for this small single-node starter. |
| `RESTATE_INGRESS__ADVERTISED_ADDRESS` | Restate | - | Authenticated public invocation base URL used by the Web UI and clients. |
| `RESTATE_WORKER__INVOKER__MEMORY_LIMIT` | Restate | 256.0 MiB | Bounded service-invocation memory budget. |
| `RESTATE_ADMIN__QUERY_ENGINE__MEMORY_SIZE` | Restate | 64.0 MiB | Bounded SQL introspection query-engine memory budget. |
| `RESTATE_BIFROST__RECORD_CACHE_MEMORY_SIZE` | Restate | 64.0 MiB | Bounded durable-log record-cache memory budget. |
| `PORT` | Restate Gateway | 8080 | Caddy listener exposed through the Railway domain. |
| `ADMIN_UPSTREAM` | Restate Gateway | - | Private Restate admin/UI upstream. |
| `GATEWAY_CONFIG` | Restate Gateway | :8080 {
  handle_path /healthz {
    rewrite * /health
    reverse_proxy http://__ADMIN_UPSTREAM__
  }
  @protected not path /healthz
  basic_auth @protected {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle_path /invoke/* {
    reverse_proxy h2c://__INGRESS_UPSTREAM__ {
      header_up -Authorization
    }
  }
  handle {
    reverse_proxy http://__ADMIN_UPSTREAM__ {
      header_up -Authorization
    }
  }
} | Audited Caddy routing policy that authenticates public traffic and strips its Authorization header before journaling. |
| `GATEWAY_PASSWORD` | Restate Gateway | (secret) | Generated Basic Auth password; store it securely and rotate deliberately. |
| `GATEWAY_USERNAME` | Restate Gateway | (secret) | Basic Auth username for the UI, admin API, and invocation route. |
| `INGRESS_UPSTREAM` | Restate Gateway | - | Private Restate invocation upstream. |

## Configuration

- **Start command:** `/usr/local/bin/restate-server --auto-provision true`
- **Healthcheck:** `/health`
- **Volume:** `/restate-data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__ADMIN_UPSTREAM__|$ADMIN_UPSTREAM|g" -e "s|__INGRESS_UPSTREAM__|$INGRESS_UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/restate-durable-workflows)
