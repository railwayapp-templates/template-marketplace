# Deploy Laravel Complete (Breeze, Blade, MySQL, Redis) on Railway

A simple Laravel starter app connected to a MySQL database, Redis cache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Gkzn4k)

## About

This complete Laravel starter template deploys a **Laravel Breeze app** as a _**majestic monolith**_ that is connected to a MySQL database and Redis Cache on [Railway](https://railway.app).

It spins up 5 services (with the same codebase) in one project. They are:
- **web service**: This runs the app.
- **worker service**: This runs the Laravel queue worker.
- **cron service**: This runs the Laravel scheduler and takes care of all cron tasks.
- **MySQL**: This is the MySQL database that the app is connected to.
- **Redis**: This is the queue and cache store/database that the app is connected to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| cron service | [unicodeveloper/complete-laravel-on-railway](https://github.com/unicodeveloper/complete-laravel-on-railway) | Worker |
| worker service | [unicodeveloper/complete-laravel-on-railway](https://github.com/unicodeveloper/complete-laravel-on-railway) | Worker |
| web service | [unicodeveloper/complete-laravel-on-railway](https://github.com/unicodeveloper/complete-laravel-on-railway) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `APP_ENV` | cron service | production | - |
| `APP_URL` | cron service | https://completelaravel.test | - |
| `DB_PORT` | cron service | 3306 | - |
| `APP_NAME` | cron service | Complete Laravel | - |
| `APP_DEBUG` | cron service | true | - |
| `LOG_LEVEL` | cron service | debug | - |
| `LOG_STACK` | cron service | single | - |
| `MAIL_HOST` | cron service | sandbox.smtp.mailtrap.io | - |
| `MAIL_PORT` | cron service | 2525 | - |
| `APP_LOCALE` | cron service | en | - |
| `AWS_BUCKET` | cron service | null | - |
| `CACHE_STORE` | cron service | redis | - |
| `DB_DATABASE` | cron service | railway | - |
| `DB_PASSWORD` | cron service | (secret) | - |
| `DB_USERNAME` | cron service | (secret) | - |
| `LOG_CHANNEL` | cron service | errorlog | - |
| `MAIL_MAILER` | cron service | smtp | - |
| `APP_TIMEZONE` | cron service | UTC | - |
| `CACHE_PREFIX` | cron service | completelaravel | - |
| `REDIS_CLIENT` | cron service | predis | - |
| `SESSION_PATH` | cron service | / | - |
| `BCRYPT_ROUNDS` | cron service | 12 | - |
| `DB_CONNECTION` | cron service | mysql | - |
| `MAIL_PASSWORD` | cron service | (secret) | - |
| `MAIL_USERNAME` | cron service | (secret) | - |
| `VITE_APP_NAME` | cron service | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | cron service | Speaker Decker | - |
| `MEMCACHED_HOST` | cron service | 127.0.0.1 | - |
| `REDIS_USERNAME` | cron service | (secret) | - |
| `SESSION_DOMAIN` | cron service | null | - |
| `SESSION_DRIVER` | cron service | database | - |
| `FILESYSTEM_DISK` | cron service | local | - |
| `MAIL_ENCRYPTION` | cron service | null | - |
| `SESSION_ENCRYPT` | cron service | false | - |
| `APP_FAKER_LOCALE` | cron service | en_US | - |
| `QUEUE_CONNECTION` | cron service | redis | - |
| `SESSION_LIFETIME` | cron service | 120 | - |
| `AWS_ACCESS_KEY_ID` | cron service | null | - |
| `MAIL_FROM_ADDRESS` | cron service | prosper@speakerdeck.com | - |
| `AWS_DEFAULT_REGION` | cron service | us-east-1 | - |
| `APP_FALLBACK_LOCALE` | cron service | en | - |
| `BROADCAST_CONNECTION` | cron service | log | - |
| `AWS_SECRET_ACCESS_KEY` | cron service | (secret) | - |
| `APP_MAINTENANCE_DRIVER` | cron service | file | - |
| `LOG_DEPRECATIONS_CHANNEL` | cron service | null | - |
| `AWS_USE_PATH_STYLE_ENDPOINT` | cron service | false | - |
| `APP_ENV` | worker service | production | - |
| `APP_URL` | worker service | https://completelaravel.test | - |
| `DB_PORT` | worker service | 3306 | - |
| `APP_NAME` | worker service | Complete Laravel | - |
| `APP_DEBUG` | worker service | true | - |
| `LOG_LEVEL` | worker service | debug | - |
| `LOG_STACK` | worker service | single | - |
| `MAIL_HOST` | worker service | sandbox.smtp.mailtrap.io | - |
| `MAIL_PORT` | worker service | 2525 | - |
| `APP_LOCALE` | worker service | en | - |
| `AWS_BUCKET` | worker service | null | - |
| `CACHE_STORE` | worker service | redis | - |
| `DB_DATABASE` | worker service | railway | - |
| `DB_PASSWORD` | worker service | (secret) | - |
| `DB_USERNAME` | worker service | (secret) | - |
| `LOG_CHANNEL` | worker service | errorlog | - |
| `MAIL_MAILER` | worker service | smtp | - |
| `APP_TIMEZONE` | worker service | UTC | - |
| `CACHE_PREFIX` | worker service | completelaravel | - |
| `REDIS_CLIENT` | worker service | predis | - |
| `SESSION_PATH` | worker service | / | - |
| `BCRYPT_ROUNDS` | worker service | 12 | - |
| `DB_CONNECTION` | worker service | mysql | - |
| `MAIL_PASSWORD` | worker service | (secret) | - |
| `MAIL_USERNAME` | worker service | (secret) | - |
| `VITE_APP_NAME` | worker service | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | worker service | Speaker Decker | - |
| `MEMCACHED_HOST` | worker service | 127.0.0.1 | - |
| `REDIS_USERNAME` | worker service | (secret) | - |
| `SESSION_DOMAIN` | worker service | null | - |
| `SESSION_DRIVER` | worker service | database | - |
| `FILESYSTEM_DISK` | worker service | local | - |
| `MAIL_ENCRYPTION` | worker service | null | - |
| `SESSION_ENCRYPT` | worker service | false | - |
| `APP_FAKER_LOCALE` | worker service | en_US | - |
| `QUEUE_CONNECTION` | worker service | redis | - |
| `SESSION_LIFETIME` | worker service | 120 | - |
| `AWS_ACCESS_KEY_ID` | worker service | null | - |
| `MAIL_FROM_ADDRESS` | worker service | prosper@speakerdeck.com | - |
| `AWS_DEFAULT_REGION` | worker service | us-east-1 | - |
| `APP_FALLBACK_LOCALE` | worker service | en | - |
| `BROADCAST_CONNECTION` | worker service | log | - |
| `AWS_SECRET_ACCESS_KEY` | worker service | (secret) | - |
| `APP_MAINTENANCE_DRIVER` | worker service | file | - |
| `LOG_DEPRECATIONS_CHANNEL` | worker service | null | - |
| `AWS_USE_PATH_STYLE_ENDPOINT` | worker service | false | - |
| `APP_ENV` | web service | production | - |
| `APP_URL` | web service | https://completelaravel.test | - |
| `DB_PORT` | web service | 3306 | - |
| `APP_NAME` | web service | Complete Laravel | - |
| `APP_DEBUG` | web service | true | - |
| `LOG_LEVEL` | web service | debug | - |
| `LOG_STACK` | web service | single | - |
| `MAIL_HOST` | web service | sandbox.smtp.mailtrap.io | - |
| `MAIL_PORT` | web service | 2525 | - |
| `APP_LOCALE` | web service | en | - |
| `AWS_BUCKET` | web service | xxxx | - |
| `CACHE_STORE` | web service | redis | - |
| `DB_DATABASE` | web service | railway | - |
| `DB_USERNAME` | web service | (secret) | - |
| `LOG_CHANNEL` | web service | errorlog | - |
| `MAIL_MAILER` | web service | smtp | - |
| `APP_TIMEZONE` | web service | UTC | - |
| `CACHE_PREFIX` | web service | completelaravel | - |
| `REDIS_CLIENT` | web service | predis | - |
| `SESSION_PATH` | web service | / | - |
| `BCRYPT_ROUNDS` | web service | 12 | - |
| `DB_CONNECTION` | web service | mysql | - |
| `MAIL_PASSWORD` | web service | (secret) | - |
| `MAIL_USERNAME` | web service | (secret) | - |
| `VITE_APP_NAME` | web service | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | web service | Speaker Decker | - |
| `MEMCACHED_HOST` | web service | 127.0.0.1 | - |
| `REDIS_USERNAME` | web service | (secret) | - |
| `SESSION_DOMAIN` | web service | null | - |
| `SESSION_DRIVER` | web service | database | - |
| `FILESYSTEM_DISK` | web service | local | - |
| `MAIL_ENCRYPTION` | web service | null | - |
| `SESSION_ENCRYPT` | web service | false | - |
| `APP_FAKER_LOCALE` | web service | en_US | - |
| `QUEUE_CONNECTION` | web service | redis | - |
| `SESSION_LIFETIME` | web service | 120 | - |
| `AWS_ACCESS_KEY_ID` | web service | xxxxx | - |
| `MAIL_FROM_ADDRESS` | web service | random@thisperson.com | - |
| `AWS_DEFAULT_REGION` | web service | us-east-1 | - |
| `APP_FALLBACK_LOCALE` | web service | en | - |
| `BROADCAST_CONNECTION` | web service | log | - |
| `AWS_SECRET_ACCESS_KEY` | web service | (secret) | - |
| `APP_MAINTENANCE_DRIVER` | web service | file | - |
| `LOG_DEPRECATIONS_CHANNEL` | web service | xxxx | - |
| `AWS_USE_PATH_STYLE_ENDPOINT` | web service | false | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `sh ./cron.sh`
- **Start command:** `php artisan queue:listen`
- **Start command:** `sh ./start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** PHP, Blade, JavaScript, Shell, CSS

[View on Railway →](https://railway.com/template/Gkzn4k)
