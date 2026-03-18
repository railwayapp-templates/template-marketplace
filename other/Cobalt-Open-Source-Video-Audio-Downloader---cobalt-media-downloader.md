# Deploy Cobalt | Open-Source Video & Audio Downloader on Railway

Self-Host Cobalt on Railway and get a public media download API instantly

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-media-downloader)

## About

Self-host Cobalt Tools on Railway and get a private, ad-free media download API running in minutes. Cobalt (`ghcr.io/imputnet/cobalt`) is an open-source media downloader that works as a proxy — paste a link, get the file, no ads, no trackers, no caching. This template deploys the Cobalt API backend with all required environment variables pre-configured, including your Railway public domain wired to `API_URL` automatically.

Cobalt is a media downloader built around a single principle: no nonsense. It never caches content — everything is proxied in real time from the original source to the end user. It supports downloading from over 20 platforms including YouTube, TikTok, Instagram, Twitter/X, Reddit, SoundCloud, and more.

Key features:
- Proxy-style streaming — content is never stored server-side
- Supports video (up to 8K/HDR on YouTube), audio, images, and GIFs
- No ads, trackers, paywalls, or rate-limit popups
- Optional API key authentication and Cloudflare Turnstile bot protection
- CORS wildcard support for easy frontend integration
- AGPL-3.0 licensed, fully open source

The Railway template deploys the Cobalt API service. The API exposes a single endpoint that accepts a media URL and returns a proxied download stream or redirect.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cobalt API | `ghcr.io/imputnet/cobalt` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_URL` | - | Public base URL for API |
| `API_PORT` | 9000 | Port where Cobalt API server runs |
| `CORS_WILDCARD` | 1 | Allow CORS requests from all origins |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-media-downloader)
