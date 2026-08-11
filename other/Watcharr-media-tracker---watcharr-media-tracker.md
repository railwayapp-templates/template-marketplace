# Deploy Watcharr media tracker on Railway

Protected movie, television, anime, and game tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/watcharr-media-tracker)

## About

Watcharr is a self-hosted tracker for movies, television, anime, and games, with personal ratings, progress, lists, and discovery metadata.

The template runs the immutable Watcharr 4.2.1 image with a 5 GB persistent data volume. A Caddy gateway guards first-administrator setup and account registration while preserving Watcharr's own JWT authentication for normal use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Watcharr Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| Watcharr | `ghcr.io/sbondco/watcharr:v4.2.1@sha256:62d24ca2fdc634f313e674a7ddba7b0fc6238a216fae9ebd6891755cd54eb1cf` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Watcharr Gateway | 8080 | Public gateway listener. |
| `UPSTREAM` | Watcharr Gateway | - | Private Watcharr endpoint. |
| `GATEWAY_CONFIG` | Watcharr Gateway | :8080 {
  handle /healthz {
    rewrite * /
    reverse_proxy http://__UPSTREAM__
  }
  @bootstrap path /api/setup* /api/auth/register*
  basic_auth @bootstrap {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle {
    reverse_proxy http://__UPSTREAM__ {
      header_up X-Forwarded-Proto {http.request.header.X-Forwarded-Proto}
    }
  }
} | Pinned selective authentication policy. |
| `GATEWAY_PASSWORD` | Watcharr Gateway | (secret) | Generated password protecting setup and registration routes. |
| `GATEWAY_USERNAME` | Watcharr Gateway | (secret) | Username protecting setup and registration routes. |
| `PORT` | Watcharr | 3000 | Bundled UI listener used by Railway health checks. |
| `WATCHARR_DATA` | Watcharr | /data | Persistent SQLite, settings, and artwork directory. |

## Configuration

- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/watcharr-media-tracker)
