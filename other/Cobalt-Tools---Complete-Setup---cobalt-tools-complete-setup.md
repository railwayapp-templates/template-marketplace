# Deploy Cobalt Tools - Complete Setup on Railway

Complete self-hosted Cobalt Tools with API and web interface

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-tools-complete-setup)

## About

Cobalt Tools Complete Setup deploys both the Cobalt API and a beautiful web interface in one template. It provides a full self-hosted media downloader experience with API backend and modern frontend connected together.

This template automatically provisions two services in a single deployment: the Cobalt Tools API and the Cobalt Web UI frontend. The Web UI is pre-configured to communicate with the API, allowing you to immediately use a clean and modern interface without manual configuration.

The Cobalt API handles media processing for supported platforms such as YouTube, TikTok, Instagram, Twitter/X, and others. The Web UI provides an easy-to-use frontend so you and your users can paste links and download media directly through the browser.

This Complete Setup is ideal if you want a ready-to-use Cobalt instance without deploying and connecting the API and frontend separately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `ghcr.io/imputnet/cobalt:latest` | Web service |
| web | `ghcr.io/spotdemo4/cobalt-web:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | api | 9000 |
| `API_PORT` | api | 9000 |
| `CORS_WILDCARD` | api | 1 |
| `RATELIMIT_MAX` | api | 20 |
| `DURATION_LIMIT` | api | 10800 |
| `TUNNEL_LIFESPAN` | api | 90 |
| `RATELIMIT_WINDOW` | api | 60 |
| `API_LISTEN_ADDRESS` | api | 0.0.0.0 |
| `PROCESSING_PRIORITY` | api | 10 |
| `TUNNEL_RATELIMIT_MAX` | api | 40 |
| `SESSION_RATELIMIT_MAX` | api | 10 |
| `FORCE_LOCAL_PROCESSING` | api | never |
| `TUNNEL_RATELIMIT_WINDOW` | api | 60 |
| `SESSION_RATELIMIT_WINDOW` | api | 60 |
| `PORT` | web | 8787 |
| `LOG_LEVEL` | web | info |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-tools-complete-setup)
