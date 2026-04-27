# Deploy White Label Card Shop on Railway

Deploy and Host White Label Card Shop with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/white-label-card-shop)

## About

Launch your very own custom sports card storefront in 60 seconds. This is a fully functional, modern e-commerce website that connects directly to Player Index to keep your card prices and market trends automatically updated.

You do not need to know how to code to launch this! Railway handles all the server hosting and database setup automatically. All you have to do is paste your secret "Provisioning Token" when it asks, and it will set up the entire store for you. It's completely click-and-play.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| card-app-prod | [Verdic-Admin/card-app-prod](https://github.com/Verdic-Admin/card-app-prod) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_BASE_URL ` | card-app-prod |  https://playerindexdata.com | - |
| `PLAYERINDEX_API_KEY` | card-app-prod | (secret) | Insert API Code Below! |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile, Shell, CSS

[View on Railway →](https://railway.com/deploy/white-label-card-shop)
