# Deploy Manyfold 3D model library on Railway

Protected Manyfold 3D library with PostgreSQL and durable models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/manyfold-3d-model-library)

## About

Organize, inspect, tag, and share 3D-printable models with durable model storage and PostgreSQL metadata. Generated gateway credentials protect the first-administrator setup flow.

This template runs Manyfold 0.147.1 with its web process and background workers, private PostgreSQL, authenticated Redis, a persistent model volume, and a public Caddy gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL | `postgres:16.10-alpine@sha256:029660641a0cfc575b14f336ba448fb8a75fd595d42e1fa316b9fb4378742297` | Database |
| Manyfold Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| Redis | `redis:8.4.0-alpine@sha256:4eec4565e45aa0b3966554c866bc73211e281b0b3d89fe9a33c982e6faca809d` | Database |
| Manyfold | `manyfold3d/manyfold:0.147.1@sha256:8ff288d34ae2a5704c9929b8284612ee8dcc4a9e5b2bd33724c99391cdff0811` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PostgreSQL | manyfold | - |
| `POSTGRES_USER` | PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) | Generated database password. |
| `PORT` | Manyfold Gateway | 8080 | - |
| `UPSTREAM` | Manyfold Gateway | - | Private Manyfold endpoint. |
| `GATEWAY_CONFIG` | Manyfold Gateway | :8080 {
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
      header_up X-Forwarded-Proto {http.request.header.X-Forwarded-Proto}
    }
  }
} | Authenticated reverse-proxy configuration. |
| `GATEWAY_PASSWORD` | Manyfold Gateway | (secret) | Generated protected setup and application password. |
| `GATEWAY_USERNAME` | Manyfold Gateway | (secret) | Protected setup and application username. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password. |
| `PGID` | Manyfold | 1000 | Non-root application group ID. |
| `PORT` | Manyfold | 3214 | - |
| `PUID` | Manyfold | 1000 | Non-root application user ID. |
| `MULTIUSER` | Manyfold | disabled | Keep the initial deployment in protected single-user mode. |
| `REDIS_URL` | Manyfold | - | Authenticated private Redis URL. |
| `PLUGINS_PATH` | Manyfold | /models | Make the model volume writable through the upstream entrypoint. |
| `REGISTRATION` | Manyfold | disabled | Keep public registration disabled. |
| `DATABASE_HOST` | Manyfold | - | Private PostgreSQL host. |
| `DATABASE_NAME` | Manyfold | manyfold | - |
| `DATABASE_PORT` | Manyfold | 5432 | - |
| `DATABASE_USER` | Manyfold | (secret) | - |
| `SECRET_KEY_BASE` | Manyfold | (secret) | Generated Rails signing and encryption secret. |
| `WEB_CONCURRENCY` | Manyfold | 1 | One Puma worker for the starter memory target. |
| `DATABASE_ADAPTER` | Manyfold | postgresql | - |
| `DATABASE_PASSWORD` | Manyfold | (secret) | Referenced PostgreSQL password. |
| `RAILS_MAX_THREADS` | Manyfold | 5 | Bound Rails threads and database connections. |
| `DEFAULT_WORKER_CONCURRENCY` | Manyfold | 2 | Bound regular scan and job concurrency. |
| `PERFORMANCE_WORKER_CONCURRENCY` | Manyfold | 1 | Run one performance worker task at a time. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -ec 'exec redis-server --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction'`
- **Healthcheck:** `/health`
- **Volume:** `/models`

**Category:** Other

[View on Railway →](https://railway.com/deploy/manyfold-3d-model-library)
