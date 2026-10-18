# Deploy Dolibarr [up-to-date 2026] on Railway

Dolibarr ERP & CRM with private MariaDB, persistent files and auto setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dolibarr-up-to-date-2026)

## About

Dolibarr is an open-source ERP and CRM for small businesses, associations, and independent professionals. Manage customers, suppliers, quotes, invoices, orders, products, inventory, bank accounts, and projects in one web application. Enable only the modules you need and extend your installation with compatible community or commercial add-ons.

This community template deploys Dolibarr 24.0.2 with PHP and Apache, plus a private MariaDB 11.4 LTS database. It uses the official Dolibarr Docker filesystem with a small Railway-specific startup layer. Automatic setup initializes an empty database without demo data. Two volumes preserve the SQL database, documents, attachments, custom modules, sessions, and permanent instance key. Each deployment generates unique administrator and database secrets. A public HTTPS domain and database-aware deployment health check are configured automatically. The optional in-container scheduler needs no additional service. You remain responsible for backups, upgrades, email delivery, and application configuration.

Docker build, automatic installation, backup contents, and persistence after container recreation have passed the repository CI. A live Railway deployment and independent restore still need validation; see [validation status](https://github.com/hallcyn/dolibarr/blob/main/VALIDATION.md).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.4` | Database |
| Dolibarr | [hallcyn/dolibarr](https://github.com/hallcyn/dolibarr) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | MariaDB | (secret) | Restricted application database user; no root privileges. |
| `MARIADB_DATABASE` | MariaDB | dolibarr | Database created on first start. |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Generated application database password, referenced by Dolibarr. Never regenerate for an existing database. |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Independent generated database root password. Keep private; not used by Dolibarr. |
| `PORT` | Dolibarr | 80 | HTTP port; keep 80 and use target port 80 for the Railway domain. |
| `DOLI_CRON` | Dolibarr | 0 | Keep 0 so the web server starts. Use DOLI_RAILWAY_CRON for scheduled jobs. |
| `DOLI_PROD` | Dolibarr | 1 | Production mode. Keep 1. |
| `DOLI_DB_HOST` | Dolibarr | - | Private MariaDB DNS; keep both services in the same project environment. |
| `DOLI_DB_NAME` | Dolibarr | - | Database name from the MariaDB service. |
| `DOLI_DB_USER` | Dolibarr | (secret) | Restricted application database account. |
| `DOLI_CRON_KEY` | Dolibarr | - | Generated scheduler key. Also configure it in the Dolibarr Scheduled Jobs module. |
| `DOLI_URL_ROOT` | Dolibarr | - | Public HTTPS URL. Replace with your full https:// custom domain URL when needed. |
| `DOLI_CRON_USER` | Dolibarr | (secret) | firstadmin selects an active administrator. Prefer a dedicated user for scheduled jobs. |
| `DOLI_INIT_DEMO` | Dolibarr | 0 | Keep 0 for a clean installation without demo data. |
| `DOLI_ADMIN_LOGIN` | Dolibarr | (secret) | Initial administrator login. Change before the first deployment if needed. |
| `DOLI_DB_PASSWORD` | Dolibarr | (secret) | Reference to the generated MariaDB password. Do not generate a separate value. |
| `DOLI_COMPANY_NAME` | Dolibarr | Mon entreprise | Company name on first installation; change later inside Dolibarr. |
| `DOLI_DB_HOST_PORT` | Dolibarr | 3306 | Private MariaDB port. Keep 3306. |
| `DOLI_INSTALL_AUTO` | Dolibarr | 1 | Automatically initialize an empty database. Keep 1. |
| `DOLI_RAILWAY_CRON` | Dolibarr | 0 | Optional scheduler. Set 1 after enabling Scheduled Jobs inside Dolibarr. |
| `DOLI_ADMIN_PASSWORD` | Dolibarr | (secret) | Generated initial admin password. Read this variable to sign in; change later in Dolibarr. |
| `PHP_INI_MEMORY_LIMIT` | Dolibarr | 256M | PHP memory per request; not the Railway service memory limit. |
| `PHP_INI_DATE_TIMEZONE` | Dolibarr | Europe/Paris | PHP timezone using an IANA identifier, such as Europe/Paris. |
| `PHP_INI_POST_MAX_SIZE` | Dolibarr | 24M | Maximum POST body size; must exceed the upload file limit. |
| `DOLI_INSTANCE_UNIQUE_ID` | Dolibarr | - | Permanent encryption key. Back it up and never regenerate for an existing installation. |
| `DOLI_COMPANY_COUNTRYCODE` | Dolibarr | FR | Two-letter company country code; FR for France. |
| `PHP_INI_UPLOAD_MAX_FILESIZE` | Dolibarr | 20M | Maximum size per uploaded attachment. |

## Configuration

- **Start command:** `docker-entrypoint.sh mariadbd --bind-address=0.0.0.0,:: --innodb-buffer-pool-size=128M --max-connections=30 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/railway-health.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dolibarr-up-to-date-2026)
