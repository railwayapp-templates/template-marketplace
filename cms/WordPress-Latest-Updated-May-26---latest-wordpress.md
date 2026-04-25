# Deploy WordPress Latest [Updated May '26] on Railway

WordPress [May '26] (Create Blogs & Websites Effortlessly) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/latest-wordpress)

## About

WordPress is the world’s most popular open-source content management system (CMS), powering over 43% of all websites on the internet. It’s the go-to platform for bloggers, businesses, and developers who want to build scalable, beautiful, and high-performing websites without coding everything from scratch. With its massive plugin ecosystem and user-friendly dashboard, WordPress allows anyone to create anything from a simple blog to a complex eCommerce site.

Self-hosting WordPress means you have complete control over your website, data, plugins, and customizations. You’re not tied to any third-party host or restrictions, which gives you full flexibility and privacy.

When hosting WordPress on **Railway**, you get the perfect combination of simplicity and power. Railway provides a modern cloud deployment experience where you can set up your WordPress site with just one click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `wordpress` | Web service |
| MariaDB | `mariadb` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Primary | 80 |
| `WORDPRESS_DB_USER` | Primary | (secret) |
| `WORDPRESS_AUTH_KEY` | Primary | (secret) |
| `WORDPRESS_DB_PASSWORD` | Primary | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | Primary | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | railway |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Start command:** `/bin/bash -c "echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/latest-wordpress)
