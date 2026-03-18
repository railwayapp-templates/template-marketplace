# Deploy Node WebSocket Game Server on Railway

Multiplayer WebSocket relay server with rooms and msgpack. Node.js + TS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodejs-websocket-game-server)

## About

Room-based multiplayer WebSocket relay server using msgpack binary protocol. Handles peer connections, message relay, rate limiting, and health monitoring. Node.js + TypeScript.

This template deploys a stateless WebSocket relay server that manages rooms and connections. Clients connect via ws:///ws/, get assigned a player ID, and all messages are relayed to peers in the same room using msgpack encoding. The server includes per-client rate limiting, keepalive ping/pong, origin allowlist, and /health + /metrics endpoints for monitoring and autoscaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-ws-gameserver | [mavisakalyan/node-ws-gameserver](https://github.com/mavisakalyan/node-ws-gameserver) | Web service |

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

[View on Railway →](https://railway.com/deploy/nodejs-websocket-game-server)
