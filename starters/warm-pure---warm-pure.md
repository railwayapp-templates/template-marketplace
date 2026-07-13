# Deploy warm-pure on Railway

Leadpost is a self-hosted lead capture form and mini CRM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/warm-pure)

## About

Leadpost runs as a single Node.js service backed by a Postgres database, both included in this template. On deploy, the app creates its database table automatically and serves a clean contact form at the root URL. Captured leads land in a password-protected pipeline board at /admin.html, where you move them between stages and export the full list to CSV. Set ADMIN_PASSWORD to secure the board and PROJECT_NAME to display your company name; the database connection is wired automatically. There is nothing to configure beyond that.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LeadPost | [Hygrivakondury/LeadPost](https://github.com/Hygrivakondury/LeadPost) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROJECT_NAME` | LeadPost | - | Our product |
| `ADMIN_PASSWORD` | LeadPost | (secret) | change-me-please |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/warm-pure)
