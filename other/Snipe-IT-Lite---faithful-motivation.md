# Deploy Snipe IT Lite on Railway

IT asset management with SQLite, single container

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/faithful-motivation)

## About

This template runs Snipe-IT as a single service on Railway:

- **Image** — Built from source (Dockerfile) using `snipe/snipe-it:latest-alpine` as the base image, with PHP SQLite driver added
- **Database** — SQLite file on a 5GB volume at `/var/lib/snipeit/database.sqlite`, created automatically on first boot
- **Web server** — Apache + PHP-FPM inside the container, listening on port 80
- **Scaling** — one replica only (SQLite does not support multi-writer); scale vertically if needed
- **Backups** — copy `/var/lib/snipeit/database.sqlite` from the volume, or use Settings → Backups in the UI

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snipe-it-lite | [mc9max/snipe-it-lite](https://github.com/mc9max/snipe-it-lite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_ENV` | production | Laravel environment. |
| `APP_KEY` | - | Laravel encryption key. Auto-generated at deploy. |
| `APP_URL` | - | Public URL of the instance. Auto-filled with the Railway domain. |
| `APP_DEBUG` | false | Debug output. Keep off in production. |
| `DB_DATABASE` | /var/lib/snipeit/database.sqlite | SQLite file path. Must stay on the volume. |
| `MAIL_MAILER` | log | Mail transport. log stores mail in deploy logs until SMTP is configured. |
| `DB_CONNECTION` | sqlite | Database driver. SQLite keeps everything in one container. |
| `SESSION_DRIVER` | file | Session storage backend. |
| `PHP_MEMORY_LIMIT` | 256M | PHP memory cap. |
| `APP_TRUSTED_HEADERS` | HEADER_X_FORWARDED_FOR,HEADER_X_FORWARDED_HOST,HEADER_X_FORWARDED_PORT,HEADER_X_FORWARDED_PROTO,HEADER_X_FORWARDED_PREFIX | Trust Railway's X-Forwarded-* headers for correct HTTPS detection. |
| `APP_TRUSTED_PROXIES` | ** | Trust all proxies (Railway is the only proxy). Required for correct URL detection. |
| `PHP_FPM_PM_MAX_CHILDREN` | 2 | PHP-FPM worker cap. 2 fits small plans. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/snipeit`

**Category:** Other · **Languages:** Blade, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/faithful-motivation)
