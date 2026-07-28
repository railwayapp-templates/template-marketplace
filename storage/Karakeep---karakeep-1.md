# Deploy Karakeep on Railway

AI-assisted bookmark app with full-text search and page archiving.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-1)

## About

Karakeep is a bookmark-everything app for links, notes, and images. Save anything in one click, let AI auto-tag it for you, and find it again instantly with full-text search. Self-hosted, private, and always under your control.

This template deploys three services pre-wired over Railway private networking: the Karakeep web app (public domain, port 8080), Meilisearch for full-text search, and headless Chrome that crawls and archives the pages you save. Two persistent volumes keep your data safe: /data for Karakeep's database and uploads, and /meili_data for the search index. All connection details are injected automatically through Railway reference variables, so there is nothing to fill in at deploy time — click deploy, open the generated domain, and create your account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.41.0@sha256:860fa4baed04ae1c235de870edab0c8006227546dea1bbb6411fbfc5e27cf1db` | Database |
| chrome | `zenika/alpine-chrome:124@sha256:31758da502f606986ab6d229694d7953741a89f106715d7fa5f2c939b247deeb` | Worker |
| web | `ghcr.io/karakeep-app/karakeep:0.32.0@sha256:64d6a9bbf2d37b5c808cf06b5d87f1f1c7846fdd3844724145a9741aeb06fd31` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NEXTAUTH_SECRET` | (secret) |

## Configuration

- **Volume:** `/meili_data`
- **Start command:** `--no-sandbox --disable-gpu --disable-dev-shm-usage --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222 --hide-scrollbars`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/karakeep-1)
