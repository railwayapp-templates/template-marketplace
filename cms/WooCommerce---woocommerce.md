# Deploy WooCommerce on Railway

A one-click install of WooCommerce on WordPress.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/woocommerce)

## About

A one-click WooCommerce deployment with automated setup, optional test data generation, and persistent storage. This template includes WordPress, WooCommerce, WP-CLI, and the wc-smooth-generator plugin for creating realistic product data.

This template deploys a complete WooCommerce stack: a MySQL database, WordPress with WooCommerce pre-installed, and automated configuration. WordPress auto-installs on first deployment with WooCommerce activated and ready to use. The included wc-smooth-generator plugin can optionally create realistic test products, customers, and orders for development and demo purposes. Environment variables can be pre-configured to connect the database and skip manual setup wizards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WooCommerce | [epilocal/woocommerce-oneclick](https://github.com/epilocal/woocommerce-oneclick) | Web service |
| MariaDB | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | WooCommerce | 80 | WordPress port (80 by default) |
| `WORDPRESS_URL` | WooCommerce | - | WordPress URL (Railway reference variable) |
| `WORDPRESS_DB_HOST` | WooCommerce | - | WordPress database host (MariaDB reference variable) |
| `WORDPRESS_DB_NAME` | WooCommerce | - | WordPress database name (MariaDB reference variable) |
| `WORDPRESS_DB_USER` | WooCommerce | (secret) | WordPress database user (MariaDB reference variable) |
| `WORDPRESS_AUTH_KEY` | WooCommerce | (secret) | WordPress auth key (auto generated on first deploy) |
| `WORDPRESS_AUTH_SALT` | WooCommerce | - | WordPress auth salt (auto generated on first deploy) |
| `WORDPRESS_NONCE_KEY` | WooCommerce | - | WordPress nonce key (auto generated on first deploy) |
| `WOOCOMMERCE_CURRENCY` | WooCommerce | - | Default currency for WooCommerce store: USD, EUR, GBP, etc. (optional - can be configured later) |
| `WORDPRESS_ADMIN_USER` | WooCommerce | (secret) | WordPress admin user (username for logging into WP admin) |
| `WORDPRESS_NONCE_SALT` | WooCommerce | - | WordPress nonce salt (auto generated on first deploy) |
| `WORDPRESS_ADMIN_EMAIL` | WooCommerce | - | WordPress admin user's email address |
| `WORDPRESS_DB_PASSWORD` | WooCommerce | (secret) | WordPress database password (MariaDB reference variable) |
| `WORDPRESS_LOGGED_IN_KEY` | WooCommerce | - | WordPress logged in key (auto generated on first deploy) |
| `WORDPRESS_ADMIN_PASSWORD` | WooCommerce | (secret) | WordPress admin password (password for logging into WP admin) |
| `WORDPRESS_LOGGED_IN_SALT` | WooCommerce | - | WordPress logged in salt (auto generated on first deploy) |
| `WOOCOMMERCE_GENERATE_DATA` | WooCommerce | - | Populate WooCommerce store with test data (disabled by default, enter 'true' to enable) |
| `WOOCOMMERCE_STORE_COUNTRY` | WooCommerce | - | WooCommerce store country (and state for US): UK, CA, US:NY (optional - can be configured later) |
| `WORDPRESS_SECURE_AUTH_KEY` | WooCommerce | (secret) | WordPress secure auth key (auto generated on first deploy) |
| `WORDPRESS_SECURE_AUTH_SALT` | WooCommerce | - | WordPress secure auth salt (auto generated on first deploy) |
| `MARIADB_HOST` | MariaDB | - | MariaDB host (Railway reference variable) |
| `MARIADB_PORT` | MariaDB | 3306 | MariaDB port (3306 by default) |
| `MARIADB_USER` | MariaDB | (secret) | MariaDB user (railway by default) |
| `MARIADB_DATABASE` | MariaDB | railway | MariaDB name (railway by default) |
| `MARIADB_PASSWORD` | MariaDB | (secret) | MariaDB password (auto generated on first deploy) |
| `MARIADB_PUBLIC_URL` | MariaDB | - | MariaDB public URL (reference variable) |
| `MARIADB_PRIVATE_URL` | MariaDB | - | MariaDB private URL (reference variable) |
| `MARIADB_PUBLIC_HOST` | MariaDB | - | MariaDB public host (Railway reference variable) |
| `MARIADB_PUBLIC_PORT` | MariaDB | - | MariaDB public host (Railway reference variable) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password (auto generated on first deploy) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/woocommerce)
