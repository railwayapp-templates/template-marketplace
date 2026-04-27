# Deploy Laravel in Production (Laravel, MySQL, Redis, Nightwatch) on Railway

A production-ready Laravel 12 template with MySQL, Redis, and Nightwatch.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laravel-in-production-laravel-mysql-redi)

## About

A production-ready Laravel 12 starter template pre-configured with MySQL, Redis, and Nightwatch monitoring. Clone, set your environment variables, and deploy. No infrastructure configuration required.

Hosting Laravel in production requires more than just running `php artisan serve`. This template bundles a multi-stage Dockerfile that compiles your app with Composer, serves it via Nginx and PHP-FPM, and manages all processes through Supervisor, including a Redis-backed queue worker running alongside your web server. MySQL handles persistent data storage, Redis powers your cache, sessions, and queues for performance and scalability, and Nightwatch provides real-time application monitoring so you can catch errors and performance issues before your users do.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| laravel-starter | [D-Lite/laravel-starter](https://github.com/D-Lite/laravel-starter) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `APP_ENV` | laravel-starter | production | Application environment (production, staging, local) |
| `APP_KEY` | laravel-starter | base64:25602wk29x3n7x0/7nnxy6OWv4Atnh80AQnv3b/QKRI= | Application encryption key generated via php artisan key:generate |
| `APP_URL` | laravel-starter | - | Public URL of the application |
| `DB_HOST` | laravel-starter | - | MySQL host (referenced from linked MySQL service) |
| `DB_PORT` | laravel-starter | - | MySQL port (referenced from linked MySQL service) |
| `APP_NAME` | laravel-starter | Laravel | Application name |
| `APP_DEBUG` | laravel-starter | false | Enable debug mode (should be false in production) |
| `LOG_LEVEL` | laravel-starter | error | Minimum log level to record |
| `REDIS_URL` | laravel-starter | - | Full Redis connection string (referenced from linked Redis service) |
| `REDIS_HOST` | laravel-starter | - | Redis host (referenced from linked Redis service) |
| `REDIS_PORT` | laravel-starter | - | Redis port (referenced from linked Redis service) |
| `CACHE_STORE` | laravel-starter | redis | Driver used for application cache |
| `DB_DATABASE` | laravel-starter | - | MySQL database name (referenced from linked MySQL service) |
| `DB_PASSWORD` | laravel-starter | (secret) | MySQL password (referenced from linked MySQL service) |
| `DB_USERNAME` | laravel-starter | (secret) | MySQL username (referenced from linked MySQL service) |
| `REDIS_CLIENT` | laravel-starter | predis | PHP Redis client implementation |
| `DB_CONNECTION` | laravel-starter | mysql | Database driver |
| `REDIS_PASSWORD` | laravel-starter | (secret) | Redis password (referenced from linked Redis service) |
| `SESSION_DRIVER` | laravel-starter | redis | Driver used for session storage |
| `NIGHTWATCH_TOKEN` | laravel-starter | (secret) | Auth token for Laravel Nightwatch monitoring (from nightwatch.laravel.com) |
| `QUEUE_CONNECTION` | laravel-starter | redis | Driver used for queued jobs |
| `REDISHOST` | Redis | - | Redis host on the Railway private network |
| `REDISPORT` | Redis | 6379 | Redis server port |
| `REDISUSER` | Redis | default | Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias for REDIS_PASSWORD for compatibility with clients expecting this variable name |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated 32-character password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Starters · **Languages:** Blade, PHP, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/laravel-in-production-laravel-mysql-redi)
