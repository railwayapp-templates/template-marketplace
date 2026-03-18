# Deploy Django on Railway

A simple Django application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/GB6Eki)

## About

Django is a Python web framework that follows the model-view-template (MVT) architecture pattern. It provides an ORM for database operations, URL routing system, template engine, and built-in admin interface for rapid web application development.

Django applications on Railway run through automatic detection and configuration of WSGI servers, database connections, and static file serving. Railway handles most production concerns including environment variable injection, PostgreSQL provisioning, and Gunicorn configuration automatically. You'll primarily need to manage your requirements.txt dependencies and basic settings.py configuration for allowed hosts and static files. Railway's auto-detection eliminates manual WSGI server setup, database URL configuration, and deployment scripting typically required for Django hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Server | [railwayapp-starters/django](https://github.com/railwayapp-starters/django) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Server | 8000 | - |
| `DISABLE_COLLECTSTATIC` | Server | 1 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `gunicorn mysite.wsgi`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** python, webserver · **Languages:** Python

[View on Railway →](https://railway.com/deploy/GB6Eki)
