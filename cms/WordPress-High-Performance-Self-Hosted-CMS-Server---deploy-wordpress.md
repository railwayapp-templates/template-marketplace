# Deploy WordPress | High Performance Self-Hosted CMS Server on Railway

One-click self-host WordPress with MariaDB | Blogs, stores, and portfolios

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-wordpress)

## About

Deploy a fully self-hosted WordPress instance on Railway in one click — complete with a MariaDB database, persistent volumes, and auto-generated security keys. No manual server setup, no LAMP stack configuration, no SSL wrangling.

WordPress is the world's most popular open-source CMS, powering over 40% of all websites. This Railway template runs the official `wordpress` Docker image alongside `mariadb` (the `mariadb` Docker image), connected over Railway's private network with persistent storage for both the web root and database.

**What you get:**
- WordPress on Apache (MPM Prefork, optimised for PHP compatibility)
- MariaDB with auto-generated credentials
- Persistent volumes: `/var/www/html` (WordPress files) and `/var/lib/mysql` (database)
- All 8 WordPress security salts and keys pre-generated
- `WP_HOME` and `WP_SITEURL` wired to your Railway public domain automatically

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:latest` | Database |
| WordPress | `wordpress` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_HOST` | mariadb | - | Internal hostname for MariaDB service |
| `MARIADB_PORT` | mariadb | 3306 | Default MariaDB server port |
| `MARIADB_USER` | mariadb | (secret) | Application database username |
| `MARIADB_DATABASE` | mariadb | railway | Default database created on startup |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated password for MariaDB user |
| `MARIADB_PUBLIC_URL` | mariadb | - | External MariaDB connection string |
| `MARIADB_PRIVATE_URL` | mariadb | - | Internal MariaDB connection string |
| `MARIADB_PUBLIC_HOST` | mariadb | - | Public TCP proxy hostname |
| `MARIADB_PUBLIC_PORT` | mariadb | - | Public TCP proxy port |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Root admin password for MariaDB |
| `PORT` | WordPress | 80 | HTTP server listening port |
| `WORDPRESS_DB_HOST` | WordPress | - | MariaDB host and port connection |
| `WORDPRESS_DB_NAME` | WordPress | - | Database name used by WordPress |
| `WORDPRESS_DB_USER` | WordPress | (secret) | Username for WordPress database login |
| `WORDPRESS_AUTH_KEY` | WordPress | (secret) | WordPress authentication security key |
| `WORDPRESS_AUTH_SALT` | WordPress | - | Salt for authentication cookies |
| `WORDPRESS_NONCE_KEY` | WordPress | - | Key for nonce security tokens |
| `WORDPRESS_NONCE_SALT` | WordPress | - | Salt for nonce security tokens |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | Password for WordPress database user |
| `WORDPRESS_CONFIG_EXTRA` | WordPress | - | Extra WordPress runtime configuration values |
| `WORDPRESS_LOGGED_IN_KEY` | WordPress | - | Key for logged-in user cookies |
| `WORDPRESS_LOGGED_IN_SALT` | WordPress | - | Salt for logged-in user cookies |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress | (secret) | Secure authentication cookie key |
| `WORDPRESS_SECURE_AUTH_SALT` | WordPress | - | Salt for secure authentication cookies |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'set -eu; a2dismod mpm_event mpm_worker || true; a2enmod mpm_prefork || true; exec docker-entrypoint.sh "$@"' -- apache2-foreground`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/deploy-wordpress)
