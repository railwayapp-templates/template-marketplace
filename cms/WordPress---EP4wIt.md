# Deploy WordPress on Railway

A content management system (CMS) written in PHP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/EP4wIt)

## About

WordPress is a content management system (CMS) written in PHP. With a GNU Public License, an open-source software license that provides legal protection for the CMS and its derivative work, such as themes and plugins. WordPress empowers you to effortlessly create, manage, and customize stunning websites, making it the ultimate content management solution.

![WordPress - Content management system (CMS)](https://sixsixninenine-co-uk.s3.amazonaws.com/wp-content/uploads/2015/12/wordpress-logo-banner.jpg)

Hosting WordPress means running a PHP-based content management system that handles dynamic content generation, user authentication, and database-driven website functionality. The application requires MySQL or MariaDB database connections, PHP runtime configuration, file upload management, and plugin/theme installation coordination. Production deployment involves managing database migrations, handling media file storage, configuring caching systems, and maintaining security updates across core WordPress, themes, and plugins. Railway simplifies WordPress deployment by providing integrated MySQL database hosting, managing PHP environment configuration, handling file storage persistence, and coordinating the web server setup with automatic database connectivity.

![WordPress - Screenshot](https://www.elegantthemes.com/blog/wp-content/uploads/2015/01/The-Evolution-of-UI-vs.-UX-in-WordPress-Web-Design-A-Short-History-of-the-WordPress-UI-and-UX.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb` | Database |
| Primary | `wordpress` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_URL` | MariaDB | - | Database url - default: mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_HOST}}:${{MARIADB_PORT}}/${{MARIADB_DATABASE}} |
| `MARIADB_HOST` | MariaDB | - | Database host - default: ${{RAILWAY_TCP_PROXY_DOMAIN}} |
| `MARIADB_PORT` | MariaDB | - | Database port - default: ${{RAILWAY_TCP_PROXY_PORT}} |
| `MARIADB_USER` | MariaDB | (secret) | Database user - default: railway |
| `MARIADB_DATABASE` | MariaDB | railway | Database name - default: railway |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Database password - default: ${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}} |
| `MARIADB_PRIVATE_URL` | MariaDB | - | Database url (private) - default: mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_PRIVATE_HOST}}:${{MARIADB_PRIVATE_PORT}}/${{MARIADB_DATABASE}} |
| `MARIADB_PRIVATE_HOST` | MariaDB | - | Database host (private) - default: ${{RAILWAY_PRIVATE_DOMAIN}} |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 | Database port (private) - default: 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Database root password - default: ${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}} |
| `PORT` | Primary | 80 | The HTTP port the application runs on. (temporarily unchangeable) |
| `WORDPRESS_DB_HOST` | Primary | - | Database host - default: ${{MariaDB.MARIADB_PRIVATE_HOST}}:${{MariaDB.MARIADB_PRIVATE_PORT}} |
| `WORDPRESS_DB_NAME` | Primary | - | Database type - default: ${{MariaDB.MARIADB_DATABASE}} |
| `WORDPRESS_DB_USER` | Primary | (secret) | Database user - default: ${{MariaDB.MARIADB_USER}} |
| `WORDPRESS_AUTH_KEY` | Primary | (secret) | WordPress auth key - default: ${{secret(32)}} |
| `WORDPRESS_AUTH_SALT` | Primary | - | WordPress auth salt - default: ${{secret(32)}} |
| `WORDPRESS_NONCE_KEY` | Primary | - | WordPress nonce key - default: ${{secret(32)}} |
| `WORDPRESS_NONCE_SALT` | Primary | - | WordPress nonce salt - default: ${{secret(32)}} |
| `WORDPRESS_DB_PASSWORD` | Primary | (secret) | Database password - default: ${{MariaDB.MARIADB_PASSWORD}} |
| `WORDPRESS_CONFIG_EXTRA` | Primary | - | Extra configurations - default: define('DOMAIN_CURRENT_SITE','${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_HOME','https://${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_SITEURL','https://${{RAILWAY_PUBLIC_DOMAIN}}'); |
| `WORDPRESS_LOGGED_IN_KEY` | Primary | - | WordPress logged in key - default: ${{secret(32)}} |
| `WORDPRESS_LOGGED_IN_SALT` | Primary | - | WordPress logged in salt - default: ${{secret(32)}} |
| `WORDPRESS_SECURE_AUTH_KEY` | Primary | (secret) | WordPress secure auth key - default: ${{secret(32)}} |
| `WORDPRESS_SECURE_AUTH_SALT` | Primary | - | WordPress secure auth salt - default: ${{secret(32)}} |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && docker-entrypoint.sh a2dismod mpm_event && a2dismod mpm_worker && a2enmod mpm_prefork && apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/EP4wIt)
