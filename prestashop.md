# Deploy PrestaShop on Railway

[Updated Mar 2026] PrestaShop 9 Production Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/prestashop)

## About

PrestaShop is a free, open-source e-commerce platform powering over 300,000 online stores worldwide. Built with PHP and Symfony, it offers a full-featured storefront, back office admin panel, product catalog, payment processing, and multi-language support out of the box.

Hosting PrestaShop requires a PHP-enabled web server (Apache or Nginx), a MySQL or MariaDB database, persistent file storage for product images, themes, and modules, and SSL certificates for secure checkout. The initial installation involves running a CLI or web-based installer, configuring database credentials, and setting up URL rewriting. This template automates the entire process — database provisioning, SSL termination, file persistence, and auto-installation — so your store is live in minutes with zero server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| PrestaShop | [ramadanomar/prestashop-railway-template](https://github.com/ramadanomar/prestashop-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `PORT` | PrestaShop | 80 | Internal container port for Railway prox |
| `DB_NAME` | PrestaShop | - | MySQL database name (auto-wired from MySQL service) |
| `DB_USER` | PrestaShop | (secret) | MySQL username (auto-wired from MySQL service) |
| `DB_PASSWD` | PrestaShop | - | MySQL password (auto-wired from MySQL service) |
| `DB_PREFIX` | PrestaShop | ps_ | Database table prefix |
| `DB_SERVER` | PrestaShop | - | MySQL host (auto-wired via Railway private network) |
| `PS_DOMAIN` | PrestaShop | - | Store domain (auto-set from Railway public domain) |
| `ADMIN_MAIL` | PrestaShop | - | Admin login email for the back office admin |
| `PS_COUNTRY` | PrestaShop | US | Default store country (ISO code, e.g. US, FR, DE) |
| `PS_DEV_MODE` | PrestaShop | 0 | - |
| `PS_LANGUAGE` | PrestaShop | en | Default store language (ISO code, e.g. en, fr, de) |
| `ADMIN_PASSWD` | PrestaShop | - | Password for the admin user |
| `PS_ENABLE_SSL` | PrestaShop | 1 | Enable HTTPS (Railway handles TLS termination) |
| `PS_FOLDER_ADMIN` | PrestaShop | admin-railway | Admin panel URL path (e.g. /admin-railway/) |
| `PS_INSTALL_AUTO` | PrestaShop | 1 | Auto-install PrestaShop on first boot |
| `PS_HANDLE_DYNAMIC_DOMAIN` | PrestaShop | 1 | Auto-update domain in database when domain changes |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/prestashop)
