# Deploy Dukafi sqlite on Railway

Self hosted commerce CMS with a visula page builder editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dukafi-sqlite)

## About

Dukafi is a self-hosted commerce CMS: visual page editor, catalogue, checkout, and a published static storefront. This SQLite template runs the whole store as one Railway service. Database, uploads, plugins, and baked HTML live on one volume — no Postgres. Open the URL, create the owner account, and the shop is live.

The image starts Puma, runs migrations, and serves admin plus the storefront from one process. SQLite is the default when `DATABASE_URL` is unset; the file is `/data/dukafi.sqlite3`. Attach a persistent volume at `/data` before the first deploy, or a restart wipes the store, media, and published HTML. Set `SESSION_SECRET` (64+ random characters). Railway injects `PORT`; leave it unset. Health checks must hit `/admin/api/health`, not `/health`. Stay on one replica: SQLite and on-disk published files do not share cleanly across instances. After deploy, open the public domain and complete owner setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dukafi | `ghcr.io/dukafi/dukafi:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | HTTP port the app listens on. Leave this empty — Railway injects PORT at deploy. Do not set 9292 or any other custom value. |
| `SESSION_SECRET` | (secret) | generate with Railway `${{secret(64)}}` or `openssl rand -hex 64` |

## Configuration

- **Healthcheck:** `/admin/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/dukafi-sqlite)
