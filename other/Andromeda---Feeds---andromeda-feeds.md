# Deploy Andromeda - Feeds on Railway

Minimal RSS reader written in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-feeds)

## About

Andromeda - Feeds is a minimal, self-hosted RSS reader written in Go on the standard library plus a SQLite driver and the `gofeed` parser. It offers a public feed list, preview mode, an admin panel with cookie sessions, OPML import/export, a JSON API, and background polling.

Hosting Andromeda - Feeds means running a single Go binary that serves the public reader and admin interface over HTTP. State lives in a SQLite file, so deployment needs only a persistent volume plus environment variables (admin password, base URL, port, poll interval). A background poller refreshes subscriptions using ETag / Last-Modified to avoid redundant fetches. On Railway, the included Dockerfile builds the image, a persistent volume holds the database, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| feeds | `ghcr.io/stevedylandev/andromeda/feeds` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEFAULT_FEED` | - | A default RSS feed to be used instead of FreshRSS credentials |
| `COOKIE_SECURE` | true | Enable HTTPS cookies |
| `ADMIN_PASSWORD` | (secret) | Password for the admin panel |
| `ITEM_CAP_PER_FEED` | 50 | Cap how many posts are gathered from a feed and stored in db |
| `DEFAULT_POLL_MINUTES` | 30 | How often feeds will fetch new posts |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-feeds)
