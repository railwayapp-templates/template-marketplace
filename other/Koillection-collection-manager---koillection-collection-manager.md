# Deploy Koillection collection manager on Railway

Protected collection management with PostgreSQL and durable uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/koillection-collection-manager)

## About

Koillection is a flexible self-hosted collection manager for books, games, media, stamps, equipment, and other physical or digital collections with custom metadata and uploads.

The template runs immutable Koillection 1.8.3, private PostgreSQL 16, durable database and upload volumes, and a public gateway. Generated gateway credentials protect first-owner setup and all later registration while normal application login and bearer APIs remain available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Koillection | `koillection/koillection:1.8.3@sha256:9648cd4e2bb97351f1e7b27787e2ec1ff537f18180b97df7988aa50cf9b38625` | Database |
| Koillection PostgreSQL | `postgres:16.10-alpine@sha256:029660641a0cfc575b14f336ba448fb8a75fd595d42e1fa316b9fb4378742297` | Database |
| Koillection Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Koillection | 80 | Private HTTP listener. |
| `PHP_TZ` | Koillection | UTC | Application timezone. |
| `APP_ENV` | Koillection | prod | Production runtime mode. |
| `DB_HOST` | Koillection | - | Private PostgreSQL hostname. |
| `DB_NAME` | Koillection | koillection | Application database name. |
| `DB_PORT` | Koillection | 5432 | Private PostgreSQL port. |
| `DB_USER` | Koillection | (secret) | Application database user. |
| `APP_DEBUG` | Koillection | 0 | Disables debug output. |
| `DB_DRIVER` | Koillection | pdo_pgsql | PostgreSQL database driver. |
| `APP_SECRET` | Koillection | (secret) | Generated session secret. |
| `DB_VERSION` | Koillection | 16 | PostgreSQL compatibility major. |
| `DB_PASSWORD` | Koillection | (secret) | Reference to the generated database password. |
| `HTTPS_ENABLED` | Koillection | 1 | Uses secure session cookies behind Railway TLS. |
| `JWT_PASSPHRASE` | Koillection | - | Generated API signing-key passphrase. |
| `PHP_MEMORY_LIMIT` | Koillection | 512M | Bounded PHP memory limit. |
| `UPLOAD_MAX_FILESIZE` | Koillection | 100M | Maximum uploaded file size. |
| `POSTGRES_DB` | Koillection PostgreSQL | koillection | Application database. |
| `POSTGRES_USER` | Koillection PostgreSQL | (secret) | Application database user. |
| `POSTGRES_PASSWORD` | Koillection PostgreSQL | (secret) | Generated database password. |
| `PORT` | Koillection Gateway | 8080 | Public gateway listener. |
| `UPSTREAM` | Koillection Gateway | - | Private Koillection endpoint. |
| `GATEWAY_CONFIG` | Koillection Gateway | :8080 {
  handle /healthz {
    rewrite * /api
    reverse_proxy http://__UPSTREAM__
  }
  @bootstrap path /first-connection* /register*
  basic_auth @bootstrap {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle {
    reverse_proxy http://__UPSTREAM__ {
      header_up X-Forwarded-Proto {http.request.header.X-Forwarded-Proto}
    }
  }
} | Pinned bootstrap-only authentication policy. |
| `GATEWAY_PASSWORD` | Koillection Gateway | (secret) | Generated bootstrap and registration password. |
| `GATEWAY_USERNAME` | Koillection Gateway | (secret) | Username protecting first-owner setup and registration. |

## Configuration

- **Start command:** `/bin/bash -ec 'until (echo >/dev/tcp/$DB_HOST/$DB_PORT) 2>/dev/null; do sleep 2; done; exec /app/public/docker/entrypoint.sh'`
- **Healthcheck:** `/api`
- **Volume:** `/uploads`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/koillection-collection-manager)
