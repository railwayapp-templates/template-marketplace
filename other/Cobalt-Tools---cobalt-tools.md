# Deploy Cobalt Tools on Railway

Download from YouTube, TikTok & 20+ platforms. No tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-tools)

## About

Cobalt is an open-source media downloader focused on a clean, privacy-first experience. This Railway template deploys the official Cobalt API as a lightweight, stateless service.

![Cobalt Tools](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/imputnet/cobalt)

> **Important**: This template deploys the **Cobalt API only**. It does not include a web interface. You interact with it via API requests (or connect it to your own frontend / automation tools).

> Looking for a ready-to-use Web UI? Deploy the official companion template here:  
> **[Cobalt Web UI →](https://railway.com/deploy/cobalt-web-ui)**

Hosting your own Cobalt instance gives you a private, ad-free, and tracking-free media downloader API under your control.

Cobalt is designed to be **stateless**. Every request is processed independently without storing files or user data. This makes it very lightweight and easy to deploy on Railway.

This template is ideal for:
- Personal media downloading workflows
- Automation pipelines (n8n, Make, custom scripts)
- Backend for custom download frontends
- Privacy-conscious users who want to avoid public downloader sites

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
