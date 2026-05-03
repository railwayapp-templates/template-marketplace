# Deploy Paymenter [Updated May '26] on Railway

Paymenter [May '26] (Billing, Invoicing & Client Management) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paymenter)

## About

Paymenter is an open-source billing and client management platform designed for hosting businesses. It automates subscription billing, invoice generation, service provisioning, and customer management with integrations for hosting panels like Pterodactyl, cPanel, Plesk, DirectAdmin, Virtualizor, and VirtFusion. Paymenter is a self-hosted alternative to WHMCS, Blesta, and HostBill.

Self hosting Paymenter means your billing records, client data, and payment configurations stay on infrastructure you control. There is no dependency on proprietary licensing or per-server fees. With Railway, the entire stack deploys automatically — MySQL, Redis, and the Paymenter application with Nginx and PHP-FPM are provisioned with persistent volumes and private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paymenter | [Shinyduo/paymenter](https://github.com/Shinyduo/paymenter) | Web service |
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | paymenter | 80 | - |
| `APP_ENV` | paymenter | production | - |
| `APP_NAME` | paymenter | Paymenter | - |
| `APP_DEBUG` | paymenter | false | - |
| `LOG_LEVEL` | paymenter | info | - |
| `APP_LOCALE` | paymenter | en | - |
| `ADMIN_EMAIL` | paymenter | admin@example.com | - |
| `CACHE_STORE` | paymenter | redis | - |
| `DB_PASSWORD` | paymenter | (secret) | - |
| `DB_USERNAME` | paymenter | (secret) | - |
| `LOG_CHANNEL` | paymenter | stack | - |
| `APP_TIMEZONE` | paymenter | UTC | - |
| `COMPANY_NAME` | paymenter | Paymenter | - |
| `DB_CONNECTION` | paymenter | mysql | - |
| `ADMIN_PASSWORD` | paymenter | (secret) | - |
| `REDIS_PASSWORD` | paymenter | (secret) | - |
| `QUEUE_CONNECTION` | paymenter | redis | - |
| `SESSION_LIFETIME` | paymenter | 120 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage/app/public`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paymenter)
