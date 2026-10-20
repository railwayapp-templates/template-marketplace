# Deploy NocoDB on Railway

Open-source Airtable alternative: no-code database with REST APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-3)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/nocodb-3?utm_campaign=nocodb-lite)

**NocoDB** — the open-source Airtable alternative. Turn Postgres into smart spreadsheets with grid, kanban, form, gallery and calendar views, plus auto-generated REST and MCP APIs. Deploys with a Postgres companion in one click, zero form fields.

On first boot the app waits for Postgres, runs migrations, and shows the admin signup page. Uploads persist on a Railway volume.

Two services, deployed together with one click:

- **nocodb** — the NocoDB app (pinned official image `nocodb/nocodb:2026.09.1`), healthcheck `GET /api/v1/health`, honors Railway's injected `PORT`
- **postgres** — PostgreSQL 16 companion for all metadata, reachable only over Railway's private network

The app composes its `NC_DB` connection string at boot from auto-wired single-ref variables (`${{postgres.RAILWAY_PRIVATE_DOMAIN}}`, `${{postgres.POSTGRES_PASSWORD}}`). Telemetry is disabled (`NC_DISABLE_TELE=true`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [mc9max/nocodb-lite](https://github.com/mc9max/nocodb-lite) (root: postgres/) | Database |
| nocodb | [mc9max/nocodb-lite](https://github.com/mc9max/nocodb-lite) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `NC_AUTH_JWT_SECRET` | nocodb | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nocodb-3)
