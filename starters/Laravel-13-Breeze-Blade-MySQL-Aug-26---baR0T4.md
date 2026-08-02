# Deploy Laravel 13 Breeze Blade MySQL  [Aug 26] on Railway

[Aug 26] Laravel 13 Breeze auth starter with MySQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baR0T4)

## About

---
title: Laravel 13 Breeze Blade MySQL
description: Laravel 13 starter with Breeze authentication (login, register, profile) and MySQL — deploy in one click on Railway.
tags:
  - php
  - laravel 13
  - breeze
  - blade
  - auth
  - mysql
---

<p align="center"><a href="https://laravel.com"><img alt="Laravel Logo" width="400" src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg"></a></p>

# Laravel 13 Breeze Blade MySQL

**Laravel 13 + Breeze (Blade) + MySQL** — a production-ready authentication starter that deploys on Railway in one click. No configuration needed: the MySQL database is provisioned automatically and migrations run on every deploy.

## ✨ Why use this template?

- ✅ **Full authentication out of the box** — register, login, logout, email verification, password reset, and profile management with [Laravel Breeze](https://laravel.com/docs/starter-kits) (Blade stack)
- 🚀 **Laravel 13** — the latest stable release, running on PHP 8.4+ with [FrankenPHP](https://frankenphp.dev/)
- 🎨 **Blade + Tailwind CSS 4 + Vite** — modern frontend tooling, no build step to configure
- 🗄️ **MySQL included** — Railway provisions the database automatically and injects the connection string (`DB_URL`)
- ⚙️ **Zero-config deploy** — database migrations run automatically on every deploy via Railpack
- 🛡️ **Secure defaults** — healthcheck at `/up`, restart policy, and logs to stdout

## Deploy and Host

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/baR0T4?referralCode=2Sbs5r)

Click the button above to deploy this template on [Railway](https://railway.com). Railway will provision a MySQL database, connect it to your app, run the migrations, and give you a public URL — in about 2 minutes.

### What you get

| Service | Description |
|---|---|
| Laravel 13 app | Breeze Blade auth stack, served by FrankenPHP |
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
| laravel-breeze-blade | [marco-quintella/laravel-breeze-blade](https://github.com/marco-quintella/laravel-breeze-blade) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | laravel-breeze-blade | local | - |
| `APP_KEY` | laravel-breeze-blade | base64:6HvFxdT6dJMnpSXn3X4GE+5IiD7VCAuV4SSWVd0Jzq4= | - |
| `APP_URL` | laravel-breeze-blade | http://laravel-breeze-blade.test | - |
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
| `DB_CONNECTION` | laravel-breeze-blade | sqlite | DB_HOST=127.0.0.1 |
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
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** PHP, Blade, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/baR0T4)
