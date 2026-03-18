# Deploy PERSCOM on Railway

Mission critical tools built specifically for high-speed organizations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/perscom)

## About

Laravel Community is a modern, full-featured marketplace platform that combines e-commerce, user marketplaces, community forums, and content management into one seamless experience. Built with Laravel 12 and React 19, it's designed for communities looking to create their own digital ecosystem with professional-grade features.

Deploying Laravel Community involves orchestrating multiple services working together: a PHP application server, database, Redis cache, queue workers, and file storage. The platform requires environment configuration for payment processing (Stripe), email services, OAuth providers (Discord, Roblox), and optional monitoring tools. Railway simplifies this by providing a unified deployment platform where all these services can be configured and scaled together. The included Dockerfile and docker-compose configuration make deployment straightforward, while the modular architecture allows you to enable only the features your community needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PERSCOM | `ghcr.io/deschutesdesigngroupllc/perscom-app:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:8.4` | Database |
| Scheduled Tasks | `ghcr.io/deschutesdesigngroupllc/perscom-app-cli:latest` | Worker |
| Queue | `ghcr.io/deschutesdesigngroupllc/perscom-app-cli:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_ENV` | PERSCOM | production |
| `JWT_ALGO` | PERSCOM | HS256 |
| `APP_DEBUG` | PERSCOM | true |
| `MAIL_HOST` | PERSCOM | 127.0.0.1 |
| `MAIL_PORT` | PERSCOM | 2525 |
| `APP_LOCALE` | PERSCOM | en |
| `APP_SCHEME` | PERSCOM | https |
| `JWT_SECRET` | PERSCOM | (secret) |
| `WIDGET_URL` | PERSCOM | https://widget.perscom.io/widget.js |
| `API_VERSION` | PERSCOM | v2 |
| `APP_VERSION` | PERSCOM | v1.0.0 |
| `CACHE_STORE` | PERSCOM | redis |
| `DB_PASSWORD` | PERSCOM | (secret) |
| `DB_USERNAME` | PERSCOM | (secret) |
| `LOG_CHANNEL` | PERSCOM | stderr |
| `MAIL_MAILER` | PERSCOM | log |
| `MAIL_SCHEME` | PERSCOM | null |
| `SESSION_PATH` | PERSCOM | / |
| `DB_CONNECTION` | PERSCOM | mysql |
| `MAIL_USERNAME` | PERSCOM | (secret) |
| `REDIS_PASSWORD` | PERSCOM | (secret) |
| `REDIS_USERNAME` | PERSCOM | (secret) |
| `SESSION_DOMAIN` | PERSCOM | null |
| `SESSION_DRIVER` | PERSCOM | redis |
| `TENANT_ENABLED` | PERSCOM | false |
| `AUTORUN_ENABLED` | PERSCOM | true |
| `FILESYSTEM_DISK` | PERSCOM | s3 |
| `MAIL_ENCRYPTION` | PERSCOM | null |
| `SESSION_ENCRYPT` | PERSCOM | false |
| `QUEUE_CONNECTION` | PERSCOM | redis |
| `SESSION_LIFETIME` | PERSCOM | 120 |
| `MAIL_FROM_ADDRESS` | PERSCOM | hello@example.com |
| `BROADCAST_CONNECTION` | PERSCOM | log |
| `AWS_SECRET_ACCESS_KEY` | PERSCOM | (secret) |
| `AUTORUN_LARAVEL_MIGRATION` | PERSCOM | false |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `JWT_ALGO` | Scheduled Tasks | HS256 |
| `MAIL_HOST` | Scheduled Tasks | 127.0.0.1 |
| `MAIL_PORT` | Scheduled Tasks | 2525 |
| `APP_LOCALE` | Scheduled Tasks | en |
| `APP_SCHEME` | Scheduled Tasks | https |
| `JWT_SECRET` | Scheduled Tasks | (secret) |
| `WIDGET_URL` | Scheduled Tasks | https://widget.perscom.io/widget.js |
| `CACHE_STORE` | Scheduled Tasks | redis |
| `DB_PASSWORD` | Scheduled Tasks | (secret) |
| `DB_USERNAME` | Scheduled Tasks | (secret) |
| `LOG_CHANNEL` | Scheduled Tasks | stderr |
| `MAIL_MAILER` | Scheduled Tasks | log |
| `MAIL_SCHEME` | Scheduled Tasks | null |
| `SESSION_PATH` | Scheduled Tasks | / |
| `DB_CONNECTION` | Scheduled Tasks | mysql |
| `MAIL_USERNAME` | Scheduled Tasks | (secret) |
| `REDIS_PASSWORD` | Scheduled Tasks | (secret) |
| `REDIS_USERNAME` | Scheduled Tasks | (secret) |
| `SESSION_DOMAIN` | Scheduled Tasks | null |
| `SESSION_DRIVER` | Scheduled Tasks | redis |
| `TENANT_ENABLED` | Scheduled Tasks | false |
| `FILESYSTEM_DISK` | Scheduled Tasks | s3 |
| `MAIL_ENCRYPTION` | Scheduled Tasks | null |
| `SESSION_ENCRYPT` | Scheduled Tasks | false |
| `QUEUE_CONNECTION` | Scheduled Tasks | redis |
| `SESSION_LIFETIME` | Scheduled Tasks | 120 |
| `MAIL_FROM_ADDRESS` | Scheduled Tasks | hello@example.com |
| `BROADCAST_CONNECTION` | Scheduled Tasks | log |
| `AWS_SECRET_ACCESS_KEY` | Scheduled Tasks | (secret) |
| `JWT_ALGO` | Queue | HS256 |
| `MAIL_HOST` | Queue | 127.0.0.1 |
| `MAIL_PORT` | Queue | 2525 |
| `APP_LOCALE` | Queue | en |
| `APP_SCHEME` | Queue | https |
| `JWT_SECRET` | Queue | (secret) |
| `WIDGET_URL` | Queue | https://widget.perscom.io/widget.js |
| `CACHE_STORE` | Queue | redis |
| `DB_PASSWORD` | Queue | (secret) |
| `DB_USERNAME` | Queue | (secret) |
| `LOG_CHANNEL` | Queue | stderr |
| `MAIL_MAILER` | Queue | log |
| `MAIL_SCHEME` | Queue | null |
| `SESSION_PATH` | Queue | / |
| `DB_CONNECTION` | Queue | mysql |
| `MAIL_USERNAME` | Queue | (secret) |
| `REDIS_PASSWORD` | Queue | (secret) |
| `REDIS_USERNAME` | Queue | (secret) |
| `SESSION_DOMAIN` | Queue | null |
| `SESSION_DRIVER` | Queue | redis |
| `TENANT_ENABLED` | Queue | false |
| `FILESYSTEM_DISK` | Queue | s3 |
| `MAIL_ENCRYPTION` | Queue | null |
| `SESSION_ENCRYPT` | Queue | false |
| `QUEUE_CONNECTION` | Queue | redis |
| `SESSION_LIFETIME` | Queue | 120 |
| `MAIL_FROM_ADDRESS` | Queue | hello@example.com |
| `BROADCAST_CONNECTION` | Queue | log |
| `AWS_SECRET_ACCESS_KEY` | Queue | (secret) |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `php /var/www/html/artisan schedule:work`
- **Start command:** `php /var/www/html/artisan horizon`

**Category:** CMS

[View on Railway →](https://railway.com/template/perscom)
