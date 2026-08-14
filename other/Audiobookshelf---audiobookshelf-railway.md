# Deploy Audiobookshelf on Railway

Self-host Audiobookshelf on Railway: audiobooks, podcasts, ebooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/audiobookshelf-railway)

## About

Audiobookshelf is an open source, self-hosted server for your audiobooks, podcasts and ebooks. It scans your files, matches them against metadata providers, and serves them through a web player and official iOS and Android apps — with per-user progress sync, bookmarks, chapters and sleep timers. People self-host Audiobookshelf to own their listening library outright: no subscription, and no catalogue that shrinks when a licence expires.

Deploy Audiobookshelf on Railway and you get the published `ghcr.io/advplyr/audiobookshelf` image wired to a persistent volume, a public HTTPS domain, and a health check, in a single service. Audiobookshelf keeps its own SQLite database and needs no separate Postgres, Redis or object storage — so the whole template is one container plus one disk. The volume is mounted at `/data`, with the database at `/data/config`, cached covers, metadata and backups at `/data/metadata`, and your library folders under `/data/media`.

![Audiobookshelf Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786646756/38ac85eb-4761-40cd-a3a8-4259a6ea46f2.png)

Audiobookshelf turns a folder of audio files into a real listening service. It reads embedded tags and folder structure, then enriches items from Audible, Google Books, iTunes or Open Library, so a rough library ends up with covers, series, narrators and chapters.

- Audiobook, podcast and ebook libraries in one server, with a built-in EPUB/PDF/CBZ reader
- Per-user progress, bookmarks and listening stats, synced between web and mobile
- Official Android and iOS apps with offline downloads
- Podcast subscriptions with scheduled auto-download and episode cleanup
- Multi-user accounts with per-library permissions, plus OpenID Connect (OIDC) single sign-on and API keys
- Share a title by public link, or generate an RSS feed so any podcast app can play your library

Architecturally it is a single Node.js process: the HTTP API, the web client, the library scanner, the podcast downloader and the cron scheduler all live in one container, with SQLite on disk as the datastore. That is why this template has no database service to configure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| audiobookshelf | `ghcr.io/advplyr/audiobookshelf:2.36.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Server timezone for scheduled jobs |
| `PORT` | 80 | HTTP listening port |
| `CONFIG_PATH` | /data/config | SQLite database on the volume |
| `NODE_OPTIONS` | --max-old-space-size=4096 | Node heap ceiling for the container |
| `METADATA_PATH` | /data/metadata | Covers, metadata and backups |
| `JWT_SECRET_KEY` | (secret) | Signs access and refresh tokens |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/audiobookshelf-railway)
