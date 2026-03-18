# Deploy next-woo on Railway

Headless WooCommerce using Next.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/next-woo)

## About

next-woo is a headless WooCommerce storefront built with Next.js 16, React 19, and TypeScript. It features product browsing, cart, checkout (via WooCommerce), and blog support. Includes a pre-configured WordPress container with WooCommerce and cache revalidation plugin.

This template deploys a complete headless WooCommerce stack: a MySQL database, WordPress with WooCommerce, and Next.js frontend. WordPress and WooCommerce handle products, orders, and payments while Next.js delivers a fast, modern storefront. The included revalidation plugin automatically invalidates the Next.js cache when products or content change, ensuring your store always shows fresh data. Environment variables are pre-configured to connect all three services securely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WordPress | `ghcr.io/9d8dev/next-woo-wordpress:latest` | Web service |
| next-woo | [9d8dev/next-woo](https://github.com/9d8dev/next-woo) | Web service |
| MySQL | `mysql:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `WORDPRESS_DB_USER` | WordPress | (secret) | - |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | - |
| `NODE_ENV` | next-woo | production | - |
| `WC_CONSUMER_KEY` | next-woo | ck_replace_after_setup | - |
| `WC_CONSUMER_SECRET` | next-woo | (secret) | - |
| `WORDPRESS_WEBHOOK_SECRET` | next-woo | (secret) | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQL_USER` | MySQL | (secret) | - |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | wordpress | Database to be created on image startup. |
| `MYSQL_PASSWORD` | MySQL | (secret) | - |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** TypeScript, PHP, CSS, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/next-woo)
