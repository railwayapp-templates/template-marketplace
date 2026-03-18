# Deploy helpful-prosperity on Railway

Examle site for example data for example serice

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Xe-Ieb)

## About

this is a text for example data for example service for example webpage with pwa services  API REST services for a personal site ian carvajals that all I think I can write for now en espanol es un texto de ejemplo para service de ejemplo para un web de ejemplo con pwa y api rest  de ejemlo

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/Xe-Ieb)
