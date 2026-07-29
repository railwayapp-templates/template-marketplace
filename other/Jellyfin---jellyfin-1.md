# Deploy Jellyfin on Railway

Free self-hosted media streaming for content you are authorized to host.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-1)

## About

Jellyfin is a free, open-source media system for organizing and streaming your own video, music, and photo libraries. It provides a browser interface and apps for common TVs, streaming devices, phones, and computers, without requiring a central hosted account or putting premium features behind a subscription.

> **Authorized media only:** You must own, license, or otherwise have permission to host and stream every media file you add. This template bundles no media, torrent client, downloader, scraper, indexer, or proxy and must not be used to infringe copyright or other rights.

Hosting Jellyfin involves running its server, completing the first-run administrator setup, and supplying a persistent media library. This template deploys the official Jellyfin 10.11.11 container on port 8096 with one Railway volume at `/data`. The start command keeps server data, configuration, cache, logs, and the documented `/data/media` library path on that volume. Railway provides HTTPS at the public service domain, while Jellyfin's `/health` endpoint checks server health. Media storage and CPU requirements depend heavily on library size, metadata, concurrent viewers, and whether clients can direct-play files instead of transcoding them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jellyfin | `jellyfin/jellyfin:10.11.11` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8096 |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data/data /data/cache /data/config /data/log /data/media && exec /jellyfin/jellyfin --datadir /data/data --cachedir /data/cache --configdir /data/config --logdir /data/log'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jellyfin-1)
