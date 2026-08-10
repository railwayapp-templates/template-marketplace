# Deploy YT Zero | (Just Updated) YouTube Feed Reader, No Stranger Can Claim It on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yt-zero-20260816-or-youtube-feed-reader-)

## About

YT Zero is a self-hosted YouTube subscription inbox. It follows the public feeds of the
channels you care about and gives you one chronological list of their videos — no Google
account, no YouTube Data API key, no recommendation algorithm. Subscriptions, watch
progress, playlists and tags live in your own database, on your own disk.

This template deploys it **with a household login already in place**. YT Zero itself ships
with authentication set to `none` and offers no environment variable that turns a login on,
so a stock deploy answers every stranger who has the URL. Here the login is written into the
database before the port is ever bound, from a password Railway generates for this
deployment.

One container, one volume, and nothing else. YT Zero serves its own frontend, refreshes
channel feeds on an adaptive background schedule, and keeps subscriptions, watch history,
playlists, profile avatars and the thumbnail cache in a local SQLite database under `/data`.
There is no separate worker, no queue and no cache server to run alongside it. PostgreSQL is
supported later as a migration, not required now.

Because it reads public channel feeds rather than talking to a Google account, there is
nothing to authorize and no API quota to manage. yt-dlp and ffmpeg are bundled, so the
optional download feature works without adding anything to the stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ytzero | `ghcr.io/bon5co/ytzero-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `YTZERO_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yt-zero-20260816-or-youtube-feed-reader-)
