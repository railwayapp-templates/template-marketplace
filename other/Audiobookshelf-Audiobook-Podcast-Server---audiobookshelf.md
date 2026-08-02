# Deploy Audiobookshelf | Audiobook & Podcast Server on Railway

Self-hosted audiobook & podcast server with apps, progress sync, uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/audiobookshelf)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/audiobookshelf?utm_medium=integration&utm_source=button&utm_campaign=audiobookshelf)

[Audiobookshelf](https://www.audiobookshelf.org/) is a free and open source self-hosted audiobook and podcast server. It streams your audiobooks and podcasts to any device with progress sync across all of them, a modern web player, and official mobile apps for iOS and Android. Chapters, bookmarks, sleep timers, series tracking, multi-user support, and automatic metadata fetching are all built in.

This template runs Audiobookshelf as a single Railway service. The config database, metadata cache, and your media library all persist on one attached volume at `/data`, with library folders pre-created at `/data/library/audiobooks` and `/data/library/podcasts`. Getting books in is built in: Audiobookshelf's web UI has native drag-and-drop upload, so no extra file-manager sidecar is needed. Podcast episodes download server-side straight to the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| audiobookshelf | [nomideusz/audiobookshelf-railway](https://github.com/nomideusz/audiobookshelf-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port for Railway healthcheck probing. Do not change. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/audiobookshelf)
