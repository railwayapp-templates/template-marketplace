# Deploy HTMX + Go + Chi + Postgres on Railway

HTMX + Go + Templ + Chi + PostgreSQL. Full-stack server-rendered app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmx-go-chi-postgres)

## About

HTMX Go Templ Chi PostgreSQL is a starter for hypermedia-driven apps: **HTMX** swaps HTML fragments in the browser without a SPA, **Go** serves HTTP with the **Chi** router, **Templ** gives type-safe server templates, and **PostgreSQL** persists data. One web service plus a managed Postgres database is enough to run the included Todo demo end to end.

You deploy a **single Go service** from a multi-stage **Dockerfile** (small production image). The app uses **pgx** with a pool, reads **`DATABASE_URL`** (typically `${{Postgres.DATABASE_URL}}`), and listens on **`PORT`**. **Migrations run at startup**, so tables exist without manual SQL. **HTMX** and **Tailwind** load from a CDN—no frontend bundler. The app talks to Postgres over **Railway’s private network**. A **`GET /health`** handler runs a simple DB check and returns JSON so Railway can gate traffic on healthy deploys. Scaling is mostly vertical (more RAM/CPU on the service) unless you split read replicas later; for this template, keep Postgres as the Railway plugin and point the app at it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [atoolz/railway-htmx-go-templ-chi-pg](https://github.com/atoolz/railway-htmx-go-templ-chi-pg) | Web service |

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

**Category:** Storage · **Languages:** Go, templ, Dockerfile

[View on Railway →](https://railway.com/deploy/htmx-go-chi-postgres)
