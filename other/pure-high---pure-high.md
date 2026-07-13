# Deploy pure-high on Railway

Onelink is a self-hosted link-in-bio page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pure-high)

## About

Onelink runs as a single Node.js service backed by a Postgres database, both included in this template. On deploy, the app creates its tables automatically and serves your public link page at the root URL. You edit your name, bio, and links from a password-protected editor at /admin.html, and each link tracks how many times it was clicked. Set ADMIN_PASSWORD to secure the editor and PROJECT_NAME as your starting display name; the database connection is wired automatically. There is nothing to configure beyond that.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| onelink | [Hygrivakondury/onelink](https://github.com/Hygrivakondury/onelink) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PROJECT_NAME` | onelink | - | Shown on the public page. |
| `ADMIN_PASSWORD` | onelink | (secret) | Placeholder; each deployer sets their own. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/pure-high)
