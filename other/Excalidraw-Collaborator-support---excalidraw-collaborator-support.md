# Deploy Excalidraw (Collaborator support) on Railway

Deploy and Host excalidraw-selfhosted with Railway (Collaborator support)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-collaborator-support)

## About

Hosting Excalidraw on Railway means running two small services: the `excalidraw` frontend (a
static SPA served by nginx) and `excalidraw-room`, your private real-time collaboration relay
(Socket.IO). At startup the frontend container patches its bundled WebSocket URL so live
sessions connect to your room over `wss://` instead of Excalidraw's public
`oss-collab.excalidraw.com` relay. Everything is wired with Railway reference variables — no
environment variables to configure manually, no databases, no volumes, no secrets. Both
services run serverless (App sleep on), keep healthchecks and auto-TLS domains enabled, and
the whole stack fits the Railway **Free plan** for light usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Excalidraw | `excalidraw/excalidraw@sha256:f7ee194addd607bf831d2af0f0a34463dd4225e426cf35199ef0b12a803398e9` | Web service |
| Excalidraw Room | `excalidraw/excalidraw-room@sha256:2fe999f9be4379e3ee282fc45d75d84a691a6383dde33544514cc395287c7a70` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Start command:** `sh -c 'if [ -n "$VITE_APP_WS_SERVER_URL" ]; then sed -i "s|https://oss-collab\.excalidraw\.com|$VITE_APP_WS_SERVER_URL|g" /usr/share/nginx/html/assets/*.js; fi; exec nginx -g "daemon off;"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `node dist/index.js`

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidraw-collaborator-support)
