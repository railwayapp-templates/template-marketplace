# Deploy Apprise notification gateway on Railway

Authenticated Apprise gateway with persistent notification routes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apprise-notification-gateway)

## About

Route alerts from jobs and applications to more than one hundred notification services through a small authenticated API. Saved Apprise configurations and attachments survive redeploys on a Railway volume.

This template runs Apprise API 1.5.1 privately and exposes only a Caddy gateway protected by generated Basic Auth. The public health route checks Apprise storage readiness without exposing the notification API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Apprise API | `caronc/apprise:1.5.1@sha256:1871ed736799f6320d5061b72a60507f62c8747026e830175dc4b9f8adbf78dd` | Database |
| Apprise Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Apprise API | 8000 | - |
| `APPRISE_ADMIN` | Apprise API | y | Enable the configuration UI. |
| `APPRISE_ATTACH_DIR` | Apprise API | /config/attach | Attachment directory inside the persistent volume. |
| `APPRISE_CONFIG_DIR` | Apprise API | /config | Persistent configuration directory. |
| `APPRISE_STORAGE_DIR` | Apprise API | /config/store | Persistent Apprise cache and state directory. |
| `APPRISE_WORKER_COUNT` | Apprise API | 1 | Bound background notification workers for a small service. |
| `APPRISE_STATEFUL_MODE` | Apprise API | simple | Store named notification configurations on disk. |
| `PORT` | Apprise Gateway | 8080 | - |
| `UPSTREAM` | Apprise Gateway | - | Private Apprise endpoint. |
| `GATEWAY_CONFIG` | Apprise Gateway | :8080 {
  handle /healthz {
    rewrite * /status
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
| `GATEWAY_PASSWORD` | Apprise Gateway | (secret) | Generated public UI and API password. |
| `GATEWAY_USERNAME` | Apprise Gateway | (secret) | Public UI and API username. |

## Configuration

- **Healthcheck:** `/status`
- **Volume:** `/config`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/apprise-notification-gateway)
