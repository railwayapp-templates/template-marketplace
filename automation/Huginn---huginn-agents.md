# Deploy Huginn on Railway

Build agents that watch websites and alert you when they change

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/huginn-agents)

## About

Huginn is an open-source system for building agents that watch the web and act on your behalf. Each agent does one small job — scrape a page, read a feed, call an API, listen on a webhook — and emits events that flow into other agents that filter, reformat, combine or deliver them. Chained together they replace the recurring "check this, tell me when it changes" work people otherwise pay IFTTT, Zapier or Make to do, except the data never leaves infrastructure you control. It is MIT licensed and ships around seventy agent types out of the box.

This template runs Huginn the way its own Procfile recommends for production: three processes rather than one box doing everything. Deploy Huginn on Railway and you get a web service running Puma for the UI and incoming webhooks, a scheduler that decides which agents are due, a worker that runs them, a managed PostgreSQL database holding agents, events and the job queue, and a Mailpit inbox capturing what Huginn emails. Only the web UI and the inbox get public URLs.

![Diagram of the Huginn web, scheduler, worker, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787650773/huginn-architecture.png)

Huginn is closer to a programmable monitoring system than a drag-and-drop workflow builder. You configure agents with JSON options and Liquid templates rather than by wiring boxes on a canvas — slower to start with, far more precise once you know what you want. Teams self-host it when what is being watched is sensitive, or when a per-task SaaS bill stops making sense.

Key capabilities:

- Around seventy agent types: Website, RSS, HTTP Status, Post, Webhook, Email, Trigger, Event Formatting, JavaScript, Liquid, De-duplication, Peak Detector
- CSS or XPath extraction from HTML, XML and JSON, with Liquid templating over every value
- Per-agent schedules from every minute to daily, cron scheduling, and incoming webhooks
- Scenarios that group agents and export as JSON, so a setup can be version-controlled
- Event propagation between agents, with a visual diagram of the whole graph

The **web** service serves the UI and receives webhooks, and is the only one that runs migrations. The **scheduler** decides which agents are due; the **worker** does the fetching, parsing and sending. **PostgreSQL** stores everything including the job queue — Huginn uses Delayed::Job, so no Redis is needed. **Mailpit** accepts SMTP privately and holds what Huginn sends.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| huginn-web | [gridalpha/huginn-railway](https://github.com/gridalpha/huginn-railway) | Web service |
| huginn-worker | [gridalpha/huginn-railway](https://github.com/gridalpha/huginn-railway) | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| huginn-scheduler | [gridalpha/huginn-railway](https://github.com/gridalpha/huginn-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | huginn-web | 3000 | HTTP port Puma binds |
| `DOMAIN` | huginn-web | - | Public hostname used in links |
| `SMTP_SSL` | huginn-web | false | No implicit TLS on 1025 |
| `FORCE_SSL` | huginn-web | true | HSTS and Secure session cookies |
| `SMTP_PORT` | huginn-web | 1025 | Mailpit plain SMTP listener |
| `SEED_EMAIL` | huginn-web | admin@example.com | First administrator email address |
| `HUGINN_ROLE` | huginn-web | web | Runs Puma, migrations and seeding |
| `SMTP_DOMAIN` | huginn-web | - | SMTP HELO domain |
| `SMTP_SERVER` | huginn-web | - | Mailpit private hostname |
| `DATABASE_URL` | huginn-web | - | Postgres connection string |
| `SEED_PASSWORD` | huginn-web | (secret) | First administrator password |
| `SEED_USERNAME` | huginn-web | (secret) | First administrator username |
| `INVITATION_CODE` | huginn-web | - | Code required to register |
| `APP_SECRET_TOKEN` | huginn-web | (secret) | Rails signing key, must stay stable |
| `EMAIL_FROM_ADDRESS` | huginn-web | - | From address on outgoing mail |
| `SKIP_INVITATION_CODE` | huginn-web | false | Keeps signup closed |
| `DO_NOT_CREATE_DATABASE` | huginn-web | true | Managed database already exists |
| `SMTP_ENABLE_STARTTLS_AUTO` | huginn-web | false | Plain listener advertises no STARTTLS |
| `DOMAIN` | huginn-worker | - | Public hostname used in links |
| `SMTP_SSL` | huginn-worker | false | No implicit TLS on 1025 |
| `SMTP_PORT` | huginn-worker | 1025 | Mailpit plain SMTP listener |
| `DO_NOT_SEED` | huginn-worker | true | Only the web service seeds |
| `HUGINN_ROLE` | huginn-worker | worker | Runs queued agents via Delayed::Job |
| `SMTP_DOMAIN` | huginn-worker | - | SMTP HELO domain |
| `SMTP_SERVER` | huginn-worker | - | Mailpit private hostname |
| `DATABASE_URL` | huginn-worker | - | Postgres connection string |
| `APP_SECRET_TOKEN` | huginn-worker | (secret) | Shared Rails signing key |
| `EMAIL_FROM_ADDRESS` | huginn-worker | - | From address on outgoing mail |
| `DO_NOT_CREATE_DATABASE` | huginn-worker | true | Managed database already exists |
| `DELAYED_JOB_MAX_RUNTIME` | huginn-worker | 2 | Minutes before a job is abandoned |
| `DELAYED_JOB_SLEEP_DELAY` | huginn-worker | 10 | Seconds between queue polls |
| `SMTP_ENABLE_STARTTLS_AUTO` | huginn-worker | false | Plain listener advertises no STARTTLS |
| `PORT` | mailpit | 8025 | Web inbox HTTP port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `DOMAIN` | huginn-scheduler | - | Public hostname used in links |
| `SMTP_SSL` | huginn-scheduler | false | No implicit TLS on 1025 |
| `SMTP_PORT` | huginn-scheduler | 1025 | Mailpit plain SMTP listener |
| `DO_NOT_SEED` | huginn-scheduler | true | Only the web service seeds |
| `HUGINN_ROLE` | huginn-scheduler | scheduler | Queues agents whose schedule is due |
| `SMTP_DOMAIN` | huginn-scheduler | - | SMTP HELO domain |
| `SMTP_SERVER` | huginn-scheduler | - | Mailpit private hostname |
| `DATABASE_URL` | huginn-scheduler | - | Postgres connection string |
| `APP_SECRET_TOKEN` | huginn-scheduler | (secret) | Shared Rails signing key |
| `EMAIL_FROM_ADDRESS` | huginn-scheduler | - | From address on outgoing mail |
| `DO_NOT_CREATE_DATABASE` | huginn-scheduler | true | Managed database already exists |
| `SMTP_ENABLE_STARTTLS_AUTO` | huginn-scheduler | false | Plain listener advertises no STARTTLS |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/about`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Volume:** `/mnt/scheduler`

**Category:** Automation · **Languages:** Shell, Dockerfile, Ruby

[View on Railway →](https://railway.com/deploy/huginn-agents)
