# Deploy Matilda on Railway

Project manager for better companies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/matilda)

## About

Matilda è un'applicazione web di project management con funzionalità avanzate per la gestione delle task e la digitalizzazione dei processi aziendali.

Website
https://matilda-oss.gregoriogalante.com

Github
https://github.com/Matilda-org/matilda

L'applicazione può essere installata in locale o su un server cloud tramite Docker.
L'applicazione non richiede specifiche dipendenze, ma è consigliato l'uso di PostgreSQL come database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| matilda | [Matilda-org/matilda](https://github.com/Matilda-org/matilda) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RAILS_ENV` | matilda | production | Rails Environment |
| `DATABASE_URL` | matilda | - | Url of Postgres Database |
| `RAILS_LOG_LEVEL` | matilda | error | Log level for Rails logs |
| `SECRET_KEY_BASE` | matilda | (secret) | Secret key for token generations |
| `RAILS_LOG_TO_STDOUT` | matilda | enabled | Send Rails logs to STDOUT |
| `RAILS_SERVE_STATIC_FILES` | matilda | enabled | Serve static files from Rails |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Ruby, HTML, JavaScript, SCSS, Dockerfile, Shell

[View on Railway →](https://railway.com/template/matilda)
