# Deploy kothai on Railway

Save now, remember later and do more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kothai)

## About

Kothai is a self-hosted save-all manager with optional AI. Drop links, images, and text into one box. A remote AI reads and indexes everything so you can search by meaning and ask questions answered from your own stuff. One SQLite file, no cloud account required.

This template deploys the Kothai lite image, which sends inference to a remote endpoint (OpenAI, OpenRouter, or any OpenAI-compatible API) instead of running models locally. It includes a persistent volume for the SQLite database and uploads. Set your API key during deploy or through the app's first-run screen. The lite image uses around 300 MB of RAM and 475 MB of disk, making it well suited for Railway's Hobby plan. Set `KOTHAI_PASSWORD` to protect your instance since Railway gives it a public URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kothai | [ibrahimTareq/kothai](https://github.com/ibrahimTareq/kothai) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KOTHAI_PASSWORD` | (secret) | Password to protect your instance |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Starters · **Languages:** TypeScript, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/kothai)
