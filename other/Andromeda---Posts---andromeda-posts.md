# Deploy Andromeda - Posts on Railway

A minimal micro blogging app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-posts)

## About

Andromeda - Posts is a lightweight, self-hosted CMS blog written in Go. It ships an admin dashboard, pages, file uploads, markdown rendering, RSS feeds, a public JSON API, and zip import/export — all backed by a single SQLite database.

Hosting Andromeda - Posts means running a single Go binary that serves both the public blog and the admin interface over HTTP. State lives in a SQLite file and an uploads directory, so deployment is mostly a matter of providing persistent storage and a few environment variables (admin password, site URL, port). Uploads can stay on the local filesystem or offload to Cloudflare R2. On Railway, the included Dockerfile builds the image, a persistent volume holds the database and uploads, and environment variables configure the rest. No external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| posts | `ghcr.io/stevedylandev/andromeda/posts` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SITE_URL` | - | The full URL of your published site, e.g. "example.com." You can update this later. |
| `COOKIE_SECURE` | true | Enable HTTPS-only cookies |
| `POSTS_PASSWORD` | (secret) | Password to access the /admin dashboard |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-posts)
