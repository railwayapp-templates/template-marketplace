# Deploy YT Zero on Railway

Own rules, no login required. Every video from every channel you follow

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yt-zero-1)

## About

YT Zero is a self-hosted YouTube subscriptions reader that provides a calm, chronological feed without recommendations, ads, or algorithmic distractions. Follow channels without a Google account, organize videos, track watch progress, create profiles, schedule content, and optionally download videos for local playback using the built-in yt-dlp integration.

Hosting YT Zero on Railway gives you a private, always-available instance accessible from any device. Railway builds the application using its dedicated Dockerfile, exposes the web interface, monitors the `/api/health` endpoint, and stores application data in a persistent volume mounted at `/data`. YT Zero uses SQLite by default, so no external database is required for a standard single-instance deployment. The persistent volume contains the database, avatars, cached images, logs, settings, and downloaded videos. After deployment, generate a Railway public domain, open the application, and add or import your YouTube subscriptions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ytzero | [Pelski/ytzero](https://github.com/Pelski/ytzero) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Europe/Warsaw | - |
| `DB_PATH` | /data/db/ytzero.db | - |
| `LOG_PATH` | /data/logs/ytzero.log | - |
| `AVATAR_DIR` | /data/avatars | - |
| `DOWNLOADS_DIR` | /data/downloads | - |
| `IMG_CACHE_DIR` | /data/imgcache | - |
| `YTDLP_AUTO_UPDATE` | 1 | - |
| `IMG_CACHE_TTL_DAYS` | 7 | - |
| `YTZERO_AUTH_METHOD` | shared | - |
| `DATABASE_STATE_PATH` | /data/database-state.json | - |
| `RESTORE_SESSION_DIR` | /data/restore-sessions | - |
| `IDLE_TIMEOUT_SECONDS` | 120 | - |
| `YTZERO_AUTH_PASSWORD` | (secret) | Super secret initial password - change in setting of app. |
| `REFRESH_INTERVAL_MINUTES` | 5 | - |
| `FULL_SYNC_INTERVAL_MINUTES` | 15 | - |
| `VIDEO_MAINTENANCE_MAX_AGE_DAYS` | 90 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, Astro, Shell, Dockerfile, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/yt-zero-1)
