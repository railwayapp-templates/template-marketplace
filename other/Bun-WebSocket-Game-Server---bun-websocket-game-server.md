# Deploy Bun WebSocket Game Server on Railway

Multiplayer WebSocket relay server with rooms and msgpack. Bun-native.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-websocket-game-server)

## About

Bun WebSocket Game Server is a room-based multiplayer WebSocket relay built on Bun's native WebSocket server. It forwards msgpack-encoded messages between peers in the same room without inspecting payloads, with per-client rate limiting, keepalive, an origin allowlist, and health monitoring. TypeScript, zero framework overhead.

This template deploys a single stateless relay service. Clients connect to `wss://<your-domain>/ws/<roomId>`, receive a welcome message with their player ID and the current peer list, and every message they send is relayed unchanged to the rest of the room. Because Bun serves WebSockets natively, the server starts in milliseconds and handles thousands of concurrent connections on a small instance. There is no database and no volume to manage. Railway supplies the public domain, automatic SSL, and horizontal scaling. The `/health` endpoint drives Railway's readiness check and `/metrics` exposes connection and room counts for monitoring or autoscaling.

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
