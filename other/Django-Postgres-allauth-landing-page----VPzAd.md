# Deploy Django Postgres + allauth + landing page on Railway

A django  Postgres railway template with allauth authentication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-VPzAd)

## About

A responsive Django landing page with Postgres Database and allauth authentication. Ready for quick deployment on Railway. Features a starter landing page,  a script for optimized images with WebP fallback, Bootstrap 5 design, and customizable components for a modern site.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| django-pg-railway-starter | [CuteLoop/django-pg-railway-starter](https://github.com/CuteLoop/django-pg-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | django-pg-railway-starter | True | - |
| `EMAIL_HOST` | django-pg-railway-starter | smtp.gmail.com | - |
| `EMAIL_PORT` | django-pg-railway-starter | 587 | - |
| `EMAIL_HOST_USER` | django-pg-railway-starter | (secret) | - |
| `EMAIL_HOST_PASSWORD` | django-pg-railway-starter | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** HTML, Python, CSS, Procfile

[View on Railway →](https://railway.com/deploy/-VPzAd)
