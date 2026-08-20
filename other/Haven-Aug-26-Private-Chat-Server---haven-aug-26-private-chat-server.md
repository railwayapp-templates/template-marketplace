# Deploy Haven [Aug '26] (Private Chat Server) on Railway

Self-hosted Discord alternative. Text, voice, files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/haven-aug-26-private-chat-server)

## About

Haven is a self-hosted chat server. Text channels, voice calls, file sharing, and no telemetry. It runs on your own infrastructure and keeps your conversations off third-party servers.

This template pulls a pre-built Docker image from GHCR, so there is no build step. It deploys in seconds. The app stores its database and uploaded files on a volume at /data. Railway handles HTTPS — the template sets FORCE_HTTP=true so Haven skips its own certificate generation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ancsemi/haven:latest | `ghcr.io/ancsemi/haven:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Web server port |
| `FORCE_HTTP` | true | Disables built-in SSL. Railway handles HTTPS. |

**Category:** Other

[View on Railway →](https://railway.com/deploy/haven-aug-26-private-chat-server)
