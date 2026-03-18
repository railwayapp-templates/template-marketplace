# Deploy Laravel Breeze Blade MySQL on Railway

Laravel Breeze Blade MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baR0T4)

## About

<p align="center"><a href="https://laravel.com"><img alt="Laravel Logo" width="400" src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img alt="Build Status" src="https://github.com/laravel/framework/workflows/tests/badge.svg"></a>
<a href="https://packagist.org/packages/laravel/framework"><img alt="Total Downloads" src="https://img.shields.io/packagist/dt/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"><img alt="Latest Stable Version" src="https://img.shields.io/packagist/v/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"><img alt="License" src="https://img.shields.io/packagist/l/laravel/framework"></a>
</p>

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/baR0T4?referralCode=2Sbs5r)

## About this template

- PHP
- Laravel 11 Breeze with Blade Template Engine
- MySQL
- Initial migration pre-configured, remember to remove it from nixpacks config in production

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
