# Deploy miniflux-with-postgresql on Railway

Deploy Miniflux with PostgreSQL in one click on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/miniflux-with-postgresql)

## About

Miniflux is a fast, minimalist, and privacy-focused RSS feed reader. This template deploys Miniflux together with PostgreSQL, providing a complete self-hosted feed reader that can be launched on Railway with minimal configuration.

This template provisions both Miniflux and PostgreSQL as connected Railway services. PostgreSQL stores feeds, subscriptions, users, and application data, while Miniflux provides the web interface and RSS processing.

Railway handles service networking and infrastructure configuration. Required environment variables connect Miniflux to PostgreSQL automatically.

After deployment, open the generated Miniflux domain and sign in using the administrator credentials configured during setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| miniflux | [20040608/Synthetic_Time](https://github.com/20040608/Synthetic_Time) (root: /templates/miniflux-postgres) | Web service |
| postgres | [20040608/Synthetic_Time](https://github.com/20040608/Synthetic_Time) (root: /templates/miniflux-postgres/postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | miniflux | - | Public URL where the Miniflux application is accessible. |
| `DATABASE_URL` | miniflux | - | PostgreSQL connection string used by Miniflux. |
| `ADMIN_PASSWORD` | miniflux | (secret) | Password for the initial Miniflux administrator account. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password for the PostgreSQL database user. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** CMS · **Languages:** TypeScript, PLpgSQL, Dockerfile, JavaScript, PowerShell

[View on Railway →](https://railway.com/deploy/miniflux-with-postgresql)
