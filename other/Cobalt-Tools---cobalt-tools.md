# Deploy Cobalt Tools on Railway

Download from YouTube, TikTok & 20+ platforms. No tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-tools)

## About

Self-host Cobalt: YouTube, TikTok, Instagram, Twitter/X, Reddit, SoundCloud, Vimeo, and 20+ supported platforms. No ads. No tracking.

Cobalt is an open-source media downloader focused on a clean, privacy-first download experience. Paste a supported public media URL, send it to your own Cobalt API instance, and receive a direct response for downloading or streaming the resolved media.

This Railway template deploys the official Cobalt container image as a lightweight, stateless service. No database, Redis, or persistent volume is required for the default setup.

Hosting Cobalt Tools gives you your own media downloader API instead of relying only on shared public instances. Your deployment runs under your own Railway public domain and processes requests through your own container.

Cobalt is designed as a stateless service. It does not require accounts, databases, queues, or long-term file storage. Each request is processed independently, and media is proxied or resolved directly for the requester.

This makes it suitable for personal use, internal tools, media workflows, and automation pipelines where you want a clean API endpoint without ads, trackers, or third-party downloader pages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cobalt-tools | `ghcr.io/imputnet/cobalt:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9000 |
| `API_PORT` | 9000 |
| `CORS_WILDCARD` | 1 |
| `RATELIMIT_MAX` | 20 |
| `DURATION_LIMIT` | 10800 |
| `TUNNEL_LIFESPAN` | 90 |
| `RATELIMIT_WINDOW` | 60 |
| `API_LISTEN_ADDRESS` | 0.0.0.0 |
| `PROCESSING_PRIORITY` | 10 |
| `TUNNEL_RATELIMIT_MAX` | 40 |
| `SESSION_RATELIMIT_MAX` | 10 |
| `FORCE_LOCAL_PROCESSING` | never |
| `TUNNEL_RATELIMIT_WINDOW` | 60 |
| `SESSION_RATELIMIT_WINDOW` | 60 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-tools)
