# Deploy White Label Card Shop on Railway

Deploy and Host White Label Card Shop with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/white-label-card-shop)

## About

Launch your very own custom sports card storefront in 60 seconds. This is a fully functional, modern e-commerce website that connects directly to Player Index to keep your card prices and market trends automatically updated.

You do not need to know how to code to launch this! Railway handles all the server hosting and database setup automatically. All you have to do is paste your secret "Provisioning Token" when it asks, and it will set up the entire store for you. It's completely click-and-play.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mycardshop | `ghcr.io/verdic-admin/card-app-prod:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `API_BASE_URL` | mycardshop | https://playerindexdata.com | - |
| `PLAYERINDEX_API_KEY` | mycardshop | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | mycardshop | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/white-label-card-shop)
