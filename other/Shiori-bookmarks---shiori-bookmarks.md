# Deploy Shiori bookmarks on Railway

Private Shiori bookmarks with generated owner credentials.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shiori-bookmarks)

## About

Shiori saves, searches, tags, imports, and archives bookmarks through a web UI and browser extensions. This template runs the official 1.8.0 binary with generated owner credentials and durable SQLite storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Shiori | [tech-progress/railway-template-shiori](https://github.com/tech-progress/railway-template-shiori) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `SHIORI_DIR` | /shiori | - |
| `SHIORI_PASSWORD` | (secret) | Generated owner account password. |
| `SHIORI_USERNAME` | (secret) | Generated owner account username. |
| `SHIORI_HTTP_SECRET_KEY` | (secret) | Generated persistent session-signing secret. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/shiori`

**Category:** Other · **Languages:** Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/shiori-bookmarks)
