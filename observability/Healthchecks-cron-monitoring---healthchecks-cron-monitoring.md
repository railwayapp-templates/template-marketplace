# Deploy Healthchecks cron monitoring on Railway

Durable cron and background-job monitoring with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/healthchecks-cron-monitoring)

## About

Healthchecks is a BSD-licensed monitor for cron jobs and background tasks. This template runs the official 4.3 image with a bootstrapped administrator, closed registration, PostgreSQL, database-aware health checks, and durable storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Healthchecks | `healthchecks/healthchecks:v4.3@sha256:cd7bcd94350818b3944f82eb5995f48bdeab8c8627977578a569ffa73f56f56f` | Web service |
| Postgres | `postgres:16-alpine@sha256:57c72fd2a128e416c7fcc499958864df5301e940bca0a56f58fddf30ffc07777` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | Healthchecks | postgres | - |
| `PORT` | Healthchecks | 8000 | - |
| `DEBUG` | Healthchecks | False | - |
| `DB_PORT` | Healthchecks | 5432 | - |
| `DB_USER` | Healthchecks | (secret) | - |
| `SITE_NAME` | Healthchecks | Healthchecks | - |
| `SITE_ROOT` | Healthchecks | - | Canonical public HTTPS URL derived from the Railway domain. |
| `DB_SSLMODE` | Healthchecks | prefer | - |
| `SECRET_KEY` | Healthchecks | (secret) | Generated Django signing secret; keep stable. |
| `DB_PASSWORD` | Healthchecks | (secret) | - |
| `ALLOWED_HOSTS` | Healthchecks | - | Allows only the public, private, and Railway health-check hosts. |
| `SUPERUSER_EMAIL` | Healthchecks | admin@railway.local | Initial administrator login email. |
| `REGISTRATION_OPEN` | Healthchecks | False | Disables public account creation by default. |
| `DEFAULT_FROM_EMAIL` | Healthchecks | healthchecks@railway.local | Sender address used after SMTP is configured. |
| `SUPERUSER_PASSWORD` | Healthchecks | (secret) | Generated initial administrator password. |
| `EMAIL_USE_VERIFICATION` | Healthchecks | False | - |
| `INTEGRATIONS_ALLOW_PRIVATE_IPS` | Healthchecks | False | - |
| `PORT` | Postgres | 5432 | - |
| `POSTGRES_DB` | Postgres | healthchecks | Healthchecks database name. |
| `POSTGRES_USER` | Postgres | (secret) | Healthchecks database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |

## Configuration

- **Start command:** `/bin/bash -ec './manage.py migrate; ./manage.py shell -c '"'"'from django.contrib.auth.models import User; from hc.accounts.views import _make_user; import os; e=os.environ["SUPERUSER_EMAIL"].lower(); u=User.objects.filter(email=e).first() or _make_user(e); u.is_staff=True; u.is_superuser=True; u.set_password(os.environ["SUPERUSER_PASSWORD"]) if not u.has_usable_password() else None; u.save()'"'"'; exec uwsgi /opt/healthchecks/docker/uwsgi.ini'`
- **Healthcheck:** `/api/v3/status/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/healthchecks-cron-monitoring)
