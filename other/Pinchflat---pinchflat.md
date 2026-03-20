# Deploy Pinchflat on Railway

Your next YouTube media manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pinchflat)

## About

Pinchflat is a self-hosted YouTube media manager built with yt-dlp. It automatically downloads content from YouTube channels and playlists on a schedule, organizing media for use with Plex, Jellyfin, Kodi, or personal archival. It runs as a single container with a built-in web UI and SQLite database.

Pinchflat runs as a single Docker container with no external database or service dependencies. The template deploys the official `ghcr.io/kieraneglin/pinchflat:latest` image with a persistent volume mounted at `/data` to store both the SQLite database and downloaded media. Railway's network-attached volumes require SQLite's journal mode set to `delete` instead of the default WAL mode. The container bundles yt-dlp, FFmpeg, Deno, and Apprise, so no additional services need to be provisioned. The web UI is served via Phoenix LiveView on port 8945 with websocket support.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pinchflat | `ghcr.io/kieraneglin/pinchflat:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone in IANA format (e.g. America/New_York, Europe/London) |
| `PORT` | 8945 | Web UI port — Pinchflat listens on this port |
| `LOG_PATH` | /data/config/logs/pinchflat.log | Path to the application log file |
| `MEDIA_PATH` | /data/downloads | Directory where downloaded media is stored |
| `CONFIG_PATH` | /data/config | Directory for config, database, logs, and metadata |
| `EXTRAS_PATH` | /data/config/extras | Directory for extra files (tz data, plugins) |
| `JOURNAL_MODE` | delete | SQLite journal mode — must be "delete" for Railway's network-attached volumes |
| `DATABASE_PATH` | /data/config/db/pinchflat.db | Path to the SQLite database file |
| `METADATA_PATH` | /data/config/metadata | Directory for downloaded media metadata |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pinchflat)
