# Deploy EasyImg on Railway

Simple self-hostable Nuxt.js personal image hosting system.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easyimg)

## About

EasyImg is an open-source, self-hostable personal image hosting system built with Nuxt.js. It provides a simple web interface for uploading, organizing, previewing, and sharing images. EasyImg supports multiple upload methods, URL imports, API keys, public and private uploads, image moderation, notifications, statistics, rate limiting, and persistent local storage.

Hosting EasyImg on Railway requires a single application service running the `ghcr.io/chaos-zhu/easyimg:latest` Docker image. The application listens on port `3000` and uses local filesystem storage for both its database and uploaded images. Railway Volumes are therefore required to preserve data between deployments. Mount one volume at `/app/db` for database files and another at `/app/uploads` for uploaded images. Railway provides public HTTP/HTTPS networking through a generated domain, while no external PostgreSQL or Redis service is required. The application runs with `NODE_ENV=production`, and Railway handles the container runtime, networking, TLS, deployments, and persistent storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| easyimg | `ghcr.io/chaos-zhu/easyimg:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | bind |
| `PORT` | 3000 | port |
| `NODE_ENV` | production | environmnt |
| `PUBLIC_DOMAIN` | - | access publicallly |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/easyimg)
