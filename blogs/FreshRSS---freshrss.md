# Deploy FreshRSS on Railway

FreshRSS — one-click self-hosted feed reader

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freshrss)

## About

FreshRSS is a free, self-hosted RSS and Atom aggregator for following blogs, news, podcasts, and other feed-based content without a third-party reader.

This template runs `freshrss/freshrss:latest` on port 8080 and stores application data in a Railway volume at `/var/www/FreshRSS/data`. Timezone defaults to `Asia/Shanghai`. Feed polling runs at minutes 1 and 31 (`CRON_MIN`). After deploy, open the public URL and complete FreshRSS's built-in installer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freshrss/freshrss:latest | `freshrss/freshrss:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Shanghai |
| `LISTEN` | 0.0.0.0:8080 |
| `CRON_MIN` | 1,31 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/FreshRSS/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/freshrss)
