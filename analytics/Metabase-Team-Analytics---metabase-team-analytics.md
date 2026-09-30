# Deploy Metabase Team Analytics on Railway

shared BI workspace for product and ops

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-team-analytics)

## About

Product managers want answers in minutes, not a ticket queue. Ops folks need the same dashboard to load before standup ends. That's the promise of a shared Metabase workspace — and on Railway, it's a two-service stack that costs less than a team lunch.

When a product team hits fifteen people, someone builds a spreadsheet that becomes the source of truth. Three weeks later it has forty-seven tabs, two conflicting definitions of "active user," and an owner who's leaving.

"Self-hosted" scares people — they picture a Linux box in a closet and a 2 a.m. phone call. Railway collapses that. You get the Metabase container wired to a Postgres service with environment variables doing most of the work. Railway handles networking, TLS, the reverse proxy, and restarts.

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

[View on Railway →](https://railway.com/deploy/metabase-team-analytics)
