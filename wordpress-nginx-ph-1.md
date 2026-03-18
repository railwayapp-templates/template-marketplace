# Deploy Wordpress Nginx PHP-FPM Redis on Railway

Production-grade Wordpress on PHP-FPM, mySQL & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wordpress-nginx-ph-1)

## About

A production-ready WordPress deployment featuring a security-hardened custom Docker image with Nginx and PHP-FPM 8.3, integrated with Railway's managed MySQL and Redis databases, plus a phpMyAdmin interface for database management.

Hosting WordPress with Nginx, PHP-FPM, and Redis involves deploying a high-performance web stack optimized for production environments. This configuration uses Nginx as the web server for efficient request handling, PHP-FPM 8.3 for processing PHP code, and Redis for persistent object caching and session storage. The setup includes security hardening measures such as XML-RPC disabling, protected wp-config.php, upload directory PHP execution blocking, and security headers. Railway's managed MySQL database handles persistent data storage, while phpMyAdmin provides a web-based interface for database administration. WP-CLI is pre-installed for advanced command-line site management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |
| Wordpress + Nginx | [Eetezadi/railway-wordpress-nginx-php-fpm-redis](https://github.com/Eetezadi/railway-wordpress-nginx-php-fpm-redis) | Web service |
| phpMyAdmin | `linuxserver/phpmyadmin:5.2.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private URL of Redis. |
| `REDISPORT` | Redis | 6379 | Port. |
| `REDISUSER` | Redis | default | Username |
| `REDIS_URL` | Redis | - | Full DB Connection URL |
| `REDISPASSWORD` | Redis | (secret) | Auto Generated |
| `REDIS_PASSWORD` | Redis | (secret) | Auto Generated |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL. May deactivate. |
| `MYSQLHOST` | MySQL | - | Private URL of mySQL |
| `MYSQLPORT` | MySQL | 3306 | Port. |
| `MYSQLUSER` | MySQL | root | default user |
| `MYSQL_URL` | MySQL | - | Full DB Connection URL |
| `MYSQLDATABASE` | MySQL | - | Alias |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias |
| `MYSQL_DATABASE` | MySQL | railway | Default name |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public URL. Maybe deactivate. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Auto Generated |
| `PORT` | Wordpress + Nginx | 80 | Port of Webserver |
| `REDIS_HOST` | Wordpress + Nginx | - | Redis Server |
| `REDIS_PORT` | Wordpress + Nginx | - | Redis Port |
| `REDIS_PASSWORD` | Wordpress + Nginx | (secret) | Redis Pass |
| `PHP_MEMORY_LIMIT` | Wordpress + Nginx | 512M | Limit of PHP Memory. Can change. |
| `PHP_POST_MAX_SIZE` | Wordpress + Nginx | 256M | PHP Post Max Size. Can change. |
| `WORDPRESS_DB_NAME` | Wordpress + Nginx | - | Wordpress DB. Default. |
| `WORDPRESS_DB_USER` | Wordpress + Nginx | (secret) | Wordpress DB User. |
| `WORDPRESS_DB_PASSWORD` | Wordpress + Nginx | (secret) | Wordpress DB Pass. Generated Automatically. |
| `WORDPRESS_CONFIG_EXTRA` | Wordpress + Nginx | - | Optional custom configuration for wp_config |
| `PHP_UPLOAD_MAX_FILESIZE` | Wordpress + Nginx | 256M | Php Upload Max Filesize. Can change. |
| `NGINX_CLIENT_MAX_BODY_SIZE` | Wordpress + Nginx | 256M | Nginx Config. Can change. |
| `PORT` | phpMyAdmin | 80 | Port. |
| `PMA_HOST` | phpMyAdmin | - | DB URL |
| `PMA_PORT` | phpMyAdmin | - | DB Port |
| `PMA_ARBITRARY` | phpMyAdmin | 0 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `/bin/sh -c "mkdir -p /config/nginx && echo 'resolver 8.8.8.8 8.8.4.4 valid=300s;' > /config/nginx/resolver.conf && /init"`

**Category:** Blogs · **Languages:** Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/template/wordpress-nginx-ph-1)
