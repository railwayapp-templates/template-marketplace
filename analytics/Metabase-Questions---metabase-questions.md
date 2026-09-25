# Deploy Metabase Questions on Railway

saved questions and models in Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-questions)

## About

You're three joins deep, the numbers finally reconcile, and Slack asks whether that query is a one-off or the new source of truth. A Metabase Question is the saved artifact — notebook or raw SQL — that turns a working query into something the team can rerun, pin, and trust. Models wrap reusable tables on top. Self-hosting on Railway keeps those definitions in your own Postgres app database beside the Metabase container.

A saved Metabase question is a living artifact—logic, joins, filters, and intent bundled into something a sales manager can reuse without touching SQL. Host it on Railway and that artifact lives in your own Postgres, not a vendor's pricing review. This template runs `metabase/metabase` (pin a tag like `v0.63.x`, not `latest`) with Postgres as the app database. H2 is not production: Railway redeploys wipe it, killing every saved question and model. The container listens on port 3000; health check `GET /api/health` returns 200 when ready. Set `MB_ENCRYPTION_SECRET_KEY` once and never change it—encrypted database connections break otherwise. Set `MB_SITE_URL` to your public HTTPS URL for correct embeds and emails. Remember: the app Postgres stores Metabase metadata (users, collections, questions, models, dashboards). Your actual analytics databases connect separately after first boot under Admin → Databases.

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

[View on Railway →](https://railway.com/deploy/metabase-questions)
