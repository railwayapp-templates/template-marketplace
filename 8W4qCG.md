# Deploy Miniflux on Railway

Miniflux is a minimalist and opinionated RSS feed reader

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/8W4qCG)

## About

[Miniflux](https://miniflux.app/) is a minimalist and opinionated feed reader. This template provides an easy way to deploy Miniflux on Railway.

## Deployment

During the deployment, you will be asked to provide a username and password for the admin account. Set these to be whatever you want. **After the first deployment completes, delete the following environment variables:**

- `CREATE_ADMIN`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

You only need to delete these before the next deployment, and if you don't it won't be too catastrophic, just you probably don't want your password sitting around in an env file for longer than it needs to.

## Configuration

Miniflux provides a number of configuration options that can be set from environment variables. You can discover them [here](https://miniflux.app/docs/configuration.html)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Miniflux | `miniflux/miniflux:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CREATE_ADMIN` | Miniflux | 1 | Remove after the first deployment. |
| `ADMIN_PASSWORD` | Miniflux | (secret) | Remove after the first deployment. |
| `ADMIN_USERNAME` | Miniflux | (secret) | Remove after the first deployment. |
| `RUN_MIGRATIONS` | Miniflux | 1 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Miniflux | true | Enable workaround for alpine based docker images |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/8W4qCG)
