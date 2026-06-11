# Deploy Instatic CMS - Postgres on Railway

Design, build and manage powerful static sites from state-of-the-art CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-cms-postgres)

## About

Instatic is a self-hosted CMS with a built-in visual editor, clean static publishing, media management, and a plugin system. This template deploys Instatic on Railway with a managed Postgres database and persistent storage for uploads, fonts, plugins, and published pages.

This template provisions an Instatic web service, a Railway Postgres database, and a persistent app volume. Postgres stores CMS content, users, sessions, settings, and structured data, while the attached volume stores uploaded media, fonts, plugin packages, and published static artefacts. The app runs from the official Docker image, applies database migrations automatically on boot, and uses Railway-managed environment variables for the database connection, public networking, storage paths, and secret generation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| corebunch/instatic:latest | `ghcr.io/corebunch/instatic:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | corebunch/instatic:latest | 8080 | - |
| `STATIC_DIR` | corebunch/instatic:latest | /app/dist | - |
| `UPLOADS_DIR` | corebunch/instatic:latest | /app/storage/uploads | - |
| `INSTATIC_SECRET_KEY` | corebunch/instatic:latest | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-cms-postgres)
