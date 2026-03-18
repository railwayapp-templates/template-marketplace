# Deploy hono starter template on Railway

Quickstart to hono + bun + postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JK5kJM)

## About

## Hono + Bun + Postgres template

This template uses hono with bun and postgres db setup out of the box. The template also include openapi doc using scalar

Navigate to {domain}/docs to view the openapi doc

Once you have your db schema generated using `bun run db:generate`, make sure to add this command `bun run db:migrate` to the pre-deploy command in railway so it will auto migrate the latest schema to your postgres.

Make sure to detach the upstream repo and connect to your own to start developing. See https://docs.railway.com/guides/deploy#eject-from-template-repository on how to eject from a starter template

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| hono-template | [TZGyn/hono-template](https://github.com/TZGyn/hono-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/JK5kJM)
