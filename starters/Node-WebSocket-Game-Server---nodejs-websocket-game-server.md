# Deploy Node WebSocket Game Server on Railway

Multiplayer WebSocket relay server with rooms and msgpack. Node.js + TS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodejs-websocket-game-server)

## About

Node WebSocket Game Server is a room-based multiplayer WebSocket relay server using a msgpack binary protocol. It handles peer connections, message relay, per-client rate limiting, and health monitoring, so you can build networked apps without writing server logic. Built with Node.js and TypeScript.

This template deploys a stateless WebSocket relay server that manages rooms and connections. Clients connect via `wss://<your-domain>/ws/`, get assigned a player ID, and every message is relayed to peers in the same room using msgpack encoding. The server ships with per-client rate limiting, keepalive ping/pong, an origin allowlist, and `/health` plus `/metrics` endpoints for monitoring and autoscaling. Because it holds no persistent state, hosting is simple: one service, no database, no volumes. Railway provides the public domain, automatic SSL, and horizontal scaling. Configure the allowed origins and rate limits through environment variables and you are live.

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

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/nodejs-websocket-game-server)
