# Deploy Vendure on Railway

A headless open-source GraphQL commerce platform for the modern web.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mFsdab)

## About

[Vendure][1] is an open-source headless e-commerce platform built on Node.js with GraphQL, Nest & TypeScript, with a focus on developer productivity and ease of customization.

This template deploys an official quick start [repo][4] to get it easily deploy on Railway.

See also:

- [Docs][2]
- [Official repository][3]
- [One-click-deploy][4]


[1]: https://www.vendure.io/
[2]: https://docs.vendure.io/guides/deployment/deploy-to-railway/
[3]: https://github.com/vendure-ecommerce/vendure
[4]: https://github.com/vendure-ecommerce/one-click-deploy

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vendure-server | [vendure-ecommerce/one-click-deploy](https://github.com/vendure-ecommerce/one-click-deploy) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| vendure-worker | [vendure-ecommerce/one-click-deploy](https://github.com/vendure-ecommerce/one-click-deploy) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | vendure-server | - | Database host address |
| `DB_NAME` | vendure-server | - | Database name |
| `DB_PORT` | vendure-server | - | Database port |
| `DB_PASSWORD` | vendure-server | (secret) | Password for database access |
| `DB_USERNAME` | vendure-server | (secret) | User for database access |
| `COOKIE_SECRET` | vendure-server | (secret) | Secret for generating cookies (authentication tokens) |
| `ASSET_UPLOAD_DIR` | vendure-server | /vendure-assets | Directory in container for uploading assets. Points to a mounted volume. |
| `SUPERADMIN_PASSWORD` | vendure-server | (secret) | Password for admin user |
| `SUPERADMIN_USERNAME` | vendure-server | (secret) | Username for admin user |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_HOST` | vendure-worker | - | Address of the database |
| `DB_NAME` | vendure-worker | - | Database name |
| `DB_PORT` | vendure-worker | - | Port number data base is listening on |
| `DB_PASSWORD` | vendure-worker | (secret) | Password for databse access |
| `DB_USERNAME` | vendure-worker | (secret) | User for accessing database |

## Configuration

- **Start command:** `node ./dist/index.js`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/vendure-assets`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node ./dist/index-worker.js`

**Category:** Starters · **Languages:** TypeScript, Handlebars, Dockerfile

[View on Railway →](https://railway.com/deploy/mFsdab)
