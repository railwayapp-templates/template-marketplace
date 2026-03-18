# Deploy remix-postgresql on Railway

A Railway starter template based on Remix, PostgreSQL (Prisma) and Radix UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VeLWVf)

## About

## A Remix PostgreSQL Railway template

A [Railway](https://railway.app/) template based on [Remix](https://remix.run), [PostgreSQL](https://www.postgresql.org/) (via [Prisma](https://www.prisma.io/)) and [Radix UI](https://www.radix-ui.com/).

This starter comes with some batteries included:

*   Database migrations are automatically applied when deployed
*   Password-based authentication (incl. user registration and session management)
*   An example for a protected route
*   Dark mode and theme switcher
*   A notification service

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remix | [janmonschke/remix-postgresql-railway-template](https://github.com/janmonschke/remix-postgresql-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | - | Railway Private Domain |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/VeLWVf)
