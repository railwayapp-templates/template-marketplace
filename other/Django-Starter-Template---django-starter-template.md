# Deploy Django Starter Template on Railway

Django 5.2 LTS starter with PostgreSQL and production-ready defaults

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django-starter-template)

## About

Copied again. The clipboard now starts with the "Deploy and Host Django 5.2 LTS on Railway" heading and holds the full description.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| django-starter-template | [fasouto/django-starter-template](https://github.com/fasouto/django-starter-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | django-starter-template | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, HTML, CSS

[View on Railway →](https://railway.com/deploy/django-starter-template)
