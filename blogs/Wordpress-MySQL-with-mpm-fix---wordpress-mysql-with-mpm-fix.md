# Deploy Wordpress + MySQL with mpm fix on Railway

This is a simple Wordpress template with mpm fix and mysql image.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-mysql-with-mpm-fix)

## About

This is a simple Wordpress template with mpm fix and mysql image. All salt secrets are generated. It uses the latest image with connected MySQL Database and a persistent volume.

This is a pure Wordpress deployment. No additional plugins, no themes. After deployment, a simplified installer will welcome you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wordpress | `wordpress` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `WORDPRESS_DB_USER` | wordpress | (secret) | - |
| `WORDPRESS_AUTH_KEY` | wordpress | (secret) | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_AUTH_SALT` | wordpress | - | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_NONCE_KEY` | wordpress | - | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_NONCE_SALT` | wordpress | - | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_DB_PASSWORD` | wordpress | (secret) | - |
| `WORDPRESS_LOGGED_IN_KEY` | wordpress | - | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_LOGGED_IN_SALT` | wordpress | - | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_SECURE_AUTH_KEY` | wordpress | (secret) | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `WORDPRESS_SECURE_AUTH_SALT` | wordpress | - | Change these to different unique phrases! You can generate these using the WordPress.org secret-key service: https://api.wordpress.org/secret-key/1.1/salt/ |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | wordpress | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | wordpress | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "sleep 3 && a2dismod mpm_worker && a2dismod  mpm_event  && a2enmod mpm_prefork && docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/wordpress-mysql-with-mpm-fix)
