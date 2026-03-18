# Deploy glimpse on Railway

Temporary, secure photo sharing with expiring links.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/glimpse)

## About

Glimpse is a self-hosted photo sharing app for temporary, secure sharing. Upload photos, create time-limited share links with 6-character codes, and share them with anyone — no accounts needed for viewers. Links expire automatically, photos are cleaned up, and downloads are invisibly watermarked for traceability. You stay in control of what's shared, who sees it, and for how long.

Glimpse requires a PostgreSQL database and persistent filesystem storage for uploaded photos. This template provisions both automatically — a Railway-managed Postgres instance and a persistent volume mounted at /data/photos. Admin password and session secret are auto-generated at deploy time. The database schema initialises itself on first startup, and photo cleanup runs on a built-in scheduler. No cron jobs, no manual database setup, no configuration files to edit. Just deploy and log in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| glimpse | [james-langridge/glimpse](https://github.com/james-langridge/glimpse) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SITE_URL` | glimpse | - | Defaults to localhost. You can set it after deploy when you know the Railway URL. |
| `EMAIL_FROM` | glimpse | - | Defaults to onboarding@resend.dev |
| `CLEANUP_DAYS` | glimpse | 30 | Defaults to 30. |
| `ADMIN_PASSWORD` | glimpse | (secret) | - |
| `RESEND_API_KEY` | glimpse | (secret) | Only needed if you wants email-gated downloads. |
| `SESSION_SECRET` | glimpse | (secret) | Used for iron-session cookie encryption, watermark PRNG seeds, and IP hashing salt. |
| `DISPLAY_TIMEZONE` | glimpse | - | Defaults to server timezone. |
| `PHOTO_STORAGE_PATH` | glimpse | /data/photos | Defaults to /data/photos in code (src/lib/storage.ts) |
| `POSTGRES_DB` | postgres | railway | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |

## Configuration

- **Start command:** `node node_modules/.bin/next start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/photos`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/glimpse)
