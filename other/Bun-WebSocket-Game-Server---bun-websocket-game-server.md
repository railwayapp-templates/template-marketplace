# Deploy Bun WebSocket Game Server on Railway

Multiplayer WebSocket relay server with rooms and msgpack. Bun-native.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-websocket-game-server)

## About

Room-based multiplayer WebSocket relay server using msgpack binary protocol. 5-8x faster than Node.js ws — same protocol, same clients. Bun-native.

This template deploys a stateless WebSocket relay server built on Bun's native WebSocket API. Clients connect via ws:///ws/, get assigned a player ID, and all messages are relayed to peers in the same room using msgpack encoding. Uses Bun's built-in pub/sub for efficient room broadcasting, zero-allocation per-connection state via ws.data, and includes per-client rate limiting, keepalive, origin allowlist, and /health + /metrics endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bun-ws-gameserver | [mavisakalyan/bun-ws-gameserver](https://github.com/mavisakalyan/bun-ws-gameserver) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SNAPSHOT_HZ` | 20 |
| `KEEPALIVE_MS` | 30000 |
| `ALLOWED_ORIGINS` | * |
| `MAX_PLAYERS_PER_ROOM` | 50 |
| `MAX_MESSAGES_PER_SECOND` | 60 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/bun-websocket-game-server)
