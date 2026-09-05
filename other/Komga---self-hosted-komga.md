# Deploy Komga on Railway

Media server for comics, manga, magazines and ebooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-komga)

## About

Komga is an open-source media server for comics, manga, BDs, magazines and ebooks. Point it at a folder of CBZ, CBR, PDF or EPUB files and it builds a browsable library: covers extracted, page counts measured, embedded ComicInfo metadata read, and a search index over the lot. Readers get a responsive web reader that works on a phone; e-reader owners get OPDS, Kobo Sync and KOReader Sync, so a Kobo syncs progress with the same server.

Deploy Komga on Railway and you get one service backed by one persistent volume. Self-host Komga this way and there is nothing else to wire up: the server keeps its SQLite databases and Lucene index in a `config` directory on that volume, and your books sit beside them under `media`. The template claims the administrator account before the public URL exists, creates **Comics** and **Books** libraries, and seeds them with public-domain Project Gutenberg titles.

![Diagram of the single Komga service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788514674/komga-architecture.png)

Komga is a single Kotlin/Spring Boot application. It watches library folders, parses each archive, extracts covers and page dimensions, reads embedded `ComicInfo.xml` or EPUB metadata, and stores what it finds in SQLite. A Lucene index beside the database powers search across series, books, authors and tags. Everything is local: no external database, no queue, no cache tier, no object storage.

People self-host it when a collection has to be readable from several devices, by several people, without uploading anything to a third party. Key features:

- Libraries, series and books, plus **collections** and **read lists** for cross-series ordering
- Web reader with paged, double-page, continuous and webtoon modes, and a separate EPUB reader
- Metadata editing, with automatic import from ComicInfo, EPUB and Mylar files
- Multiple users with per-library permissions, age ratings and label restrictions
- OPDS v1.2 and v2, Kobo Sync, KOReader Sync, and a documented REST API
- Duplicate file and page detection, and importing loose books into an existing series

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| komga | [gridalpha/komga-railway](https://github.com/gridalpha/komga-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 25600 | Port Railway probes; Komga's fixed listen port |
| `KOMGA_DATA_DIR` | /data | Volume mount point |
| `KOMGA_BOOTSTRAP` | true | Run first-run account and library setup |
| `KOMGA_DEMO_MEDIA` | true | Seed public-domain sample library once |
| `JAVA_TOOL_OPTIONS` | -XX:MaxRAMPercentage=60 | JVM heap ceiling from the cgroup |
| `KOMGA_ADMIN_EMAIL` | admin@komga.app | First administrator, must be email-shaped |
| `KOMGA_ADMIN_PASSWORD` | (secret) | First administrator password |
| `LOGGING_LOGBACK_ROLLINGPOLICY_MAX_HISTORY` | 3 | Days of rolled logs to keep |
| `LOGGING_LOGBACK_ROLLINGPOLICY_TOTAL_SIZE_CAP` | 50MB | Cap rolling logs on the volume |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/self-hosted-komga)
