# Deploy Odoo 19 | ERP That Starts Without SMTP, Admin Password Set, DB Manager Off on Railway

Self-host Odoo 19 on Railway — no SMTP needed, admin password set.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-19-or-erp-that-starts-without-smtp-)

## About

Odoo 19 Community, the open-source ERP, on Postgres. It starts without mail settings, creates its database with a generated administrator password instead of admin / admin, and keeps the web database manager switched off.

Nothing to fill in. Open the domain and sign in as `admin` with the `ODOO_ADMIN_PASSWORD` from the Odoo service's variables.

Two services:

- **Odoo** 19, built from [ak40u/odoo-railway-starter](https://github.com/ak40u/odoo-railway-starter) on the official image, with a volume for attachments and sessions (public)
- **Postgres 17**: the Odoo database, on its own volume and on the private network only

Install the apps you need, CRM, Sales, Inventory, Invoicing, Website and the rest, from the Apps menu after signing in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.11-alpine` | Database |
| Odoo | [ak40u/odoo-railway-starter](https://github.com/ak40u/odoo-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | postgres |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Odoo | 8069 |
| `DB_NAME` | Odoo | odoo |
| `DB_PORT` | Odoo | 5432 |
| `DB_USER` | Odoo | (secret) |
| `DB_PASSWORD` | Odoo | (secret) |
| `ODOO_ADMIN_LOGIN` | Odoo | (secret) |
| `ODOO_ADMIN_PASSWORD` | Odoo | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/web/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/odoo-19-or-erp-that-starts-without-smtp-)
