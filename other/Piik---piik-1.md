# Deploy Piik on Railway

Private P2P screen sharing with a browser UI and persistent rooms.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/piik-1)

## About

Piik is private, low-latency screen sharing for one Host and up to 20 authenticated Viewers. It combines a browser UI, room authority, signaling, embedded STUN, and optional media fallback in one Go service. Hosts share screens or cameras while friends watch from desktop or mobile browsers through invitation links.

Railway runs Piik from its pinned GHCR container image as a single HTTP service. The generated Railway domain provides the browser entry point, while a persistent volume keeps SQLite room authority and diagnostic files across redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| piik | `ghcr.io/tntcrafthim/piik:v1.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8787 |
| `PIIK_ENV` | production |
| `LISTEN_HOST` | 0.0.0.0 |
| `PIIK_LOG_DIR` | /home/nonroot/logs |
| `ROOM_DATABASE_PATH` | /home/nonroot/rooms.sqlite |
| `MAX_VIEWERS_PER_ROOM` | 20 |
| `SITE_ACCESS_PASSWORD` | (secret) |
| `NAT_PREDICTION_ENABLED` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nonroot`

**Category:** Other

[View on Railway →](https://railway.com/deploy/piik-1)
