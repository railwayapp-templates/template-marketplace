# Deploy Laravel 13 Blade MySQL [Oct 26] on Railway

Laravel 13.37 Blade starter with MySQL. Updated Oct 26

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JL9ADu)

## About

Laravel 13.37 (16 October 2026) Blade starter with MySQL. One click provisions the database, injects `DB_URL`, runs migrations, and serves the app with FrankenPHP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JL9ADu?referralCode=2Sbs5r)

Railpack builds this repo on PHP 8.4 and starts FrankenPHP with the document root at `public`. The start script runs `php artisan migrate --force` before the server listens. Railway's healthcheck is `GET /up`. The app trusts Railway's proxy, so pages and assets stay on HTTPS.

The MySQL service is part of the template. Its connection string is wired to `DB_URL`. If the wizard also sets `DB_CONNECTION=sqlite` (the skeleton default), a present `DB_URL` still selects MySQL. `ext-pdo_mysql` is required in `composer.json`, so Railpack installs the driver even when `DB_CONNECTION` is not `mysql`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| laravel-blade-mysql | [marco-quintella/laravel-blade-mysql](https://github.com/marco-quintella/laravel-blade-mysql) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_URL` | laravel-blade-mysql | - | DB_HOST=127.0.0.1 |
| `APP_ENV` | laravel-blade-mysql | local | - |
| `APP_KEY` | laravel-blade-mysql | base64:NKvDAIpqDcD9cvgc/x77ECc2VrFwtsrE2mgJW1TpHQU= | - |
| `APP_URL` | laravel-blade-mysql | http://laravel-blade.test | - |
| `APP_NAME` | laravel-blade-mysql | Laravel | - |
| `APP_DEBUG` | laravel-blade-mysql | true | - |
| `LOG_LEVEL` | laravel-blade-mysql | debug | - |
| `LOG_STACK` | laravel-blade-mysql | single | - |
| `MAIL_HOST` | laravel-blade-mysql | 127.0.0.1 | - |
| `MAIL_PORT` | laravel-blade-mysql | 2525 | - |
| `APP_LOCALE` | laravel-blade-mysql | en | - |
| `REDIS_HOST` | laravel-blade-mysql | 127.0.0.1 | - |
| `REDIS_PORT` | laravel-blade-mysql | 6379 | - |
| `CACHE_STORE` | laravel-blade-mysql | database | - |
| `LOG_CHANNEL` | laravel-blade-mysql | stack | - |
| `MAIL_MAILER` | laravel-blade-mysql | log | - |
| `APP_TIMEZONE` | laravel-blade-mysql | UTC | - |
| `REDIS_CLIENT` | laravel-blade-mysql | phpredis | - |
| `SESSION_PATH` | laravel-blade-mysql | / | - |
| `BCRYPT_ROUNDS` | laravel-blade-mysql | 12 | - |
| `DB_CONNECTION` | laravel-blade-mysql | mysql | - |
| `MAIL_PASSWORD` | laravel-blade-mysql | (secret) | - |
| `MAIL_USERNAME` | laravel-blade-mysql | (secret) | - |
| `VITE_APP_NAME` | laravel-blade-mysql | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | laravel-blade-mysql | ${APP_NAME} | - |
| `MEMCACHED_HOST` | laravel-blade-mysql | 127.0.0.1 | - |
| `REDIS_PASSWORD` | laravel-blade-mysql | (secret) | - |
| `SESSION_DOMAIN` | laravel-blade-mysql | null | - |
| `SESSION_DRIVER` | laravel-blade-mysql | database | - |
| `FILESYSTEM_DISK` | laravel-blade-mysql | local | - |
| `MAIL_ENCRYPTION` | laravel-blade-mysql | null | - |
| `SESSION_ENCRYPT` | laravel-blade-mysql | false | - |
| `APP_FAKER_LOCALE` | laravel-blade-mysql | en_US | - |
| `QUEUE_CONNECTION` | laravel-blade-mysql | database | - |
| `SESSION_LIFETIME` | laravel-blade-mysql | 120 | - |
| `MAIL_FROM_ADDRESS` | laravel-blade-mysql | hello@example.com | - |
| `AWS_DEFAULT_REGION` | laravel-blade-mysql | us-east-1 | - |
| `APP_FALLBACK_LOCALE` | laravel-blade-mysql | en | - |
| `BROADCAST_CONNECTION` | laravel-blade-mysql | log | - |
| `AWS_SECRET_ACCESS_KEY` | laravel-blade-mysql | (secret) | - |
| `APP_MAINTENANCE_DRIVER` | laravel-blade-mysql | file | APP_MAINTENANCE_STORE=database |
| `LOG_DEPRECATIONS_CHANNEL` | laravel-blade-mysql | null | - |
| `AWS_USE_PATH_STYLE_ENDPOINT` | laravel-blade-mysql | false | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** Blade, PHP, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/JL9ADu)
