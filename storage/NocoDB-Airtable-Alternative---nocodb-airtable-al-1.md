# Deploy NocoDB Airtable Alternative on Railway

NocoDB 2026.07 with Postgres 17, bases and attachments on volumes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-airtable-al-1)

## About

NocoDB is the open-source Airtable alternative: turn any database into a spreadsheet-style interface with grid, gallery, kanban, and form views, plus a REST API generated for every table. This template deploys NocoDB 2026.07 with its own PostgreSQL 17 metadata database on a persistent volume.

NocoDB stores two distinct things, and conflating them is what breaks most self-hosted deployments. Its *metadata* — bases, views, filters, users, shared links, and API tokens — lives in the database named by `NC_DB`. Left unset, that defaults to SQLite inside the container, which on Railway means every base and every user account is discarded on redeploy.

This template sets `NC_DB` to a dedicated PostgreSQL 17 service over Railway's private network from first boot, with Postgres storing its data on a mounted volume. A second volume is mounted at `/usr/app/data` for file-type cell attachments, which are written to disk rather than to the database. `NC_AUTH_JWT_SECRET` is generated once and pinned — rotating it invalidates every issued session and API token.

Beyond its own metadata, NocoDB can connect *external* data sources: point it at a Postgres, MySQL, or SQL Server you already run and it will build a spreadsheet UI over your existing tables without copying them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nocodb | `nocodb/nocodb:2026.07.0` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NC_AUTH_JWT_SECRET` | nocodb | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nocodb-airtable-al-1)
