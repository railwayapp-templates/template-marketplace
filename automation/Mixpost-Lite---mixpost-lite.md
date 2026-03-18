# Deploy Mixpost Lite on Railway

Social media management tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mixpost-lite)

## About

Mixpost Lite is a free, open-source, self-hosted social media management tool. It allows you to create, schedule, publish, and manage social media content across Facebook Pages, X (Twitter), and Mastodon from a single dashboard—without monthly subscription fees, artificial limits, or vendor lock-in. Think of it as a self-hosted alternative to Buffer or Hootsuite.

Hosting Mixpost Lite requires running a Laravel-based PHP application with supporting services. The core application handles the web interface and scheduling logic, while MySQL stores your posts, accounts, and workspace data. Redis manages the queue system for background jobs like publishing scheduled posts and fetching analytics. The application needs a publicly accessible domain to communicate with social platform APIs for OAuth authentication and content publishing. Environment variables configure database connections, application URLs, and encryption keys for secure data storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mixpost | `inovector/mixpost` | Web service |
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_KEY` | mixpost | - | Key used to encrypt and decrypt sensitive data. Generate this using the following tool: https://mixpost.app/tools/encryption-key-generator |
| `APP_URL` | mixpost | - | Full application URL is automatically configured |
| `APP_NAME` | mixpost | - | The name of your application. |
| `APP_DEBUG` | mixpost | false | Debug mode setting. Set to `false` for production environments. |
| `REDIS_URL` | mixpost | - | Redis connection URL |
| `APP_DOMAIN` | mixpost | - | Your app's domain or subdomain, without the 'http://' or 'https://' prefix. |
| `DB_DATABASE` | mixpost | - | MySQL connection DB |
| `DB_PASSWORD` | mixpost | (secret) | MySQL connection Password |
| `DB_USERNAME` | mixpost | (secret) | MySQL username |
| `REDISHOST` | Redis | - | Redis Host |
| `REDISPORT` | Redis | 6379 | Redis Port |
| `REDISUSER` | Redis | default | Redis User |
| `REDIS_URL` | Redis | - | Redis URL |
| `REDISPASSWORD` | Redis | (secret) | Redis Password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis Password |
| `REDIS_PUBLIC_URL` | Redis | - | Redis Public URL |
| `MYSQLHOST` | MySQL | - | MySQL Host |
| `MYSQLPORT` | MySQL | 3306 | MySQL Port |
| `MYSQLUSER` | MySQL | root | MySQL user |
| `MYSQL_URL` | MySQL | - | MySQL URL |
| `MYSQLDATABASE` | MySQL | - | MySQL DB |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL Password |
| `MYSQL_DATABASE` | MySQL | railway | MySQL DB |
| `MYSQL_PUBLIC_URL` | MySQL | - | MySQL Public URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | MySQL Root password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Automation

[View on Railway →](https://railway.com/template/mixpost-lite)
