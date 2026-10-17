# Deploy Linkwarden on Railway

Self-hosted bookmark manager with permanent page archives

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkwarden-3)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/linkwarden-lite?utm_campaign=linkwarden-lite)

**Linkwarden** — a self-hosted, collaborative bookmark manager that permanently archives every saved page as a **screenshot, PDF, and single-file HTML snapshot**, so your links survive link rot. Collections, tags, sharing, browser extension, mobile apps, and fast full-text search.

Deploys in one click with **zero form fields**. Three services come up together:

- **linkwarden** — the Next.js web app + archiving worker (headless Chromium + `monolith` HTML snapshots) on `/`
- **postgres** — PostgreSQL 16 on a Railway volume
- **meilisearch** — full-text search on a Railway volume, private-network only

The database URL is composed at boot from the Postgres companion; `NEXTAUTH_URL` points at your Railway domain; all secrets (`NEXTAUTH_SECRET`, `POSTGRES_PASSWORD`, `MEILI_MASTER_KEY`) are generated. Open the domain and create your account.

The app honors Railway's injected `PORT`. The entrypoint waits for Postgres, runs `prisma migrate deploy`, then starts the web server and the archiving worker. Archives, the database cluster, and the search index each live on their own Railway volume. Healthcheck is `GET /` (200 or login redirect, unauthenticated).

- **Memory:** app ~500 MB at rest; `MAX_WORKERS=1` caps Chromium concurrency so archive bursts stay inside Hobby limits. Postgres ~100 MB, Meilisearch ~200 MB at rest.
- **Build:** the official prebuilt images (all digest-pinned) — no source builds, deploys in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linkwarden | [mc9max/linkwarden-lite](https://github.com/mc9max/linkwarden-lite) | Web service |
| postgres | [mc9max/linkwarden-lite](https://github.com/mc9max/linkwarden-lite) (root: /postgres) | Database |
| meilisearch | [mc9max/linkwarden-lite](https://github.com/mc9max/linkwarden-lite) (root: /meilisearch) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NEXTAUTH_SECRET` | linkwarden | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/meili_data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/linkwarden-3)
