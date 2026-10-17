# Deploy Socket.IO Server | (Just Updated) Realtime WebSockets, Token Auth and Emit API Generated on Railway

Realtime WebSocket server, token auth and emit API generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/socketio-server-or-just-updated-realtime)

## About

Socket.IO is the most widely used realtime library for Node and browsers. This template deploys a ready-to-use Socket.IO 4.8 server: clients connect over WebSocket (with long-polling fallback), join rooms and receive events, and your backend pushes events with one HTTP call. The client token and the API key are generated for you, so nothing needs filling in.

The image is a small wrapper (source: github.com/bon5co/socketio-railway) around the official `socket.io` package, pinned by digest. There is no official Socket.IO server image, so the wrapper adds what a hosted server needs: token authentication on every connection, an authenticated `POST /emit` endpoint for server-side publishing, a `/health` check and CORS control. It runs as a single stateless process; set `REDIS_URL` to enable the Redis adapter before scaling beyond one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| socketio | `ghcr.io/bon5co/socketio-railway:4.8.4@sha256:2a59f49a190cb9f4fbc423ef8485466b3d44bd22c743fbb99742f9b048f888c6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SOCKETIO_API_KEY` | (secret) |
| `SOCKETIO_CLIENT_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/deploy/socketio-server-or-just-updated-realtime)
