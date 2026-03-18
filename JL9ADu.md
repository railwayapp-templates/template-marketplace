# Deploy Laravel Blade MySQL on Railway

This is a Laravel blade starter app connected to a Railway MySQL database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JL9ADu)

## About

# Laravel Starter Example

This is a [Laravel](https://laravel.com/) blade starter app that is connected to a Railway MySQL database.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/JL9ADu?referralCode=2Sbs5r)

## ✨ Features

- PHP
- Laravel
- Postgres

## 📝 Notes

- **Env**: Envs are standard except DB URL that is configured in Railway not in env file.
- **Web server port**: App runs in port 8080.
- **Logging**: Logs are being sent to stdout and can be accessed via `railway logs`.
- **Migrations**: Migrations are run on deploy, remember to remove on production.


<p align="center"><a href="https://laravel.com"><img alt="Laravel Logo" width="400" src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img alt="Build Status" src="https://github.com/laravel/framework/workflows/tests/badge.svg"></a>
<a href="https://packagist.org/packages/laravel/framework"><img alt="Total Downloads" src="https://img.shields.io/packagist/dt/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"><img alt="Latest Stable Version" src="https://img.shields.io/packagist/v/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"><img alt="License" src="https://img.shields.io/packagist/l/laravel/framework"></a>
</p>

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

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

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

[View on Railway →](https://railway.com/template/JL9ADu)
