# Deploy HTMX + Echo + Go + PostgreSQL - Starter Kit on Railway

HTMX + Echo + Go + PostgreSQL starter with one-click deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmx-go-postgresql-starter-kit)

## About

HTMX + Go + PostgreSQL Starter is a production-ready template for building hypermedia-driven web applications. It combines HTMX for dynamic interactions without JavaScript, Go with Echo and Templ for type-safe server-side rendering, and PostgreSQL for persistent storage. Deploy in one click and start building.

The template deploys as a single Go binary built via multi-stage Dockerfile (~15MB final image, ~31s build time). It connects to a PostgreSQL instance over Railway's private network using the pgx driver with connection pooling. Database migrations run automatically on startup, creating the required tables without manual SQL. The application reads `DATABASE_URL` from environment variables and listens on the port assigned by Railway. A health check endpoint at `/health` pings the database and returns status, ensuring Railway can verify deployments before routing traffic. Tailwind CSS and HTMX load via CDN, so there is no frontend build step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [atoolz/railway-htmx-go-templ-echo-pg](https://github.com/atoolz/railway-htmx-go-templ-echo-pg) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | web | - | PostgreSQL connection string for the application |
| `POSTGRES_DB` | Postgres | railway | Database created on first startup |
| `POSTGRES_USER` | Postgres | (secret) | User created on first startup |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the default PostgreSQL user |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string for external access |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Go, templ, Dockerfile

[View on Railway →](https://railway.com/deploy/htmx-go-postgresql-starter-kit)
