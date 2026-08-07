# Deploy YT Zero on Railway

YouTube subscriptions as a feed reader. RSS, no Google account needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yt-zero)

## About

YT Zero is a self-hosted YouTube subscription inbox. It watches the public feeds
of the channels you follow and gives you one chronological list of their videos,
with no Google account, no YouTube Data API key and no recommendation algorithm
in the way. Subscriptions, watch progress, playlists and tags live in your own
database.

YT Zero runs as a single container with everything stateful on one disk. It
serves its own frontend, refreshes channel feeds on a background schedule, and
stores subscriptions, watch history, playlists and cached thumbnails in a local
SQLite database. There is no separate worker process, no queue and no cache
server to run alongside it, which is why one Railway service with one volume is
the whole deployment.

Because it reads public channel feeds rather than talking to a Google account,
there is nothing to authorize and no API quota to manage. The container also
bundles yt-dlp and ffmpeg, so the optional download feature works without adding
anything to the stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| YT Zero | `ghcr.io/pelski/ytzero:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Port YT Zero listens on. Must stay 3001 to match the image and the public domain. |
| `APP_URL` | - | Public base URL. Used as the sign-in redirect origin for OIDC and passkeys. |
| `RESTORE_SESSION_DIR` | /data/restore-sessions | Staging area for backup restores. On the volume so a large upload survives a restart. |
| `DOWNLOAD_COOKIES_DIR` | /data/download-cookies | Keeps per-profile YouTube cookies on the volume instead of disposable container disk. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yt-zero)
