# Deploy Django Container - Starter Boilerplate on Railway

Django and Dockerfile Boilerplate optimized for Railway Deployments

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0kppYG)

## About

Django Container - Starter Boilerplate

This is a basic boilerplate template for deploying a Django project on [Railway](https://djangocontainer.com). 

Interested in Django x Next.js? Check out https://repo.djangonextjs.com.

Includes:

- Minimal Django app
- Django-built Dockerfile for continuous deployments
- Endpoint for deployment health checks during Railway deploys

Code: https://github.com/jmitchel3/django-container
One-Click Deploy: https://djangocontainer.com
Reference blog post on [Coding for Entrepreneurs](https://www.codingforentrepreneurs.com/blog/deploy-django-on-railway-with-this-dockerfile)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| django-container | [jmitchel3/django-container](https://github.com/jmitchel3/django-container) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | django-container | 8000 | - |
| `DATABASE_URL` | django-container | - | Using Postgres as your default database url. |
| `DJANGO_SITE_ID` | django-container | 1 | - |
| `DJANGO_SECRET_KEY` | django-container | (secret) | Use `openssl rand -base64 32` on your local machine to create a new Django Secret Key. |
| `DJANGO_ADMIN_EMAIL` | django-container | notset@notset.com | - |
| `DJANGO_APPEND_SLASH` | django-container | True | - |
| `DJANGO_ALLOWED_HOSTS` | django-container | .railway.app | - |
| `DJANGO_ADMIN_PASSWORD` | django-container | (secret) | Set a secure admin password to login to `/admin` on the django project. |
| `DJANGO_ADMIN_USERNAME` | django-container | (secret) | This user will be automatically created if no super users exist. Created with `DJANGO_ADMIN_PASSWORD` and `DJANGO_ADMIN_EMAIL` environment variables. |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | django-container | http://localhost:8000,http://127.0.0.1:8000,http://[::]:8000,https://*.railway.app | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/healthz/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/0kppYG)
