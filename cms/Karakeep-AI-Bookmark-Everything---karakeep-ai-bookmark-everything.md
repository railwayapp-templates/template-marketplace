# Deploy Karakeep (AI Bookmark Everything) on Railway

Self-hosted bookmark app with AI tagging & full-text search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-ai-bookmark-everything)

## About

Karakeep (formerly Hoarder) is an open-source, self-hosted "bookmark everything" app. Save links, notes, and images, and let AI automatically tag and organize them. Full-text search is powered by Meilisearch, while a headless Chrome instance archives full-page snapshots and screenshots so your bookmarks never rot.

This template deploys Karakeep as three connected services: the Karakeep web app and background workers, a Meilisearch full-text search engine, and a headless Chromium browser for crawling and archiving pages. Private networking, shared secrets, and persistent volumes are all wired up automatically — the app data and the search index each get their own volume, and the Meilisearch master key plus auth secret are generated on first deploy. Just deploy, open the public URL, and create the first (admin) account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| karakeep | `ghcr.io/karakeep-app/karakeep:release` | Web service |
| chrome | `zenika/alpine-chrome:123` | Worker |
| meilisearch | `getmeili/meilisearch:v1.41.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | karakeep | 3000 | - |
| `DATA_DIR` | karakeep | /data | - |
| `NEXTAUTH_SECRET` | karakeep | (secret) | - |
| `MEILI_ENV` | meilisearch | production | Do not change. |
| `MEILI_HTTP_ADDR` | meilisearch | [::]:7700 | Bind on IPv6 so Karakeep can reach Meilisearch over Railway private networking. Do not change. |
| `MEILI_MASTER_KEY` | meilisearch | - | Auto-generated Meilisearch master key. Shared with the Karakeep app. |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disable Meilisearch telemetry. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `chromium-browser --headless --no-sandbox --disable-gpu --disable-dev-shm-usage --remote-debugging-address=:: --remote-debugging-port=9222 --hide-scrollbars`
- **Volume:** `/meili_data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/karakeep-ai-bookmark-everything)
