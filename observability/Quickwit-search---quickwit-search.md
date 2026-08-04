# Deploy Quickwit search on Railway

Fast log and trace search with authenticated access and durable storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quickwit-search)

## About

Deploy Quickwit behind an authenticated gateway with private PostgreSQL metadata, durable Railway Bucket index storage, and a persistent Ingest V2 WAL.

Quickwit is an Apache-2.0 search engine built for logs and traces. This template runs its search, indexing, control-plane, metastore, and janitor roles in one private service, while an authenticated gateway provides public UI and REST access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Quickwit Gateway | `caddy:2.10-alpine@sha256:4c6e91c6ed0e2fa03efd5b44747b625fec79bc9cd06ac5235a779726618e530d` | Web service |
| Quickwit | `quickwit/quickwit:0.9.0@sha256:1e6169bf4e98a489fca397105f1698c1d80a0f9779f3cf652973bac8a0c3b2bd` | Database |
| Quickwit PostgreSQL | `postgres:17-alpine@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Quickwit Gateway | 8080 | - |
| `QUICKWIT_PASSWORD` | Quickwit Gateway | (secret) | Generated password required by the public Basic Auth gateway. |
| `QUICKWIT_UPSTREAM` | Quickwit Gateway | - | Private Quickwit REST and UI endpoint. |
| `QUICKWIT_USERNAME` | Quickwit Gateway | (secret) | Username required by the public Basic Auth gateway. |
| `PORT` | Quickwit | 7280 | - |
| `QW_NODE_ID` | Quickwit | quickwit-1 | - |
| `QW_DATA_DIR` | Quickwit | /quickwit/qwdata | - |
| `QW_CLUSTER_ID` | Quickwit | quickwit-railway | - |
| `QW_S3_ENDPOINT` | Quickwit | - | S3-compatible Railway Bucket endpoint. |
| `QW_METASTORE_URI` | Quickwit | - | Private PostgreSQL connection used for index and source metadata. |
| `AWS_ACCESS_KEY_ID` | Quickwit | - | Railway Bucket access key. |
| `QW_LISTEN_ADDRESS` | Quickwit | 0.0.0.0 | - |
| `QW_REST_LISTEN_PORT` | Quickwit | 7280 | - |
| `AWS_SECRET_ACCESS_KEY` | Quickwit | (secret) | Railway Bucket secret key. |
| `QW_ENABLE_OTLP_ENDPOINT` | Quickwit | false | - |
| `QW_DEFAULT_INDEX_ROOT_URI` | Quickwit | - | Railway Bucket prefix used for committed index splits. |
| `QW_ENABLE_JAEGER_ENDPOINT` | Quickwit | false | - |
| `QW_S3_FORCE_PATH_STYLE_ACCESS` | Quickwit | true | - |
| `POSTGRES_DB` | Quickwit PostgreSQL | quickwit | - |
| `POSTGRES_USER` | Quickwit PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Quickwit PostgreSQL | (secret) | Generated password for the private Quickwit metadata database. |

## Configuration

- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$QUICKWIT_PASSWORD")"; printf '"'"':8080 {\n handle /healthz {\n  respond "ok" 200\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s\n }\n}\n'"'"' "$QUICKWIT_USERNAME" "$password_hash" "$QUICKWIT_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/bin/bash -ec "sed -i 's/^#   split_store_max_num_bytes: 100G/  split_store_max_num_bytes: 1G/; s/^# ingest_api:/ingest_api:/; s/^#   max_queue_memory_usage: 2GiB/  max_queue_memory_usage: 512MiB/; s/^#   max_queue_disk_usage: 4GiB/  max_queue_disk_usage: 2GiB/' /quickwit/config/quickwit.yaml; exec quickwit run"`
- **Healthcheck:** `/health/readyz`
- **Volume:** `/quickwit/qwdata`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/quickwit-search)
