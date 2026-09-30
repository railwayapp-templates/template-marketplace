# Deploy owncast-template-final on Railway

Your own live streaming server: RTMP ingest, HLS playback, built-in chat.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owncast-template-final)

## About

This template provisions a single Railway service running the official Owncast Docker image (pinned to `0.3.0`) with a 5 GB volume mounted at `/app/data`, a Railway-generated public domain routed to the web/HLS port 8080, and a public TCP proxy routed to the RTMP ingest port 1935. Owncast is a single Go binary with SQLite storage — all configuration (stream key, admin password, appearance, integrations) is stored in the database on the volume, so every setting survives restarts and redeploys. The deploy form asks for nothing: the one variable the template sets (`RAILWAY_RUN_UID=0`) ships pre-configured so the container can write to its volume. After deploy, the only required steps are in the Owncast admin: change the default admin password (`admin`/`abc123`) and change the default stream key (`abc123`) — both under Server Setup at `/admin`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| owncast | `owncast/owncast:0.3.0` | TCP service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1935
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/owncast-template-final)
