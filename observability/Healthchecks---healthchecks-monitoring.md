# Deploy Healthchecks on Railway

Monitor cron jobs, backups and scheduled tasks; alert when a ping is late

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/healthchecks-monitoring)

## About

Healthchecks is an open-source monitor for cron jobs, backups and any scheduled task meant to run quietly in the background. Instead of polling your servers, it waits: each job sends an HTTP request to a unique ping URL when it finishes, and if that ping does not arrive on schedule, Healthchecks alerts you through email, Slack, Telegram, PagerDuty, ntfy or webhooks. It is what sysadmins reach for after discovering a nightly database dump stopped running three weeks ago. Self-host Healthchecks and every ping, schedule and alert stays on infrastructure you control.

This template runs Healthchecks on Railway with the pieces a real deployment needs. The main service runs the Django app under uWSGI plus the two background senders from upstream's official image: `sendalerts`, which watches for late and failed checks, and `sendreports`, which sends periodic summaries. Managed PostgreSQL stores accounts, checks and the ping log, and an object storage bucket holds captured job output. Traffic arrives on the public Railway domain; the database and bucket stay private.

![Healthchecks Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786895545/0f86eeeb-8b4d-40cf-bb6f-f9a7a6253dec.png)

Healthchecks implements the dead man's switch pattern: a job proves it is alive by checking in, and silence is the alarm. That catches failures HTTP probes miss — a cron entry lost in a migration, a backup that exits zero while writing an empty file. Teams self-host it to keep job metadata in-house, to watch jobs behind a VPN no SaaS probe can reach, and to avoid per-check pricing.

Key features:

- Period-and-grace schedules, cron expressions and systemd OnCalendar syntax, each with its own timezone
- Success, start and failure signals, giving run duration, a searchable event log and captured output per check
- 25+ alert integrations: email, Slack, Discord, Telegram, Mattermost, Teams, PagerDuty, Opsgenie, ntfy, Gotify, Pushover, Signal and webhooks
- Projects, teams and read-only members, plus per-project API keys for the REST management API
- Status badges, uptime summaries, Prometheus metrics, and TOTP and WebAuthn two-factor sign-in

The alert senders run inside the main container as supervised daemons, exactly as upstream's image runs them, so there is no separate worker to keep in sync.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| healthchecks | `healthchecks/healthchecks:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `DB` | healthchecks | postgres | Database backend selector |
| `PORT` | healthchecks | 8000 | HTTP listening port |
| `DEBUG` | healthchecks | False | Disable Django debug mode |
| `RP_ID` | healthchecks | - | WebAuthn relying party domain |
| `DB_HOST` | healthchecks | - | Private Postgres hostname |
| `DB_NAME` | healthchecks | - | Database name |
| `DB_PORT` | healthchecks | - | Postgres port |
| `DB_USER` | healthchecks | (secret) | Database user |
| `S3_BUCKET` | healthchecks | - | Bucket for captured ping bodies |
| `S3_REGION` | healthchecks | - | Object storage region |
| `SITE_NAME` | healthchecks | Healthchecks | Branding shown in UI and emails |
| `SITE_ROOT` | healthchecks | - | Public base URL |
| `SECRET_KEY` | healthchecks | (secret) | Signs sessions and login links |
| `DB_PASSWORD` | healthchecks | (secret) | Database password |
| `S3_ENDPOINT` | healthchecks | - | Object storage endpoint |
| `ALLOWED_HOSTS` | healthchecks | * | Accept any Host header |
| `S3_ACCESS_KEY` | healthchecks | - | Object storage access key |
| `S3_SECRET_KEY` | healthchecks | (secret) | Object storage secret key |
| `APPRISE_ENABLED` | healthchecks | False | Keep Apprise transport disabled |
| `DB_CONN_MAX_AGE` | healthchecks | 60 | Persistent database connection lifetime |
| `PING_BODY_LIMIT` | healthchecks | 100000 | Max bytes stored per ping body |
| `SUPERUSER_EMAIL` | healthchecks | admin@example.com | First administrator login email |
| `REGISTRATION_OPEN` | healthchecks | False | Close public sign-up |
| `SUPERUSER_PASSWORD` | healthchecks | (secret) | First administrator password |
| `SECURE_PROXY_SSL_HEADER` | healthchecks | HTTP_X_FORWARDED_PROTO,https | Trust edge TLS termination |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'mkdir -p /tmp/hcconf; printf "%s\n" "from hc.settings import *" "SESSION_COOKIE_SECURE = True" "CSRF_COOKIE_SECURE = True" "SECURE_HSTS_SECONDS = 31536000" > /tmp/hcconf/railway_settings.py; export PYTHONPATH="/tmp/hcconf:$PYTHONPATH" DJANGO_SETTINGS_MODULE=railway_settings; if [ -n "$S3_ENDPOINT" ]; then case "$S3_ENDPOINT" in https://*) S3_ENDPOINT=${S3_ENDPOINT#https://}; S3_SECURE=True;; http://*) S3_ENDPOINT=${S3_ENDPOINT#http://}; S3_SECURE=False;; esac; export S3_ENDPOINT S3_SECURE; echo "bootstrap: s3 endpoint=$S3_ENDPOINT secure=$S3_SECURE"; fi; for i in 1 2 3 4 5 6 7 8 9 10 11 12; do ./manage.py migrate --noinput && break; echo "bootstrap: database not ready, retry $i"; sleep 5; done; if [ -n "$SUPERUSER_EMAIL" ] && [ -n "$SUPERUSER_PASSWORD" ]; then ./manage.py createsuperuser --email "$SUPERUSER_EMAIL" --password "$SUPERUSER_PASSWORD" || echo "bootstrap: superuser already present, skipping"; fi; ./manage.py shell -c "from django.conf import settings; from hc.api.models import Channel; qs = Channel.objects.filter(kind=\"email\"); n = 0 if settings.EMAIL_HOST else qs.count(); n and qs.delete(); print(f\"bootstrap: removed {n} email notification channel(s); set EMAIL_HOST to enable email alerts\")"; exec uwsgi /opt/healthchecks/docker/uwsgi.ini'`
- **Healthcheck:** `/api/v3/status/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/healthchecks-monitoring)
