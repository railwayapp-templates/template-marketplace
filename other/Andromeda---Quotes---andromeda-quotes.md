# Deploy Andromeda - Quotes on Railway

A minimal quote management app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-quotes)

## About

Andromeda - Quotes is a self-hosted, minimal quote-a-day site written in Go. The landing page shows a single deterministic "quote of the day" — white, centered, on a dark background — while a password-protected `/admin` panel adds, searches, and removes quotes. An open JSON read API and a CSV seed command round it out. Data lives in a single SQLite file.

Hosting Andromeda - Quotes means running one Go binary that serves the public page, the admin panel, and the JSON API over HTTP. All templates, static assets, and the classic-author seed list are embedded, and the build is pure-Go SQLite (no CGO), so deployment needs only a persistent volume plus a few environment variables (admin password, port, optional API key). The quote of the day is computed deterministically and rotates at UTC midnight. On Railway, the included Dockerfile builds the image, a persistent volume holds the SQLite database, and environment variables configure the rest. No external database service is required. A fresh deploy starts empty — add quotes from `/admin` or seed the volume from the bundled `quotes.csv`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stevedylandev/andromeda/apps/quotes | `ghcr.io/stevedylandev/andromeda/apps/quotes` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BASE_URL` | - | URL for instance to be used by RSS |
| `COOKIE_SECURE` | true | Use HTTPS secure Cookes |
| `QUOTES_API_KEY` | (secret) | Optional API key to access quotes programmatically |
| `QUOTES_PASSWORD` | (secret) | Admin password to manage quotes |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-quotes)
