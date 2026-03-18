# Deploy Atuin Shell History Server on Railway

A self-hosted setup for Atuin, the shell history sync server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5J-Ofu)

## About

Checkout the Atuin docs for how to get your local environment setup: https://docs.atuin.sh/

You'll want to update the `sync_address` in your local config (./config/atuin/config.toml) to point at your new self-hosted instance.

After that you can run `atuin register` to register with your self-hosted instance. Might want to set the `ATUIN_OPEN_REGISTRATION` to `false` after you register.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| atuin | [brandonaaron/atuin-railway](https://github.com/brandonaaron/atuin-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | atuin | 8888 | - |
| `ATUIN_HOST` | atuin | 0.0.0.0 | - |
| `ATUIN_PAGE_SIZE` | atuin | 1100 | The default is 1100. Increasing the page size might help with sync issues. |
| `ATUIN_OPEN_REGISTRATION` | atuin | true | Set to true or false to enable or disable open registrations. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/5J-Ofu)
