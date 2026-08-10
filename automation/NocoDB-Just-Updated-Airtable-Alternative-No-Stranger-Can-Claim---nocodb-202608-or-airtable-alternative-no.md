# Deploy NocoDB | (Just Updated) Airtable Alternative No Stranger Can Claim on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-202608-or-airtable-alternative-no)

## About

NocoDB is the open-source Airtable alternative: turn any database into a spreadsheet-style interface with grid, gallery, kanban, and form views, plus a REST API generated for every table. This template deploys NocoDB 2026.08 with its own PostgreSQL 17 metadata database on a persistent volume — and, unlike a stock deploy, with the admin account already claimed and public signup already closed.

A stock NocoDB instance hands super-admin rights to the first person who signs up. `POST /api/v1/auth/user/signup` needs no authentication, and the first account ever created gets `roles: super` — so on a public Railway URL, every second between the domain going live and the deployer finishing the signup form is a window a stranger can walk through. Seeding an admin is only half a fix: the switch that closes public signup, `invite_only_signup`, defaults to false, lives in the metadata database rather than in any environment variable, and is only reachable through an authenticated API call once the server is running.

This template's image starts NocoDB on a loopback-only port first, signs in as the seeded admin, closes public signup, verifies the setting stuck, and only then binds the public port. The first request the Railway URL ever serves is therefore against an instance that already belongs to the deployer. It also refuses to boot if the admin password is empty, rather than starting an instance anyone could claim.

NocoDB stores two distinct things, and conflating them is what breaks most self-hosted deployments. Its *metadata* — bases, views, filters, users, shared links, and API tokens — lives in the database named by `NC_DB`. Left unset, that defaults to SQLite inside the container, which on Railway means every base and every user account is discarded on redeploy. Here `NC_DB` points at a dedicated PostgreSQL 17 service over Railway's private network from first boot, with Postgres on its own volume, and a second volume at `/usr/app/data` for file-type cell attachments, which are written to disk rather than to the database. `NC_AUTH_JWT_SECRET` is generated once and pinned — rotating it invalidates every issued session and API token.

Beyond its own metadata, NocoDB can connect *external* data sources: point it at a Postgres, MySQL, or SQL Server you already run and it will build a spreadsheet UI over your existing tables without copying them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nocodb | `ghcr.io/bon5co/nocodb-railway:latest` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NC_ADMIN_PASSWORD` | nocodb | (secret) |
| `NC_AUTH_JWT_SECRET` | nocodb | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nocodb-202608-or-airtable-alternative-no)
