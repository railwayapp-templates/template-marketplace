# Deploy elysia-starter on Railway

Batteries included API starter using Bun, Elysia, and Drizzle

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elysia-starter)

## About

Elysia Starter is a batteries included starter for building an API using Bun, Elysia, and Drizzle.

Using the elysia-starter gets you an API with the powered by:

- 🥟 Bun
- 👮 TypeScript
- 🦊 Elysia
- ⚡ Drizzle
- 🐘 Postrges

Need help? Check out the [GitHub repo](https://github.com/amorriscode/elysia-starter) to report issues or open a pull request.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| api | [amorriscode/elysia-starter](https://github.com/amorriscode/elysia-starter) | Web service |

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
- **Start command:** `bun run dev`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/elysia-starter)
