# Deploy Django Starter Template on Railway

Django 5.2 LTS starter with PostgreSQL and production-ready defaults

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django-starter-template)

## About

A production-ready Django 5.2 LTS starter template with PostgreSQL, WhiteNoise static files, and gunicorn. One-click deploy to Railway with automatic database provisioning, migrations, 
  and a built-in deployment checklist.                                                                                                                                                     
                                                                                                                                                                                           
  ## About Hosting Django Starter Template                  

  This template deploys a Django 5.2 LTS application with a PostgreSQL database on Railway. It includes production-ready settings out of the box: WhiteNoise for static file serving,
  gunicorn as the WSGI server, Argon2 password hashing, and security headers. The app runs database migrations automatically on each deploy and includes a health check endpoint for
  zero-downtime deployments. Environment variables like SECRET_KEY and DATABASE_URL are configured automatically by Railway.

  ## Why Deploy Django Starter Template on Railway

  Railway handles infrastructure so you can focus on building your Django app. It automatically provisions a PostgreSQL database, sets environment variables, runs migrations on each
  deploy, and provides zero-downtime deployments with health checks. No Dockerfiles, no nginx config, no manual server setup required.

  ## Dependencies for Django Starter Template

  ### Deployment Dependencies

  - **PostgreSQL** — Provisioned automatically by Railway as a linked database service
  - **Python 3.12+** — Detected and installed automatically by Railway's builder
  - **gunicorn** — WSGI server included in the template dependencies
  - **WhiteNoise** — Serves static files directly from the application, no nginx or CDN needed

  ## Common Use Cases

  - Starting a new Django web application with a solid production foundation
  - Building REST APIs or full-stack web apps with Django and PostgreSQL
  - Prototyping and deploying Django projects quickly without manual server configuration

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
