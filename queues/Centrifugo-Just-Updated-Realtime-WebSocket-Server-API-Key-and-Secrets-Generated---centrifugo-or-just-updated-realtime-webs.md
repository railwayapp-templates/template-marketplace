# Deploy Centrifugo | (Just Updated) Realtime WebSocket Server, API Key and Secrets Generated on Railway

Realtime WebSocket server with API key and secrets generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/centrifugo-or-just-updated-realtime-webs)

## About

Centrifugo is an open-source realtime messaging server. Your backend publishes over a simple HTTP API, and browsers, mobile apps and agents receive the messages over WebSocket (or SSE / HTTP streaming) with channel subscriptions, presence and a short message history. This template deploys the official `centrifugo/centrifugo` image, pinned by digest, with every secret generated for you and nothing to fill in.

Centrifugo runs as a single stateless Go process using its in-memory engine. The template starts it with the HMAC secret for client JWTs, the HTTP API key, and the admin UI credentials all generated at deploy time. The public domain, the `/health` check and a permissive default channel configuration (clients may subscribe, publish and read history on channels that have no namespace) are preconfigured, so the service is usable the moment it is healthy. Redeploys are safe: the secrets are stored as service variables and do not rotate.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| centrifugo | `centrifugo/centrifugo:v6.9.7@sha256:d014d3e99e0e9e58c45e656a7ea4ab97c3f79f96c82a3614ea0f810b4dd0e461` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CENTRIFUGO_ADMIN_SECRET` | (secret) |
| `CENTRIFUGO_HTTP_API_KEY` | (secret) |
| `CENTRIFUGO_ADMIN_PASSWORD` | (secret) |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export CENTRIFUGO_HTTP_SERVER_PORT=$PORT CENTRIFUGO_HTTP_SERVER_ADDRESS=:: CENTRIFUGO_ADMIN_ENABLED=true CENTRIFUGO_HEALTH_ENABLED=true CENTRIFUGO_CLIENT_ALLOWED_ORIGINS="*" CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_SUBSCRIBE_FOR_CLIENT=true CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_PUBLISH_FOR_CLIENT=true CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_HISTORY_FOR_CLIENT=true CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_HISTORY_SIZE=50 CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_HISTORY_TTL=300s; exec centrifugo'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/deploy/centrifugo-or-just-updated-realtime-webs)
