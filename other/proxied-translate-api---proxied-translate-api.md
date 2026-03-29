# Deploy proxied-translate-api on Railway

Self-hosted translation API with optional proxy and batch support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/proxied-translate-api)

## About

proxied-translate-api is a lightweight self-hosted HTTP API for text translation using Google Translate, with optional proxy support. It is designed for fast deployment, minimal infrastructure, and easy customization through environment variables. No database or Redis is required.

This template deploys a Node.js translation API with sensible defaults so you can get started quickly. It provides REST endpoints for service information, health checks, language listing, and translation requests, including batch translation. The service can run without extra configuration, but also supports optional proxy settings, rate limits, and request size controls for more advanced use cases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxied-translate-api | [5rom/proxied-translate-api](https://github.com/5rom/proxied-translate-api) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PROXY_FALLBACK` | true |
| `PROXY_PASSWORD` | (secret) |
| `PROXY_USERNAME` | (secret) |

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/proxied-translate-api)
