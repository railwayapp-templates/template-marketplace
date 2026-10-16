# Deploy go-pocketbase-htmx-template on Railway

Go + PocketBase + HTMX starter. Zero env vars. Volume /data. From c17.io.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-pocketbase-htmx-template)

## About

One-click Go backend with embedded PocketBase and an HTMX UI. Built for [c17.io](https://c17.io).

Railway builds the Dockerfile, injects `PORT`, and serves the app on a public URL. Attach a volume at `/data` so PocketBase data persists across deploys. Optional env vars seed the first admin user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-pocketbase-htmx | [9o4t/go-pocketbase-htmx](https://github.com/9o4t/go-pocketbase-htmx) | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/go-pocketbase-htmx-template)
