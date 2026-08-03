# Deploy FreshRSS on Railway

Self-hosted RSS feed aggregator.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freshrss-1)

## About

FreshRSS is a free, self-hosted RSS feed aggregator for collecting and reading news from many websites in one place. It is lightweight, multi-user, customizable, and supports RSS and Atom feeds, filtering, search, statistics, OPML import and export, APIs for reader clients, WebSub, and optional web scraping.

Hosting FreshRSS on Railway uses one public container and one persistent volume. The template pins the LinuxServer.io FreshRSS 1.29.1 image, exposes its documented HTTP port `80` through a Railway HTTPS domain, and mounts `/config` for the installation, users, feeds, database, logs, keys, and extensions. Railway checks `/` for HTTP readiness and restarts failed deployments. On first visit, complete FreshRSS's setup wizard and choose the database configuration that fits your instance; SQLite is suitable for a single-service deployment. Keep one replica for this volume-backed application and maintain independent backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FreshRSS | `linuxserver/freshrss:1.29.1@sha256:5292f1d623f621d65c8ecd0034b7cf637531f0ad6008b08affd6a73e32b902ea` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PGID` | 1000 |
| `PORT` | 80 |
| `PUID` | 1000 |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /config/nginx; echo 'resolver 1.1.1.1 8.8.8.8 valid=30s;' > /config/nginx/resolver.conf; exec /init"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/freshrss-1)
