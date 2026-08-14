# Deploy Bagisto on Railway

Laravel e-commerce storefront, checkout, catalogue and CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bagisto-ecom)

## About

Bagisto is an open-source e-commerce platform built on Laravel and Vue.js, for merchants and agencies who want a storefront, checkout and admin back office they control end to end. It covers the catalogue, cart, orders, invoices, shipments, customers, promotions and tax rules, with multi-channel, multi-currency and multi-locale support in the core. Teams self-host Bagisto when per-transaction fees, locked-down themes or restricted database access make a hosted platform the wrong fit — the code is MIT-licensed, the database is yours, and the extension API lets you change checkout behaviour rather than work around it.

This template deploys Bagisto as three Railway services. The application service runs nginx and PHP 8.3 FPM with two queue workers and the scheduler, supervised in one container. Managed MySQL holds the catalogue, orders and configuration. Managed Redis backs the cache, sessions and job queue. A volume at the Laravel storage directory keeps product images, invoices and import/export files across deploys. Only the application service gets a public domain; MySQL and Redis stay private.

![Bagisto Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786647376/7d09fb6a-b894-44ae-ab19-9f893e0253b6.png)

Bagisto is a Laravel application, so hosting it means PHP-FPM behind a web server, MySQL, a cache, a queue worker, a scheduler and persistent media storage. By hand that means writing supervisor units and an nginx virtual host; this template packages all of it.

Key features:

- Simple, configurable, grouped, bundled, virtual and downloadable product types
- Cart, checkout, order, invoice, shipment and refund workflows out of the box
- Multi-channel, multi-store, multi-currency and multi-locale from one install
- Customer accounts, groups, wishlists, reviews and compare lists
- Cart and catalogue price rules, coupons and email campaigns
- REST and GraphQL APIs for headless storefronts and mobile apps
- A CMS module for landing pages, plus theme customisation in the admin panel

The application service runs the workers in the same container as the web server, because Bagisto's import and export jobs read and write the same storage directory the admin panel serves downloads from. MySQL is the system of record. Redis holds the cache, sessions and job queue, keeping shoppers signed in across redeploys and moving email and indexing off the request path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bagisto | [gridalpha/bagisto-railway](https://github.com/gridalpha/bagisto-railway) | Web service |
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bagisto | 80 | nginx listening port |
| `APP_ENV` | bagisto | production | Laravel application environment |
| `APP_KEY` | bagisto | - | Laravel encryption key |
| `APP_URL` | bagisto | - | Public storefront base URL |
| `DB_HOST` | bagisto | - | Private MySQL hostname |
| `DB_PORT` | bagisto | - | MySQL port |
| `APP_NAME` | bagisto | Bagisto | Store name shown to shoppers |
| `APP_DEBUG` | bagisto | false | Hide stack traces from visitors |
| `LOG_LEVEL` | bagisto | info | Minimum log level |
| `ADMIN_NAME` | bagisto | Store Admin | First administrator display name |
| `APP_LOCALE` | bagisto | en | Default storefront language |
| `REDIS_HOST` | bagisto | - | Private Redis hostname |
| `REDIS_PORT` | bagisto | - | Redis port |
| `ADMIN_EMAIL` | bagisto | admin@example.com | First administrator login email |
| `CACHE_STORE` | bagisto | redis | Application cache backend |
| `DB_DATABASE` | bagisto | bagisto | Application database name |
| `DB_PASSWORD` | bagisto | (secret) | Password for the scoped user |
| `DB_USERNAME` | bagisto | (secret) | Scoped application database user |
| `LOG_CHANNEL` | bagisto | stderr | Stream application logs to Railway |
| `APP_CURRENCY` | bagisto | USD | Default store currency |
| `APP_TIMEZONE` | bagisto | UTC | Store timezone |
| `REDIS_CLIENT` | bagisto | predis | Redis client library |
| `APP_ADMIN_URL` | bagisto | admin | Admin panel path segment |
| `DB_CONNECTION` | bagisto | mysql | Database driver |
| `QUEUE_WORKERS` | bagisto | 2 | Supervised queue worker processes |
| `ADMIN_PASSWORD` | bagisto | (secret) | First administrator password |
| `REDIS_PASSWORD` | bagisto | (secret) | Redis password |
| `REDIS_USERNAME` | bagisto | (secret) | Redis ACL username |
| `SESSION_DRIVER` | bagisto | redis | Shopper session storage backend |
| `FILESYSTEM_DISK` | bagisto | public | Store uploads on the mounted volume |
| `QUEUE_CONNECTION` | bagisto | redis | Background job queue backend |
| `DB_ADMIN_PASSWORD` | bagisto | (secret) | Admin password, first boot only |
| `DB_ADMIN_USERNAME` | bagisto | (secret) | Admin user, first boot only |
| `SESSION_CONNECTION` | bagisto | session | Redis database used for sessions |
| `BAGISTO_DEMO_PRODUCTS` | bagisto | true | Seed sample catalogue on first install |
| `SESSION_SECURE_COOKIE` | bagisto | true | Send session cookies over HTTPS only |
| `NGINX_WORKER_PROCESSES` | bagisto | 2 | nginx worker processes |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/bagisto/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/bagisto-ecom)
