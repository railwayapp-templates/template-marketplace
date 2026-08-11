# Deploy ezBookkeeping finance on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ezbookkeeping-finance)

## About

ezBookkeeping is a lightweight personal finance application for accounts, transactions, imports, reports, budgeting insights, two-factor authentication, and optional OIDC.

The template runs the immutable ezBookkeeping 1.6.1 image with SQLite and uploaded files consolidated under one 5 GB volume. A Caddy gateway protects account registration with a generated credential while leaving normal application bearer authentication untouched.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ezBookkeeping | `mayswind/ezbookkeeping:1.6.1@sha256:6d71a0d0f62806f609634886d0cbe9133e8177e1cb76b569d8dcc0587f734f0a` | Database |
| ezBookkeeping Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ezBookkeeping | 8080 | Private application listener. |
| `EBK_LOG_MODE` | ezBookkeeping | console | Writes application logs to Railway. |
| `EBK_SERVER_DOMAIN` | ezBookkeeping | - | Public gateway domain. |
| `EBK_SERVER_PROTOCOL` | ezBookkeeping | http | Private HTTP listener behind the HTTPS gateway. |
| `EBK_SERVER_ROOT_URL` | ezBookkeeping | - | Canonical public HTTPS application URL. |
| `EBK_DATABASE_DB_PATH` | ezBookkeeping | /ezbookkeeping/data/ezbookkeeping.db | SQLite database path beneath the persistent volume. |
| `EBK_SERVER_HTTP_PORT` | ezBookkeeping | 8080 | ezBookkeeping HTTP listener. |
| `EBK_SECURITY_SECRET_KEY` | ezBookkeeping | (secret) | Generated token and session signing secret. |
| `EBK_AUTH_ENABLE_REGISTER` | ezBookkeeping | true | Keeps registration available only through the protected gateway route. |
| `EBK_STORAGE_LOCAL_FILESYSTEM_PATH` | ezBookkeeping | /ezbookkeeping/data | Uploaded-file path beneath the persistent volume. |
| `PORT` | ezBookkeeping Gateway | 8080 | Public gateway listener. |
| `UPSTREAM` | ezBookkeeping Gateway | - | Private ezBookkeeping endpoint. |
| `GATEWAY_CONFIG` | ezBookkeeping Gateway | :8080 {
  handle /healthz {
    rewrite * /healthz.json
    reverse_proxy http://__UPSTREAM__
  }
  @registration path /api/register.json
  basic_auth @registration {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle {
    reverse_proxy http://__UPSTREAM__
  }
} | Fixed registration-only authentication policy. |
| `SETUP_PASSWORD` | ezBookkeeping Gateway | (secret) | Generated registration-gateway password. |
| `SETUP_USERNAME` | ezBookkeeping Gateway | (secret) | Registration-gateway username. |

## Configuration

- **Start command:** `/bin/sh -ec 'chown 1000:1000 /ezbookkeeping/data; exec su -s /bin/sh ezbookkeeping -c "exec /docker-entrypoint.sh"'`
- **Healthcheck:** `/healthz.json`
- **Volume:** `/ezbookkeeping/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$SETUP_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$SETUP_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/ezbookkeeping-finance)
