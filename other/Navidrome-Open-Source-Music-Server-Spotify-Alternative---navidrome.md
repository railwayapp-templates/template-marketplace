# Deploy Navidrome | Open Source Music Server, Spotify Alternative on Railway

Self-host Navidrome. Stream your music from any device, FLAC support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/navidrome)

## About

Deploy Navidrome on Railway to self-host your personal music streaming server. Navidrome is a lightweight, open-source music server written in Go that indexes your digital music collection and makes it available through a modern web player and any Subsonic-compatible client app. Run Navidrome on Railway with a single click — this template pre-configures the `deluan/navidrome:latest` Docker image with persistent storage, automatic library scanning, and a public domain ready for streaming from any device.

Navidrome is a personal music streaming service — the self-hosted alternative to Spotify, Apple Music, and YouTube Music. It gives you full ownership of your music library with zero subscription fees or privacy concerns.

- **Subsonic API compatible** — works with 20+ mature client apps across iOS, Android, desktop, and web
- **Multi-user support** — each user gets their own playlists, favorites, and play history
- **On-the-fly transcoding** — streams MP3, OPUS, AAC, FLAC, and more via built-in ffmpeg
- **Smart playlists** — auto-generated playlists based on genre, rating, play count, and custom rules
- **Last.fm and ListenBrainz scrobbling** — track your listening history across platforms
- **Gapless playback** — seamless transitions between tracks in the web player
- **Embedded SQLite** — no external database required, minimal operational overhead

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Navidrome | `deluan/navidrome:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4533 | HTTP server listening port |
| `ND_LOGLEVEL` | info | Log verbosity level |
| `ND_MUSICFOLDER` | /data/music | Path to music files |
| `ND_SCANSCHEDULE` | 1h | Library scan interval |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data/music && /app/navidrome'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/navidrome)
