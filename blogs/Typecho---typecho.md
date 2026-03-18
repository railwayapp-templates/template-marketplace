# Deploy Typecho on Railway

Typecho with nightly-php7.4-apache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typecho)

## About

Typecho with official docker image nightly-php7.4-apache.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| typecho | `joyqi/typecho:nightly-php7.4-apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | typecho | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `MAX_POST_BODY` | typecho | 50M | - |
| `TYPECHO_DB_NEXT` | typecho | keep | - |
| `TYPECHO_DB_USER` | typecho | (secret) | - |
| `TYPECHO_INSTALL` | typecho | 1 | - |
| `TYPECHO_SITE_URL` | typecho | - | fill with https:// |
| `TYPECHO_DB_ADAPTER` | typecho | Pdo_Mysql | - |
| `TYPECHO_DB_CHARSET` | typecho | utf8mb4 | - |
| `TYPECHO_DB_PASSWORD` | typecho | (secret) | - |
| `TYPECHO_USER_PASSWORD` | typecho | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/usr`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/typecho)
