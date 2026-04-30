# Deploy Kavita | Your Private Digital Library Server on Railway

Self-host Kavita on Railway — read manga, comics, and ebooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kavita-reading-server)

## About

Deploy Kavita on Railway to get a fast, self-hosted digital library server for manga, comics, and ebooks — accessible from any browser or OPDS-compatible reader app. Run Kavita on Railway without provisioning servers, managing TLS certificates, or writing Docker configuration files. This template deploys the official `jvmilazz0/kavita:latest` image with persistent storage for your library data, metadata, and reading progress.

Kavita is an open-source reading server (GPL-3.0) by Kareadita that handles manga, webtoons, comics (CBR, CBZ, ZIP, RAR, 7zip), and ebooks (EPUB, PDF) through purpose-built readers optimized for each format. Self-host Kavita to keep your reading library private, synced across devices, and under your full control. Source code: [Kareadita/Kavita on GitHub](https://github.com/Kareadita/Kavita) (10.4k stars).

Kavita is purpose-built for reading digital media in the browser. Unlike general file servers, it provides format-specific readers with features tailored to how people actually consume manga, comics, and books.

- **Manga and webtoon reader** with continuous scroll, single-page, and dual-page spread modes
- **Comic reader** for CBR/CBZ/ZIP/RAR/7zip archives with page-level navigation
- **EPUB reader** with annotation support and Obsidian export
- **PDF viewer** with full rendering and search
- **OPDS support** for third-party apps like KOReader, Panels, and Chunky
- **User management** with per-library access control and age restrictions
- **OIDC authentication** for SSO integration alongside built-in auth
- **Folder watching** — automatically detects new files and updates libraries
- **Full-text search** across titles, authors, tags, and file contents
- **Reading progress sync** across all devices per user

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kavita | `jvmilazz0/kavita:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Container timezone setting |
| `PORT` | 5000 | HTTP server listening port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/kavita/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kavita-reading-server)
