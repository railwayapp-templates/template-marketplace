# Deploy HTMX + Hono + JSX + Postgres on Railway

HTMX + Hono + JSX + TypeScript + PostgreSQL. Lightweight Node, typed views.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmx-hono-jsx-postgres)

## About

HTMX Hono JSX Postgres is a **TypeScript** starter: **HTMX** drives the UI from HTML over the wire, **Hono** is a small, fast HTTP layer on **Node**, **JSX** (Hono’s) types your server-rendered components, and **PostgreSQL** backs the app. You get a Todo demo that shows partial swaps and typed views without shipping a browser bundle for your own components.

Deploy the **Node** service with the repo’s **Dockerfile**; production runs compiled **TypeScript** from `dist/`. The app uses **`pg`** with pooling, **`DATABASE_URL`**, and Railway’s **`PORT`**. **Migrations on startup** provision the schema. **HTMX** and **Tailwind** are CDN-loaded—no Vite/webpack for the demo UI. Hono’s **`c.html()`** returns JSX-rendered fragments ideal for **HTMX** targets. Point Postgres via **private networking** and set Railway health checks to **`GET /health`** (DB-aware JSON). This fits teams who want **Hono’s footprint** and **TS end-to-end** while staying in the hypermedia style.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [atoolz/railway-htmx-node-hono-jsx-pg](https://github.com/atoolz/railway-htmx-node-hono-jsx-pg) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | DB created on first init (official image / plugin) |
| `DATABASE_URL` | Postgres | - | in-cluster connection string |
| `POSTGRES_USER` | Postgres | (secret) | superuser name on first init |
| `POSTGRES_PASSWORD` | Postgres | (secret) | generated root password |
| `DATABASE_PUBLIC_URL` | Postgres | - | TCP proxy for external clients |
| `DATABASE_URL` | web | - | full URL from linked Postgres service |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/htmx-hono-jsx-postgres)
