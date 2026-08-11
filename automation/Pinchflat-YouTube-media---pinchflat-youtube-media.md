# Deploy Pinchflat YouTube media on Railway

Authenticated YouTube media automation with persistent downloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pinchflat-youtube-media)

## About

Pinchflat is a self-hosted YouTube media manager that watches channels and playlists, applies download rules, and stores media for Plex, Jellyfin, Kodi, podcast feeds, or local playback.

The template runs the official Pinchflat 2025.9.26 application behind its native generated Basic Auth. One 5 GB data volume preserves SQLite configuration, schedules, cookies, profiles, and downloaded media.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pinchflat | `ghcr.io/kieraneglin/pinchflat:latest@sha256:01b4f98aabaf3f5fe394213f7a32578c9e84e42080f52e2f8334021a4473b202` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | IANA timezone used for schedules. |
| `PORT` | 8945 | Pinchflat HTTP listener used by Railway. |
| `LOG_LEVEL` | info | Application log verbosity. |
| `MEDIA_PATH` | /config/downloads | Downloaded media directory inside the persistent data volume. |
| `SECRET_KEY_BASE` | (secret) | Generated secret for signed and encrypted browser state. |
| `BASIC_AUTH_PASSWORD` | (secret) | Generated password protecting the UI and management routes. |
| `BASIC_AUTH_USERNAME` | (secret) | Generated-credential login username. |
| `YT_DLP_WORKER_CONCURRENCY` | 1 | One download worker per queue to bound starter resource use. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/pinchflat-youtube-media)
