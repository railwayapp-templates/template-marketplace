# Deploy WordPress + MariaDB + phpMyAdmin (Protected) on Railway

WordPress MariaDB and a password-protected phpMyAdmin gateway on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-mariadb-phpmyadmin-protected)

## About

WordPress is the world’s most popular open-source CMS for building websites, blogs, business sites, landing pages, and content-driven applications. This template deploys WordPress with MariaDB for persistent storage and phpMyAdmin for database management, while protecting phpMyAdmin behind a dedicated Basic Auth gateway for a safer hosted setup.

Hosting this stack on Railway means running four connected services: WordPress for the public website, MariaDB for persistent database storage, phpMyAdmin for internal database administration, and a protected gateway service for secure browser access to phpMyAdmin. This template is designed to keep WordPress public, keep MariaDB private, keep phpMyAdmin internal, and expose phpMyAdmin only through a password-protected gateway. It also includes the startup adjustments needed to avoid Apache MPM conflicts that can happen with WordPress and phpMyAdmin containers on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| phpMyAdmin Gateway | [omryatia/caddy-phpmyadmin-gateway](https://github.com/omryatia/caddy-phpmyadmin-gateway) | Web service |
| phpMyAdmin | [omryatia/phpmyadmin-railway](https://github.com/omryatia/phpmyadmin-railway) | Worker |
| MariaDB | `mariadb:lts` | Database |
| WordPress | `wordpress` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BASIC_AUTH_USER` | phpMyAdmin Gateway | (secret) |
| `BASIC_AUTH_PASSWORD` | phpMyAdmin Gateway | (secret) |
| `PMA_PORT` | phpMyAdmin | 3306 |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | WordPress | 80 |
| `WORDPRESS_DB_USER` | WordPress | (secret) |
| `WORDPRESS_AUTH_KEY` | WordPress | (secret) |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`
- **Start command:** `bash -c "grep -q 'ServerName localhost' /etc/apache2/apache2.conf || echo 'ServerName localhost' >> /etc/apache2/apache2.conf; a2dismod mpm_event || true; a2dismod mpm_worker || true; a2enmod mpm_prefork; exec docker-entrypoint.sh apache2-foreground"`
- **Volume:** `/var/www/html`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wordpress-mariadb-phpmyadmin-protected)
