# Deploy ArchiveBox on Railway

Deploy ArchiveBox on Railway: archive URLs to HTML, PDF, WARC & screenshots

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archivebox-railway)

## About

ArchiveBox is an open-source web archiving tool that takes a URL and keeps a permanent, offline-readable copy of what was on that page. For each link it saves an HTML snapshot, a SingleFile bundle, a PDF, a full-page screenshot, the rendered DOM, a WARC crawl and readable article text, so the content survives edits, paywalls and dead domains. Researchers, journalists, lawyers and anyone tired of link rot use it as a personal Wayback Machine they control.

Self-host ArchiveBox on Railway and this template gives you the two services that make it useful in production. The **archivebox** service runs the web UI, the extractors and a supervised scheduler for recurring imports, with a volume at `/data` holding the SQLite index and every archived file. The **sonic** service runs Sonic, a fast schema-less search backend, on the private network with its own volume; ArchiveBox pushes the text of every captured page into it, so you can search the *contents* of your archive, not just titles and URLs. Only the web service gets a public domain, and the archive is behind login by default.

![Diagram of the ArchiveBox and Sonic services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788233380/archivebox-architecture.png)

ArchiveBox is a Django application wrapping a set of capture tools — Chromium via Playwright, wget, SingleFile, readability, Mercury, yt-dlp and git — behind one index. It suits you when you need proof of what a page said rather than a reading list: every snapshot is a folder of ordinary files you can grep, back up or open years later without ArchiveBox running.

Key features:

- Eleven extractors per URL: title, favicon, SingleFile, PDF, screenshot, DOM, wget mirror, WARC, readability, Mercury and plain text
- Imports from bookmarks exports, RSS, Pocket, Pinboard, Wallabag or a plain URL list
- Optional submission of every URL to archive.org
- Tags, filters and bulk re-snapshot from the admin
- Full-text search across archived page contents, backed by Sonic
- A JSON and WARC view of every snapshot, so the data is never locked in

Two Railway services do the work. **archivebox** serves the UI and runs the captures; since Railway attaches one volume per service, it also runs the scheduler upstream ships as a separate container, with its crontab on the volume so recurring jobs survive redeploys. **sonic** holds the search index in its own volume, private and password-protected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| archivebox | [gridalpha/archivebox-railway](https://github.com/gridalpha/archivebox-railway) | Web service |
| sonic | `valeriansaliou/sonic:v1.8.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | archivebox | 8000 | HTTP port the server binds |
| `TIMEOUT` | archivebox | 120 | Seconds allowed per extractor |
| `SAVE_MEDIA` | archivebox | False | yt-dlp media capture, off by default |
| `SECRET_KEY` | archivebox | (secret) | Django session signing key |
| `PUBLIC_INDEX` | archivebox | False | Hide the snapshot list from anonymous visitors |
| `ADMIN_PASSWORD` | archivebox | (secret) | Superuser password, override to choose one |
| `ADMIN_USERNAME` | archivebox | (secret) | Superuser created on first boot |
| `MEDIA_MAX_SIZE` | archivebox | 250m | Per-file media size ceiling |
| `PUBLIC_ADD_VIEW` | archivebox | False | Only logged-in users may submit URLs |
| `PUBLIC_SNAPSHOTS` | archivebox | False | Require login to read archived files |
| `SEARCH_BACKEND_PORT` | archivebox | 1491 | Sonic channel port |
| `SEARCH_BACKEND_ENGINE` | archivebox | sonic | Full-text search backend |
| `SEARCH_BACKEND_PASSWORD` | archivebox | (secret) | Sonic channel password |
| `SEARCH_BACKEND_HOST_NAME` | archivebox | - | Private hostname of Sonic |
| `SONIC_CHANNEL__INET` | sonic | [::]:1491 | Listen on the private network, not loopback |
| `SONIC_STORE__KV__PATH` | sonic | /var/lib/sonic/store/kv/ | Key-value store on the volume |
| `SONIC_STORE__FST__PATH` | sonic | /var/lib/sonic/store/fst/ | Word graph on the volume |
| `SONIC_SERVER__LOG_LEVEL` | sonic | warn | Log verbosity |
| `SONIC_CHANNEL__AUTH_PASSWORD` | sonic | (secret) | Sonic channel password |
| `SONIC_SEARCH__QUERY_LIMIT_DEFAULT` | sonic | 65535 | Results returned when no limit is given |
| `SONIC_SEARCH__QUERY_LIMIT_MAXIMUM` | sonic | 65535 | Upper bound on result count |
| `SONIC_SEARCH__QUERY_ALTERNATES_TRY` | sonic | 10 | Alternate word forms tried per query |
| `SONIC_STORE__KV__RETAIN_WORD_OBJECTS` | sonic | 100000 | Objects retained per word |

## Configuration

- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/sonic/store`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/archivebox-railway)
