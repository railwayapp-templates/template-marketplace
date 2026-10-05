# Deploy WordPress | Installs on First Visit, Private Database, Pinned on Railway

Self-host WordPress on Railway — installs on first visit, private MariaDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-or-installs-on-first-visit-pri)

## About

WordPress with MariaDB, pinned, and installing on the first visit: open the domain and you land on WordPress's own setup screen. The database is reachable only inside the project.

Nothing to fill in. Open the domain, pick a language, and create the admin account.

Two services:

- **WordPress** `7.1.2` on PHP 8.4 and Apache, with a volume for core files, themes, plugins and uploads (public)
- **MariaDB** `11.4` LTS, on its own volume, on the private network only

WordPress generates its own security keys and salts on first start and keeps them in `wp-config.php` on the volume, so they survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WordPress | `wordpress:7.1.2-php8.4-apache` | Web service |
| MariaDB | `mariadb:11.4.13` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | WordPress | 80 |
| `WORDPRESS_DB_USER` | WordPress | (secret) |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | wordpress |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "a2dismod -q mpm_event mpm_worker; a2enmod -q mpm_prefork; printf 'upload_max_filesize=64M\npost_max_size=64M\n' > /usr/local/etc/php/conf.d/uploads.ini; exec docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-or-installs-on-first-visit-pri)
