# Deploy wallabag on Railway

Save and classify articles. Read them later. Freely.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wallabag)

## About

Hosting [wallabag](https://wallabag.org/) involves running the application server, configuring a database for storing saved articles and metadata, and setting up persistent storage and environment variables. Because wallabag is built with PHP and Symfony, deployments typically run through a PHP runtime with a web server like Nginx or Apache.

A typical deployment also requires configuring background jobs for importing articles and managing feeds, setting up email settings for notifications, and enabling HTTPS access. When deployed on a platform like [Railway](https://railway.com), the infrastructure layer—such as container hosting, networking, and scaling—is managed for you, simplifying setup and ongoing maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MariaDB | `mariadb:latest` | Database |
| wallabag | `wallabag/wallabag` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `MARIADB_PORT` | MariaDB | 3306 | - |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | - |
| `PORT` | wallabag | 80 | Webserver port |
| `SMTP_HOST` | wallabag | - | Example: smtp.resend.com |
| `SMTP_PORT` | wallabag | 465 | Defaults to 465 |
| `SMTP_USER` | wallabag | (secret) | Example: resend |
| `SMTP_DOMAIN` | wallabag | - | Example: mydomain.com (the sending domain on resend.com) |
| `SMTP_PASSWORD` | wallabag | (secret) | Example: re_234234234234234324234234 |
| `MYSQL_ROOT_PASSWORD` | wallabag | (secret) | - |
| `SYMFONY__ENV__SECRET` | wallabag | (secret) | - |
| `ENABLE_USER_REGISTRATION` | wallabag | - | Enable/Disable user registration on landing page: "true" or "false". Set to "true" initially to create your first user. |
| `SYMFONY__ENV__SERVER_NAME` | wallabag | Wallabag | - |
| `SYMFONY__ENV__DATABASE_NAME` | wallabag | wallabag | - |
| `SYMFONY__ENV__DATABASE_USER` | wallabag | (secret) | - |
| `SYMFONY__ENV__REDIS_PASSWORD` | wallabag | (secret) | - |
| `SYMFONY__ENV__DATABASE_DRIVER` | wallabag | pdo_mysql | - |
| `SYMFONY__ENV__DATABASE_CHARSET` | wallabag | utf8mb4 | - |
| `SYMFONY__ENV__DATABASE_PASSWORD` | wallabag | (secret) | - |
| `SYMFONY__ENV__DATABASE_TABLE_PREFIX` | wallabag | wallabag_ | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/wallabag/web/assets/images`

**Category:** Other

[View on Railway →](https://railway.com/template/wallabag)
