# Deploy Astro + PostgreSQL on Railway

Blazing fast Astro with PostgreSQL database - zero config deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/astro-postgresql)

## About

A lightning-fast Astro template with PostgreSQL database for building modern, database-driven websites. Perfect for blogs, documentation sites, portfolios, and content-heavy applications that need the speed of static sites with dynamic database content. Zero configuration required - deploy and start building immediately.

This template deploys a complete Astro application with PostgreSQL database integration. Railway handles the Docker build process that compiles your Astro site, provisions a PostgreSQL database, and runs database migrations automatically to create tables and seed initial data. Astro's server-side rendering generates HTML on-demand from database queries, delivering fast page loads with zero JavaScript by default. The blog system demonstrates dynamic content from PostgreSQL with author attribution, publication dates, hero images, and unique slugs for SEO-friendly URLs. Health checks are pre-configured at `/` for Railway monitoring. Public networking is enabled with automatic SSL certificates. The entire stack deploys in under 2 minutes with production-ready configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| astro-postgres-starter | [TrailBlazors/astro-postgres-starter](https://github.com/TrailBlazors/astro-postgres-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | astro-postgres-starter | production | Determine NODE environment |
| `DATABASE_URL` | astro-postgres-starter | - | Postgres Database URL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Astro, TypeScript, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/astro-postgresql)
