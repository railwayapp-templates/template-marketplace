# Deploy Laravel 12, PHP 8.4, MySQL 8.4 on Railway

Consistent dev/production setup for Laravel 12 with Railway deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laravel-12-php-84-mysql-84)

## About

Laravel 12 is the latest version of the popular PHP framework, featuring enhanced performance and modern syntax. This template combines it with PHP 8.4's cutting-edge features and MySQL 8.4's improved performance, all configured with Docker Sail for consistent development environments.

This template provides a minimal Laravel 12 application stack with Docker containerization via Laravel Sail. It includes a pre-configured MySQL 8.4 database, PHP 8.4 runtime with all necessary extensions, and nginx web server. The setup ensures identical environments between local development and Railway production deployment, eliminating the common "works on my machine" problem. Railway automatically handles container orchestration, scaling, and SSL certificates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Laravel-12 | [legierski/laravel-12-railway](https://github.com/legierski/laravel-12-railway) | Web service |
| MySQL-84 | `mysql:8.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_ENV` | Laravel-12 | preview |
| `APP_URL` | Laravel-12 | http://localhost |
| `APP_NAME` | Laravel-12 | Laravel 12 |
| `APP_DEBUG` | Laravel-12 | true |
| `DB_PASSWORD` | Laravel-12 | (secret) |
| `DB_USERNAME` | Laravel-12 | (secret) |
| `DB_CONNECTION` | Laravel-12 | mysql |
| `MYSQLPORT` | MySQL-84 | 3306 |
| `MYSQLUSER` | MySQL-84 | root |
| `MYSQLPASSWORD` | MySQL-84 | (secret) |
| `MYSQL_DATABASE` | MySQL-84 | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL-84 | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Blade, PHP, Dockerfile, Shell, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/laravel-12-php-84-mysql-84)
