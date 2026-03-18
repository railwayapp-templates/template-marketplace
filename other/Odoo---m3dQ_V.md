# Deploy Odoo on Railway

All your business on one platform. Simple, efficient, yet affordable!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/m3dQ_V)

## About

Odoo is a suite of business management applications that includes modules for accounting, inventory, sales, project management, manufacturing, and more. It provides an integrated platform for managing various business processes through web-based applications.

Odoo runs as a Python WSGI application with PostgreSQL backend, requiring worker process configuration, connection pooling, and reverse proxy setup for production. Each module can extend the database schema, creating dependency and migration challenges. Key concerns include worker tuning for scaling, managing file attachment growth and database bloat, PostgreSQL optimization and caching, lengthy database migrations during deployments, and monitoring application logs and database metrics. The modular architecture allows business users to install apps that modify your database schema and application behavior.

![Odoo Logo](https://odoocdn.com/openerp_website/static/src/img/assets/svg/odoo_logo.svg)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Odoo | `odoo:19.0` | Web service |

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
| `ODOO_EMAIL_FROM` | Odoo | - | Email from address |
| `ODOO_DATABASE_HOST` | Odoo | - | Private database host |
| `ODOO_DATABASE_NAME` | Odoo | - | Database name |
| `ODOO_DATABASE_PORT` | Odoo | - | Database port |
| `ODOO_DATABASE_USER` | Odoo | (secret) | Database username |
| `ODOO_SMTP_PASSWORD` | Odoo | (secret) | SMTP password |
| `ODOO_SMTP_PORT_NUMBER` | Odoo | - | SMTP port number |
| `ODOO_DATABASE_PASSWORD` | Odoo | (secret) | Database password |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec odoo --http-port=\"${PORT}\" --init=all --without-demo=True --proxy-mode --db_host=\"${ODOO_DATABASE_HOST}\" --db_port=\"${ODOO_DATABASE_PORT}\" --db_user=\"${ODOO_DATABASE_USER}\" --db_password=\"${ODOO_DATABASE_PASSWORD}\" --database=\"${ODOO_DATABASE_NAME}\" --smtp=\"${ODOO_SMTP_HOST}\" --smtp-port=\"${ODOO_SMTP_PORT_NUMBER}\" --smtp-user=\"${ODOO_SMTP_USER}\" --smtp-password=\"${ODOO_SMTP_PASSWORD}\" --email-from=\"${ODOO_EMAIL_FROM}\" 2>&1"`
- **Healthcheck:** `/web/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`

**Category:** Other

[View on Railway →](https://railway.com/deploy/m3dQ_V)
