# Deploy Andromeda - Cellar on Railway

A minimal wine tasting log

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-cellar)

## About

Andromeda - Cellar is a self-hosted wine tasting log written in Go. Record wines you've tried, optionally analyze bottle labels with Anthropic vision, and publish a public log with a per-wine RSS feed — all backed by a single SQLite database.

Hosting Andromeda - Cellar means running a single Go binary that serves the public log and admin interface over HTTP. State lives in a SQLite file, so deployment needs only a persistent volume plus environment variables (admin password, site URL, port). Optional label analysis calls the Anthropic `/v1/messages` API directly; supply an `ANTHROPIC_API_KEY` to enable it. Uploaded label images are re-encoded to JPEG in-process. On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cellar | `ghcr.io/stevedylandev/andromeda/cellar` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SITE_URL` | - | Optional Site URL for RSS feed |
| `COOKIE_SECURE` | true | Enable HTTPS-only cookies |
| `CELLAR_PASSWORD` | (secret) | Admin password to create, edit, and delete wine records |
| `ANTHROPIC_API_KEY` | (secret) | Optional Anthropic API key for image analysis |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-cellar)
