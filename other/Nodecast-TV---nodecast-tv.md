# Deploy Nodecast TV on Railway

nodecast-tv is a modern, web-based IPTV player

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nodecast-tv)

## About

Nodecast TV is a self-hosted, web-based IPTV player. It provides a browser UI for organizing and playing Live TV, EPG (guide), and VOD libraries from **user-provided** IPTV sources (such as M3U playlists or Xtream-compatible endpoints).

&gt; Note: This template deploys the application only. It does not include or provide any media/content sources. Use only sources you have the rights to access.

This Railway template deploys Nodecast TV from a **Docker image** and attaches a persistent volume so your app data survives restarts and redeployments. After deployment, open the Railway-provided domain, sign in, and configure your own IPTV source in the app’s settings. The service listens on port **3000** and stores runtime data under **`/app/data`**, which should be backed by a Railway Volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nodecast TV | `ghcr.io/technomancer702/nodecast-tv:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/nodecast-tv)
