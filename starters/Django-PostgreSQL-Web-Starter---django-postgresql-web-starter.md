# Deploy Django PostgreSQL Web Starter on Railway

Django LTS starter with Postgres, generated secrets and DEBUG disabled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django-postgresql-web-starter)

## About

Django LTS starter with Postgres, generated secrets and DEBUG disabled.

This deployment fork provisions Postgres, Server. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:34c3e49e7ed2aaef6c575fb23bb37b878007e97752d3bf27ccb550046f893ca7` | Database |
| Server | [railwayapp-starters/django](https://github.com/railwayapp-starters/django) (branch: main) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Server | 8000 | - |
| `SECRET_KEY` | Server | (secret) | - |
| `DISABLE_COLLECTSTATIC` | Server | 1 | - |
| `DJANGO_SETTINGS_MODULE` | Server | railway_settings | - |
| `DJANGO_RUNTIME_SETTINGS` | Server | from mysite.settings import *
import os
SECRET_KEY = os.environ['SECRET_KEY']
DEBUG = False
ALLOWED_HOSTS = [h for h in [os.environ.get('RAILWAY_PUBLIC_DOMAIN'), os.environ.get('RAILWAY_PRIVATE_DOMAIN'), 'localhost', '127.0.0.1', 'healthcheck.railway.app'] if h]
CSRF_TRUSTED_ORIGINS = ['https://' + h for h in [os.environ.get('RAILWAY_PUBLIC_DOMAIN')] if h]
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql'
STORAGES = {'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'}, 'staticfiles': {'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'}}
 | Runtime production settings overlay for the upstream starter. |
| `RAILPACK_PYTHON_VERSION` | Server | 3.12 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'python -c '"'"'import os,pathlib;pathlib.Path("railway_settings.py").write_text(os.environ["DJANGO_RUNTIME_SETTINGS"])'"'"' && python manage.py migrate --noinput && python manage.py collectstatic --noinput && exec gunicorn mysite.wsgi --bind "[::]:$PORT"'`
- **Healthcheck:** `/admin/login/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/django-postgresql-web-starter)
