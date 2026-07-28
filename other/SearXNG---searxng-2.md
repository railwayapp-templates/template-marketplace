# Deploy SearXNG on Railway

Privacy-respecting metasearch engine with persistent configuration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-2)

## About

SearXNG is a free, privacy-respecting metasearch engine that aggregates results from hundreds of search engines and services without tracking or profiling users. It fetches results anonymously on your behalf, so your queries are never shared with upstream providers, and it ships with no ads, no logs, and full control over which engines are enabled.

Hosting SearXNG on Railway is a single Docker service listening on port 8080. Settings persist in a volume mounted at /etc/searxng — the image auto-generates defaults on first boot, and this template overlays a minimal settings.yml that enables the JSON search format while inheriting all other built-in defaults. A random SEARXNG_SECRET is generated automatically per deployment via Railway's secret function. The built-in limiter/bot detection is disabled because container traffic inside the platform lacks reverse-proxy headers. Note: Railway supports one volume per service, so the cache directory uses the container filesystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | `ghcr.io/searxng/searxng:2026.7.22-ef8f6470e@sha256:854f239d5c181db9c4282cd0ffc1737a61232dd6ad0ea964028b96df17d7758a` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SEARXNG_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/searxng`

**Category:** Other

[View on Railway →](https://railway.com/deploy/searxng-2)
