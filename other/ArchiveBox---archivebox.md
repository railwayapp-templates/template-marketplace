# Deploy ArchiveBox on Railway

Save, archive, and browse websites offline.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archivebox)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archivebox)

**Published on the Railway marketplace:** https://railway.com/deploy/archivebox

ArchiveBox is an open-source, self-hosted web archiver that turns URLs,
bookmarks, RSS feeds, and research sources into durable offline captures. It
can save HTML, SingleFile pages, screenshots, PDFs, WARC files, media,
metadata, and links in a portable filesystem and SQLite collection you
control.

Hosting ArchiveBox on Railway uses one digest-pinned container, a public HTTPS
service on port `8000`, and a persistent volume at `/data`. The image bundles
Chrome, wget, yt-dlp, SingleFile, and readability, while the startup command
initializes or migrates the collection before serving the UI. This template
creates an admin account, keeps the public index and snapshots readable, and
disables anonymous additions. Railway health-checks `/public/`. Retrieve the
generated admin password from the deployment, back up `/data`, and review
ArchiveBox security guidance before archiving private material or exposing
snapshots publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ArchiveBox | `archivebox/archivebox:0.7.4@sha256:1a5a37331091d9df865ead2b9c231aa5a892fc26fe0422ce6140d9e2d9532327` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `PUBLIC_INDEX` | True |
| `ALLOWED_HOSTS` | * |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |
| `PUBLIC_ADD_VIEW` | False |
| `PUBLIC_SNAPSHOTS` | True |

## Configuration

- **Healthcheck:** `/public/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/archivebox)
