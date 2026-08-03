# Deploy SearXNG on Railway

Privacy-focused metasearch engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-3)

## About

SearXNG is a free, open-source metasearch engine that combines results from many search providers without building a personal search profile. It offers a familiar web interface, configurable engines, categories for web, image, news, and other searches, and JSON responses for privacy-conscious applications that need a self-hosted search endpoint.

Hosting SearXNG on Railway requires one public container running the immutable SearXNG image, a public HTTPS domain targeting port `8080`, and a strong `SEARXNG_SECRET` generated when the template is deployed. The container creates `/etc/searxng/settings.yml` from its built-in template when the configuration volume is empty, so no application-specific settings file has to be supplied for the first deployment. The draft persists `/etc/searxng`; SearXNG's `/var/cache/searxng` cache is rebuildable and remains ephemeral because Railway currently permits only one volume per service. Set `SEARXNG_LIMITER=false` when the instance is called by trusted applications that do not provide proxy bot-detection headers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearXNG | `ghcr.io/searxng/searxng:2026.7.26-b060c780d@sha256:d0aaeb14880e6e92bde1518fcc7261e995783367d63d95203383607bef9c6516` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SEARXNG_SECRET` | (secret) |
| `SEARXNG_LIMITER` | false |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/searxng`

**Category:** Other

[View on Railway →](https://railway.com/deploy/searxng-3)
