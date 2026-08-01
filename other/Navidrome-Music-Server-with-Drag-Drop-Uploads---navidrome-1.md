# Deploy Navidrome | Music Server with Drag & Drop Uploads on Railway

Self-hosted music streaming — your own Spotify with a drag-drop upload UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/navidrome-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/navidrome-1?utm_medium=integration&utm_source=button&utm_campaign=navidrome)

[Navidrome](https://www.navidrome.org/) is a free and open source personal music server and streamer — a self-hosted Spotify for your own collection. It streams your music (FLAC, MP3, OGG, and more) to any device through a fast modern web player or any Subsonic-compatible app, with transcoding, playlists, smart search, and multi-user support built in.

This template runs Navidrome as a single Railway service with one extra superpower: a bundled [Filebrowser](https://filebrowser.org/) upload UI on its own domain. Railway volumes have no native upload path, so the Filebrowser panel is how your music gets onto the server — drag and drop entire album folders in the browser, and Navidrome's file watcher imports them within seconds, no rescan clicks needed. Music files, the Navidrome database, and Filebrowser settings all persist on the attached volume at `/data`. Transcoding runs on CPU via the bundled ffmpeg.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| navidrome | [nomideusz/navidrome-railway](https://github.com/nomideusz/navidrome-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4533 | Port for Railway healthcheck probing. Do not change. |
| `FILEBROWSER_PASSWORD` | (secret) | Login password for the music upload panel (username: admin), applied on first boot. Minimum 12 characters. |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/navidrome-1)
