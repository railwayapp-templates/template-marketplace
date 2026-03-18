# Deploy directus on Railway

A powerful CMS, BaaS, and more. Power any project with Directus 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Uxq3ot)

## About

A powerful CMS, BaaS, and more. Power any project with Directus – a composable data platform to easily create and deploy data-rich apps.
A powerful CMS, BaaS, and more. Power any project with Directus – a composable data platform to easily create and deploy data-rich apps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| directus | [mrphu3074/directus-railway](https://github.com/mrphu3074/directus-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEY` | directus | - | desc |
| `SECRET` | directus | (secret) | desc |
| `ADMIN_EMAIL` | directus | admin@example.com | desc |
| `CONFIG_PATH` | directus | directus.config.js | desc |
| `ADMIN_PASSWORD` | directus | (secret) | desc |
| `DB_CONNECTION_STRING` | directus | - | desc |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/server/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/Uxq3ot)
