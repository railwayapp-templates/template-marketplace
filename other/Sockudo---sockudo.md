# Deploy Sockudo on Railway

Sockudo 5.0: Pusher-compatible WebSocket server for real-time apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sockudo)

## About

Sockudo is a fast WebSocket server written in Rust that implements the Pusher Channels protocol. Existing Pusher client libraries and server SDKs work with it unchanged, so apps can add live updates, presence and private channels without a hosted service. It is a drop-in backend for Laravel Echo and pusher-js.

This template runs the official `sockudo/sockudo:5.0.1` image as one public service. It creates a single app from the generated app ID, key and secret, and your server signs event triggers with that secret. Clients connect with WSS on port 443 of the Railway domain. State is kept in memory, so there is no database, and clients reconnect after a redeploy. Sockudo 5 also includes a mobile push module that wants persistent storage in production. It is not used here, so `PUSH_ALLOW_MEMORY_DRIVERS` acknowledges the in-memory default. Client-to-client events are off by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sockudo | `sockudo/sockudo:5.0.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | :: |
| `PORT` | 6001 |
| `LOG_LEVEL` | info |
| `PUSHER_PORT` | 443 |
| `CACHE_DRIVER` | memory |
| `QUEUE_DRIVER` | memory |
| `PUSHER_SCHEME` | https |
| `ADAPTER_DRIVER` | local |
| `APP_MANAGER_DRIVER` | memory |
| `RATE_LIMITER_DRIVER` | memory |
| `PUSH_ALLOW_MEMORY_DRIVERS` | true |
| `SOCKUDO_DEFAULT_APP_SECRET` | (secret) |
| `SOCKUDO_DEFAULT_APP_ENABLED` | true |
| `SOCKUDO_ENABLE_CLIENT_MESSAGES` | false |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/sockudo)
