# Deploy Vouch on Railway

Self-hosted feedback and testimonial wall

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wild-green)

## About

Boardpost runs as a single Node.js service backed by a Postgres database, both included in this template. On deploy, the app creates its database table automatically and serves a password-protected board. Set ADMIN_PASSWORD to secure the board and PROJECT_NAME to title it; the database connection is wired automatically. There is no public page — the whole board sits behind your password, so it's ready to use the moment it deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Vouch | [Hygrivakondury/Vouch](https://github.com/Hygrivakondury/Vouch) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PROJECT_NAME` | Vouch | - | Our product |
| `ADMIN_PASSWORD` | Vouch | (secret) | change-me-please |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/wild-green)
