# Deploy meilisearch lite on Railway

Lightning-fast open-source search engine with typo tolerance and filters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-lite)

## About

# Meilisearch — Instant Search API

**Meilisearch** is an open-source, Rust-built search engine that returns relevant, typo-tolerant results in under 50 ms. A drop-in self-hosted alternative to Algolia for app search, docs search, e-commerce, and RAG retrieval.

This template deploys Meilisearch wired for Railway:

- **Persistent volume** at `/meili_data` — your indexes survive redeploys and restarts.
- **Production mode** with an auto-generated **master key** (`${{secret(48)}}`) — secured by default, never wide open.
- **Networking preconfigured** — the service boots on port 7700 and the public HTTPS domain routes straight to it.
- Pinned to **v1.46.1** for reproducible deploys.

## Quick start

1. Deploy the template — it boots in seconds. `GET /health` returns `{"status":"available"}`.
2. Grab your key: open the service → **Variables** → copy `MEILI_MASTER_KEY` (generated randomly for your deploy).
3. Index and search:

```bash
# add documents (creates the index on the fly)
curl -X POST 'https://YOUR-DOMAIN.up.railway.app/indexes/movies/documents' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data '[{"id":1,"title":"Akira"},{"id":2,"title":"Alien"}]'

# typo-tolerant search
curl 'https://YOUR-DOMAIN.up.railway.app/indexes/movies/search?q=akra' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY'
```

Official SDKs available for JavaScript, Python, PHP, Ruby, Go, Rust, Java, and .NET — set the host to your Railway domain and the API key to your master key.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `MEILI_MASTER_KEY` | auto-generated 48-char secret | API authentication (`Authorization: Bearer …`). Must be ≥ 16 bytes if you change it. |
| `MEILI_ENV` | `production` | Enforces the master key and disables the dev UI. |
| `PORT` | `7700` | Routes Railway's edge proxy to Meilisearch's fixed port — do not change. |

Optional: set `MEILI_NO_ANALYTICS=true` to opt out of anonymous telemetry.

## Storage

Search indexes live on the attached volume at `/meili_data` (5 GB by default — grow it in the service's volume settings as your indexes do). RAM and disk usage scale with index size.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.46.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7700 |
| `MEILI_ENV` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/meilisearch-lite)
