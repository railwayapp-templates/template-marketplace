# Deploy RailBlog on Railway

One-service blog: Next.js + Payload CMS embedded + Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railblog)

## About

RailBlog is a one-service blog and content-site template: Next.js 15
with Payload CMS 3 embedded in the same app — no separate CMS backend,
no separate frontend deploy — backed by a single Postgres plugin. Ghost
dominates Railway's Blogs category because it's a real one-click admin
panel; the only "modern stack" alternatives need two or three separate
services to run. RailBlog is the first entry that's actually lighter:
one app, one database, one deploy.

This template deploys a single Railway service running Next.js with
Payload CMS mounted into its own route tree — the admin panel at
`/admin`, the content API, and the public blog all render from the same
process, with content read through Payload's in-process Local API
rather than an HTTP round trip to itself. A Postgres plugin holds posts,
categories, media metadata, and admin users; a Railway Volume mounted
at `/app/public/media` persists uploaded images across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [Alphine/railblog](https://github.com/Alphine/railblog) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PAYLOAD_SECRET` | web | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, SCSS

[View on Railway →](https://railway.com/deploy/railblog)
