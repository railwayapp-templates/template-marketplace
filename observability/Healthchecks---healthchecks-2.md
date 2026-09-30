# Deploy Healthchecks on Railway

Cron job and scheduled task monitoring, self-hosted (unofficial)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/healthchecks-2)

## About

Healthchecks is an open-source monitor for cron jobs and scheduled tasks. Your jobs ping a URL; if a ping is missing, you get alerted (email, Slack, Telegram, webhooks and more). This template deploys the official healthchecks/healthchecks image (pinned to v4.4) with SQLite on a persistent volume. One service, no separate database or worker. Unofficial template, not affiliated with the Healthchecks project.

The template runs a single service from the official image with a volume mounted at /data holding the SQLite database. The alert sender and report daemons run inside the same container. On first start an admin account is created from the ADMIN_EMAIL you enter at deploy and the auto-generated ADMIN_PASSWORD (find it in the service Variables tab); sign in with those. Public sign-up is closed by default (REGISTRATION_OPEN=False). Email alerts and login links need SMTP: set EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD and DEFAULT_FROM_EMAIL in the service Variables tab and redeploy. Run a single instance only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| healthchecks/healthchecks:v4.4 | `healthchecks/healthchecks:v4.4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB` | sqlite | Database engine. Leave as sqlite: the database is a file on the persistent volume, so no separate database service is needed. |
| `PORT` | 8000 | Port the app listens on (8000). Railway routes the public domain to this port; do not change it. |
| `DEBUG` | False | Django debug mode. Keep False on a public site (True would show detailed error pages). |
| `DB_NAME` | /data/hc.sqlite | Path of the SQLite database file, inside the volume mounted at /data. Do not change it or data will not persist. |
| `SITE_ROOT` | - | Public base URL of your instance, used in ping URLs and emails. Built from the Railway domain over https; change it if you attach a custom domain. |
| `EMAIL_HOST` | - | Optional. SMTP server hostname for email alerts and login links. Leave empty to run without email. |
| `EMAIL_PORT` | 587 | SMTP port (587 by default, uses STARTTLS). Only used if EMAIL_HOST is set. Many hosts block outbound port 25. |
| `SECRET_KEY` | (secret) | Django secret key used to sign sessions, auto-generated (64 characters) at deploy. Do not change or share it. |
| `ADMIN_EMAIL` | - | Your email address. An admin account with this email is created on first start; you sign in with it and ADMIN_PASSWORD. |
| `ALLOWED_HOSTS` | - | Hostnames the app accepts. Set to your Railway domain plus Railway's healthcheck host. If you add a custom domain, append it (comma-separated). |
| `ADMIN_PASSWORD` | (secret) | Password for the admin account, auto-generated (20 characters) at deploy. Find it in this service's Variables tab. Only used when the account is first created. |
| `EMAIL_HOST_USER` | (secret) | Optional. SMTP username. Only used if EMAIL_HOST is set. |
| `REGISTRATION_OPEN` | False | Whether anyone can sign up. Defaults to False so strangers cannot register on your public URL; the admin account below is created at start-up. |
| `DEFAULT_FROM_EMAIL` | - | Optional. From address on outgoing emails, for example alerts@yourdomain.com. Only used if EMAIL_HOST is set. |
| `EMAIL_HOST_PASSWORD` | (secret) | Optional. SMTP password or API key. Only used if EMAIL_HOST is set. |
| `UWSGI_HOOK_POST_APP` | exec:./manage.py createsuperuser --email $(ADMIN_EMAIL) --password $(ADMIN_PASSWORD) --skip-checks | uWSGI hook that creates the admin account from ADMIN_EMAIL and ADMIN_PASSWORD after the app loads. On later restarts it exits with an error because the account exists; that is harmless. Do not change it. |
| `SECURE_PROXY_SSL_HEADER` | HTTP_X_FORWARDED_PROTO,https | Tells the app that requests forwarded by Railway's edge with X-Forwarded-Proto: https are secure. Leave as is. |

## Configuration

- **Healthcheck:** `/api/v3/status/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/healthchecks-2)
