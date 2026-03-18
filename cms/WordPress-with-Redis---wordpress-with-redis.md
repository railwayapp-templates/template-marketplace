# Deploy WordPress with Redis on Railway

Deploy WordPress with MariaDB and Redis 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-with-redis)

## About

**What is WordPress with Redis?**  
WordPress with Redis is a WordPress installation that uses Redis as an in-memory caching layer to store frequently accessed data. By integrating Redis with WordPress, you reduce database load, improve response times, and deliver a faster, more scalable site — especially under heavy traffic.

Hosting WordPress with Redis means combining a content management system (CMS) and a high-performance key-value store into one optimized stack. WordPress manages your website content, while Redis caches objects, queries, and sessions in memory.  
On Railway, you can deploy both services in the same project and connect them through Railway’s internal networking. This eliminates complex network configurations and keeps latency low. The Redis Object Cache plugin for WordPress can then be configured using the `WORDPRESS_CONFIG_EXTRA` environment variable, removing the need to edit `wp-config.php` manually. With this setup, performance gains are immediate, and scaling is straightforward.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| WordPress | `wordpress` | Web service |
| MariaDB | `mariadb` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | Redis | no |
| `PORT` | WordPress | 80 |
| `WORDPRESS_DB_USER` | WordPress | (secret) |
| `WORDPRESS_AUTH_KEY` | WordPress | (secret) |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | railway |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Volume:** `/bitnami`
- **Start command:** `/bin/bash -c "echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-with-redis)
