# Deploy Mantecato Analytics on Railway

Lightweight, privacy-first web analytics platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mantecato-analytics)

## About

Mantecato is a lightweight, self-hosted web analytics platform built with Django and PostgreSQL. Track pageviews, sessions, events, and revenue with a simple JavaScript snippet — no cookies, no GDPR consent banners needed.

Hosting Mantecato on Railway requires two services: a PostgreSQL 16 database and a Python web service running gunicorn behind WhiteNoise for static assets. The app runs migrations automatically before each deploy, creates an initial admin account if configured, and serves traffic on Railway's injected `$PORT`. A health check endpoint confirms both the app and database are reachable. All configuration is via environment variables — no manual setup needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mantecato-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Mantecato Analytics | [g-battaglia/mantecato-analytics](https://github.com/g-battaglia/mantecato-analytics) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | mantecato-db | mantecato |
| `POSTGRES_USER` | mantecato-db | (secret) |
| `POSTGRES_PASSWORD` | mantecato-db | (secret) |
| `DEBUG` | Mantecato Analytics | False |
| `TIME_ZONE` | Mantecato Analytics | UTC |
| `SECRET_KEY` | Mantecato Analytics | (secret) |
| `INIT_ADMIN_PASS` | Mantecato Analytics | mantecato |
| `INIT_ADMIN_USER` | Mantecato Analytics | (secret) |
| `UMAMI_IMPORT_MODE` | Mantecato Analytics | data |
| `DJANGO_SETTINGS_MODULE` | Mantecato Analytics | mantecato.settings |
| `UMAMI_IMPORT_ON_DEPLOY` | Mantecato Analytics | False |
| `RAILPACK_PYTHON_VERSION` | Mantecato Analytics | 3.12 |
| `UMAMI_IMPORT_ALLOW_CONFIG` | Mantecato Analytics | False |
| `USE_SECURE_PROXY_SSL_HEADER` | Mantecato Analytics | True |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `python manage.py migrate --noinput && python manage.py importumamienv && { if [ -n "${INIT_ADMIN_PASS:-}" ]; then python manage.py createuser "${INIT_ADMIN_USER:-admin}" --role admin --password "$INIT_ADMIN_PASS" || true; fi; } && exec gunicorn mantecato.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120 --access-logfile - --error-logfile -`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Python, HTML, TypeScript, PLpgSQL, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/mantecato-analytics)
