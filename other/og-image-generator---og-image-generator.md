# Deploy og-image-generator on Railway

Self-hosted OG image API — satori + resvg, 4 themes, no headless Chrome

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/og-image-generator)

## About

Deploying provisions a single Railway service called `og-image`, built from the repo's
root `Dockerfile` (Node 22 slim, multi-stage, non-root runtime) and served on Railway's
injected `PORT`. A public domain is attached automatically, and Railway health-checks the
deployment against `GET /health` with an ON_FAILURE restart policy (10 retries). No
environment variables and no database are needed; the first successful deployment serves
`/health` immediately after start.

You host one stateless Node.js container. Because rendering happens in-process (satori
builds SVG, resvg rasterizes it — no browser subprocess), a 512 MB instance stays far
under budget: after 20 sequential 1200×630 renders the service idles around 90–135 MB RSS.
That keeps typical hosting at roughly $5/month on Railway's smallest instance. Images are
served with `Cache-Control: public, max-age=86400` and an LRU cache, so repeat traffic is
cheap. Optional configuration (all off/optional by default): `ALLOW_REMOTE_ASSETS=true`
to enable remote `logo` URLs, `CACHE_MAX_ENTRIES` to tune the LRU, and a `/fonts` volume
mount to add fallback fonts (e.g. Noto Sans for CJK).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| og-image | [lNamelessl/og-image-generator](https://github.com/lNamelessl/og-image-generator) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/og-image-generator)
