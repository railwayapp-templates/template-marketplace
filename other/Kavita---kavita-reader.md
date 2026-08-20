# Deploy Kavita on Railway

Self-hosted digital library and reading server for ebooks, comics and manga

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kavita-reader)

## About

Kavita is a fast, self-hosted reading server for ebooks, comics, manga and light novels. Point it at a folder of EPUB, PDF, CBZ or CBR files and it scans them into series, pulls covers and metadata out of the files themselves, tracks reading progress per user, and serves it all through a browser reader that works as well on a phone as a desktop. People reach for it when a Calibre library is stuck on one machine, or when a comics collection needs real reading modes rather than a file browser. It also publishes an OPDS feed, so the same library opens in KOReader, Panels, Chunky and other e-reader apps.

Deploy Kavita on Railway and this template gives you one service backed by a persistent volume holding both the SQLite database and your library files. An administrator account is created from the username and password you supply at deploy time, so nobody can claim the server before you reach it, and Books, Comics and Manga libraries are ready to fill. The public URL is wired into Kavita's own host setting, so reset links, invitations and OPDS URLs point at the right place from first boot. To self-host Kavita without wrestling with volumes, proxies or TLS certificates, this is the shortest path.

![Diagram of the Kavita service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787140266/kavita-architecture.png)

Kavita is a single ASP.NET Core application that keeps its state in SQLite alongside your files, making it unusually simple to host: no external database, cache, queue or worker tier. Self-hosting makes sense when a collection has outgrown one laptop, when several people want their own progress and permissions, or when you want the library on any device without handing the files to a third party.

Key features:

- Readers built for the format: left-to-right, right-to-left and vertical modes for comics, plus a paged EPUB and PDF reader with fonts and themes
- Per-user reading progress, want-to-read lists, bookmarks, collections and reading lists
- Metadata and covers parsed from EPUB and ComicInfo data — writers, genres, tags and word counts
- Multiple users with per-library permissions and age-rating restrictions
- An OPDS feed and Koreader sync so external reading apps stay in step
- Full-text search across series, people, tags and genres

The Railway architecture is deliberately flat. One `kavita` service runs the app on port 5000 behind Railway's TLS edge, and one volume at `/data` holds everything that must survive a redeploy: the SQLite database, cover thumbnails, bookmarks, backups and the library folders. Configuration sits under `/data/config` and media under `/data/media`, so one mount covers both.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kavita | [gridalpha/kavita-railway](https://github.com/gridalpha/kavita-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | Port Railway probes and routes to |
| `KAVITA_CACHE_MB` | 75 | In-memory cache budget |
| `KAVITA_DATA_DIR` | /data | Volume mount point |
| `KAVITA_BOOTSTRAP` | true | Run first-boot setup |
| `KAVITA_HOST_NAME` | - | Public URL used in generated links |
| `KAVITA_MEDIA_DIR` | /data/media | Parent folder of the libraries |
| `KAVITA_DEMO_MEDIA` | true | Seed four public-domain sample books once |
| `KAVITA_ADMIN_PASSWORD` | (secret) | First administrator password |
| `KAVITA_ADMIN_USERNAME` | (secret) | First administrator username |
| `KAVITA_ALLOW_STAT_COLLECTION` | false | Anonymous usage statistics opt-out |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kavita-reader)
