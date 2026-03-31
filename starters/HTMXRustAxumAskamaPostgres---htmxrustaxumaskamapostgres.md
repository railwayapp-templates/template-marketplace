# Deploy HTMX+Rust+Axum+Askama+Postgres on Railway

HTMX + Rust + Axum + Askama + PostgreSQL. Full-stack server-rendered app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmxrustaxumaskamapostgres)

## About

**HTMX+Rust+Axum+Askama+Postgres** is a starter for **hypermedia-driven** apps: the server returns HTML fragments and **HTMX** swaps them in the DOM, so you skip a heavy SPA. **Axum** handles HTTP, **Askama** renders **type-checked** templates, **SQLx** speaks to **PostgreSQL**, and **HTMX** plus **Tailwind** load from a CDN—no client framework and no separate frontend build pipeline.

You deploy a **multi-stage Dockerfile** that runs `cargo build --release` and copies a single binary into a minimal runtime image. The app listens on **`0.0.0.0:$PORT`**, reads **`DATABASE_URL`**, and on startup runs **`CREATE TABLE IF NOT EXISTS`** for the demo todos table (no SQLx offline data). A **`GET /health`** handler returns JSON and checks the database so Railway can gate traffic.

In Railway you add **PostgreSQL**, attach a **web** service from this repo, and set **`DATABASE_URL=${{Postgres.DATABASE_URL}}`** (use the exact name of your Postgres service). Builds run on every push when GitHub is connected; the private network keeps app-to-DB traffic off the public internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [atoolz/railway-htmx-rust-axum-askama-pg](https://github.com/atoolz/railway-htmx-rust-axum-askama-pg) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | web | - | reference Postgres service; name must match dashboard (e.g. Postgres) |
| `POSTGRES_DB` | Postgres | - | DB created on first init (official image / plugin) |
| `DATABASE_URL` | Postgres | - | in-cluster connection string |
| `POSTGRES_USER` | Postgres | (secret) | superuser name on first init |
| `POSTGRES_PASSWORD` | Postgres | (secret) | generated root password |
| `DATABASE_PUBLIC_URL` | Postgres | - | TCP proxy for external clients |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Rust, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/htmxrustaxumaskamapostgres)
