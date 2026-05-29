# Deploy jubilant-benevolence on Railway

Deploy and Host jubilant-benevolence with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jubilant-benevolence)

## About

A WordPress working website that fits

It uses PHP Wordpress and MariaDB to create a working WordPress

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
| `WORDPRESS_CONFIG_EXTRA` | Primary | define('WP_ALLOW_MULTISITE',true); |
| `WORDPRESS_SECURE_AUTH_KEY` | Primary | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | wordpress |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Start command:** `/bin/bash -c "a2dismod mpm_event && a2dismod mpm_worker && a2enmod mpm_prefork && a2enmod rewrite && echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && sed -i 's|AllowOverride None|AllowOverride All|g' /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && { echo 'RewriteEngine On'; echo 'RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]'; echo 'RewriteBase /'; echo 'RewriteRule ^index\.php\$ - [L]'; echo 'RewriteRule ^([_0-9a-zA-Z-]+/)?wp-admin\$ \$1wp-admin/ [R=301,L]'; echo 'RewriteCond %{REQUEST_FILENAME} -f [OR]'; echo 'RewriteCond %{REQUEST_FILENAME} -d'; echo 'RewriteRule ^ - [L]'; echo 'RewriteRule ^([_0-9a-zA-Z-]+/)?(wp-(content|admin|includes).*) \$2 [L]'; echo 'RewriteRule ^([_0-9a-zA-Z-]+/)?(.*\\.php)\$ \$2 [L]'; echo 'RewriteRule . index.php [L]'; } > /var/www/html/.htaccess && chown www-data:www-data /var/www/html/.htaccess && exec docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jubilant-benevolence)
