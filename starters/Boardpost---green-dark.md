# Deploy Boardpost on Railway

Organise work across four columns (Backlog → To do → In progress → Done)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/green-dark)

## About

Boardpost runs as a single Node.js service backed by a Postgres database, both included in this template. On deploy, the app creates its database table automatically and serves a password-protected board. Set ADMIN_PASSWORD to secure the board and PROJECT_NAME to title it; the database connection is wired automatically. There is no public page — the whole board sits behind your password, so it's ready to use the moment it deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| boardpost | [Hygrivakondury/boardpost](https://github.com/Hygrivakondury/boardpost) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROJECT_NAME` | boardpost | - | Our product |
| `ADMIN_PASSWORD` | boardpost | (secret) | change-me-please |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/green-dark)
