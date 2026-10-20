# Deploy Laravel 13 Breeze Blade MySQL  [Oct 26] on Railway

Laravel 13.37 Breeze auth starter with MySQL. Updated Oct 18

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baR0T4)

## About

Laravel 13.37 (18 October 2026) Breeze auth starter with MySQL. One click provisions the database, injects `DB_URL`, runs migrations, and serves the app with FrankenPHP — register, login, and profile pages working out of the box.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/baR0T4?referralCode=2Sbs5r)

Railpack builds this repo on PHP 8.4 and starts FrankenPHP with the document root at `public`. The start script runs `php artisan migrate --force` before the server listens. Railway's healthcheck is `GET /up`. The app trusts Railway's proxy, so login redirects and assets stay on HTTPS.

The MySQL service is part of the template. Its connection string is wired to `DB_URL`. If the wizard also sets `DB_CONNECTION=sqlite` (the skeleton default), a present `DB_URL` still selects MySQL. `ext-pdo_mysql` is required in `composer.json`, so Railpack installs the driver even when `DB_CONNECTION` is not `mysql`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| laravel-breeze-blade | [marco-quintella/laravel-breeze-blade](https://github.com/marco-quintella/laravel-breeze-blade) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | laravel-breeze-blade | local | - |
| `APP_NAME` | laravel-breeze-blade | Laravel | - |
| `APP_DEBUG` | laravel-breeze-blade | true | - |
| `LOG_LEVEL` | laravel-breeze-blade | debug | - |
| `LOG_STACK` | laravel-breeze-blade | single | - |
| `MAIL_HOST` | laravel-breeze-blade | 127.0.0.1 | - |
| `MAIL_PORT` | laravel-breeze-blade | 2525 | - |
| `APP_LOCALE` | laravel-breeze-blade | en | - |
| `REDIS_HOST` | laravel-breeze-blade | 127.0.0.1 | - |
| `REDIS_PORT` | laravel-breeze-blade | 6379 | - |
| `CACHE_STORE` | laravel-breeze-blade | database | - |
| `LOG_CHANNEL` | laravel-breeze-blade | stack | - |
| `MAIL_MAILER` | laravel-breeze-blade | log | - |
| `APP_TIMEZONE` | laravel-breeze-blade | UTC | - |
| `REDIS_CLIENT` | laravel-breeze-blade | phpredis | - |
| `SESSION_PATH` | laravel-breeze-blade | / | - |
| `BCRYPT_ROUNDS` | laravel-breeze-blade | 12 | - |
| `DB_CONNECTION` | laravel-breeze-blade | mysql | DB_HOST=127.0.0.1 |
| `MAIL_PASSWORD` | laravel-breeze-blade | (secret) | - |
| `MAIL_USERNAME` | laravel-breeze-blade | (secret) | - |
| `VITE_APP_NAME` | laravel-breeze-blade | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | laravel-breeze-blade | ${APP_NAME} | - |
| `MEMCACHED_HOST` | laravel-breeze-blade | 127.0.0.1 | - |
| `REDIS_PASSWORD` | laravel-breeze-blade | (secret) | - |
| `SESSION_DOMAIN` | laravel-breeze-blade | null | - |
| `SESSION_DRIVER` | laravel-breeze-blade | database | - |
| `FILESYSTEM_DISK` | laravel-breeze-blade | local | - |
| `MAIL_ENCRYPTION` | laravel-breeze-blade | null | - |
| `SESSION_ENCRYPT` | laravel-breeze-blade | false | - |
| `APP_FAKER_LOCALE` | laravel-breeze-blade | en_US | - |
| `QUEUE_CONNECTION` | laravel-breeze-blade | database | - |
| `SESSION_LIFETIME` | laravel-breeze-blade | 120 | - |
| `MAIL_FROM_ADDRESS` | laravel-breeze-blade | hello@example.com | - |
| `AWS_DEFAULT_REGION` | laravel-breeze-blade | us-east-1 | - |
| `APP_FALLBACK_LOCALE` | laravel-breeze-blade | en | - |
| `BROADCAST_CONNECTION` | laravel-breeze-blade | log | - |
| `AWS_SECRET_ACCESS_KEY` | laravel-breeze-blade | (secret) | - |
| `APP_MAINTENANCE_DRIVER` | laravel-breeze-blade | file | APP_MAINTENANCE_STORE=database |
| `LOG_DEPRECATIONS_CHANNEL` | laravel-breeze-blade | null | - |
| `AWS_USE_PATH_STYLE_ENDPOINT` | laravel-breeze-blade | false | - |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** Blade, PHP, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/baR0T4)
