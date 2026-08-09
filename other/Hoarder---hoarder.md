# Deploy Hoarder on Railway

KaraKeep - bookmark-everything app (links, notes and images),AI added

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hoarder)

## About

Hoarder is a self-hosted bookmark and knowledge-management application for saving links, notes, images, and PDFs. It provides full-text search, web crawling, screenshots, and optional AI-powered tagging.

This Railway template deploys Hoarder with Meilisearch and a dedicated Chrome service. Hoarder uses embedded SQLite and stores application data on a persistent Railway Volume. Meilisearch provides full-text search, while Chrome handles browser-based crawling and rendering. The services communicate through Railway private networking, while Hoarder is accessed through a public HTTPS Railway Domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hoarder | `ghcr.io/hoarder-app/hoarder:latest` | Web service |
| meilisearch | `getmeili/meilisearch:v1.41.0` | Web service |
| chrome | [arloodots/chrome](https://github.com/arloodots/chrome) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Hoarder | 3000 |
| `DATA_DIR` | Hoarder | /data |
| `DISABLE_SIGNUPS` | Hoarder | false |
| `NEXTAUTH_SECRET` | Hoarder | (secret) |
| `MAX_ASSET_SIZE_MB` | Hoarder | 50 |
| `CRAWLER_NUM_WORKERS` | Hoarder | 1 |
| `BROWSER_CONNECT_ONDEMAND` | Hoarder | true |
| `CRAWLER_STORE_SCREENSHOT` | Hoarder | true |
| `CRAWLER_DOWNLOAD_BANNER_IMAGE` | Hoarder | true |
| `PORT` | meilisearch | 7700 |
| `MEILI_NO_ANALYTICS` | meilisearch | true |
| `PORT` | chrome | 8080 |
| `TOKEN` | chrome | (secret) |
| `TIMEOUT` | chrome | 120000 |
| `BROWSER_TOKEN` | chrome | (secret) |
| `BROWSER_PORT_PRIVATE` | chrome | 3001 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/meili_data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hoarder)
