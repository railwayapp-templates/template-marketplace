# Deploy brightbean-studio on Railway

Social media management platform, schedule, publish, and manage content.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/brightbean-studio)

## About

Brightbean-studio is an open-source, self-hostable social media management platform for creators, agencies, and small businesses. Schedule, publish, approve, and monitor content across 10+ social platforms with no per-seat, per-channel, or per-workspace limits. It's a free alternative to tools like Sendible, SocialPilot, and ContentStudio.

Brightbean-studio is a Django app that needs three things: a web process, a background worker for scheduled publishing and task processing, and a PostgreSQL database. Railway's managed PostgreSQL works out of the box with the app's DATABASE_URL-based configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| brightbean-studio-web | [brightbeanxyz/brightbean-studio](https://github.com/brightbeanxyz/brightbean-studio) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| brightbean-studio-worker | [brightbeanxyz/brightbean-studio](https://github.com/brightbeanxyz/brightbean-studio) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY` | brightbean-studio-web | (secret) | - |
| `STORAGE_BACKEND` | brightbean-studio-web | local | User can change later to S3 |
| `DJANGO_SETTINGS_MODULE` | brightbean-studio-web | config.settings.production | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | brightbean-studio-worker | (secret) | - |
| `STORAGE_BACKEND` | brightbean-studio-worker | local | User can change later to S3 |
| `DJANGO_SETTINGS_MODULE` | brightbean-studio-worker | config.settings.production | - |

## Configuration

- **Start command:** `python manage.py migrate && echo GUNICORN_STARTING_ON_PORT=$PORT && exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 1 --log-level debug --error-logfile - --access-logfile - --capture-output`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `python manage.py process_tasks`

**Category:** Other · **Languages:** HTML, Python, CSS, JavaScript, Makefile, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/brightbean-studio)
