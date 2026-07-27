# Deploy WebSocket | Node Server Sharing One Port with HTTP on Railway

WebSocket server on Node and TypeScript, HTTP health check on the same port

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/websocket-or-node-server-sharing-one-por)

## About

A WebSocket server on Node 24 and TypeScript, sharing one port with an HTTP endpoint - which is what makes it deployable.

The Node.js WebSocket template on Railway builds from a repository last updated in September 2024, with esbuild 0.17 and a pnpm bundling pipeline. Under four deployments in ten come up.

The deeper problem is structural: it serves WebSockets and nothing else. A platform health check speaks plain HTTP, so a WebSocket-only process has nothing to answer it with - the deployment is marked unhealthy while working perfectly, or you switch the check off and lose the signal entirely.

Here the WebSocket server is attached to a Node HTTP server. The same port answers GET /health, serves a browser test client, and upgrades connections to WebSocket. On a platform that routes one port per service, that is the shape the app has to have.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WebSocket | [ak40u/websocket-railway-starter](https://github.com/ak40u/websocket-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `HEARTBEAT_MS` | 30000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, TypeScript

[View on Railway →](https://railway.com/deploy/websocket-or-node-server-sharing-one-por)
