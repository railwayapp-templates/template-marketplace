# Deploy Waline on Railway

A lightweight front-end based commenting system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UZB84v)

## About

Valine is a beautifully styled, easy-to-use, and efficient-to-deploy commenting system. 

For more information see: https://waline.js.org/guide/get-started/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| app | [walinejs/railway-starter](https://github.com/walinejs/railway-starter) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | app | 3000 | Don't modify it |
| `PG_DB` | app | - | Don't modify it |
| `PG_HOST` | app | - | Don't modify it |
| `PG_PORT` | app | - | Don't modify it |
| `PG_USER` | app | (secret) | Don't modify it |
| `PG_PREFIX` | app | wl_ | Don't modify it |
| `PG_PASSWORD` | app | (secret) | Don't modify it |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs · **Languages:** Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/UZB84v)
