# Deploy Laravel on Railway

An example Laravel application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fWEWWf)

## About

## Overview

Laravel is the PHP Frameworkfor Web Artisans. Laravel is a web application framework with expressive, elegant syntax. We’ve already laid the foundation — freeing you to create without sweating the small things.

## Highlights

- **Dockerfile**: The `Dockerfile` and associated files in `docker/` are based on [Laravel Sail PHP 8.0](https://github.com/laravel/sail/tree/1.x/runtimes/8.0)
- **Plugin Config**: To connect to a Railway Plugin, Postgres for example, you will need to utilize the environment variables listed for that plugin in the [Railway Docs](https://docs.railway.app/). See the `.env.example` for an example of using these with Postgres.
- **Web server port**: Railway dynamically assigns a port for your webserver. We grab the `$PORT` environment variable in `docker/start-container` to set this on Artisan `serve`
- **Logging**: Because the disk on Railway containers is ephemeral, we pipe the logs normally output to `storage/logs/laravel.log` to `stdout` [as seen here](https://github.com/sorrell/railavel/commit/2802b8c5032a13a601a903276ee2181678009f67)
- **APP_KEY**: This starter will automatically generate the `APP_KEY` (`php artisan key:generate` in the `docker/start-container`)
- **Migrations**: This starter automatically runs migrations on deploy (in the `docker/start-container`)

## Learn More

- [Laravel](https://laravel.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| laravel | [railwayapp-templates/laravel](https://github.com/railwayapp-templates/laravel) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_NAME` | laravel | Laravel | - |
| `APP_DEBUG` | laravel | true | - |
| `LOG_LEVEL` | laravel | debug | - |
| `LOG_STACK` | laravel | single | - |
| `MAIL_HOST` | laravel | 127.0.0.1 | - |
| `MAIL_PORT` | laravel | 2525 | - |
| `APP_LOCALE` | laravel | en | - |
| `REDIS_HOST` | laravel | 127.0.0.1 | - |
| `REDIS_PORT` | laravel | 6379 | - |
| `CACHE_STORE` | laravel | database | - |
| `DB_PASSWORD` | laravel | (secret) | - |
| `DB_USERNAME` | laravel | (secret) | - |
| `LOG_CHANNEL` | laravel | errorlog | - |
| `MAIL_MAILER` | laravel | log | - |
| `CACHE_PREFIX` | laravel | laravel_ | - |
| `REDIS_CLIENT` | laravel | phpredis | - |
| `SESSION_PATH` | laravel | / | - |
| `BCRYPT_ROUNDS` | laravel | 12 | - |
| `DB_CONNECTION` | laravel | pgsql | - |
| `MAIL_PASSWORD` | laravel | (secret) | - |
| `MAIL_USERNAME` | laravel | (secret) | - |
| `VITE_APP_NAME` | laravel | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | laravel | ${APP_NAME} | - |
| `MEMCACHED_HOST` | laravel | 127.0.0.1 | - |
| `REDIS_PASSWORD` | laravel | (secret) | - |
| `SESSION_DOMAIN` | laravel | null | - |
| `SESSION_DRIVER` | laravel | database | - |
| `FILESYSTEM_DISK` | laravel | local | - |
| `MAIL_ENCRYPTION` | laravel | null | - |
| `SESSION_ENCRYPT` | laravel | false | - |
| `APP_FAKER_LOCALE` | laravel | en_US | - |
| `QUEUE_CONNECTION` | laravel | database | - |
| `SESSION_LIFETIME` | laravel | 120 | - |
| `MAIL_FROM_ADDRESS` | laravel | hello@example.com | - |
| `APP_FALLBACK_LOCALE` | laravel | en | - |
| `BROADCAST_CONNECTION` | laravel | log | - |
| `APP_MAINTENANCE_DRIVER` | laravel | file | - |
| `LOG_DEPRECATIONS_CHANNEL` | laravel | null | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Tags:** php · **Languages:** PHP, Blade, JavaScript

[View on Railway →](https://railway.com/template/fWEWWf)
