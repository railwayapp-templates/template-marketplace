# Deploy TanStack Start on Railway

TanStack Start 1.0 + Postgres + Drizzle including server functions and SSR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tanstack-start)

## About

[TanStack Start](https://tanstack.com/start) is a full-stack React framework built on TanStack Router and Vite. It gives you type-safe routing, server functions, streaming SSR, and server routes in one app, and builds to a standalone Node server.

This template deploys a TanStack Start 1.0 app with a Postgres database. The app is **Departures**, a split-flap train-station board where visitors post a message and a destination. It's small enough to read in one sitting, but it does what real apps do: reads and writes a database, validates input, keeps a session, streams slow data, exposes a JSON API, and prerenders a static page.

Railway builds the app with Railpack and runs the Nitro output with `node .output/server/index.mjs`. Before each deploy, a pre-deploy command applies the Drizzle migrations and seeds an empty board. The new deployment only receives traffic once `/api/health` confirms it can reach the database. The app talks to Postgres over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Departures-Web | [railwayapp/railway-tanstack-start](https://github.com/railwayapp/railway-tanstack-start) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_URL` | Departures-Web | - | Departures Database |
| `SESSION_SECRET` | Departures-Web | (secret) | Connection Secret |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node .output/server/index.mjs`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/tanstack-start)
