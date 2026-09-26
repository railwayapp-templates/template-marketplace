# Deploy GoatCounter on Railway

GoatCounter 2.7: privacy-friendly web analytics without cookie banners.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/goatcounter-1)

## About

GoatCounter is simple, privacy-friendly web analytics. It counts page views, referrers, browsers, screen sizes and locations without cookies or personal data, so most sites do not need a consent banner. The dashboard is fast and readable, and a tiny script or a pixel does the tracking.

This template runs the official `arp242/goatcounter:2.7.0` image as one service with SQLite on a Railway volume. On first boot the start command creates a site for your Railway domain and an admin account from the variables, then starts the server; later boots skip that step. The container runs as root so it can write to the Railway volume. Page views and settings survive redeploys. Add the tracking script shown under Settings to your website, and GoatCounter starts counting. It uses very little memory and runs on the Hobby plan, even for sites with a lot of traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| goatcounter | `arp242/goatcounter:2.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `GC_ADMIN_EMAIL` | admin@example.com |
| `GC_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'D=sqlite+/home/goatcounter/goatcounter-data/db.sqlite3; goatcounter db create site -createdb -db $D -vhost $RAILWAY_PUBLIC_DOMAIN -user.email $GC_ADMIN_EMAIL -user.password $GC_ADMIN_PASSWORD >/tmp/seed.log 2>&1 && echo "[seed] site $RAILWAY_PUBLIC_DOMAIN created" || echo "[seed] site already set up"; exec goatcounter serve -automigrate -listen :8080 -tls http -db $D'`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/goatcounter/goatcounter-data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/goatcounter-1)
