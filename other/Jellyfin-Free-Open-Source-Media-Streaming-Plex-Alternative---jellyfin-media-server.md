# Deploy Jellyfin | Free Open-Source Media Streaming, Plex Alternative on Railway

Self-host Jellyfin. Stream movies, TV, and music from your own server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-media-server)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-media-server?referralCode=QXdhdr)

Deploy Jellyfin on Railway to self-host your own media streaming server with zero subscription fees. Jellyfin is a free, open-source media system that lets you organize, stream, and share your movies, TV shows, music, and photos across all your devices — no accounts, no tracking, no premium tiers.

This Railway template deploys Jellyfin with persistent storage for your media library and configuration, hardware-accelerated transcoding support via ffmpeg, and a public HTTPS domain for remote access from any device.

Jellyfin is a volunteer-built media server forked from Emby in 2018. It organizes your personal media collection and streams it to any device with adaptive bitrate transcoding.

- **Completely free** — no premium tiers, no paid features, no telemetry
- **Multi-format transcoding** — ffmpeg 7.x with hardware acceleration support (H.264, HEVC, AV1)
- **Live TV & DVR** — connect tuners via TVHeadend or HDHomeRun for recording live broadcasts
- **SyncPlay** — synchronized group watching across multiple users and devices
- **Rich plugin ecosystem** — intro skipper, subtitle downloaders, Trakt integration, custom themes
- **Multi-client support** — official apps for Android, iOS, Roku, Fire TV, Android TV, and web browsers

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jellyfin | `jellyfin/jellyfin:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8096 | HTTP server listening port |
| `JELLYFIN_LOG_DIR` | /data/config/log | Log output directory |
| `JELLYFIN_DATA_DIR` | /data/config/data | Data and metadata directory |
| `JELLYFIN_CACHE_DIR` | /data/cache | Transcoding cache directory |
| `JELLYFIN_CONFIG_DIR` | /data/config | Configuration directory |
| `JELLYFIN_PublishedServerUrl` | - | Public URL for autodiscovery |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jellyfin-media-server)
