# Deploy Metabase Embedded Analytics on Railway

embed Metabase charts in your product

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-embedded-analytics)

## About

Metabase for embedded product analytics.

The first time you wire a Metabase dashboard into a paying product, the deployment details bite harder than the SQL. A changed encryption secret or a container restart can break every saved embed link. This template absorbs that risk: a single-node Metabase instance on the official `metabase/metabase` image (port 3000, health-checked at `GET /api/health`) paired with Postgres — the only production setup Metabase blesses.

That Postgres service (e.g. `ghcr.io/railwayapp-templates/postgres-ssl`, version 17) holds the Metabase app database: users, dashboards, saved questions, cache settings, admin account. It is **not** your customer data. Connect production analytics databases later under Admin → Databases. Set `MB_DB_TYPE=postgres` plus `MB_DB_HOST`, `MB_DB_PORT`, `MB_DB_USER`, `MB_DB_PASS`, `MB_DB_DBNAME` from day one. H2 is wiped on redeploy and is never acceptable for embeds. Keep `MB_ENCRYPTION_SECRET_KEY` stable across deploys, and set `MB_SITE_URL` to the public HTTPS URL so links and embeds work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase/metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-embedded-analytics)
