# Deploy Calibre-Web | Your Personal Ebook Server on Railway

Self Host Calibre-Web: Browse, read, manage ebooks & much more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calibre-web)

## About

Deploy Calibre-Web on Railway to turn any Calibre library into a full-featured ebook server accessible from any browser or e-reader app. Self-host Calibre-Web with zero infrastructure hassle — this template pre-configures the LinuxServer.io container image with persistent storage, automatic metadata database initialization, and the correct port bindings for Railway's networking layer.

Calibre-Web provides a clean web interface for browsing, reading, and downloading books from a personal Calibre library. It supports OPDS feeds, Kobo sync, send-to-Kindle, multi-user access, and optional ebook format conversion.

Calibre-Web is an open-source web application that provides a browser-based frontend for Calibre libraries. Unlike Calibre desktop, it runs as a server — making your entire book collection accessible from phones, tablets, e-readers, and any device with a browser.

- Browse, search, and filter books by author, tag, series, language, or custom columns
- Built-in EPUB and PDF reader — read books directly in the browser
- OPDS catalog feed for compatible reader apps (KOReader, Moon+ Reader, Aldiko)
- Native Kobo device synchronization with KEPUB conversion
- Send books to Kindle or other devices via email
- Multi-user support with granular permissions and optional LDAP/OAuth authentication
- Edit metadata, covers, and custom columns without Calibre desktop
- Optional ebook format conversion via Calibre binaries (DOCKER_MODS)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Calibre-Web | `linuxserver/calibre-web` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Container timezone |
| `PGID` | 1000 | Container group ID |
| `PORT` | 8083 | HTTP server listening port |
| `PUID` | 1000 | Container user ID |
| `DOCKER_MODS` | linuxserver/mods:universal-calibre | Ebook format conversion support |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/calibre-web)
