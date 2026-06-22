# Deploy Andromeda - Easel on Railway

A minimal art calendar that fetches artwork from ARTIC

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-easel)

## About

Andromeda - Easel is a self-hosted Go app that surfaces a daily painting from the Art Institute of Chicago, persisting each day's selection to SQLite. Past days stay browsable through a web UI, JSON API, and an Atom feed; future days are unavailable.

Hosting Andromeda - Easel means running a single Go binary that serves the web pages, JSON API, and Atom feed over HTTP. State is a SQLite file, so deployment needs only a persistent volume plus a handful of environment variables (timezone, base URL, port, classification filters). A background scheduler fetches and dedupes each day's artwork, so the host must have correct timezone data — the Docker image installs `tzdata`. On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| easel | `ghcr.io/stevedylandev/andromeda/easel` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EASEL_BASE_URL` | http://localhost:4242 | Public base URL (used for absolute links in /feed.xml) |
| `EASEL_TIMEZONE` | UTC | IANA timezone for day boundary (e.g. America/Chicago, Europe/London) |
| `EASEL_BACKFILL_DAYS` | 10 | On startup, fill any missing day in the last N days. 0 disables backfill. |
| `EASEL_EXCLUDE_TERMS` | erotic,erotica,shunga | Phrases excluded via must_not match across title/description/term/subject/category/classification. Comma-separated. Set empty to disable filtering. |
| `EASEL_CLASSIFICATIONS` | painting | Comma-separated AIC classification_title filters (lowercased, e.g. painting,drawing,print) |
| `EASEL_MAX_DEDUP_RETRIES` | 10 | Max retries when picking a non-duplicate artwork |

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-easel)
