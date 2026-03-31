# Deploy HTMX+Spring+Thymeleaf+Postgres on Railway

HTMX + Spring + Thymeleaf + Postgres. Full-stack server-rendered app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmxspringthymeleafpostgres)

## About

**HTMX+Java+Spring+Thymeleaf+Postgres** is a starter for **hypermedia-driven** UIs: **Spring Web** returns HTML, **Thymeleaf** renders templates and fragments for **HTMX** swaps, and **PostgreSQL** persists data through **Spring Data JPA**—no SPA and no Node frontend build. **Flyway** runs SQL migrations, **Tailwind + HTMX** load from a CDN, and a **Todo** demo shows partial updates end-to-end.

You deploy a **multi-stage Dockerfile** (**Maven** build, slim **JRE** runtime) that produces a single **JAR**. The app listens on **`0.0.0.0:${PORT:-8080}`**, reads **`DATABASE_URL`**, and **`RailwayDataSourceConfig`** maps `postgres://` / `postgresql://` into **HikariCP** (with SSL behavior suited to Railway). **Flyway** applies migrations such as the todos table on startup. **`GET /health`** returns JSON and exercises the database for platform checks. Add the **Postgres** plugin, attach a **web** service from this repo, and set **`DATABASE_URL="${{Postgres.DATABASE_URL}}"`** on the web service (match the DB service name). Git-connected services rebuild on push; app-to-database traffic uses Railway’s **private network**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [atoolz/railway-htmx-java-spring-thymeleaf-pg](https://github.com/atoolz/railway-htmx-java-spring-thymeleaf-pg) | Worker |
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

**Category:** Other · **Languages:** Java, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/htmxspringthymeleafpostgres)
