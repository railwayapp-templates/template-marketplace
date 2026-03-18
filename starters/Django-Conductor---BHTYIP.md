# Deploy Django Conductor on Railway

A simple project using Docker, Django and HTMX

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BHTYIP)

## About

### Overview 🗣️

Jumpstart your project using this simple, highly customizable template.

### Getting Started 🏁

`docker compose up` will launch the services necessary to get started.

Customize the `Dockerfile` and `docker-compose.yaml` to your needs.

When it is time for deployment, ```railway up``` will push any changes onto `Railway`.

***Enjoy!*** 🚃

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Conductor | [zyltr/django-conductor](https://github.com/zyltr/django-conductor) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | Conductor | (secret) | Django Secret Key |
| `DJANGO_SUPERUSER_EMAIL` | Conductor | - | Django Superuser Email |
| `DJANGO_SUPERUSER_PASSWORD` | Conductor | (secret) | Django Superuser Password |
| `DJANGO_SUPERUSER_USERNAME` | Conductor | (secret) | Django Superuser Username |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/template/BHTYIP)
