# Deploy Healthchecks on Railway

Cron Job Monitoring Service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/healthchecks)

## About

**Healthchecks** is a self-hosted cron job monitoring service. It listens for HTTP requests (pings) from your scheduled tasks and sends alerts when they don't arrive on time.

Use Healthchecks to:
- Monitor background jobs and cron tasks
- Get instant alerts when tasks fail or miss their schedule
- Track job performance and execution time
- Receive notifications via email, Slack, Discord, PagerDuty, and 20+ other integrations

Don't use Healthchecks to monitor uptime of websites or services. It's specifically designed for monitoring scheduled tasks.

![Healthchecks Dashboard](https://raw.githubusercontent.com/healthchecks/healthchecks/master/static/img/my_checks.png?raw=true)

![Check Configuration](https://github.com/healthchecks/healthchecks/raw/master/static/img/period_grace.png?raw=true)

![Cron Schedule Setup](https://github.com/healthchecks/healthchecks/raw/master/static/img/cron.png?raw=true)

- **Healthchecks Web Application** - The main interface and API for managing checks
- **PostgreSQL Database** - Persistent data storage with automatic backups
- **Background Workers** - Automated alert delivery and report generation
- **Health Monitoring** - Automatic health checks to ensure the system is running smoothly

This Railway template comes with **Apprise enabled**, giving you access to 25+ notification services including:
- **Slack** - Real-time notifications in Slack channels
- **Discord** - Alerts in Discord servers
- **Microsoft Teams** - Team notifications
- **Telegram** - Bot notifications
- **PagerDuty** - Incident management integration
- **Opsgenie** - Alert routing
- **Twilio** - SMS alerts
- **Signal** - Signal messages
- And 15+ more services...

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Healthchecks | [Experto-AI/railway-healthchecks](https://github.com/Experto-AI/railway-healthchecks) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | Healthchecks | postgres | DB name |
| `PORT` | Healthchecks | 8000 | Explicit PORT for health check success |
| `DEBUG` | Healthchecks | True | Enable Django DEBUG or not (True / False) |
| `DB_HOST` | Healthchecks | - | DB Host. Configured for this template. |
| `DB_NAME` | Healthchecks | - | DB Name. Configured for this template. |
| `DB_PORT` | Healthchecks | 5432 | DB Port. Configured for this template. |
| `DB_USER` | Healthchecks | (secret) | DB User. Configured for this template. |
| `SITE_NAME` | Healthchecks | My Healthchecks | Display name for your instance (e.g. My Healthchecks) |
| `SITE_ROOT` | Healthchecks | - | Public URL of this Web. Auto configured. |
| `DB_SSLMODE` | Healthchecks | prefer | DB SSL Mode Preference. Configured for this template. |
| `EMAIL_HOST` | Healthchecks | smtp.resend.com | SMTP server for email notifications. We recommend Resend (smtp.resend.com) |
| `EMAIL_PORT` | Healthchecks | 587 | SMTP Port Configuration. 587 for Resend. |
| `SECRET_KEY` | Healthchecks | (secret) | Auto generated Secret Key |
| `DB_PASSWORD` | Healthchecks | (secret) | DB Password. Auto configured. |
| `ALLOWED_HOSTS` | Healthchecks | - | Allowed Access. Configured for this template. |
| `EMAIL_USE_SSL` | Healthchecks | False | SMTP SSL Configuration. False for Resend. |
| `EMAIL_USE_TLS` | Healthchecks | True | SMTP TLS Configuration. True for Resend. |
| `PING_ENDPOINT` | Healthchecks | - | Ping Endpoint. Configured for this template. |
| `SHELL_ENABLED` | Healthchecks | False | Enable shell usage |
| `APPRISE_ENABLED` | Healthchecks | True | Apprise feature enabled in app |
| `DB_CONN_MAX_AGE` | Healthchecks | 0 | DB Connection expiration. Configured for this template. |
| `EMAIL_HOST_USER` | Healthchecks | (secret) | SMTP username. Usually your email address or 'resend' for Resend, or as specified by your provider. |
| `SUPERUSER_EMAIL` | Healthchecks | - | Super User email for LOGIN and EMAIL reception (e.g. admin@mydomain.com) |
| `PING_EMAIL_DOMAIN` | Healthchecks | - | Ping Email Domain. Configured for this template. |
| `REGISTRATION_OPEN` | Healthchecks | True | Do you enable other users registration in this application? |
| `DEFAULT_FROM_EMAIL` | Healthchecks | onboarding@resend.dev | SMTP FROM Email. Resend testing is onboarding@resend.dev |
| `SUPERUSER_PASSWORD` | Healthchecks | (secret) | Super User password for LOGIN (e.g. P4$$word) |
| `EMAIL_HOST_PASSWORD` | Healthchecks | (secret) | SMTP API Key. Resend format re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| `DB_TARGET_SESSION_ATTRS` | Healthchecks | read-write | DB Target Session Attributes. Configured for this template. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/v3/status/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/healthchecks)
