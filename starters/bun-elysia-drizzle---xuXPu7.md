# Deploy bun-elysia-drizzle on Railway

Get started with Bun, Elysia and Drizzle ORM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xuXPu7)

## About

This template is for those looking to quickly get started with Bun, Elysia and Drizzle ORM. The database used is a Postgres database.

Once this template is deployed, follow these steps to ensure everything is working as expected:
1. Ensure the `DATABASE_URL` env variable is set to `${{Postgres.DATABASE_URL}}`
2. In the settings of the server, under Networking, make sure a domain is generated
3. The initial deploy will fail on the Drizzle migrate step. Clone the repo created and add your tables to the schema.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | [thecodebrew/bun-elysia-drizzle-base](https://github.com/thecodebrew/bun-elysia-drizzle-base) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/xuXPu7)
