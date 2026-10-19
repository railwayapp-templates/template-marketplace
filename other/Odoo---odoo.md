# Deploy Odoo on Railway

Odoo 20 ERP and CRM on Postgres, admin set at deploy, database manager off

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo)

## About

[Odoo](https://github.com/odoo/odoo) is an open-source suite of business apps: CRM, sales, invoicing, accounting, inventory, purchasing, projects, a website builder and more, all on one database. This template runs Odoo 20 Community (the 20.0-20261015 build) on Postgres, with the admin login set at deploy.

The official image has two catches on Railway. Its entrypoint reads `PORT` as the database port, while Railway sets `PORT` to the web port, so a plain deploy points Odoo at the wrong place. And by default Odoo's database manager page is open with the master password `admin`, which lets anyone who finds it create, back up or delete databases. My start step writes Odoo's config itself: one database, the database manager off, a generated `ODOO_MASTER_PASSWORD`, proxy mode for Railway's HTTPS, and the web server on all interfaces.

A new database is set up before the web server starts. The start step installs Odoo's base module, then replaces Odoo's default admin/admin login with `ODOO_ADMIN_EMAIL` and the generated `ODOO_ADMIN_PASSWORD`, so there's no moment when the default login works. Attachments (Odoo's filestore) and sessions are on a volume, and the data is in Postgres.

Before publishing I tested it on Railway. `/web/health` answered, the database manager page said it was disabled, and the admin signed in with the generated password through Odoo's JSON-RPC API, the way the web client does. I installed the CRM app (26 seconds), created a lead with an expected revenue of 42, and stored a text attachment, which landed in the filestore and downloaded with the same content. After restarting both Odoo and Postgres, sign-in worked and CRM, the lead and the attachment were all still there.

With CRM installed it used about 0.25 GB for Odoo and 0.2 GB for Postgres, around $5 a month on Railway's usage pricing. Each app you install and each user you add takes more.

Email is the main limitation. Odoo sends invitations, quotes and invoices by SMTP, and Railway blocks outbound SMTP below the Pro plan. On Pro, set up an outgoing mail server in Odoo's settings. On other plans you can still invite users and print or download documents; they just won't be emailed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Odoo | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /odoo) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Odoo | 8069 | Port Railway routes to |
| `ODOO_URL` | Odoo | - | Open this and sign in with ODOO_ADMIN_EMAIL and ODOO_ADMIN_PASSWORD |
| `ODOO_ADMIN_EMAIL` | Odoo | - | Your email: the admin's login, set when the database is created |
| `ODOO_ADMIN_PASSWORD` | Odoo | (secret) | The admin's password (generated). Used once at setup; change it later in Odoo's preferences |
| `ODOO_MASTER_PASSWORD` | Odoo | (secret) | Master password for Odoo's database tools (generated; the database manager page is off) |
| `POSTGRES_DB` | Postgres | odoo | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user (Odoo refuses to run as postgres) |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |

## Configuration

- **Healthcheck:** `/web/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Tags:** odoo, erp, crm, invoicing, inventory, business · **Languages:** Shell, JavaScript, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/odoo)
