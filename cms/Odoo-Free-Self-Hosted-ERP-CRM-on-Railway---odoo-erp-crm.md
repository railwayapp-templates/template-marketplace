# Deploy Odoo — Free Self-Hosted ERP & CRM on Railway on Railway

Self-host Odoo ERP & CRM free. No per-user fees. 50+ business apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-erp-crm)

## About

![Odoo ERP and CRM dashboard](https://odoocdn.com/openerp_website/static/src/img/assets/svg/odoo_logo.svg)

Odoo is the open-source business suite that runs your whole company from one platform — CRM,
Sales, Inventory, Accounting, HR, Manufacturing, eCommerce, Project, and 50+ integrated apps
with 16,000+ community modules. The **Community Edition is free and open-source (LGPL-3.0)** —
no per-user license, no feature upsells, no vendor lock-in. Your data lives in standard
PostgreSQL that you own.

Odoo Standard costs ~$31/user/month and Odoo.sh runs ~$72/user/month — a 25-user company pays
roughly **$1,765/month** on Odoo.sh. Self-hosted Community Edition on Railway costs ~$5–15/month
flat, no matter how many users you add.

---

Running Odoo in production requires a dedicated PostgreSQL database (Odoo only supports
PostgreSQL), a persistent filestore for attachments and images, a public HTTPS endpoint, and
careful worker configuration for performance. Self-hosting on a raw VPS means installing Odoo,
tuning PostgreSQL, configuring Nginx, managing SSL, and handling backups manually — typically
2–8 hours of setup plus 5–10 hours monthly maintenance.

Railway removes all of that. This template provisions Odoo connected to a managed PostgreSQL 17
instance over private networking, with a persistent filestore volume and automatic HTTPS. Your
business data and uploaded files survive every redeploy.

![Odoo app modules — CRM, Sales, Inventory, Accounting](https://www.odoo-bs.com/web/image/1597652-9ba09291/App%20Overview.webp)

Typical cost: **~$5–15/month** on Railway's Hobby plan for the full stack. Odoo.sh charges
~$72/user/month bundled with Enterprise licensing — a 25-user deployment is ~$1,765/month.
Self-hosted Community Edition on Railway carries no license fee and no per-user cost.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Odoo | `odoo:19.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ODOO_SMTP_HOST` | Odoo | - | SMTP hostname |
| `ODOO_SMTP_USER` | Odoo | (secret) | SMTP username |
| `ODOO_SMTP_PASSWORD` | Odoo | (secret) | SMTP password |
| `ODOO_SMTP_PORT_NUMBER` | Odoo | - | SMTP port number |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/odoo`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/odoo-erp-crm)
