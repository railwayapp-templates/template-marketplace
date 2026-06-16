# Deploy WordPress Turbo 🚀🔥 on Railway

WordPress + MariaDB with RAM & upload limits already tuned. 1-click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-turbo-mariadb)

## About

WordPress Turbo + MariaDB runs the official `wordpress:latest` image with RAM and upload limits already tuned through environment variables, so you skip PHP's low default caps. It ships connected to MariaDB and fixes the Apache "more than one MPM loaded" error out of the box.

This template deploys the official WordPress image alongside a MariaDB database, fully wired together. A start command runs on boot to fix the Apache MPM conflict and generate a PHP ini from your variables (memory_limit, upload_max_filesize, post_max_size, and more). You control every limit from the Railway dashboard and just redeploy, with no image rebuild and no editing files. The database password is generated automatically on each deployment, and the services talk over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wordpress-turbo | `wordpress:latest` | Web service |
| MariaDB | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | wordpress-turbo | 80 |
| `PHP_MEMORY_LIMIT` | wordpress-turbo | 2048M |
| `PHP_POST_MAX_SIZE` | wordpress-turbo | 512M |
| `WORDPRESS_DB_USER` | wordpress-turbo | (secret) |
| `PHP_MAX_INPUT_TIME` | wordpress-turbo | 300 |
| `PHP_MAX_INPUT_VARS` | wordpress-turbo | 3000 |
| `WORDPRESS_DB_PASSWORD` | wordpress-turbo | (secret) |
| `PHP_MAX_EXECUTION_TIME` | wordpress-turbo | 300 |
| `WORDPRESS_TABLE_PREFIX` | wordpress-turbo | wp_ |
| `PHP_UPLOAD_MAX_FILESIZE` | wordpress-turbo | 512M |
| `MARIADB_PORT` | MariaDB | 3306 |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | wordpress |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Start command:** `bash -c 'rm -f /etc/apache2/mods-enabled/mpm_*.load /etc/apache2/mods-enabled/mpm_*.conf; ln -sf /etc/apache2/mods-available/mpm_prefork.load /etc/apache2/mods-enabled/mpm_prefork.load; ln -sf /etc/apache2/mods-available/mpm_prefork.conf /etc/apache2/mods-enabled/mpm_prefork.conf; { echo "memory_limit=${PHP_MEMORY_LIMIT:-256M}"; echo "upload_max_filesize=${PHP_UPLOAD_MAX_FILESIZE:-64M}"; echo "post_max_size=${PHP_POST_MAX_SIZE:-64M}"; echo "max_execution_time=${PHP_MAX_EXECUTION_TIME:-300}"; echo "max_input_time=${PHP_MAX_INPUT_TIME:-300}"; echo "max_input_vars=${PHP_MAX_INPUT_VARS:-3000}"; } > /usr/local/etc/php/conf.d/zz-railway-tunables.ini; exec docker-entrypoint.sh apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-turbo-mariadb)
