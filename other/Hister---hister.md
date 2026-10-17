# Deploy Hister on Railway

Self-hosted full-text search over your own browsing history

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hister)

## About

Hister is a self-hosted full-text search engine over your own browsing history (asciimoo/hister). Index the pages you visit and search them privately, on infrastructure you control. This template runs the official Hister image, pinned to v0.20.0, with a persistent volume and a health check.

Hosting Hister on Railway means running the Hister container (the Dockerfile pins ghcr.io/asciimoo/hister:v0.20.0) listening on port 4433. The service needs a volume mounted at /hister/data so your index survives redeploys, and the /health endpoint is used as the Railway health check. The template sets HISTER__SERVER__ADDRESS=0.0.0.0:4433, HISTER__SERVER__BASE_URL to your public Railway domain and PORT=4433. The image runs as uid 65532; if you see permission errors on the volume, set RAILWAY_RUN_UID=0 or use the latest-root tag. After deploying, install the Hister browser extension and point it at your Railway URL. Estimated cost is about $1-3 per month in usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-templates | [prime3679/railway-templates](https://github.com/prime3679/railway-templates) (root: /hister) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4433 | HTTP port Hister listens on; must match the public networking port. |
| `HISTER__SERVER__ADDRESS` | 0.0.0.0:4433 | Address and port the Hister server binds to inside the container. |
| `HISTER__SERVER__BASE_URL` | - | Public base URL of Hister, derived from the Railway public domain. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hister/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/hister)
