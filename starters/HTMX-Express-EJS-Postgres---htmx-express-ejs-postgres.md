# Deploy HTMX Express EJS Postgres on Railway

HTMX Express EJS Node.js PostgreSQL - classic MVC, partial swaps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmx-express-ejs-postgres)

## About

HTMX Express EJS Postgres is a **Node** starter for hypermedia UIs: **HTMX** updates the DOM from HTML responses, **Express** handles routing and middleware, **EJS** renders views with familiar JavaScript syntax, and **PostgreSQL** stores data. The template ships a working Todo app so you can deploy and iterate on server-driven partials immediately—no client framework or build pipeline for the UI.

The app runs as a **Node.js** service built with a **multi-stage Dockerfile** (Alpine-based). It uses the **`pg`** pool, **`DATABASE_URL`** from the environment, and **`PORT`** from Railway. **Schema setup runs on boot** so you are not running migrations by hand. Static assets are minimal: **HTMX** and **Tailwind** from CDN. Postgres is reached on the **private network**; public access is only what you expose on the web service. Configure Railway’s **health check** to **`/health`**, which executes a lightweight query and returns **200** or **503**. This stack is ideal when you want the **largest Node ecosystem** and straightforward templates while keeping the UX dynamic via HTMX.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [atoolz/railway-htmx-node-express-ejs-pg](https://github.com/atoolz/railway-htmx-node-express-ejs-pg) | Web service |

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

**Category:** Starters · **Languages:** JavaScript, EJS, Dockerfile

[View on Railway →](https://railway.com/deploy/htmx-express-ejs-postgres)
