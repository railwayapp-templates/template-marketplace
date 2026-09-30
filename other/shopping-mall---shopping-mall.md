# Deploy shopping-mall on Railway

Deploy and Host an open-source multiplayer 3D shopping mall with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shopping-mall)

## About

An open-source, multiplayer 3D shopping mall that runs in the browser. Visitors pick a character, walk the mall together, open shops to browse products, chat and wave. You run it from an admin page: shops, products, images and even the building change live.

This template deploys the whole mall:

- **web**: nginx serving the site, and proxying the multiplayer and API routes to the server
- **server**: WebSocket multiplayer, the content API, the admin page's backend and uploads
- **Postgres**: shops and products. An empty database is seeded with a demo mall on first start.
- **uploads**: a private bucket for images and models, served through the server
- **backup**: a nightly `pg_dump` into the bucket, keeping 30 days

When you deploy, choose a `HOST_SECRET`: it's the password for the admin page. After it deploys, open the **web** service's domain, go to `/admin/`, sign in with that password and start adding shops.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backup | [devmtnaing/shopping-mall](https://github.com/devmtnaing/shopping-mall) | Worker |
| server | [devmtnaing/shopping-mall](https://github.com/devmtnaing/shopping-mall) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [devmtnaing/shopping-mall](https://github.com/devmtnaing/shopping-mall) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `KEEP` | backup | 30 |
| `PG_MAJOR` | backup | 18 |
| `S3_URL_STYLE` | backup | virtual |
| `S3_SECRET_ACCESS_KEY` | backup | (secret) |
| `PORT` | server | 8787 |
| `HOST_SECRET` | server | (secret) |
| `S3_URL_STYLE` | server | virtual |
| `ROOM_CAPACITY` | server | 100 |
| `S3_SECRET_ACCESS_KEY` | server | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | web | 8080 |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, Python, Dockerfile, HTML, Shell

[View on Railway →](https://railway.com/deploy/shopping-mall)
