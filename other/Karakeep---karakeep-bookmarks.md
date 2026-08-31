# Deploy Karakeep on Railway

Bookmark app that saves a readable copy of every page you keep

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-bookmarks)

## About

Karakeep is an open-source bookmark-everything app for people tired of watching saved links rot. Paste a URL and it fetches the page in a real browser, keeps a screenshot and a readable copy of the text, and indexes the lot so you can find it again by any word on the page — not just the words in the title. It also takes notes, images and PDFs, sorts them into nestable lists and tags, and subscribes to RSS feeds. It began life as Hoarder, is maintained by Localhost Labs under AGPL-3.0, and ships browser extensions, mobile apps, a REST API and an MCP server.

Deploy Karakeep on Railway and you get the production shape, not the smallest thing that boots. Three services are wired together: **karakeep** runs the web app and worker pool with the SQLite database on a persistent volume; **chrome** is a Chrome Headless Shell the crawler drives over the private network to render JavaScript-heavy pages and capture screenshots; **meilisearch** holds the full-text and vector index on its own volume. A managed object storage bucket takes every screenshot and archived page. Only the web app is public.

![Diagram of the Karakeep, Chrome and Meilisearch services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788048396/karakeep-architecture.png)

A bookmark is only useful if the thing it points at is still there. Karakeep treats every saved link as content to archive rather than an address to remember, so notes, documentation and articles stay readable after the original goes behind a paywall or disappears. Self-hosting also keeps the archive private — nothing about what you read leaves your own infrastructure.

Key features:

- Full-page archiving with screenshots, readable text and optional PDF and video capture
- Full-text search across titles, URLs, tags and the crawled body of every page
- Optional AI tagging and summarisation via OpenAI or a local Ollama server
- Nestable lists, tags, highlights, RSS subscriptions and a rule engine
- Browser extensions, mobile apps, a REST API, webhooks and an MCP server
- Imports from Pocket, Omnivore, Linkwarden, Raindrop and HTML bookmark files

Each supporting service does one job. Chrome exists because much of the web no longer renders without JavaScript: the crawler has it load the page, run its scripts and return a screenshot and the finished DOM. Meilisearch holds the search index and, with embeddings on, the vector index. Object storage keeps the heavy artefacts off the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chrome | [gridalpha/karakeep-railway](https://github.com/gridalpha/karakeep-railway) | Worker |
| meilisearch | `getmeili/meilisearch:v1` | Database |
| karakeep | [gridalpha/karakeep-railway](https://github.com/gridalpha/karakeep-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOME` | chrome | /tmp | Writable home for the fontconfig cache |
| `PORT` | meilisearch | 7700 | Port Railway health-checks |
| `TMPDIR` | meilisearch | /meili_data/tmp | Indexing scratch space on the volume |
| `MEILI_ENV` | meilisearch | production | Requires the master key on every request |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | Index location on the volume |
| `MEILI_DUMP_DIR` | meilisearch | /meili_data/dumps | Dump location on the volume |
| `MEILI_HTTP_ADDR` | meilisearch | [::]:7700 | Dual-stack bind so peers can reach it |
| `MEILI_MASTER_KEY` | meilisearch | - | Search engine root credential |
| `MEILI_UPGRADE_DB` | meilisearch | true | Migrate the index in place on upgrade |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disable telemetry |
| `MEILI_SNAPSHOT_DIR` | meilisearch | /meili_data/snapshots | Snapshot location on the volume |
| `MEILI_SCHEDULE_SNAPSHOT` | meilisearch | 86400 | One snapshot every 24 hours |
| `MEILI_MAX_INDEXING_MEMORY` | meilisearch | 1024 MiB | Cap indexing memory to the RAM quota |
| `MEILI_MAX_INDEXING_THREADS` | meilisearch | 2 | Cap indexing threads to the CPU quota |
| `PORT` | karakeep | 3000 | HTTP port the web app listens on |
| `DATA_DIR` | karakeep | /data | Volume path for the SQLite database |
| `LOG_LEVEL` | karakeep | info | Application log verbosity |
| `MEILI_ADDR` | karakeep | - | Search engine private address |
| `DB_WAL_MODE` | karakeep | true | SQLite write-ahead logging |
| `NEXTAUTH_URL` | karakeep | - | Public-facing app URL |
| `BROWSER_WEB_URL` | karakeep | - | Headless Chrome DevTools address |
| `DISABLE_SIGNUPS` | karakeep | false | Set true after creating your account |
| `NEXTAUTH_SECRET` | karakeep | (secret) | Session token signing key |
| `MEILI_MASTER_KEY` | karakeep | - | Search engine root key |
| `ASSET_STORE_S3_BUCKET` | karakeep | - | Bucket holding archived assets |
| `ASSET_STORE_S3_REGION` | karakeep | - | Object storage region |
| `RATE_LIMITING_ENABLED` | karakeep | true | Throttle API and login requests |
| `ASSET_STORE_S3_ENDPOINT` | karakeep | - | Object storage endpoint |
| `ASSET_STORE_S3_ACCESS_KEY_ID` | karakeep | - | Object storage access key |
| `ASSET_STORE_S3_FORCE_PATH_STYLE` | karakeep | true | Path-style bucket addressing |
| `ASSET_STORE_S3_SECRET_ACCESS_KEY` | karakeep | (secret) | Object storage secret key |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /meili_data/tmp /meili_data/snapshots /meili_data/dumps; exec tini -s -- /bin/meilisearch'`
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/karakeep-bookmarks)
