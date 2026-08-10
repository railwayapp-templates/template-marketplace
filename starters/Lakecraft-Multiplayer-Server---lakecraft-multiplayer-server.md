# Deploy Lakecraft Multiplayer Server on Railway

One-click persistent Lakecraft multiplayer server for friends.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lakecraft-multiplayer-server)

## About

Lakecraft Multiplayer Server is the persistent realtime backend for Lakecraft's
browser-based multiplayer mode. This template creates an invitation-only server
with a generated public WebSocket address, generated access token, and a durable
SQLite world volume.

The service runs the public `ghcr.io/bentsignal/lakecraft-server:railway-beta`
image as one Bun process. Railway terminates HTTPS and WSS, checks `/status`, and
mounts a persistent volume at `/data`. Player positions and block edits survive
deployments and restarts while the public domain remains stable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lakecraft | `ghcr.io/bentsignal/lakecraft-server:railway-beta` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATA_DIR` | /data |
| `AUTH_MODE` | local-demo |
| `MAX_PLAYERS` | 32 |
| `ALLOWED_ORIGINS` | https://craft.lakebed.app |
| `LOCAL_DEMO_TOKEN` | (secret) |
| `PUBLIC_SERVER_NAME` | Lakecraft Server |
| `MAX_PERSISTED_BLOCKS` | 1000 |
| `PUBLIC_SERVER_DESCRIPTION` | Persistent Lakecraft multiplayer hosted on Railway |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/lakecraft-multiplayer-server)
