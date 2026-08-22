# Deploy Baserow | (Just Updated) Airtable Alternative Whose Admin Isn't Claimable By Strangers on Railway

Airtable alternative; admin seeded before the URL opens. Needs 2GB RAM.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-or-just-updated-airtable-alterna)

## About

Baserow is an open-source no-code database and spreadsheet — a self-hosted alternative to Airtable, with grid, gallery, form and kanban views, a REST API for every table, and webhooks. This template deploys Baserow's all-in-one image, pinned by digest to 2.3.3, as three preconfigured services with your admin account already seeded.

This template runs Baserow's all-in-one image (backend, Celery workers, and the Nuxt web frontend behind Caddy) alongside dedicated Postgres and Redis services. All three carry volumes, so your tables, uploaded files and job state survive every redeploy. The wrapper image seeds your administrator account from `BASEROW_ADMIN_EMAIL` / `BASEROW_ADMIN_PASSWORD` and switches public sign-up off **before** Caddy binds the public port, and it re-applies the password on every boot — so a redeploy is a working password reset. `BASEROW_PUBLIC_URL` is wired to your Railway domain and `X-Forwarded-Proto` is trusted, so share links, form links and password-reset emails come out as `https://` rather than pointing at localhost.

Give the Baserow service **2 GB of RAM**. Measured on the stock all-in-one image: at a 1 GB cap it is OOM-killed during first boot and never becomes reachable; at 2 GB it settles around 1.3 GB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1-alpine` | Database |
| postgres | `postgres:16.4-alpine` | Database |
| baserow | `ghcr.io/bon5co/baserow-railway:2.3.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY` | baserow | (secret) |
| `BASEROW_ADMIN_PASSWORD` | baserow | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/baserow-or-just-updated-airtable-alterna)
