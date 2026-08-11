# Deploy Wallos subscription tracker on Railway

Protected subscription tracking with persistent budgets and logos.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallos-subscription-tracker)

## About

Wallos is a private subscription and budget tracker for recurring expenses, categories, payment methods, currencies, household members, and renewal reminders.

The template runs the immutable Wallos 5.4.2 image behind generated Basic Auth. One 5 GB volume preserves its SQLite database, setup recovery token, avatars, and uploaded subscription logos.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wallos Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| Wallos | `bellamy/wallos:latest@sha256:316f26e13265958e7946ef98ff600516fddc51d698ee98bd1ae1577e5e00789f` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Wallos Gateway | 8080 | Public gateway listener. |
| `UPSTREAM` | Wallos Gateway | - | Private Wallos endpoint. |
| `GATEWAY_CONFIG` | Wallos Gateway | :8080 {
  handle /healthz {
    rewrite * /health.php
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
} | Pinned full-application authentication policy. |
| `GATEWAY_PASSWORD` | Wallos Gateway | (secret) | Generated password protecting the complete Wallos application. |
| `GATEWAY_USERNAME` | Wallos Gateway | (secret) | Username protecting the complete Wallos application. |
| `TZ` | Wallos | UTC | Timezone used for recurring-payment jobs. |
| `PORT` | Wallos | 80 | Private Wallos HTTP listener. |

## Configuration

- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$GATEWAY_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `dumb-init -- /bin/sh -ec 'mkdir -p /var/www/html/db/logos /var/www/html/images/uploads; ln -sfn /var/www/html/db/logos /var/www/html/images/uploads/logos; exec /var/www/html/startup.sh'`
- **Healthcheck:** `/health.php`
- **Volume:** `/var/www/html/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wallos-subscription-tracker)
