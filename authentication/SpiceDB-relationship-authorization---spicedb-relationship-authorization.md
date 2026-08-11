# Deploy SpiceDB relationship authorization on Railway

Durable relationship-based authorization with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spicedb-relationship-authorization)

## About

SpiceDB is an Apache-2.0 permissions database inspired by Google Zanzibar. This template runs the official non-root 1.56.0 debug image because Railway pre-deploy migrations require its shell, with PostgreSQL, generated API authentication, Watch support, and a public REST gateway with dependency-aware health checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SpiceDB Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| SpiceDB | `authzed/spicedb:v1.56.0-debug@sha256:e88fb064b4301ca058ebb83f11f7250d58f411635bf476b6196941c297bb1470` | Worker |
| Postgres | `postgres:16-alpine@sha256:57c72fd2a128e416c7fcc499958864df5301e940bca0a56f58fddf30ffc07777` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SpiceDB Gateway | 8080 | - |
| `UPSTREAM` | SpiceDB Gateway | - | Private SpiceDB REST endpoint. |
| `SPICEDB_KEY` | SpiceDB Gateway | - | Private key used only by the dependency-aware health probe. |
| `GATEWAY_CONFIG` | SpiceDB Gateway | :8080 {
  handle /healthz {
    method POST
    rewrite * /v1/schema/read
    reverse_proxy http://__UPSTREAM__ {
      header_up Authorization "Bearer __SPICEDB_KEY__"
      header_up Content-Type "application/json"
      @healthy status 200 404
      handle_response @healthy {
        respond "OK" 200
      }
    }
  }
  handle {
    reverse_proxy http://__UPSTREAM__
  }
} | Caddy REST proxy and database-aware health-check configuration. |
| `PORT` | SpiceDB | 8443 | - |
| `SPICEDB_HTTP_ADDR` | SpiceDB | :8443 | - |
| `SPICEDB_HTTP_ENABLED` | SpiceDB | true | Enables the REST gateway on port 8443. |
| `SPICEDB_DATASTORE_ENGINE` | SpiceDB | postgres | - |
| `SPICEDB_DATASTORE_CONN_URI` | SpiceDB | - | Private PostgreSQL connection used by migrations and SpiceDB. |
| `SPICEDB_GRPC_PRESHARED_KEY` | SpiceDB | - | Generated administrator bearer key for REST and gRPC clients. |
| `SPICEDB_SKIP_RELEASE_CHECK` | SpiceDB | true | - |
| `SPICEDB_TELEMETRY_ENDPOINT` | SpiceDB | - | Empty by default to disable upstream telemetry. |
| `SPICEDB_DATASTORE_CONN_POOL_READ_MAX_OPEN` | SpiceDB | 10 | - |
| `SPICEDB_DATASTORE_CONN_POOL_READ_MIN_OPEN` | SpiceDB | 2 | - |
| `SPICEDB_DATASTORE_CONN_POOL_WRITE_MAX_OPEN` | SpiceDB | 5 | - |
| `SPICEDB_DATASTORE_CONN_POOL_WRITE_MIN_OPEN` | SpiceDB | 2 | - |
| `PORT` | Postgres | 5432 | - |
| `POSTGRES_DB` | Postgres | spicedb | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `POSTGRES_INITDB_ARGS` | Postgres | -c track_commit_timestamp=on | Enables commit timestamps for the SpiceDB Watch API. |

## Configuration

- **Start command:** `/bin/sh -ec 'printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__UPSTREAM__|$UPSTREAM|g" -e "s|__SPICEDB_KEY__|$SPICEDB_KEY|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `spicedb serve`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/spicedb-relationship-authorization)
