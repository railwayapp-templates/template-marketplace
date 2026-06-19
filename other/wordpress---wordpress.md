# Deploy wordpress on Railway

WordPress Template Configurado

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress)

## About

WordPress is the world's most popular open-source content management system (CMS), powering everything from personal blogs to major corporate websites. Built on PHP and MySQL, it features an intuitive dashboard, a vast ecosystem of plugins and themes, and robust tools to design, publish, and manage digital content seamlessly.

Hosting and deploying WordPress typically involves configuring a web server (like Apache or Nginx) to process PHP code, alongside a relational database (like MySQL or MariaDB) to store your site's content, users, and settings. In traditional environments, this requires complex manual server setup, SSL configuration, and ongoing maintenance. When deploying on Railway, this entire architecture is containerized using Docker. Railway provisions both the application server and the database automatically, handles internal networking between them, secures the connection with automatic SSL certificates, and manages persistent storage so your media uploads and database contents remain safe through restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| wordpress | `wordpress:6.7-php8.2-apache` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | wordpress |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | wordpress | 80 |
| `WORDPRESS_DEBUG` | wordpress | 0 |
| `WORDPRESS_DB_NAME` | wordpress | wordpress |
| `WORDPRESS_DB_USER` | wordpress | (secret) |
| `WORDPRESS_DB_PASSWORD` | wordpress | (secret) |

## Configuration

- **Start command:** `--default-authentication-plugin=mysql_native_password`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.* && docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wordpress)
