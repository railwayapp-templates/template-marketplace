# Deploy Wordpress on Railway

Self host Latest Wordpress with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-3)

## About

WordPress is the world's most popular open-source content management system (CMS) for building websites, blogs, business sites, and online stores. With thousands of themes and plugins, including WooCommerce, WordPress enables users to create highly customizable websites without extensive programming knowledge while remaining flexible enough for enterprise-scale deployments.

Hosting WordPress on Railway provides a managed environment for running your website without maintaining servers or web infrastructure. This template deploys the official WordPress container alongside a MariaDB database for persistent content storage. A Railway Volume stores uploaded media, themes, plugins, and other WordPress content so it persists across deployments. Railway automatically provisions HTTPS, public networking, and secure service-to-service communication between WordPress and MariaDB. As your website grows, Railway makes it easy to scale resources while continuing to manage infrastructure, networking, and deployment for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb` | Database |
| wordpress | `wordpress` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | railway |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | wordpress | 80 |
| `WORDPRESS_DB_USER` | wordpress | (secret) |
| `WORDPRESS_AUTH_KEY` | wordpress | (secret) |
| `WORDPRESS_DB_PASSWORD` | wordpress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | wordpress | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && docker-entrypoint.sh apache2-foreground"`
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-3)
