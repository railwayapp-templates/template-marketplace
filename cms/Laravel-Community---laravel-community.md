# Deploy Laravel Community on Railway

The official community platform for Laravel.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laravel-community)

## About

Laravel Community is a modern, full-featured marketplace platform that combines e-commerce, user marketplaces, community forums, and content management into one seamless experience. Built with Laravel 12 and React 19, it's designed for communities looking to create their own digital ecosystem with professional-grade features.

Deploying Laravel Community involves orchestrating multiple services working together: a PHP application server, database, Redis cache, queue workers, and file storage. The platform requires environment configuration for payment processing (Stripe), email services, OAuth providers (Discord, Roblox), and optional monitoring tools. Railway simplifies this by providing a unified deployment platform where all these services can be configured and scaled together. The included Dockerfile and docker-compose configuration make deployment straightforward, while the modular architecture allows you to enable only the features your community needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Scheduled Tasks | `ghcr.io/jonerickson/laravel-community-cli:latest` | Worker |
| Laravel Community | [jonerickson/laravel-community](https://github.com/jonerickson/laravel-community) | Web service |
| MySQL | `mysql:8.4` | Database |
| Queue | `ghcr.io/jonerickson/laravel-community-cli:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MAIL_HOST` | Scheduled Tasks | 127.0.0.1 |
| `MAIL_PORT` | Scheduled Tasks | 2525 |
| `CACHE_STORE` | Scheduled Tasks | redis |
| `CSP_ENABLED` | Scheduled Tasks | false |
| `DB_PASSWORD` | Scheduled Tasks | (secret) |
| `DB_USERNAME` | Scheduled Tasks | (secret) |
| `LOG_CHANNEL` | Scheduled Tasks | stderr |
| `MAIL_MAILER` | Scheduled Tasks | log |
| `MAIL_SCHEME` | Scheduled Tasks | null |
| `SCOUT_DRIVER` | Scheduled Tasks | database |
| `SESSION_PATH` | Scheduled Tasks | / |
| `DB_CONNECTION` | Scheduled Tasks | mysql |
| `MAIL_USERNAME` | Scheduled Tasks | (secret) |
| `PAYOUT_DRIVER` | Scheduled Tasks | null |
| `VITE_SSR_PORT` | Scheduled Tasks | 13714 |
| `PAYMENT_DRIVER` | Scheduled Tasks | null |
| `REDIS_PASSWORD` | Scheduled Tasks | (secret) |
| `REDIS_USERNAME` | Scheduled Tasks | (secret) |
| `SESSION_DOMAIN` | Scheduled Tasks | null |
| `SESSION_DRIVER` | Scheduled Tasks | redis |
| `AUTORUN_ENABLED` | Scheduled Tasks | true |
| `FILESYSTEM_DISK` | Scheduled Tasks | s3 |
| `MAIL_ENCRYPTION` | Scheduled Tasks | null |
| `SESSION_ENCRYPT` | Scheduled Tasks | false |
| `CASHIER_CURRENCY` | Scheduled Tasks | USD |
| `QUEUE_CONNECTION` | Scheduled Tasks | redis |
| `SESSION_LIFETIME` | Scheduled Tasks | 120 |
| `MAIL_FROM_ADDRESS` | Scheduled Tasks | hello@example.com |
| `BROADCAST_CONNECTION` | Scheduled Tasks | log |
| `AWS_SECRET_ACCESS_KEY` | Scheduled Tasks | (secret) |
| `PAYOUT_MAXIMUM_AMOUNT` | Scheduled Tasks | 10.00 |
| `PAYOUT_MINIMUM_AMOUNT` | Scheduled Tasks | 10000.00 |
| `VITE_SENTRY_AUTH_TOKEN` | Scheduled Tasks | (secret) |
| `CASHIER_CURRENCY_LOCALE` | Scheduled Tasks | en |
| `APP_ENV` | Laravel Community | production |
| `APP_DEBUG` | Laravel Community | true |
| `MAIL_HOST` | Laravel Community | 127.0.0.1 |
| `MAIL_PORT` | Laravel Community | 2525 |
| `APP_LOCALE` | Laravel Community | en |
| `CACHE_STORE` | Laravel Community | redis |
| `CSP_ENABLED` | Laravel Community | false |
| `DB_PASSWORD` | Laravel Community | (secret) |
| `DB_USERNAME` | Laravel Community | (secret) |
| `LOG_CHANNEL` | Laravel Community | stderr |
| `MAIL_MAILER` | Laravel Community | log |
| `MAIL_SCHEME` | Laravel Community | null |
| `SCOUT_DRIVER` | Laravel Community | database |
| `SESSION_PATH` | Laravel Community | / |
| `DB_CONNECTION` | Laravel Community | mysql |
| `MAIL_USERNAME` | Laravel Community | (secret) |
| `PAYOUT_DRIVER` | Laravel Community | null |
| `VITE_SSR_PORT` | Laravel Community | 13714 |
| `PAYMENT_DRIVER` | Laravel Community | null |
| `REDIS_PASSWORD` | Laravel Community | (secret) |
| `REDIS_USERNAME` | Laravel Community | (secret) |
| `SESSION_DOMAIN` | Laravel Community | null |
| `SESSION_DRIVER` | Laravel Community | redis |
| `AUTORUN_ENABLED` | Laravel Community | true |
| `FILESYSTEM_DISK` | Laravel Community | s3 |
| `MAIL_ENCRYPTION` | Laravel Community | null |
| `SESSION_ENCRYPT` | Laravel Community | false |
| `CASHIER_CURRENCY` | Laravel Community | USD |
| `QUEUE_CONNECTION` | Laravel Community | redis |
| `SESSION_LIFETIME` | Laravel Community | 120 |
| `MAIL_FROM_ADDRESS` | Laravel Community | hello@example.com |
| `BROADCAST_CONNECTION` | Laravel Community | log |
| `AWS_SECRET_ACCESS_KEY` | Laravel Community | (secret) |
| `PAYOUT_MAXIMUM_AMOUNT` | Laravel Community | 10.00 |
| `PAYOUT_MINIMUM_AMOUNT` | Laravel Community | 10000.00 |
| `VITE_SENTRY_AUTH_TOKEN` | Laravel Community | (secret) |
| `CASHIER_CURRENCY_LOCALE` | Laravel Community | en |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `MAIL_HOST` | Queue | 127.0.0.1 |
| `MAIL_PORT` | Queue | 2525 |
| `CACHE_STORE` | Queue | redis |
| `CSP_ENABLED` | Queue | false |
| `DB_PASSWORD` | Queue | (secret) |
| `DB_USERNAME` | Queue | (secret) |
| `LOG_CHANNEL` | Queue | stderr |
| `MAIL_MAILER` | Queue | log |
| `MAIL_SCHEME` | Queue | null |
| `SCOUT_DRIVER` | Queue | database |
| `SESSION_PATH` | Queue | / |
| `DB_CONNECTION` | Queue | mysql |
| `MAIL_USERNAME` | Queue | (secret) |
| `PAYOUT_DRIVER` | Queue | null |
| `VITE_SSR_PORT` | Queue | 13714 |
| `PAYMENT_DRIVER` | Queue | null |
| `REDIS_PASSWORD` | Queue | (secret) |
| `REDIS_USERNAME` | Queue | (secret) |
| `SESSION_DOMAIN` | Queue | null |
| `SESSION_DRIVER` | Queue | redis |
| `AUTORUN_ENABLED` | Queue | true |
| `FILESYSTEM_DISK` | Queue | s3 |
| `MAIL_ENCRYPTION` | Queue | null |
| `SESSION_ENCRYPT` | Queue | false |
| `CASHIER_CURRENCY` | Queue | USD |
| `QUEUE_CONNECTION` | Queue | redis |
| `SESSION_LIFETIME` | Queue | 120 |
| `MAIL_FROM_ADDRESS` | Queue | hello@example.com |
| `BROADCAST_CONNECTION` | Queue | log |
| `AWS_SECRET_ACCESS_KEY` | Queue | (secret) |
| `PAYOUT_MAXIMUM_AMOUNT` | Queue | 10.00 |
| `PAYOUT_MINIMUM_AMOUNT` | Queue | 10000.00 |
| `VITE_SENTRY_AUTH_TOKEN` | Queue | (secret) |
| `CASHIER_CURRENCY_LOCALE` | Queue | en |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `php /var/www/html/artisan schedule:work`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `php /var/www/html/artisan horizon`

**Category:** CMS · **Languages:** PHP, TypeScript, Blade, CSS, Shell, Smarty, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/laravel-community)
