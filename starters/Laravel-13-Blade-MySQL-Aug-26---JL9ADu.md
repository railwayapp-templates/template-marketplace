# Deploy Laravel 13 Blade MySQL [Aug 26] on Railway

Laravel 13 Blade starter with MySQL. One-click deploy on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JL9ADu)

## About

---
title: Laravel 13 Blade MySQL Starter
description: Laravel 13 blade starter with MySQL — deploy in one click on Railway. Zero-config, migrations on deploy, FrankenPHP.
tags:
  - php
  - laravel 13
  - blade
  - mysql
---

# Laravel 13 Blade MySQL Starter

**Laravel 13 + Blade + MySQL** — a clean, production-ready Laravel starter that deploys on Railway in one click. No configuration needed: the MySQL database is provisioned automatically and migrations run on every deploy.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/JL9ADu?referralCode=2Sbs5r)

## ✨ Why use this template?

- 🚀 **Laravel 13** — the latest stable release, running on PHP 8.4+ with [FrankenPHP](https://frankenphp.dev/)
- 🎨 **Blade + Tailwind CSS 4 + Vite** — modern frontend tooling, no build step to configure
- 🗄️ **MySQL included** — Railway provisions the database automatically and injects the connection string (`DB_URL`)
- ⚙️ **Zero-config deploy** — database migrations run automatically on every deploy via Railpack
- 🛡️ **Secure defaults** — healthcheck at `/up`, restart policy, and logs to stdout
- 📦 **Minimal** — just the skeleton you need to start building your app

## Deploy and Host

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/JL9ADu?referralCode=2Sbs5r)

Click the button above to deploy this template on [Railway](https://railway.com). Railway will provision a MySQL database, connect it to your app, run the migrations, and give you a public URL — in about 2 minutes.

### What you get

| Service | Description |
|---|---|
| Laravel 13 app | Blade starter served by FrankenPHP |
| MySQL | Managed database, auto-connected via `DB_URL` |

## 🚀 Local Development

```bash
cp .env.example .env
composer install
npm install
npm run build
php artisan serve
```

## 📝 Notes

- **Database**: Laravel auto-selects MySQL when `DB_URL` is set (falls back to SQLite for local dev).
- **Migrations**: Run automatically on every deploy (idempotent).
- **Healthcheck**: `/up` route (registered in `bootstrap/app.php`).
- **Logging**: Logs go to stdout, viewable via `railway logs`.

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

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

**Category:** Starters · **Languages:** PHP, Blade, JavaScript

[View on Railway →](https://railway.com/deploy/JL9ADu)
