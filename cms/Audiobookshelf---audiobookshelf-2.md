# Deploy Audiobookshelf on Railway

Self-hosted audiobook & podcast server with library management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/audiobookshelf-2)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/audiobookshelf-2)

Audiobookshelf is the open-source self-hosted audiobook and podcast server: organize your audiobook collection with rich metadata, sync listening progress across the web player and mobile apps, subscribe to podcasts with automatic downloads, and transcode on the fly with bundled ffmpeg.

This template deploys Audiobookshelf as a single Railway service from a pinned upstream image (`ghcr.io/advplyr/audiobookshelf` v2.37.1). The app is a Node.js server with an embedded SQLite database — no external database service needed. A 1 GB Railway volume mounted at `/data` holds the database (`/data/config`) and covers/cache (`/data/metadata`), so libraries, users, and progress survive redeploys and restarts. Railway assigns a public HTTPS URL on deploy; open it at the `/audiobookshelf` path (e.g. `https:///audiobookshelf`) and run the web-based initial setup to create your admin user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| audiobookshelf-lite | [mc9max/audiobookshelf-lite](https://github.com/mc9max/audiobookshelf-lite) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/audiobookshelf-2)
