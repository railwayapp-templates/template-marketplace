# Deploy wger on Railway

Workout and nutrition manager with generated admin and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wger)

## About

wger is an open-source workout, exercise, nutrition, body-weight, and gym-management application. This template deploys stable 2.6.0 with generated credentials and private Postgres.

Sign in as `admin` with `WGER_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wger | [monotykamary/railway-template-wger](https://github.com/monotykamary/railway-template-wger) | Web service |
| postgres | `postgres:17.6-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wger | 8080 | Public Caddy port. |
| `SITE_URL` | wger | - | Canonical wger URL. |
| `WGER_PORT` | wger | 8000 | Internal Gunicorn port. |
| `SECRET_KEY` | wger | (secret) | Persistent Django session and signing secret. |
| `USE_CELERY` | wger | False | Disable optional background workers in this core topology. |
| `DJANGO_DEBUG` | wger | False | Disable debug output. |
| `PS_DATABASE_URI` | wger | - | Private Postgres connection URI. |
| `WGER_ADMIN_EMAIL` | wger | admin@example.com | Initial admin email. |
| `ALLOW_GUEST_USERS` | wger | False | Disable automatic guest accounts. |
| `ALLOW_REGISTRATION` | wger | False | Keep public registration closed by default. |
| `WGER_ADMIN_PASSWORD` | wger | (secret) | Generated admin password. |
| `CSRF_TRUSTED_ORIGINS` | wger | - | Trusted public HTTPS origin. |
| `DJANGO_PERFORM_MIGRATIONS` | wger | True | Apply database migrations at startup. |
| `X_FORWARDED_PROTO_HEADER_SET` | wger | True | Trust Railway HTTPS forwarding through Caddy. |
| `POSTGRES_DB` | postgres | wger | Database name. |
| `POSTGRES_USER` | postgres | (secret) | Database user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated database password. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/wger/media`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/wger)
