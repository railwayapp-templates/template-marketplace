# Deploy HTMX + FastAPI + Jinja2 + Postgres on Railway

HTMX FastAPI + Jinja2 + Python + PostgreSQL. Async API + server templates.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmx-fastapi-jinja2-postgres)

## About

HTMX FastAPI Jinja2 Postgres is a **Python** hypermedia stack: **HTMX** handles dynamic DOM updates, **FastAPI** serves routes and responses, **Jinja2** renders HTML with inheritance and partials, and **asyncpg** talks to **PostgreSQL** asynchronously. The bundled Todo app shows how to return HTML fragments for swaps while keeping logic and validation on the server.

Run the app as a **container** from the **Dockerfile** (Python slim base). **FastAPI** binds to **`PORT`** and reads **`DATABASE_URL`**. **asyncpg** provides an async pool; **migrations run at startup** to create tables. Templates live under **`templates/`** and return **`HTMLResponse`** for full pages or fragments for **HTMX**. CDN scripts cover **HTMX** and **Tailwind**—no separate frontend build. Connect Postgres over Railway’s **private network**; use **`GET /health`** for deploy checks (JSON + DB ping). This stack suits teams that want **async Python**, **OpenAPI** ergonomics from FastAPI, and **Jinja2** familiarity without adopting a SPA framework.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [atoolz/railway-htmx-python-fastapi-jinja2-pg](https://github.com/atoolz/railway-htmx-python-fastapi-jinja2-pg) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | web | - | full URL from linked Postgres service |
| `POSTGRES_DB` | Postgres | - | DB created on first init (official image / plugin) |
| `DATABASE_URL` | Postgres | - | in-cluster connection string |
| `POSTGRES_USER` | Postgres | (secret) | superuser name on first init |
| `POSTGRES_PASSWORD` | Postgres | (secret) | generated root password |
| `DATABASE_PUBLIC_URL` | Postgres | - | TCP proxy for external clients |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/htmx-fastapi-jinja2-postgres)
