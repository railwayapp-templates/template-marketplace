# Deploy FlowiseAI + MySQL on Railway

FlowiseAI + MySQL Database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/XcRehu)

## About

This template integrates FlowiseAI with a MySQL database.

All necessary variables are already pre-filled to help you get started instantly.

### Steps to get started:

1. Fill in values for these two variables for FlowiseAI:
  * `FLOWISE_USERNAME`
  * `FLOWISE_PASSWORD`
2. Deploy

Video guide: https://youtu.be/AXp4cI8Umm4

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| Flowise | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Flowise | 8080 | - |
| `LOG_PATH` | Flowise | /opt/railway/.flowise/logs | - |
| `APIKEY_PATH` | Flowise | /opt/railway/.flowise | - |
| `DATABASE_TYPE` | Flowise | mysql | - |
| `DATABASE_USER` | Flowise | (secret) | - |
| `SECRETKEY_PATH` | Flowise | (secret) | - |
| `FLOWISE_PASSWORD` | Flowise | (secret) | - |
| `FLOWISE_USERNAME` | Flowise | (secret) | - |
| `BLOB_STORAGE_PATH` | Flowise | /opt/railway/.flowise/storage | - |
| `DATABASE_PASSWORD` | Flowise | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/railway/.flowise`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, SCSS, HTML, Dockerfile, Shell, Batchfile

[View on Railway →](https://railway.com/template/XcRehu)
