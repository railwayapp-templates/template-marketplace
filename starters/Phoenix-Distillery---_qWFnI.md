# Deploy Phoenix Distillery on Railway

A simple Phoenix app deployed with Distillery and connected to PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/_qWFnI)

## About

# Phoenix with Distillery Starter Example

This is a [Phoenix](https://www.phoenixframework.org/) starter app with Distillery that connects to a Postgres database on Railway.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/_qWFnI)

## ✨ Features

- Elixir
- Phoenix Distillery
- Postgres

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Phoenix Distillery | [railwayapp-templates/phoenix-distillery](https://github.com/railwayapp-templates/phoenix-distillery) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LANG` | Phoenix Distillery | en_US.UTF-8 | - |
| `LC_CTYPE` | Phoenix Distillery | en_US.UTF-8 | - |
| `ECTO_IPV6` | Phoenix Distillery | true | - |
| `SECRET_KEY_BASE` | Phoenix Distillery | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Elixir, HTML, JavaScript, CSS

[View on Railway →](https://railway.com/template/_qWFnI)
