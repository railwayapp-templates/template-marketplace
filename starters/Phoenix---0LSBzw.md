# Deploy Phoenix on Railway

A simple Phoenix app connected to a PostgreSQL database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0LSBzw)

## About

# Phoenix Starter Example

This is a [Phoenix](https://www.phoenixframework.org/) starter app that connects to a Postgres database on Railway.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/0LSBzw)

## ✨ Features

- Elixir
- Phoenix
- Postgres

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Phoenix | [railwayapp-templates/phoenix](https://github.com/railwayapp-templates/phoenix) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LANG` | Phoenix | en_US.UTF-8 | - |
| `LC_CTYPE` | Phoenix | en_US.UTF-8 | - |
| `ECTO_IPV6` | Phoenix | true | - |
| `SECRET_KEY_BASE` | Phoenix | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Elixir, HTML, JavaScript, CSS

[View on Railway →](https://railway.com/template/0LSBzw)
