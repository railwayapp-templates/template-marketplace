# Deploy Laravel | PHP 8.4 on FrankenPHP with Postgres on Railway

Laravel 13 on FrankenPHP with Postgres and runtime config caching

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laravel-or-php-84-on-frankenphp-with-pos)

## About

Laravel 13 on PHP 8.4, served by FrankenPHP in a single container, with Postgres.

The Laravel template on Railway builds from a repository last updated in October 2024 - Laravel 11.9, when 13 is current - and about one deployment in eight does not come up.

This one is a current scaffold in a container that gets two things right. Both are easy to get wrong, and both fail in ways that are hard to read.

**Config caching happens at runtime, not during the build.** `php artisan config:cache` writes the *values* of environment variables into a PHP file. Railway injects variables at runtime, so a config cache built during the image build freezes in whatever existed then - nothing - and your database credentials are silently empty in production. The entrypoint caches after the environment is present.

**APP_KEY has no default and the container refuses to start without one.** Laravel uses it to encrypt sessions and cookies. A template that ships a fixed key hands the same one to every deployment made from it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Laravel | [ak40u/laravel-railway-starter](https://github.com/ak40u/laravel-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Laravel | 8080 |
| `APP_ENV` | Laravel | production |
| `DB_PORT` | Laravel | 5432 |
| `APP_DEBUG` | Laravel | false |
| `CACHE_STORE` | Laravel | database |
| `DB_PASSWORD` | Laravel | (secret) |
| `DB_USERNAME` | Laravel | (secret) |
| `LOG_CHANNEL` | Laravel | stderr |
| `DB_CONNECTION` | Laravel | pgsql |
| `SESSION_DRIVER` | Laravel | database |
| `POSTGRES_DB` | Postgres | laravel |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Blade, PHP, Dockerfile, Shell, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/laravel-or-php-84-on-frankenphp-with-pos)
