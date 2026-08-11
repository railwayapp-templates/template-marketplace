# Deploy ConvertX file converter on Railway

Protected ConvertX conversion with persistent accounts and history.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convertx-file-converter)

## About

ConvertX is a self-hosted online file converter supporting more than one thousand source and target formats through FFmpeg, ImageMagick, LibreOffice, Pandoc, Calibre, and other bundled tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ConvertX Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| ConvertX | `ghcr.io/c4illin/convertx:v0.18.0@sha256:b515b04bfd25298a5cdc775b2fcd48b9399bab658ce13e2598b65df1b16098c8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ConvertX Gateway | 8080 | - |
| `GATEWAY_CONFIG` | ConvertX Gateway | :8080 {
  handle /healthz {
    rewrite * /healthcheck
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
| `GATEWAY_PASSWORD` | ConvertX Gateway | (secret) | Generated public converter gateway password. |
| `GATEWAY_USERNAME` | ConvertX Gateway | (secret) | Public converter gateway username. |
| `PORT` | ConvertX | 3000 | - |
| `JWT_SECRET` | ConvertX | (secret) | Generated session-signing secret. |
| `MAX_CONVERT_PROCESS` | ConvertX | 2 | Maximum parallel conversion processes. |
| `ACCOUNT_REGISTRATION` | ConvertX | false | - |
| `ALLOW_UNAUTHENTICATED` | ConvertX | false | - |

## Configuration

- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthcheck`
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convertx-file-converter)
