# Deploy everything-dev template on Railway

Deploy and host everything-dev BOS app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/everything-dev-template)

## About

Just need account id and domain, and runs in a docker image.

This is a work in progress, we'll improve it over time. Including this documentation. Current version works fine though, need to npx everything-dev@latest publish your bos.config.json

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| auth-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | `ghcr.io/nearbuilders/everything-dev` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | api-db | railway | Default database created when image is started. |
| `DATABASE_URL` | api-db | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | api-db | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | api-db | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | api-db | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_DB` | auth-db | railway | Default database created when image is started. |
| `DATABASE_URL` | auth-db | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | auth-db | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | auth-db | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | auth-db | - | Public URL to connect to Postgres database, used by the Data panel. |
| `BOS_ACCOUNT` | app | - | The core tenant account, i.e. myapp.near |
| `BOS_GATEWAY` | app | - | The core tenant domain, i.e. myapp.com |
| `API_DATABASE_URL` | app | - | Hooked up with api |
| `AUTH_DATABASE_URL` | app | - | Hooked up with auth plugin, handles accounts and sessions |
| `BETTER_AUTH_SECRET` | app | (secret) | Generate locally with `openssl rand -base64 32` |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/everything-dev-template)
