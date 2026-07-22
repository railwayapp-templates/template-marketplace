# Deploy yuvomi on Railway

Private family planner with tasks, calendar, meals, and budget

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yuvomi)

## About

Yuvomi is a self-hosted family planner that runs cleanly as one HTTP container on Railway. Use the pinned upstream image, attach one persistent volume for SQLite data, and let Railway handle public routing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/ulsklyc/yuvomi:1.40.7` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 3000 |
| `DB_PATH` | /data/yuvomi.db |
| `NODE_ENV` | production |
| `BACKUP_DIR` | /data/backups |
| `BACKUP_KEEP` | 7 |
| `TRUST_PROXY` | 1 |
| `WEATHER_UNITS` | metric |
| `BACKUP_ENABLED` | true |
| `SESSION_SECRET` | (secret) |
| `SESSION_SECURE` | true |
| `BACKUP_SCHEDULE` | 0 2 * * * |
| `RATE_LIMIT_WINDOW_MS` | 60000 |
| `SYNC_INTERVAL_MINUTES` | 15 |
| `RATE_LIMIT_MAX_ATTEMPTS` | 5 |
| `DOCUMENT_STORAGE_LOCAL_PATH` | /data/documents |
| `RATE_LIMIT_BLOCK_DURATION_MS` | 900000 |
| `DOCUMENT_STORAGE_LOCAL_ENABLED` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yuvomi)
