# Deploy Shiori on Railway

Private bookmarks with generated owner credentials

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shiori-secure)

## About

Shiori is a simple self-hosted bookmark manager that stores links, tags, excerpts, archives, thumbnails, and ebooks. This template deploys stable version 1.8.0 with a generated owner account and durable SQLite-backed storage.

Sign in with `SHIORI_ADMIN_USER` and the generated `SHIORI_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shiori | [monotykamary/railway-template-shiori](https://github.com/monotykamary/railway-template-shiori) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal Shiori HTTP port. |
| `SHIORI_DIR` | /data | Persistent Shiori data directory. |
| `SHIORI_ADMIN_USER` | (secret) | Initial owner username. |
| `SHIORI_ADMIN_PASSWORD` | (secret) | Generated owner password. |
| `SHIORI_HTTP_SECRET_KEY` | (secret) | Stable HTTP session signing key. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/shiori-secure)
