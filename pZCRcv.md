# Deploy Picsur on Railway

Easily host and programmatically transform your own images.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pZCRcv)

## About

Picsur is a self-hostable image-sharing service inspired by Imgur. It supports multiple image formats and offers anonymous uploads, user accounts, and a public gallery. It's built for speed, flexibility, and ease of deployment, with support for ShareX, image editing, and a robust API.

Hosting Picsur involves deploying a web service that handles image uploads, conversions, user management, and role-based permissions. It requires a backend database and can be deployed instantly with no configuration using Railway. Once deployed, it offers a ShareX-compatible endpoint, anonymous and authenticated uploads, image expiration, albums, and a fully documented API—all accessible via a simple web UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Picsur | `ghcr.io/caramelfur/picsur:latest` | Web service |
| Picsur Database | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Picsur | 8080 | - |
| `PICSUR_DB_PASSWORD` | Picsur | (secret) | - |
| `PICSUR_DB_USERNAME` | Picsur | (secret) | - |
| `PICSUR_ADMIN_PASSWORD` | Picsur | (secret) | The default password for the user "admin". |
| `POSTGRES_DB` | Picsur Database | railway | Default database created when image is started. |
| `DATABASE_URL` | Picsur Database | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Picsur Database | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Picsur Database | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Picsur Database | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/pZCRcv)
