# Deploy Cachet on Railway

Cachet is an open source status page system.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cachet)

## About

[Cachet](https://cachethq.io/) is a powerful open source, self-hosted status page system. Features include a JSON API to update the page, scheduled maintenance events and metrics.

No configuration is required to get up and running with Cachet on Railway. To setup your instance after installation, connect to `/admin`.
A demo is available on the [official website](https://demo.cachethq.io/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cachet | `cachethq/docker:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | Cachet | false | - |
| `APP_ENV` | Cachet | production | - |
| `APP_LOG` | Cachet | errorlog | - |
| `APP_DEBUG` | Cachet | false | - |
| `DB_DRIVER` | Cachet | pgsql | - |
| `DB_PREFIX` | Cachet | - | Prefix for the DB tables. Can be empty. |
| `DB_PASSWORD` | Cachet | (secret) | - |
| `DB_USERNAME` | Cachet | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/cachet)
