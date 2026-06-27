# Deploy croma.aurora33.live on Railway

Optimiza, convierte y reescala tus imágenes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cromaaurora33live)

## About

croma.aurora33.live is a free, no-sign-up bulk image compressor. It compresses, resizes, and converts images to WebP, JPEG, PNG, or AVIF — entirely server-side, with no account and no database. Uploaded files are processed temporarily and deleted automatically after about an hour. Built with Next.js by Aurora33.

Hosting croma.aurora33.live means running a single Next.js (App Router) web service powered by Sharp/libvips for native image processing. There is no database and no persistent storage to manage: jobs live in memory and uploaded files sit in an ephemeral temp directory that a built-in cron cleans on a schedule. Railway auto-detects the Next.js app via Railpack, runs the production build, and serves it with a health check at `/api/health`. The app ships with built-in resilience — a bounded job queue, per-IP rate limiting, and a same-origin guard — so a small instance degrades gracefully under load instead of crashing. Configuration is entirely through environment variables, with no extra services required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tool-croma-oss | [aurora33labs/tool-croma-oss](https://github.com/aurora33labs/tool-croma-oss) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | - |
| `CLEANUP_INTERVAL` | 60 | - |
| `NEXT_PUBLIC_HOST` | server | - |
| `NEXT_PUBLIC_LEGAL` | off | - |
| `TRUST_FORWARDED_HOST` | true | - |
| `NEXT_PUBLIC_MAX_FILES` | - | Image limit per batch | Limite de imágenes por lote (default 20) |
| `NEXT_PUBLIC_MAX_FILE_MB` | - | Image max size in MB | Tamaño maximo de imagen en MB (Default 10MB) |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/cromaaurora33live)
