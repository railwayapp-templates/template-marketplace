# Deploy Komga | Open-Source Comic and Manga Server on Railway

Self-host. Manage and read comics, ebooks and manga

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/komga)

## About

Deploy Komga on Railway to self-host a powerful media server for your comics, mangas, BDs, magazines, and eBooks. Komga provides a responsive web UI for browsing libraries, organizing series into collections, tracking read progress, and streaming pages to OPDS-compatible readers. This Railway template pre-configures the `gotson/komga` Docker image with persistent volume storage for your database and library files, optimized JVM memory settings, and a public domain with HTTPS.

Komga is a free and open-source media server built with Kotlin and Spring Boot, purpose-built for organizing and reading comics, mangas, BDs (bandes dessinees), magazines, and eBooks. It uses an embedded SQLite database for zero-config persistence.

- Responsive web UI for browsing libraries, series, and individual books on any device
- Built-in web reader for comics, manga, and eBooks with reading progress tracking
- OPDS v1.2 and v2.0 feeds for compatibility with third-party reader apps
- Kobo Sync and KOReader Sync for e-ink reader integration
- REST API for automation and third-party tool integration
- Multi-user support with per-library access controls and age restrictions
- Metadata editing with automatic import from embedded ComicInfo.xml and EPUB metadata
- Duplicate file and page detection
- Collections and read lists for organizing content across series

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Komga | `gotson/komga:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container timezone |
| `PORT` | 25600 | Railway routing signal |
| `SERVER_PORT` | 25600 | HTTP server listening port |
| `JAVA_TOOL_OPTIONS` | -Xmx512m | JVM max heap size |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/komga)
