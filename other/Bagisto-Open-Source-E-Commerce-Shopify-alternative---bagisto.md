# Deploy Bagisto | Open Source E-Commerce, Shopify alternative on Railway

Self host Bagisto, the Laravel/Vue.js e-commerce platform, on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bagisto)

## About

Bagisto is a free, open-source Laravel + Vue.js e-commerce platform for building self-hosted online stores, marketplaces, and headless commerce APIs. Self-host Bagisto on Railway to run a fully featured store — products, carts, orders, customers, multi-channel, multi-currency, multi-vendor — without the recurring per-transaction fees that hosted platforms like Shopify charge.

This Railway template deploys the official `webkul/bagisto:2.4.3` Docker image preconfigured with Nginx, PHP-FPM, and Supervisor, wired to a Railway-managed MySQL service. A persistent volume is attached for media uploads, sessions, and Laravel cache, and the start command runs database migrations and seeders idempotently on every boot so the store is ready immediately after deploy.

![Bagisto Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777810473/302badd2-cfdd-4a84-b053-2ff627233c42.png)

Bagisto is a Laravel-based e-commerce framework that ships a complete storefront and admin panel out of the box. It is used by developers who want full control over their store's code and data — payment integrations, custom checkout flows, headless storefront via GraphQL, multi-vendor marketplace modules, and unlimited products with no per-transaction cut.

Key features:

- Multi-channel, multi-currency, multi-locale store management
- Built-in catalog manager with attributes, families, configurable products, bundles
- Order, invoice, shipment, and refund workflows
- Customer groups, cart rules, catalog rules, coupon codes
- Headless commerce via GraphQL API
- Multi-vendor marketplace, B2B, POS, and SaaS modules available as paid add-ons
- Theme customization with Vue.js + Tailwind frontend

The Railway deployment runs Bagisto in a single container (Nginx + PHP-FPM under Supervisor) and uses a separate Railway-managed MySQL service for data persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Bagisto | `webkul/bagisto:2.4.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `PORT` | Bagisto | 80 | Internal HTTP port |
| `APP_ENV` | Bagisto | production | Laravel environment |
| `APP_KEY` | Bagisto | - | Laravel encryption key — static |
| `APP_URL` | Bagisto | - | Public-facing store URL |
| `DB_HOST` | Bagisto | - | MySQL host |
| `DB_PORT` | Bagisto | - | MySQL port |
| `APP_DEBUG` | Bagisto | false | Disable debug in production |
| `MAIL_HOST` | Bagisto | <tbu-by-user> | SMTP host (set when sending mail) |
| `MAIL_PORT` | Bagisto | <tbu-by-user> | SMTP port |
| `APP_LOCALE` | Bagisto | en | Default storefront locale |
| `CACHE_STORE` | Bagisto | file | Laravel cache store |
| `DB_DATABASE` | Bagisto | - | MySQL database |
| `DB_PASSWORD` | Bagisto | (secret) | MySQL password |
| `DB_USERNAME` | Bagisto | (secret) | MySQL user |
| `MAIL_MAILER` | Bagisto | smtp | SMTP transport |
| `APP_CURRENCY` | Bagisto | USD | Default store currency |
| `APP_TIMEZONE` | Bagisto | UTC | PHP timezone |
| `CACHE_DRIVER` | Bagisto | file | Laravel cache driver |
| `DB_CONNECTION` | Bagisto | mysql | Laravel DB driver |
| `MAIL_PASSWORD` | Bagisto | (secret) | SMTP password |
| `MAIL_USERNAME` | Bagisto | (secret) | SMTP username |
| `MAIL_FROM_NAME` | Bagisto | Shop | Default from name |
| `SESSION_DRIVER` | Bagisto | file | Laravel session driver |
| `MYSQL_AUTOSTART` | Bagisto | false | Disable bundled MySQL |
| `TRUSTED_PROXIES` | Bagisto | * | Trust Railway proxy for HTTPS |
| `QUEUE_CONNECTION` | Bagisto | sync | Run jobs synchronously |
| `MAIL_FROM_ADDRESS` | Bagisto | shop@example.com | Default from address |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'mkdir -p /var/www/bagisto/storage/framework/cache/data /var/www/bagisto/storage/framework/sessions /var/www/bagisto/storage/framework/views /var/www/bagisto/storage/framework/testing /var/www/bagisto/storage/app/public /var/www/bagisto/storage/logs /var/www/bagisto/bootstrap/cache && chmod -R 777 /var/www/bagisto/storage /var/www/bagisto/bootstrap/cache && chown -R www-data:www-data /var/www/bagisto/storage /var/www/bagisto/bootstrap/cache 2>/dev/null || true && rm -f /etc/nginx/sites-enabled/default && sed -i "/fastcgi_pass/a\        fastcgi_param HTTPS on;" /etc/nginx/conf.d/bagisto.conf && /usr/local/bin/entrypoint.sh /bin/sh -c "cd /var/www/bagisto && php artisan storage:link --force 2>&1 || true; php artisan migrate --force 2>&1 || true; php artisan db:seed --force 2>&1 || true; chmod -R 777 /var/www/bagisto/storage /var/www/bagisto/bootstrap/cache; exec supervisord -n -c /etc/supervisor/supervisord.conf"'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/bagisto/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bagisto)
