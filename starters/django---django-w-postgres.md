# Deploy django on Railway

Django starter with PostgreSQL for simple and efficient setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django-w-postgres)

## About

A simple Django starter bundled with PostgreSQL, built for an efficient and beginner-friendly setup.

This template offers a straightforward way to run a Django application with PostgreSQL as its database. It focuses on clarity and effectiveness by providing the essential configuration needed to connect the application and database without unnecessary complexity. With this setup, developers can start building features immediately, making it suitable for experimentation, learning, and gradual scaling as the project grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| django | [railwayapp-templates/django](https://github.com/railwayapp-templates/django) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | django | 8000 | - |
| `DISABLE_COLLECTSTATIC` | django | 1 | PostgreSQL (from Postgres service) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/django-w-postgres)
