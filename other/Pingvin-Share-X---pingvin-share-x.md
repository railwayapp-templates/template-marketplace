# Deploy Pingvin Share X on Railway

Protected Pingvin file sharing with durable uploads and accounts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pingvin-share-x)

## About

Run a protected file-sharing service with expiring links, user accounts, share passwords, and durable uploads. A generated gateway credential protects first-user setup before Pingvin's application authentication takes over.

This template runs Pingvin Share X 1.22.1 on private networking with a 5,000 MB data volume. Caddy is the only public service and checks Pingvin's database-aware health endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pingvin Share X | `smp46/pingvin-share-x:v1.22.1@sha256:38480232d3ec26858e0313e09584b662fde356a32aaf83f6270f26c5414065ec` | Database |
| Pingvin Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGID` | Pingvin Share X | 1000 | Non-root application group ID. |
| `PUID` | Pingvin Share X | 1000 | Non-root application user ID. |
| `TRUST_PROXY` | Pingvin Share X | true | Trust Railway and the authenticated gateway forwarding headers. |
| `PORT` | Pingvin Gateway | 8080 | - |
| `UPSTREAM` | Pingvin Gateway | - | Private Pingvin endpoint. |
| `GATEWAY_CONFIG` | Pingvin Gateway | :8080 {
  handle /healthz {
    rewrite * /api/health
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
} | Authenticated reverse-proxy configuration. |
| `GATEWAY_PASSWORD` | Pingvin Gateway | (secret) | Generated-bootstrap gateway password. |
| `GATEWAY_USERNAME` | Pingvin Gateway | (secret) | Generated-bootstrap gateway username. |

## Configuration

- **Healthcheck:** `/api/health`
- **Volume:** `/opt/app/backend/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/pingvin-share-x)
