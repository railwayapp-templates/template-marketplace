# Deploy Odoo19 on Railway

Imagen Docker Official clonada del repo original

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo19)

## About

Odoo19 is a comprehensive open-source ERP and CRM platform that integrates business management applications including sales, inventory, accounting, HR, project management, and more. This template provides a production-ready deployment of Odoo19 with PostgreSQL database.

Deploying Odoo19 involves setting up a Python-based web application with PostgreSQL as the database backend. This template includes all necessary configurations for running Odoo in a containerized environment with proper volume persistence for data storage. The deployment automatically handles database initialization, module installation, and provides a secure setup with environment-based configuration management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Odoo19docker | [ChrizcodeR/Odoo19docker](https://github.com/ChrizcodeR/Odoo19docker) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LIST_DB` | Odoo19docker | True | - |
| `LOG_LEVEL` | Odoo19docker | info | - |
| `ADMIN_PASSWD` | Odoo19docker | tu constraseña principal | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/odoo19)
