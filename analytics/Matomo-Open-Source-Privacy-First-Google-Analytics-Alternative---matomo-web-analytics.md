# Deploy Matomo | Open-Source Privacy First Google Analytics Alternative on Railway

Self Host Matomo. Web analytics, GDPR compliant with full data ownership

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matomo-web-analytics)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matomo-web-analytics?referralCode=QXdhdr)

Deploy Matomo on Railway to run your own privacy-first web analytics platform with full data ownership. Self-host Matomo with a pre-configured MySQL database, persistent volume storage for plugins and configuration, and automatic HTTPS — no server management required.

This template deploys two services: the **Matomo** application (official Apache image with PHP 8.4) and a **MySQL** database for storing analytics data, visitor logs, and site configuration.

Matomo is the leading open-source web analytics platform, used by over 1 million websites in 190 countries. Originally released as Piwik in 2007, it provides a complete alternative to Google Analytics while keeping all visitor data on your own infrastructure.

- **100% data ownership** — analytics data never leaves your server
- **GDPR and CCPA compliant** — approved by France's CNIL for cookieless tracking without consent banners
- **Real-time analytics** — live visitor maps, real-time visitor log, and live widget dashboards
- **E-commerce tracking** — orders, revenue, abandoned carts, and product performance out of the box
- **Custom dimensions and events** — track any user interaction with flexible event taxonomy
- **Heatmaps and session recording** — visual behavior analysis (premium plugin)
- **Tag manager** — built-in tag management system, no third-party scripts needed
- **REST API** — over 100 API methods for custom reporting, data export, and integrations

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Matomo | `matomo:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Matomo | 80 | Apache listening port |
| `PHP_MEMORY_LIMIT` | Matomo | 256M | PHP memory allocation limit |
| `MATOMO_DATABASE_HOST` | Matomo | - | MySQL server hostname |
| `MATOMO_DATABASE_DBNAME` | Matomo | - | Database name |
| `MATOMO_DATABASE_ADAPTER` | Matomo | mysql | Database driver type |
| `MATOMO_DATABASE_PASSWORD` | Matomo | (secret) | Database password |
| `MATOMO_DATABASE_USERNAME` | Matomo | (secret) | Database username |
| `MATOMO_DATABASE_TABLES_PREFIX` | Matomo | matomo_ | Table name prefix |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |

## Configuration

- **Start command:** `/bin/sh -c 'if [ ! -e /var/www/html/matomo.php ]; then tar cf - -C /usr/src/matomo . | tar xf - -C /var/www/html; chown -R www-data:www-data /var/www/html; fi; a2dismod mpm_event mpm_worker 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; exec apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/matomo-web-analytics)
