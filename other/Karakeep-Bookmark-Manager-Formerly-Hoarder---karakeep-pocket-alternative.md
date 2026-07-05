# Deploy Karakeep — Bookmark Manager, Formerly Hoarder on Railway

Self-host Karakeep (ex-Hoarder): AI bookmarks. Import Pocket in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-pocket-alternative)

## About

![Karakeep bookmark manager dashboard](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777817318/3fd81495-2884-4149-a56b-a9daa3952104.png)

Karakeep — **formerly Hoarder** — is the open-source "bookmark everything" app: save links,
notes, images, and PDFs, let AI tag them automatically via OpenAI or a local Ollama, and find
anything again with sub-50ms Meilisearch full-text search. Browser extensions for Chrome and
Firefox, native iOS and Android apps, RSS import, and a REST API.

**Pocket is gone — Mozilla shut it down in 2025.** Karakeep imports your Pocket export in one
click and gives you what Pocket never did: AI tagging, full-page archiving, and data that lives
on your own infrastructure. Self-host on Railway for ~$5–10/month with no storage caps and no
feature tiers.

---

Karakeep is the successor to Hoarder — same project, renamed — and the most complete
self-hosted answer to Pocket, Raindrop.io, and Omnivore (also shut down). Running it properly
needs three coordinated services: the app itself, Meilisearch for search, and a headless
Chromium for crawling and screenshots, connected with shared secrets and token auth. That
wiring is exactly what breaks most self-hosted Karakeep setups.

Railway provisions all of it in one click: private networking, two persistent volumes,
auto-generated secrets, and `BROWSER_CONNECT_ONDEMAND` pre-set so the crawler connects to
Chromium only when needed — avoiding the idle-timeout failures common in Karakeep deployments.

Typical cost: **~$5–10/month** on Railway's Hobby plan. Karakeep Cloud is $4/month with a
50 GB cap; Raindrop.io Pro is $28/year with no AI tagging and no self-host option. Railway
self-hosting has no storage tier and no feature gates.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Karakeep | `karakeep-app/karakeep:latest` | Database |
| Meilisearch | `getmeili/meilisearch` | Database |
| Browserless | [railwayapp-templates/browserless-v2](https://github.com/railwayapp-templates/browserless-v2) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Karakeep | 3000 |
| `DATA_DIR` | Karakeep | /data |
| `DISABLE_SIGNUPS` | Karakeep | false |
| `NEXTAUTH_SECRET` | Karakeep | (secret) |
| `MAX_ASSET_SIZE_MB` | Karakeep | 50 |
| `CRAWLER_NUM_WORKERS` | Karakeep | 1 |
| `BROWSER_CONNECT_ONDEMAND` | Karakeep | true |
| `CRAWLER_STORE_SCREENSHOT` | Karakeep | true |
| `CRAWLER_DOWNLOAD_BANNER_IMAGE` | Karakeep | true |
| `PORT` | Meilisearch | 7700 |
| `MEILI_NO_ANALYTICS` | Meilisearch | true |
| `PORT` | Browserless | 8080 |
| `TOKEN` | Browserless | (secret) |
| `TIMEOUT` | Browserless | 120000 |
| `BROWSER_TOKEN` | Browserless | (secret) |
| `BROWSER_PORT_PRIVATE` | Browserless | 3001 |

## Configuration

- **Volume:** `/data`
- **Volume:** `/meili_data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/karakeep-pocket-alternative)
