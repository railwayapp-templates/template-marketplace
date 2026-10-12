# Deploy Odoo 20 Business Apps Suite on Railway

CRM, sales, inventory, invoicing and website in one. Odoo with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-20-business-apps-suite)

## About

Odoo is an open-source suite of business apps: CRM, sales, inventory, invoicing, website, e-commerce, project, helpdesk and more, all on one database. This community template deploys Odoo 20 Community from the official image on Railway with Postgres, production worker mode, a persistent filestore and a secured database manager.

A production Odoo server runs several worker processes for web requests, a cron worker for scheduled actions and a separate gevent process for WebSockets (live chat, Discuss, notifications), behind a reverse proxy that sends `/websocket` to the gevent port. It needs Postgres and a persistent data directory for attachments and sessions. This template runs Odoo and a small nginx in one service with a volume for the data directory, renders `odoo.conf` from Railway variables, creates the database on first boot with a generated administrator password, disables the public database manager and pins the database filter. Postgres runs as its own service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Odoo | [baranberkay96/odoo-railway](https://github.com/baranberkay96/odoo-railway) (branch: main) (root: /services/odoo) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Odoo | 8080 | Port nginx listens on (public domain target). Odoo itself listens on 127.0.0.1:8069/8072. |
| `SMTP_HOST` | Odoo | - | Outgoing SMTP server. Optional: you can also configure mail servers in Settings > Technical > Outgoing Mail Servers. |
| `SMTP_PORT` | Odoo | 587 | SMTP port. |
| `SMTP_USER` | Odoo | (secret) | SMTP username. Optional. |
| `EMAIL_FROM` | Odoo | - | Default sender address, e.g. odoo@yourcompany.com. Optional. |
| `ODOO_DB_NAME` | Odoo | odoo | Database Odoo serves (dbfilter and db_name are pinned to it). |
| `ODOO_LIST_DB` | Odoo | False | Database manager and selector. Keep False in production; set True temporarily to back up or restore from the UI. |
| `ODOO_WORKERS` | Odoo | 2 | HTTP worker processes (prefork). Rule of thumb: 2 x vCPU + 1. Must be > 0 for /websocket (live chat, notifications). |
| `SMTP_PASSWORD` | Odoo | (secret) | SMTP password. Optional. |
| `SMTP_STARTTLS` | Odoo | True | Use STARTTLS for SMTP. |
| `ODOO_INIT_LANG` | Odoo | - | Extra language loaded at database creation, e.g. de_DE or tr_TR. Optional. |
| `ODOO_DB_MAXCONN` | Odoo | 16 | Max Postgres connections per Odoo process. Keep (workers + cron + 1) x this below Postgres max_connections (100). |
| `ODOO_ADMIN_LOGIN` | Odoo | (secret) | Login of the administrator user set when the database is created. Use an e-mail address if you prefer. |
| `ODOO_INIT_MODULES` | Odoo | base | Modules installed at database creation, comma-separated (e.g. base,crm,sale_management,stock). Install the rest from the Apps menu. |
| `ODOO_ADMIN_PASSWORD` | Odoo | (secret) | Password of the administrator user, set once when the database is created. Change it later in Odoo. |
| `ODOO_AUTO_CREATE_DB` | Odoo | true | Create the database on first boot (no demo data). Set false to create it yourself in /web/database/manager. |
| `ODOO_LIMIT_TIME_CPU` | Odoo | 600 | Max CPU seconds per request (imports and reports need more than Odoo's 60 s default). |
| `ODOO_UPDATE_MODULES` | Odoo | - | Modules to update on the next start (e.g. all after a patch upgrade). Clear it again afterwards. Optional. |
| `ODOO_LIMIT_TIME_REAL` | Odoo | 1200 | Max wall-clock seconds per request. |
| `ODOO_MASTER_PASSWORD` | Odoo | (secret) | Master password (admin_passwd) protecting the database manager: create, duplicate, backup, restore, drop. |
| `ODOO_MAX_CRON_THREADS` | Odoo | 1 | Scheduled-action workers. |
| `ODOO_LIMIT_MEMORY_HARD` | Odoo | 1073741824 | Kill a worker immediately above this many bytes (1 GiB). |
| `ODOO_LIMIT_MEMORY_SOFT` | Odoo | 805306368 | Recycle a worker after a request once it uses more than this many bytes (768 MiB). |
| `NGINX_CLIENT_MAX_BODY_SIZE` | Odoo | 256m | Max upload size (attachments, imports, database restores). |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. 'odoo' instead of the Railway default 'postgres', which Odoo refuses to use. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |

## Configuration

- **Healthcheck:** `/web/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Tags:** odoo, erp, crm, inventory, invoicing · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/odoo-20-business-apps-suite)
