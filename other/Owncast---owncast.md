# Deploy Owncast on Railway

Self-hosted live streaming — your own Twitch with chat and RTMP ingest.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owncast)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/owncast?utm_medium=integration&utm_source=button&utm_campaign=owncast)

[Owncast](https://owncast.online/) is a free and open source live streaming and chat server: point OBS (or any RTMP source) at it and you get your own Twitch-style stream page with built-in chat, viewer stats, and Fediverse integration — fully under your control, with no platform ads or rules.

This template runs Owncast as a single Railway service. The web interface and HLS video playback are served over your Railway domain, while RTMP ingest (what OBS connects to) is exposed through a Railway TCP proxy on port 1935. Your admin password and stream key are generated as template variables and applied on every boot. Stream recordings, chat history, and configuration persist on the attached volume at `/app/data`. Transcoding runs on CPU via the bundled ffmpeg.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| owncast | [nomideusz/owncast-railway](https://github.com/nomideusz/owncast-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Web server port. Don't change. |
| `STREAM_KEY` | - | Stream key for OBS/RTMP ingest. Auto generated. |
| `ADMIN_PASSWORD` | (secret) | Admin panel password (username: admin). Auto generated. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/owncast)
