# Deploy Mixpost [Updated Mar ’26] on Railway

Mixpost [Mar ’26] (Plan, Schedule & Manage Social Posts Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mixpost)

## About

Mixpost is a free, open-source social media management platform available on GitHub. It allows you to schedule, publish, and manage posts across multiple social media platforms from one unified dashboard. Designed for creators, startups, and businesses that value simplicity and control, Mixpost offers a privacy-focused, self-hosted alternative to tools like Buffer, Hootsuite, and Later.

![Mixpost multi-account management interface for agencies handling multiple brands
Image](https://res.cloudinary.com/dojdzamvk/image/upload/Screenshot_2025-10-23_at_11.45.02_AM_he7xie "Self Hosting Mixpost server on Railway)

With Railway, you can deploy Mixpost in a single click, removing the hassle of setting up servers, configuring databases, or managing hosting environments manually. This means you can focus entirely on your social media strategy while Railway handles performance, uptime, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inovector/mixpost-pro-team:latest | `inovector/mixpost-pro-team:latest` | Web service |
| MySQL | `mysql:9.4` | Database |
| eqalpha/keydb:latest | `eqalpha/keydb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | inovector/mixpost-pro-team:latest | 80 | - |
| `APP_KEY` | inovector/mixpost-pro-team:latest | base64:${secret(43, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")}= | - |
| `APP_URL` | inovector/mixpost-pro-team:latest | https://${RAILWAY_PUBLIC_DOMAIN} | - |
| `DB_HOST` | inovector/mixpost-pro-team:latest | ${MySQL.RAILWAY_PRIVATE_DOMAIN} | - |
| `DB_PORT` | inovector/mixpost-pro-team:latest | 3306 | - |
| `APP_NAME` | inovector/mixpost-pro-team:latest | Mixpost | - |
| `REDIS_HOST` | inovector/mixpost-pro-team:latest | ${KeyDB.KEYDB_HOST} | - |
| `REDIS_PORT` | inovector/mixpost-pro-team:latest | ${KeyDB.KEYDB_PORT} | - |
| `DB_DATABASE` | inovector/mixpost-pro-team:latest | ${MySQL.MYSQL_DATABASE} | - |
| `DB_PASSWORD` | inovector/mixpost-pro-team:latest | (secret) | - |
| `DB_USERNAME` | inovector/mixpost-pro-team:latest | (secret) | - |
| `REDIS_PASSWORD` | inovector/mixpost-pro-team:latest | (secret) | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `KEYDB_URL` | eqalpha/keydb:latest | redis://${KEYDB_USER}:${KEYDB_PASSWORD}@${KEYDB_HOST}:${KEYDB_PORT} | - |
| `KEYDB_HOST` | eqalpha/keydb:latest | ${RAILWAY_PRIVATE_DOMAIN} | - |
| `KEYDB_PORT` | eqalpha/keydb:latest | 6379 | - |
| `KEYDB_USER` | eqalpha/keydb:latest | (secret) | - |
| `KEYDB_PASSWORD` | eqalpha/keydb:latest | (secret) | - |
| `KEYDB_PUBLIC_URL` | eqalpha/keydb:latest | redis://${KEYDB_USER}:${KEYDB_PASSWORD}@${KEYDB_PUBLIC_HOST}:${KEYDB_PUBLIC_PORT} | - |
| `KEYDB_PUBLIC_HOST` | eqalpha/keydb:latest | ${RAILWAY_TCP_PROXY_DOMAIN} | - |
| `KEYDB_PUBLIC_PORT` | eqalpha/keydb:latest | ${RAILWAY_TCP_PROXY_PORT} | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mixpost)
