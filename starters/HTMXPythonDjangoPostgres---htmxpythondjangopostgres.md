# Deploy HTMX+Python+Django+Postgres on Railway

HTMX + Python + Django + Postgres. Full-stack server-rendered starter.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmxpythondjangopostgres)

## About

**HTMX+Python+Django+Postgres** is a starter for **hypermedia-driven** UIs: Django renders HTML, **HTMX** swaps partial responses in the browser, and **PostgreSQL** stores data—no SPA and no separate Node build. The demo is a small **Todo** app with **Gunicorn** in production, **`DATABASE_URL`** via **dj-database-url**, and **Tailwind + HTMX** from a CDN.

You ship a **Dockerfile** that installs dependencies, runs **`python manage.py migrate`**, and starts **Gunicorn** on **`0.0.0.0:$PORT`**. Django reads **`DATABASE_URL`** (required); **`dj-database-url`** parses it and enables **SSL** for non-local hosts. URLs follow Django’s **`APPEND_SLASH`** convention—use **`GET /health/`** (with trailing slash) for Railway health checks. **CSRF** is wired for **POST/PATCH/DELETE** from HTMX using **`{% csrf_token %}`** plus a small **`htmx:configRequest`** hook. Add the **Postgres** plugin, connect a **web** service from this repo, and set **`DATABASE_URL="${{Postgres.DATABASE_URL}}"`** on the web service (name must match your database service). Pushes to the linked branch trigger rebuilds; traffic from the app to Postgres stays on Railway’s **private network**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [atoolz/railway-htmx-python-django-pg](https://github.com/atoolz/railway-htmx-python-django-pg) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | DB created on first init (official image / plugin) |
| `DATABASE_URL` | Postgres | - | in-cluster connection string |
| `POSTGRES_USER` | Postgres | (secret) | superuser name on first init |
| `POSTGRES_PASSWORD` | Postgres | (secret) | generated root password |
| `DATABASE_PUBLIC_URL` | Postgres | - | TCP proxy for external clients |
| `DATABASE_URL` | web | - | reference Postgres service; name must match dashboard (e.g. Postgres) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`

**Category:** Starters · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/htmxpythondjangopostgres)
