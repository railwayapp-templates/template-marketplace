# Deploy Payload CMS Template on Railway

A setup for Payload using postgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/3QUkyF)

## About

Basic setup for deploying Payload CMS with Postgres. 


There is a migration script that runs before the npm run serve command which you may want to change, but this was the only way it seems in production to get this to fire. Open to suggestions on this.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Payload CMS Template (PostGres) | [madebyjonny/payload-template](https://github.com/madebyjonny/payload-template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URI` | Payload CMS Template (PostGres) | - | database url  |
| `PAYLOAD_SECRET` | Payload CMS Template (PostGres) | (secret) | secret for payload |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run payload migrate & npm run serve`

**Category:** CMS · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/3QUkyF)
