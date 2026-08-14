# Deploy Odoo on Railway

Self-host Odoo: open-source ERP, CRM, invoicing and inventory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-railway)

## About

Odoo is the open-source business suite behind CRM, Sales, Invoicing, Inventory, Project, HR and Point of Sale — dozens of apps sharing one PostgreSQL database and one login, so a quotation becomes a sales order, a delivery and a journal entry with no glue code. Teams that outgrow spreadsheets but do not want a per-seat SaaS bill self-host Odoo Community Edition: LGPL-3.0, no license fee. Deploy Odoo on Railway to get the production configuration on first boot.

Self-host Odoo on Railway as three services. **`odoo`** builds on the official `odoo:19.0` image and runs it in multi-processing mode, with a volume at `/var/lib/odoo` for the filestore. **`Postgres`** is Railway's managed PostgreSQL on the private network. **`odoo-proxy`** runs `nginx:1.30-alpine`, owns the public domain, and sends `/websocket` to Odoo's gevent port `8072` and everything else to the HTTP workers on `8069` — Odoo puts its real-time bus on that second port, and a Railway domain maps to only one port, so without the proxy live updates fail silently.

![Odoo Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786650591/722d9bc3-fddf-4a97-8c8f-7eb43690b500.png)

Odoo replaces the usual small-business stack — a CRM, an invoicing tool, a stock spreadsheet, an accounting package — with one relational model, so there is no sync job between systems to fail. Self-host it to keep your ledger and customer data on infrastructure you control.

- **Modular apps** — CRM, Sales, Purchase, Inventory, Invoicing, Project, HR, Point of Sale, Website and eCommerce, installed individually.
- **Open APIs** — XML-RPC and JSON-RPC expose every model; most Shopify and Stripe integrations build on them.
- **Extensible** — custom addons drop into the addons path; the OCA publishes thousands of free ones.

The volume is Odoo's *filestore*: attachments live on disk, not in the database, so it must persist or files 404 after a redeploy. The proxy rewrites `X-Forwarded-For` to its leftmost entry, so Odoo logs real user IPs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| odoo | [gridalpha/odoo-railway](https://github.com/gridalpha/odoo-railway) (root: odoo) | Database |
| odoo-proxy | [gridalpha/odoo-railway](https://github.com/gridalpha/odoo-railway) (root: proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | odoo | 8069 | HTTP port for Railway health check |
| `ODOO_ADMIN_PASSWD` | odoo | - | Master password for database create/backup/restore |
| `PORT` | odoo-proxy | 8080 | Port the public domain targets |
| `ODOO_UPSTREAM_HOST` | odoo-proxy | - | Private hostname of the Odoo service |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/web/health`
- **Volume:** `/var/lib/odoo`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/odoo-railway)
