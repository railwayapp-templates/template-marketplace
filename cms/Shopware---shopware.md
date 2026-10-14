# Deploy Shopware on Railway

Self-hosted open-source e-commerce platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shopware)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/shopware)

Shopware is the open-source e-commerce platform for running your own online store: storefront, product catalog, cart and checkout, promotions, and a full admin backend. This template deploys Shopware 6.7 with demo data pre-installed — your shop is browsable seconds after the first boot finishes.

This template deploys Shopware as a single Railway service from a pinned image (`dockware/shopware:6.7.15.1`, Shopware 6.7.15.1, MIT-licensed): PHP 8.2 + Apache + MySQL 8 in one container, no external database to manage. One Railway volume mounted at `/data` holds the MySQL datadir plus media, files, theme, thumbnail, and sitemap directories, so products, orders, customers, and uploads survive redeploys. On boot the wrapper remaps Apache to Railway's `PORT`, rewrites sales-channel URLs to your public domain (https enforced), rotates the default admin password to a generated secret, and warms the production cache. Cron runs Shopware's scheduled tasks and message-queue workers every minute.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Shopware | [mc9max/shopware-lite](https://github.com/mc9max/shopware-lite) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SHOPWARE_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/shopware)
