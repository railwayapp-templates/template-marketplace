# Deploy Centrifugo on Railway on Railway

Single-node Centrifugo with private API access and generated secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/centrifugo-on-railway)

## About

Centrifugo is an open-source realtime messaging server for authenticated WebSocket and related client transports. This template deploys one always-on Centrifugo 6.9.2 service from an image pinned by tag and digest.

The template exposes authenticated client transports on port 8000 and keeps the HTTP API, admin, and true health listener private on port 9000. Railway generates the client HMAC, API key, admin password, and admin-session secret. The deployment uses the ephemeral memory engine and creates no database, Redis, volume, Bucket, gateway, worker, or scheduler.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| centrifugo | [l4time/railway-centrifugo-template](https://github.com/l4time/railway-centrifugo-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Required Railway public and health port. Fixed at 8000. |
| `CENTRIFUGO_ADMIN_SECRET` | (secret) | Generated secret for signing admin sessions. Keep private. |
| `CENTRIFUGO_HTTP_API_KEY` | (secret) | Generated key for trusted-backend private API calls. Keep private. |
| `CENTRIFUGO_INIT_ENABLED` | true | Enables the public-safe /connection/init health endpoint. Fixed true. |
| `CENTRIFUGO_ADMIN_ENABLED` | true | Enables admin on the private internal listener only. Fixed true. |
| `CENTRIFUGO_ADMIN_EXTERNAL` | false | Keeps admin off the public listener. Must remain false. |
| `CENTRIFUGO_ADMIN_INSECURE` | false | Requires secure admin authentication. Must remain false. |
| `CENTRIFUGO_ADMIN_PASSWORD` | (secret) | Generated password for private admin login. Keep private. |
| `CENTRIFUGO_HEALTH_ENABLED` | true | Enables true health on private port 9000. Fixed true. |
| `CENTRIFUGO_HTTP_SERVER_PORT` | 8000 | Public client transport listener. Fixed at 8000. |
| `CENTRIFUGO_HTTP_API_EXTERNAL` | false | Keeps the publish API off the public listener. Must remain false. |
| `CENTRIFUGO_HTTP_API_INSECURE` | false | Requires the HTTP API key. Must remain false. |
| `CENTRIFUGO_CLIENT_ALLOWED_ORIGINS` | - | Exact HTTPS client origin(s), space-separated. Never use *. |
| `CENTRIFUGO_HTTP_SERVER_INTERNAL_PORT` | 9000 | Private API, admin, and health listener. Fixed at 9000; do not expose. |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | (secret) | Generated HMAC secret used by the trusted backend to sign client JWTs. Keep private. |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_SUBSCRIBE_FOR_CLIENT` | true | Allows authenticated base-namespace subscriptions; not channel authorization. |

## Configuration

- **Healthcheck:** `/connection/init`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/centrifugo-on-railway)
