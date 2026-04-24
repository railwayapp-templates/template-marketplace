# Deploy EspoCRM | CRM Application on Railway on Railway

Self Host EspoCRM. Sales automation, contacts, leads, deals, and workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/espocrm)

## About

Deploy EspoCRM on Railway to get a fully functional, self-hosted CRM with sales automation, customer support, and email marketing — no per-user fees. Self-host EspoCRM with one click and run EspoCRM on Railway with PostgreSQL for persistent data storage and a background daemon for scheduled workflows and email processing.

This Railway template pre-configures the EspoCRM application server (`espocrm/espocrm`) with Railway-managed PostgreSQL, a persistent volume for application files, and a built-in background job processor for cron tasks and automated workflows.

EspoCRM is an open-source Customer Relationship Management platform built in PHP. It provides a modern, responsive web interface for managing contacts, leads, opportunities, and customer support cases — replacing expensive SaaS CRM tools like HubSpot or Salesforce with a self-hosted solution you fully control.

- **Sales automation** — customizable pipeline stages, deal tracking, lead scoring, and forecasting
- **Email integration** — IMAP/SMTP sync, mass email campaigns, email templates, and tracking
- **Customer support** — case management, SLA tracking, knowledge base, and customer portal
- **Business process automation** — visual BPM designer, workflow rules, and scheduled jobs
- **REST API** — full API access for custom integrations with n8n, Zapier, or any webhook-based tool
- **Customizable entities** — create custom fields, relationships, layouts, and modules without code

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EspoCRM | `espocrm/espocrm:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | EspoCRM | 80 | Apache listening port |
| `ESPOCRM_SITE_URL` | EspoCRM | - | Public-facing app URL |
| `ESPOCRM_DATABASE_HOST` | EspoCRM | - | PostgreSQL hostname |
| `ESPOCRM_DATABASE_NAME` | EspoCRM | - | Database name |
| `ESPOCRM_DATABASE_PORT` | EspoCRM | - | PostgreSQL port |
| `ESPOCRM_DATABASE_USER` | EspoCRM | (secret) | Database username |
| `ESPOCRM_ADMIN_PASSWORD` | EspoCRM | (secret) | Admin password (bootstrap-only) |
| `ESPOCRM_ADMIN_USERNAME` | EspoCRM | (secret) | Admin account username |
| `ESPOCRM_DATABASE_PASSWORD` | EspoCRM | (secret) | Database password |
| `ESPOCRM_DATABASE_PLATFORM` | EspoCRM | Postgresql | Database driver type |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c 'a2dismod mpm_event 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; docker-daemon.sh & apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/espocrm)
