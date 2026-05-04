# Deploy Karakeep | Open-Source Bookmark Manager on Railway

Karakeep - The Bookmark Everything App | Save, Organize & Tag with AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-bookmark-manager)

## About

Deploy Karakeep on Railway to get a self-hosted bookmark manager with AI-powered tagging, full-text search, and browser extensions in under two minutes. Self-host Karakeep and own your data — bookmarks, notes, images, and PDFs stay on your infrastructure.

This template pre-configures three services: Karakeep (`ghcr.io/karakeep-app/karakeep:release`) with embedded SQLite, Meilisearch (`getmeili/meilisearch:v1.41.0`) for full-text search, and Browserless v2 (Railway's official `railwayapp-templates/browserless-v2` build of `ghcr.io/browserless/chromium:latest`, fronted by Caddy for IPv6 + private-network support) for web crawling and screenshots.

![Karakeep Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777812392/059ad38f-013b-40f1-a2e8-6f2c6d0e4728.png)

Karakeep (formerly Hoarder) is an open-source, self-hostable bookmark-everything application built for developers and researchers who want intelligent organization without cloud dependencies.

Key features:

- Bookmark links, notes, images, and PDFs in one place
- AI-powered automatic tagging via OpenAI or Ollama
- Full-text search powered by Meilisearch
- Browser extensions for Chrome and Firefox
- Mobile apps for iOS and Android
- RSS feed import, OAuth/OIDC, and REST API
- Rule-based auto-organization into lists

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | `getmeili/meilisearch` | Database |
| Karakeep | `ghcr.io/karakeep-app/karakeep:latest` | Web service |
| BrowserlessV2 | [railwayapp-templates/browserless-v2](https://github.com/railwayapp-templates/browserless-v2) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Meilisearch | 7700 | Meilisearch listening port |
| `MEILI_MASTER_KEY` | Meilisearch | - | Search engine authentication key |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable telemetry reporting |
| `PORT` | Karakeep | 3000 | HTTP server listening port |
| `DATA_DIR` | Karakeep | /data | Persistent data directory path |
| `MEILI_ADDR` | Karakeep | - | Meilisearch connection URL |
| `NEXTAUTH_URL` | Karakeep | - | Public-facing application URL |
| `DISABLE_SIGNUPS` | Karakeep | false | Block new user registration |
| `NEXTAUTH_SECRET` | Karakeep | (secret) | Session signing secret key |
| `MEILI_MASTER_KEY` | Karakeep | - | Shared Meilisearch auth key |
| `MAX_ASSET_SIZE_MB` | Karakeep | 50 | Maximum upload file size (MB) |
| `CRAWLER_NUM_WORKERS` | Karakeep | 1 | Parallel crawl worker count |
| `BROWSER_WEBSOCKET_URL` | Karakeep | - | Browserless v2 Playwright WebSocket endpoint with token |
| `BROWSER_CONNECT_ONDEMAND` | Karakeep | true | Connect on demand (avoids 30s idle timeout from browserless) |
| `CRAWLER_STORE_SCREENSHOT` | Karakeep | true | Save page screenshots on crawl |
| `CRAWLER_DOWNLOAD_BANNER_IMAGE` | Karakeep | true | Download banner images from URLs |
| `PORT` | BrowserlessV2 | 8080 | Internal browserless port (Caddy proxies here) |
| `TOKEN` | BrowserlessV2 | (secret) | Browserless auth token (hardcoded; referenced cross-service from Karakeep) |
| `TIMEOUT` | BrowserlessV2 | 120000 | Per-job timeout in ms (2 min — covers slow page loads) |
| `BROWSER_TOKEN` | BrowserlessV2 | (secret) | Self-reference for convenience endpoints |
| `BROWSER_PORT_PRIVATE` | BrowserlessV2 | 3001 | Caddy listen port (also used as public domain targetPort) |

## Configuration

- **Volume:** `/meili_data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/karakeep-bookmark-manager)
