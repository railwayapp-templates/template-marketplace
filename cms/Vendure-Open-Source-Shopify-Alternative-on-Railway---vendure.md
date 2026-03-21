# Deploy Vendure | Open Source Shopify Alternative on Railway on Railway

Self-host Vendure: Full e-commerce backend. GraphQL APIs, Worker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vendure)

## About

Self-host Vendure — the open-source headless commerce framework built on TypeScript, Node.js, NestJS, and GraphQL. It exposes two GraphQL APIs (Shop API and Admin API) and a built-in React Admin UI, giving you a full e-commerce backend you own and control completely.

This Railway template deploys Vendure end-to-end with three pre-wired services: **Vendure Server** (API + Admin UI), **Vendure Worker** (background jobs), and **PostgreSQL** (persistent storage). The server and worker both build from the official [one-click-deploy](https://github.com/vendurehq/one-click-deploy) repository with all database credentials injected automatically. A volume is attached at `/vendure-assets` for uploaded product images.

![Vendure Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1774035618/vendure_railway_deployment_mriyxa.png)

Vendure is a developer-first headless commerce framework designed for teams that need full control over their commerce logic without inheriting a monolithic platform's constraints.

**Key features:**
- Dual GraphQL APIs: Shop API for storefronts, Admin API for management
- Built-in React Admin UI served at `/admin`
- Plugin architecture — extend or override any part of the commerce logic
- Background job queue via a dedicated Worker process (search indexing, emails, webhooks)
- TypeScript throughout — full type safety from DB to API
- Supports custom fields, custom entities, and custom resolvers without forking core

The server and worker run as separate Railway services sharing the same Postgres database and codebase. The worker handles async workloads so the server stays responsive under load.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vendure-Server | [praveen-ks-2001/vendure-railway-template](https://github.com/praveen-ks-2001/vendure-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Vendure-Worker | [praveen-ks-2001/vendure-railway-template](https://github.com/praveen-ks-2001/vendure-railway-template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | Vendure-Server | production | Application runtime environment mode |
| `DB_HOST` | Vendure-Server | - | Postgres database host reference |
| `DB_NAME` | Vendure-Server | - | Postgres database name reference |
| `DB_PORT` | Vendure-Server | - | Postgres database port reference |
| `DB_SCHEMA` | Vendure-Server | public | Database schema used by application |
| `DB_PASSWORD` | Vendure-Server | (secret) | Postgres database password reference |
| `DB_USERNAME` | Vendure-Server | (secret) | Postgres database username reference |
| `COOKIE_SECRET` | Vendure-Server | (secret) | Secret for cookie signing |
| `ASSET_UPLOAD_DIR` | Vendure-Server | /vendure-assets | Directory storing uploaded assets |
| `SUPERADMIN_PASSWORD` | Vendure-Server | (secret) | Superadmin account password |
| `SUPERADMIN_USERNAME` | Vendure-Server | (secret) | Superadmin account username |
| `RUN_JOB_QUEUE_FROM_SERVER` | Vendure-Server | false | Run job queue from server instance |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `APP_ENV` | Vendure-Worker | production | Application runtime environment mode |
| `DB_HOST` | Vendure-Worker | - | Postgres database host reference |
| `DB_NAME` | Vendure-Worker | - | Postgres database name reference |
| `DB_PORT` | Vendure-Worker | - | Postgres database port reference |
| `DB_SCHEMA` | Vendure-Worker | public | Database schema used by application |
| `DB_PASSWORD` | Vendure-Worker | (secret) | Postgres database password reference |
| `DB_USERNAME` | Vendure-Worker | (secret) | Postgres database username reference |

## Configuration

- **Start command:** `node ./dist/index.js`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/vendure-assets`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node ./dist/index-worker.js`

**Category:** CMS · **Languages:** TypeScript, Handlebars, Dockerfile

[View on Railway →](https://railway.com/deploy/vendure)
