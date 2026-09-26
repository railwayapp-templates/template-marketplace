# Deploy Dolibarr on Railway

Dolibarr 24: open-source ERP and CRM for invoices, stock and projects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dolibarr)

## About

Dolibarr is an open-source ERP and CRM for small and medium businesses. It covers customers and suppliers, quotes, orders, invoices, payments, products and stock, projects, expenses, HR and accounting, all in modules you switch on as you need them. It is a lighter, simpler alternative to Odoo.

This template runs the official `dolibarr/dolibarr:24.0.0` image with MariaDB 11.8 as a second service. The installer runs automatically on first boot: it creates the database, the admin account from the variables, and your company with the third-party and invoicing modules enabled. Uploaded documents and generated PDFs are stored on a Railway volume, and the database on MariaDB's volume, so both survive redeploys. The start command fixes Apache's duplicate MPM modules, which otherwise stops Apache from starting on Railway. Custom modules in `htdocs/custom` are not persisted. Both services fit comfortably on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dolibarr | `dolibarr/dolibarr:24.0.0` | Web service |
| mariadb | `mariadb:11.8.9` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | dolibarr | 80 |
| `DOLI_CRON` | dolibarr | 0 |
| `DOLI_PROD` | dolibarr | 1 |
| `DOLI_DB_TYPE` | dolibarr | mysqli |
| `DOLI_DB_USER` | dolibarr | (secret) |
| `DOLI_INIT_DEMO` | dolibarr | 0 |
| `DOLI_ADMIN_LOGIN` | dolibarr | (secret) |
| `DOLI_DB_PASSWORD` | dolibarr | (secret) |
| `DOLI_COMPANY_NAME` | dolibarr | My Company |
| `DOLI_DB_HOST_PORT` | dolibarr | 3306 |
| `DOLI_INSTALL_AUTO` | dolibarr | 1 |
| `DOLI_ADMIN_PASSWORD` | dolibarr | (secret) |
| `DOLI_ENABLE_MODULES` | dolibarr | Societe,Facture,Api |
| `PHP_INI_DATE_TIMEZONE` | dolibarr | UTC |
| `PHP_INI_POST_MAX_SIZE` | dolibarr | 25M |
| `DOLI_COMPANY_COUNTRYCODE` | dolibarr | US |
| `PHP_INI_UPLOAD_MAX_FILESIZE` | dolibarr | 20M |
| `MARIADB_USER` | mariadb | (secret) |
| `MARIADB_DATABASE` | mariadb | dolibarr |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |

## Configuration

- **Start command:** `sh -c 'rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.*; exec docker-run.sh apache2-foreground'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/documents`
- **Start command:** `docker-entrypoint.sh mariadbd --bind-address=::`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dolibarr)
