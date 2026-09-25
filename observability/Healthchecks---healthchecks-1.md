# Deploy Healthchecks on Railway

Healthchecks 4.4 cron job monitoring with ping URLs and alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/healthchecks-1)

## About

Healthchecks is a cron job and background task monitor. Each job gets a unique ping URL; when a ping arrives late or reports a failure, Healthchecks alerts you by email, Slack, Discord, Telegram, webhooks and many other integrations. It is the open-source code behind the healthchecks.io service.

This template deploys Healthchecks v4.4 from the official image with a Railway Postgres database. The start command runs database migrations and creates the admin account from environment variables, so the first login works immediately; public sign-up is closed. Ping URLs use your Railway domain. The service listens on IPv4 and IPv6, so jobs on the same project can ping over the private network. Email alerts need an SMTP server: set `EMAIL_HOST` and related variables. The app is light and fits on the Hobby plan. Back up Postgres regularly to keep the check history.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| healthchecks | `healthchecks/healthchecks:v4.4` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DB` | healthchecks | postgres |
| `PORT` | healthchecks | 8000 |
| `DEBUG` | healthchecks | False |
| `DB_USER` | healthchecks | (secret) |
| `SITE_NAME` | healthchecks | Healthchecks |
| `SECRET_KEY` | healthchecks | (secret) |
| `DB_PASSWORD` | healthchecks | (secret) |
| `LISTEN_IPV6` | healthchecks | true |
| `HC_ADMIN_EMAIL` | healthchecks | admin@example.com |
| `HC_ADMIN_PASSWORD` | healthchecks | (secret) |
| `REGISTRATION_OPEN` | healthchecks | False |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c './manage.py migrate --noinput && (./manage.py createsuperuser --email "$HC_ADMIN_EMAIL" --password "$HC_ADMIN_PASSWORD" 2>&1 | grep -vE "already taken|MAILERS" || true) && exec uwsgi /opt/healthchecks/docker/uwsgi.ini'`
- **Healthcheck:** `/api/v3/status/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/healthchecks-1)
