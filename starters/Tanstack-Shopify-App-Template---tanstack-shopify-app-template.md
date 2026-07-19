# Deploy Tanstack Shopify App Template on Railway

TanStack Start Shopify app with React 19, Drizzle ORM, and PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tanstack-shopify-app-template)

## About

A production-ready Shopify app boilerplate built with TanStack Start, React 19, TypeScript, Drizzle ORM, and PostgreSQL. It includes Shopify OAuth, session storage, App Bridge integration, direct HMAC-verified webhooks, and generated types for the Shopify Admin API 2026-07.

The Railway template deploys two services: the Shopify app and PostgreSQL 18. Railway automatically connects the database, creates a public app domain, builds the app with Railpack, pushes the Drizzle schema before deployment, and starts the Nitro server.

Redis and BullMQ are not required. Webhooks are authenticated and processed directly by the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Shopify App | [djordje-st/tanstack-start-shopify-app-boilerplate](https://github.com/djordje-st/tanstack-start-shopify-app-boilerplate) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URL` | Shopify App | - | Postgres URL. Automatically configured. |
| `SHOPIFY_APP_URL` | Shopify App | - | Public app URL. Automatically configured. |
| `RAILPACK_BUILD_CMD` | Shopify App | pnpm app:build | Build command for the app |
| `SHOPIFY_API_SECRET` | Shopify App | (secret) | Client secret from the Shopify Dev Dashboard |
| `SHOPIFY_APP_SCOPES` | Shopify App | read_products | Should match the scopes in shopify.app.toml |
| `VITE_SHOPIFY_API_KEY` | Shopify App | (secret) | Client ID from the Shopify Dev Dashboard or shopify.app.toml |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm app:start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/tanstack-shopify-app-template)
