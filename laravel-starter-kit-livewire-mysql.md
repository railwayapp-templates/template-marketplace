# Deploy Laravel Starter Kit Livewire (MySQL) on Railway

Livewire starter kit powered by FrankenPHP and MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/laravel-starter-kit-livewire-mysql)

## About

Laravel Starter Kit Livewire (MySQL) offers a production-ready foundation based on the official Livewire Starter Kit. It deploys a Laravel application running on the Server Side Up FrankenPHP image, a managed MySQL database, and S3-compatible file storage via Railway Buckets, giving you a modern, scalable starting point with minimal setup.

Hosting Laravel Starter Kit Livewire (MySQL) on Railway provides a complete application architecture out of the box. The application service runs on the Server Side Up FrankenPHP image, while dedicated queue worker and scheduler services use the Server Side Up CLI image. A managed MySQL database is provisioned automatically, and file storage is handled via S3-compatible Railway Buckets. Environment variables are preconfigured for a smooth first deployment, and database migrations run automatically on startup through Server Side Up Laravel automations. Railway runs the infrastructure for you, letting you focus on shipping features.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Scheduler | [hosmelq/railway-template-laravel-starter-kit-livewire](https://github.com/hosmelq/railway-template-laravel-starter-kit-livewire) | Worker |
| APP | [hosmelq/railway-template-laravel-starter-kit-livewire](https://github.com/hosmelq/railway-template-laravel-starter-kit-livewire) | Web service |
| MySQL | `mysql:9.4` | Database |
| Queue | [hosmelq/railway-template-laravel-starter-kit-livewire](https://github.com/hosmelq/railway-template-laravel-starter-kit-livewire) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_URL` | Scheduler | - | Database connection URL. |
| `APP_ENV` | Scheduler | production | Application environment. |
| `APP_KEY` | Scheduler | base64:0Cjeqw0u0qki6ddp+2Npz5DemRkQhkmut7xCT5r9V7g= | Application encryption key. |
| `APP_URL` | Scheduler | - | Public application URL. |
| `AWS_BUCKET` | Scheduler | - | S3 compatible storage bucket name. |
| `LOG_CHANNEL` | Scheduler | stderr | Sends application logs to stderr. |
| `AWS_ENDPOINT` | Scheduler | - | S3 compatible storage endpoint URL. |
| `BCRYPT_ROUNDS` | Scheduler | 12 | Bcrypt work factor for password hashing. |
| `DB_CONNECTION` | Scheduler | mysql | Database driver. |
| `FILESYSTEM_DISK` | Scheduler | s3 | Default filesystem disk for uploads. |
| `AWS_ACCESS_KEY_ID` | Scheduler | - | S3 compatible storage access key. |
| `AWS_DEFAULT_REGION` | Scheduler | - | S3 compatible storage region. |
| `LOG_STDERR_FORMATTER` | Scheduler | \Monolog\Formatter\JsonFormatter | Formats stderr logs as JSON for structured logging. |
| `AWS_SECRET_ACCESS_KEY` | Scheduler | (secret) | S3 compatible storage secret key. |
| `DB_URL` | APP | - | Database connection URL. |
| `APP_ENV` | APP | production | Application environment. |
| `APP_KEY` | APP | base64:0Cjeqw0u0qki6ddp+2Npz5DemRkQhkmut7xCT5r9V7g= | Application encryption key. |
| `APP_URL` | APP | - | Public application URL. |
| `AWS_BUCKET` | APP | - | S3 compatible storage bucket name. |
| `LOG_CHANNEL` | APP | stderr | Sends application logs to stderr. |
| `AWS_ENDPOINT` | APP | - | S3 compatible storage endpoint URL. |
| `BCRYPT_ROUNDS` | APP | 12 | Bcrypt work factor for password hashing. |
| `DB_CONNECTION` | APP | mysql | Database driver. |
| `FILESYSTEM_DISK` | APP | s3 | Default filesystem disk for uploads. |
| `AWS_ACCESS_KEY_ID` | APP | - | S3 compatible storage access key. |
| `AWS_DEFAULT_REGION` | APP | - | S3 compatible storage region. |
| `LOG_STDERR_FORMATTER` | APP | \Monolog\Formatter\JsonFormatter | Formats stderr logs as JSON for structured logging. |
| `AWS_SECRET_ACCESS_KEY` | APP | (secret) | S3 compatible storage secret key. |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `DB_URL` | Queue | - | Database connection URL. |
| `APP_ENV` | Queue | production | Application environment. |
| `APP_KEY` | Queue | base64:0Cjeqw0u0qki6ddp+2Npz5DemRkQhkmut7xCT5r9V7g= | Application encryption key. |
| `APP_URL` | Queue | - | Public application URL. |
| `AWS_BUCKET` | Queue | - | S3 compatible storage bucket name. |
| `LOG_CHANNEL` | Queue | stderr | Sends application logs to stderr. |
| `AWS_ENDPOINT` | Queue | - | S3 compatible storage endpoint URL. |
| `BCRYPT_ROUNDS` | Queue | 12 | Bcrypt work factor for password hashing. |
| `DB_CONNECTION` | Queue | mysql | Database driver. |
| `FILESYSTEM_DISK` | Queue | s3 | Default filesystem disk for uploads. |
| `AWS_ACCESS_KEY_ID` | Queue | - | S3 compatible storage access key. |
| `AWS_DEFAULT_REGION` | Queue | - | S3 compatible storage region. |
| `LOG_STDERR_FORMATTER` | Queue | \Monolog\Formatter\JsonFormatter | Formats stderr logs as JSON for structured logging. |
| `AWS_SECRET_ACCESS_KEY` | Queue | (secret) | S3 compatible storage secret key. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** Blade, PHP, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/template/laravel-starter-kit-livewire-mysql)
