# Deploy Healthchecks on Railway

Cron job monitoring: get alerted when a scheduled job doesn't check in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/healthchecks-3)

## About

[Healthchecks](https://github.com/healthchecks/healthchecks) monitors cron jobs and background tasks. Each job pings a unique URL when it runs, and if a ping is late, Healthchecks alerts you. Alerts go to Slack, Discord, Telegram, email, webhooks, ntfy, PagerDuty and 20+ other channels.

This template runs the official `healthchecks/healthchecks` image (uWSGI + Django) with Railway Postgres. On every deploy, a pre-deploy step runs the database migrations and creates your admin account from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. You can log in immediately, with no shell and no SMTP needed. Public sign-up is off by default.

The alert sender (`sendalerts`) and the report sender (`sendreports`) run inside the same container, so there is only one app service to pay for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Healthchecks | `healthchecks/healthchecks:v4.4` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | Healthchecks | postgres | Database engine. |
| `PORT` | Healthchecks | 8000 | uWSGI listens on 8000. |
| `DEBUG` | Healthchecks | False | Must stay False in production. |
| `DB_USER` | Healthchecks | (secret) | - |
| `SITE_NAME` | Healthchecks | Healthchecks | Name shown in the UI and emails. |
| `SITE_ROOT` | Healthchecks | - | Public base URL. Update it if you add a custom domain. |
| `EMAIL_HOST` | Healthchecks | - | SMTP host. Optional: Slack, Discord, Telegram, webhooks and ntfy work without email. |
| `EMAIL_PORT` | Healthchecks | 587 | SMTP port. |
| `SECRET_KEY` | Healthchecks | (secret) | Django secret key. |
| `ADMIN_EMAIL` | Healthchecks | - | Email of the superuser created on first deploy (used to log in). |
| `DB_PASSWORD` | Healthchecks | (secret) | - |
| `ALLOWED_HOSTS` | Healthchecks | - | Hosts Django accepts. healthcheck.railway.app is required for Railway's deploy healthcheck. |
| `ADMIN_PASSWORD` | Healthchecks | (secret) | Password of the superuser created on first deploy. |
| `EMAIL_HOST_USER` | Healthchecks | (secret) | SMTP username. |
| `UWSGI_PROCESSES` | Healthchecks | 2 | Web worker processes. 2 keeps RAM around 200 MB. |
| `REGISTRATION_OPEN` | Healthchecks | False | Allow public sign-ups. Off by default; invite team members from the UI. |
| `DEFAULT_FROM_EMAIL` | Healthchecks | - | From: address for alert emails (needs SMTP below). |
| `EMAIL_HOST_PASSWORD` | Healthchecks | (secret) | SMTP password. |
| `EMAIL_USE_VERIFICATION` | Healthchecks | False | Require email verification for new email integrations. Off so it works without SMTP. |
| `SECURE_PROXY_SSL_HEADER` | Healthchecks | HTTP_X_FORWARDED_PROTO,https | Trust Railway's TLS-terminating proxy (prevents CSRF 403s). |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/api/v3/status/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/healthchecks-3)
