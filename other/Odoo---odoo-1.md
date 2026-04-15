# Deploy Odoo on Railway

Scalable Odoo ERP! High-performance business suite for your growth. 🔥

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-1)

## About

Odoo is a powerful, all-in-one open-source ERP software that integrates essential business functions into a single platform. It covers CRM, e-commerce, accounting, inventory, and project management. Designed for scalability, Odoo allows businesses to start with a few modules and add more as they grow, ensuring seamless data flow across departments.

Hosting Odoo requires a robust Python environment paired with a PostgreSQL database to manage its complex relational data. When deploying on Railway, the application is containerized to ensure environment consistency. A critical aspect of hosting Odoo is managing persistent storage; without a dedicated volume, uploaded documents, product images, and session data will be lost during deployments. Additionally, configuring a reliable SMTP server is essential for Odoo to handle automated emails, such as invoices and notifications. Railway simplifies this by managing the infrastructure, providing SSL-enabled endpoints, and allowing private networking between the app and the database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| odoo | `odoo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ODOO_SMTP_USER` | odoo | (secret) | - |
| `ODOO_DATABASE_USER` | odoo | (secret) | - |
| `ODOO_SMTP_PASSWORD` | odoo | (secret) | - |
| `ODOO_DATABASE_PASSWORD` | odoo | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/odoo`

**Category:** Other

[View on Railway →](https://railway.com/deploy/odoo-1)
