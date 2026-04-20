# Deploy Odoo | Open-Source Business Suite on Railway

Self-host Odoo — CRM, invoicing, inventory, manufacturing & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-crm-erp)

## About

Deploy Odoo on Railway with a single click and get a fully functional open-source ERP and CRM suite with integrated PostgreSQL. Self-host Odoo to manage your entire business — CRM, accounting, inventory, manufacturing, HR, and 30+ more modules — all from one unified platform with zero license fees.

This Railway template pre-configures Odoo 19 with a PostgreSQL 15 database, persistent file storage for attachments, proxy mode for HTTPS, and a locked-down database management screen. Two services are deployed: the Odoo application server and a dedicated Postgres instance connected via Railway's private network.

Odoo is a suite of open-source business applications built in Python. Originally launched in 2005 as OpenERP, it has grown into one of the most widely deployed open-source ERP systems, with over 12 million users worldwide and 44,000+ community-contributed apps.

Key features of self-hosted Odoo:

- **Modular architecture** — install only the apps you need, from CRM to manufacturing
- **Integrated suite** — all modules share a single database, eliminating data silos
- **Python-based** — easy to extend with custom modules and automations
- **Multi-company support** — manage multiple business entities from one instance
- **REST API** — integrate with external systems via XML-RPC or JSON-RPC
- **Mobile-responsive** — full web interface works on tablets and phones

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Odoo | `odoo:19.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Odoo | - | PostgreSQL host via private network |
| `PORT` | Odoo | 5432 | PostgreSQL connection port |
| `USER` | Odoo | - | Dedicated non-superuser role (Odoo refuses postgres superuser) |
| `PASSWORD` | Odoo | (secret) | Password for dedicated odoo role |
| `ADMIN_PASSWD` | Odoo | odoo_master_2026_railway | Master password for DB management |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/entrypoint.sh odoo --proxy-mode --database=odoo --no-database-list`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/odoo-crm-erp)
