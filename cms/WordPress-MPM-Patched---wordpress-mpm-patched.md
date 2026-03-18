# Deploy WordPress (MPM Patched) on Railway

Zero Config WordPress Template (MPM Patched)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-mpm-patched)

## About

Deploy WordPress, a web content management system, with zero configurations.

This template is heavily inspired by existing WordPress templates, with the MPM module issue being fixed. This template acts as a wrapper to disable additional MPM modules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WordPress | `wordpress:latest` | Web service |
| MariaDB | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | WordPress | 80 | WordPress port (80 by default) |
| `WORDPRESS_DB_HOST` | WordPress | - | WordPress database host (MariaDB reference variable) |
| `WORDPRESS_DB_NAME` | WordPress | - | WordPress database name (MariaDB reference variable) |
| `WORDPRESS_DB_USER` | WordPress | (secret) | WordPress database user (MariaDB reference variable) |
| `WORDPRESS_AUTH_KEY` | WordPress | (secret) | WordPress auth key (auto generated the first time it is deployed) |
| `WORDPRESS_AUTH_SALT` | WordPress | - | WordPress auth salt (auto generated the first time it is deployed) |
| `WORDPRESS_NONCE_KEY` | WordPress | - | WordPress nonce key (auto generated the first time it is deployed) |
| `WORDPRESS_NONCE_SALT` | WordPress | - | WordPress nonce salt (auto generated the first time it is deployed) |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | WordPress database password (MariaDB reference variable) |
| `WORDPRESS_CONFIG_EXTRA` | WordPress | - | WordPress extra configurations |
| `WORDPRESS_LOGGED_IN_KEY` | WordPress | - | WordPress logged in key (auto generated the first time it is deployed) |
| `WORDPRESS_LOGGED_IN_SALT` | WordPress | - | WordPress logged in salt (auto generated the first time it is deployed) |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress | (secret) | WordPress secure auth key (auto generated the first time it is deployed) |
| `WORDPRESS_SECURE_AUTH_SALT` | WordPress | - | WordPress secure auth salt (auto generated the first time it is deployed) |
| `MARIADB_HOST` | MariaDB | - | MariaDB host (reference variable) |
| `MARIADB_PORT` | MariaDB | 3306 | MariaDB port (3306 by default) |
| `MARIADB_USER` | MariaDB | (secret) | MariaDB user (railway by default) |
| `MARIADB_DATABASE` | MariaDB | railway | MariaDB name (railway by default) |
| `MARIADB_PASSWORD` | MariaDB | (secret) | MariaDB password (auto generated the first time it is deployed) |
| `MARIADB_PUBLIC_URL` | MariaDB | - | MariaDB public url (reference variable) |
| `MARIADB_PRIVATE_URL` | MariaDB | - | MariaDB private url (reference variable) |
| `MARIADB_PUBLIC_HOST` | MariaDB | - | MariaDB public host (reference variable) |
| `MARIADB_PUBLIC_PORT` | MariaDB | - | MariaDB public host (reference variable) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password (auto generated the first time it is deployed) |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; a2dismod mpm_event mpm_worker || true; a2enmod mpm_prefork || true; exec docker-entrypoint.sh "$@"' -- apache2-foreground`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-mpm-patched)
