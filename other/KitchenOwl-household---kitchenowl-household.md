# Deploy KitchenOwl household on Railway

Private household groceries, recipes, and meal planning.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kitchenowl-household)

## About

KitchenOwl is a private household organizer for groceries, recipes, meal plans, shared expenses, and family collaboration.

The template runs the immutable KitchenOwl 0.7.10 image behind an onboarding-only Caddy credential with closed public registration. One 5 GB volume preserves the SQLite database and household uploads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KitchenOwl | `tombursch/kitchenowl:v0.7.10@sha256:bd821a41b8cb27fd7fcf429acd1fc67e9f889485a2cd1193d68c2d804a8e1bef` | Database |
| KitchenOwl Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | KitchenOwl | 8080 | Private KitchenOwl HTTP listener. |
| `FRONT_URL` | KitchenOwl | - | Public gateway origin used by KitchenOwl. |
| `JWT_SECRET_KEY` | KitchenOwl | (secret) | Generated key used to sign KitchenOwl sessions. |
| `COLLECT_METRICS` | KitchenOwl | False | Disables optional upstream usage metrics. |
| `EMAIL_MANDATORY` | KitchenOwl | False | Allows username-only owner registration. |
| `OPEN_REGISTRATION` | KitchenOwl | False | Keeps public account registration disabled. |
| `PORT` | KitchenOwl Gateway | 8080 | Public onboarding gateway listener. |
| `UPSTREAM` | KitchenOwl Gateway | - | Private KitchenOwl HTTP endpoint. |
| `GATEWAY_CONFIG` | KitchenOwl Gateway | :8080 {
  handle /healthz {
    rewrite * /api/health/8M4F88S8ooi4sMbLBfkkV7ctWwgibW6V
    reverse_proxy http://__UPSTREAM__
  }
  @onboarding path /api/onboarding /api/onboarding/*
  basic_auth @onboarding {
    __USERNAME__ __PASSWORD_HASH__
  }
  handle {
    reverse_proxy http://__UPSTREAM__
  }
} | Pinned policy protecting only the onboarding endpoint. |
| `SETUP_PASSWORD` | KitchenOwl Gateway | (secret) | Generated password protecting first-owner onboarding. |
| `SETUP_USERNAME` | KitchenOwl Gateway | (secret) | Username protecting first-owner onboarding. |

## Configuration

- **Healthcheck:** `/api/health/8M4F88S8ooi4sMbLBfkkV7ctWwgibW6V`
- **Volume:** `/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$SETUP_PASSWORD")"; printf "%s\n" "$GATEWAY_CONFIG" | sed -e "s|__USERNAME__|$SETUP_USERNAME|g" -e "s|__PASSWORD_HASH__|$password_hash|g" -e "s|__UPSTREAM__|$UPSTREAM|g" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kitchenowl-household)
