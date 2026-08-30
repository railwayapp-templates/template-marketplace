# Deploy ZeroClaw AI Assistant on Railway

Personal AI assistant with dashboard, persistent storage, and healthchecks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zeroclaw-ai-assistant)

## About

Personal AI assistant with a public dashboard, persistent workspace storage, and a healthcheck.

One public service built from `leoisadev1/zeroclaw-deploy`, with a volume at `/zeroclaw-data`. The process listens on Railway's `PORT`. Set `API_KEY` after deploy if you want a live model provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zeroclaw | [leoisadev1/zeroclaw-deploy](https://github.com/leoisadev1/zeroclaw-deploy) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zeroclaw-data`

**Category:** AI/ML · **Languages:** Rust, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/zeroclaw-ai-assistant)
