# Deploy PrestaShop | Open-Source Shopify Alternative on Railway on Railway

Self host PrestaShop. Run your own online store worldwide.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prestashop-ecommerce)

## About

PrestaShop is a universal open-source e-commerce platform built on PHP and Symfony, powering over 300,000 online stores globally. Deploy PrestaShop on Railway to self-host your own fully-featured online store with zero transaction fees, complete control over your data, and no vendor lock-in.

This Railway template pre-configures PrestaShop with a MySQL database, automatic installation, SSL enforcement, persistent storage for product images and modules, and a hardened admin panel accessible at a custom URL path. Run PrestaShop on Railway and start selling in minutes.

PrestaShop is the leading open-source e-commerce solution in Europe and Latin America, generating over €22 billion in online sales in 2024. Built on Symfony 6.4 with a modular architecture, it provides everything needed to run a professional online store.

Key features:
- **Catalog management** — unlimited products, variants, combinations, and digital downloads
- **Multi-language & multi-currency** — 75+ languages, automatic tax calculation per country
- **SEO-optimized** — clean URLs, meta tags, sitemaps, structured data markup
- **Module ecosystem** — 5,000+ modules for payments, shipping, marketing, and CRM
- **Theme marketplace** — responsive themes with drag-and-drop customization
- **B2B support** — customer groups, tiered pricing, quantity discounts, quote requests

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Prestashop | `prestashop/prestashop:8-apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `PORT` | Prestashop | 8080 | Apache listen port |
| `DB_NAME` | Prestashop | - | Database name |
| `DB_USER` | Prestashop | (secret) | MySQL username |
| `DB_PASSWD` | Prestashop | - | MySQL password |
| `DB_PREFIX` | Prestashop | ps_ | Table prefix |
| `DB_SERVER` | Prestashop | - | MySQL host |
| `PS_DOMAIN` | Prestashop | - | Store public domain |
| `ADMIN_MAIL` | Prestashop | - | Admin login email |
| `PS_COUNTRY` | Prestashop | US | Default country |
| `PS_DEV_MODE` | Prestashop | 0 | Disable dev mode |
| `PS_LANGUAGE` | Prestashop | en | Default language |
| `ADMIN_PASSWD` | Prestashop | - | Admin password (first boot only) |
| `PS_DEMO_MODE` | Prestashop | 0 | Disable demo mode |
| `PS_ENABLE_SSL` | Prestashop | 1 | Force HTTPS URLs |
| `PS_FOLDER_ADMIN` | Prestashop | admin-railway | Admin panel URL path |
| `PS_INSTALL_AUTO` | Prestashop | 1 | Auto-install on first boot |
| `PS_HANDLE_DYNAMIC_DOMAIN` | Prestashop | 1 | Handle domain changes |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'a2dismod mpm_event 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf; sed -i "s/:80/:${PORT}/g" /etc/apache2/sites-available/000-default.conf; sed -i "/<VirtualHost/a SetEnvIf X-Forwarded-Proto https HTTPS=on" /etc/apache2/sites-available/000-default.conf; exec /tmp/docker_run.sh apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/prestashop-ecommerce)
