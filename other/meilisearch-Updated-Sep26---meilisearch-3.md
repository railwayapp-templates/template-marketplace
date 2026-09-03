# Deploy meilisearch [Updated Sep'26] on Railway

Meilisearch [Sep '26] (Lightning-Fast Open Source Search Engine) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-3)

## About

Meilisearch is the open-source search engine that gives any website or app instant, typo-tolerant search without the operational baggage of Elasticsearch. Written in Rust, it ships as a single binary with a built-in REST API, indexes documents in seconds, and typically answers queries in 20-100ms. Think Algolia's developer experience without Algolia's per-search invoice.

Algolia's Grow plan bills $0.50 per 1,000 searches once you're past the free tier, and $1.75 per 1,000 on Grow Plus. A store doing half a million searches and 250,000 records a month lands around $245/month in overages on Grow alone, more on Grow Plus. Self-hosting Meilisearch on Railway costs a flat infrastructure fee no matter how many queries you run, so the gap only grows as your traffic does.

The bigger reason to self-host isn't only price, though. Every search query and every indexed document tells you something about your users, what they're looking for, what they can't find, what they abandon a search over. On Algolia's cloud, that query stream lives on their infrastructure. Self-hosting keeps it on yours. For products handling anything sensitive, that's not a nice-to-have.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.53.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3331 | The Railway-facing port. Deliberately non-default (Meilisearch's own default is 7700) to avoid colliding with Railway's auto-injected PORT=8080 fallback — confirmed via the reference template's own live config, which uses this exact same non-default value. |
| `MEILI_ENV` | production | Runtime mode. production requires MEILI_MASTER_KEY to be set and disables the interactive web UI; development is more permissive and intended for local testing only. |
| `MEILI_DB_PATH` | /meili_data/data.ms | Path to Meilisearch's on-disk index database. Must live under the mounted volume path (/meili_data) — anything outside it is wiped on every redeploy. |
| `MEILI_HTTP_ADDR` | :::3331 | Must match the PORT variable below. Binds Meilisearch to all interfaces on port 3331. Railway auto-injects PORT=8080 if this project's own PORT variable is ever removed — if you change the port, update both this and PORT together or the service will silently listen on the wrong port. |
| `MEILI_MASTER_KEY` | - | Master API key used to authenticate every request to this instance. Auto-generated per deployment — copy it from the Variables tab after deploy to use in your client SDK. Never leave this unset in production; without it Meilisearch runs in a permissive dev mode. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/meilisearch-3)
