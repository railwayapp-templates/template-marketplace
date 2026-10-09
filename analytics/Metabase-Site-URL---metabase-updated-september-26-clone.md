# Deploy Metabase Site URL on Railway

MB_SITE_URL for links, embeds, and emails

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-updated-september-26-clone)

## About

You can deploy Metabase, build a lovely dashboard, and still email your team links to the wrong host. This template runs the official image with a Postgres app DB and treats `MB_SITE_URL` as a first-class setting, so subscriptions, resets, public links, and signed embeds point at the HTTPS address people actually visit.

The first week usually goes fine. Then you add a custom domain, the Monday subscription goes out, and every link still says `something.up.railway.app`. That isn't a Metabase bug. The app doesn't know its public address unless you tell it.

Without a site URL, Metabase records the browser address used during setup and keeps it. Background jobs like subscriptions and reset emails have no request to look at, so they trust that stored value. Pinning `MB_SITE_URL` removes the guesswork.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-updated-september-26-clone)
