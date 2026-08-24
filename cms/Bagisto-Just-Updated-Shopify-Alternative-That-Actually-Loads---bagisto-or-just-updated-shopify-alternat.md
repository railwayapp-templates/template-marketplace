# Deploy Bagisto | (Just Updated) Shopify Alternative That Actually Loads on Railway

Shopify alternative whose admin login works and store data survives

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bagisto-or-just-updated-shopify-alternat)

## About

Bagisto is an open-source e-commerce platform built on Laravel and Vue: product catalogue, cart and checkout, orders, customers, CMS pages, multi-channel storefronts, and a REST API. This template deploys it with a working encryption key, a private administrator account, and store data that survives a redeploy.

This template runs Bagisto 2.4.3 as two services: the application (nginx, PHP-FPM and the queue supervisor in one container, with `storage/` on a persistent volume) and MySQL 9.4 on its own volume, sized from the container's memory limit rather than a fixed figure. The Laravel `APP_KEY` is generated once onto the volume as a real 32-byte key, so encrypted sessions and settings keep working across restarts. The administrator is seeded from your template variables before the store answers a request, and re-applied on every boot, so a redeploy is a working password reset. The installer's seeders run exactly once — they delete and re-insert store configuration every time they run, so anything after the first boot would wipe your channels, CMS pages and attribute options. The app honours Railway's injected port and is healthchecked.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bagisto | `ghcr.io/bon5co/bagisto-railway:2.4.3` | Web service |
| mysql | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | bagisto | (secret) |
| `BAGISTO_ADMIN_PASSWORD` | bagisto | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/bagisto/storage`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; BP=$((MEM / 1024 / 1024 * 50 / 100)); [ "$BP" -lt 128 ] && BP=128; echo "[railway] innodb_buffer_pool_size=${BP}M"; exec docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=${BP}M'`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bagisto-or-just-updated-shopify-alternat)
