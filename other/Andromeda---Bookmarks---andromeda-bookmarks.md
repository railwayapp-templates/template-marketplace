# Deploy Andromeda - Bookmarks on Railway

A minimal bookmarks and links manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-bookmarks)

## About

Andromeda - Bookmarks is a self-hosted personal link saver written in Go, organizing saved links by category. It serves a public list, an admin panel with cookie sessions, favicon fetching, and a JSON API with API-key-gated writes — all backed by a single SQLite database.

Hosting Andromeda - Bookmarks means running a single Go binary that serves the public link list and admin interface over HTTP. State lives in a SQLite file, so deployment needs only a persistent volume plus environment variables (admin password, API key, port). Writes via `POST /api/links` are gated by an API key, enabling automation from other tools. On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bookmarks | `ghcr.io/stevedylandev/andromeda/bookmarks` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `COOKIE_SECURE` | true | Enable HTTPS secure cookies |
| `BOOKMARKS_API_KEY` | (secret) | Set true behind HTTPS to mark session cookie Secure |
| `BOOKMARKS_PASSWORD` | (secret) | API key for POST /api/links (omit to disable write API) |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-bookmarks)
