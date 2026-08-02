# Deploy Cockpit | Headless CMS with REST & GraphQL on Railway

API-first headless CMS with REST & GraphQL, admin UI, SQLite — one service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cockpit)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/cockpit?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=cockpit)

[Cockpit](https://getcockpit.com/) is a self-hosted headless CMS — an API-first content platform that has been around for two decades. Model your content (collections, singletons, trees), manage it in a clean admin UI, and consume it from any frontend via REST or GraphQL. Assets, image presets, roles and permissions, localization, and webhooks are all built in.

This template runs Cockpit Core (free, open source) as a single Railway service on FrankenPHP. All content, the SQLite database, uploads, and cache persist on one volume at `/var/www/html/storage`. No external database is needed — SQLite handles the vast majority of headless CMS workloads. Upload limits are raised to 128 MB for media-heavy content.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cockpit | [nomideusz/cockpit-railway](https://github.com/nomideusz/cockpit-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port for Railway healthcheck probing. Do not change. |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/cockpit)
