# Deploy Ghost with MySQL on Railway

Modern publishing platform with built-in newsletters and subscriptions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-with-mysql)

## About

Ghost is a modern, open-source publishing platform designed for professional creators, businesses, and independent publishers. It provides everything needed to run a content-driven business, including website publishing, newsletters, email marketing, memberships, and paid subscriptions, all from a single platform powered by MySQL.

Deploying Ghost with MySQL on Railway provides a scalable and production-ready publishing platform without the complexity of managing infrastructure. This template automatically provisions Ghost alongside a MySQL database, allowing you to launch a professional blog, newsletter, membership site, or digital publication in minutes. Railway manages networking, HTTPS, deployments, and database connectivity, while Ghost provides an intuitive content management experience with built-in support for SEO, newsletters, member management, and subscription-based monetization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ghost | `ghost:alpine` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Ghost | 2368 | - |
| `mail__transport` | Ghost | SMTP | - |
| `database__client` | Ghost | mysql | - |
| `mail__options__auth__user` | Ghost | (secret) | - |
| `database__connection__user` | Ghost | (secret) | - |
| `database__connection__password` | Ghost | (secret) | - |
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
- **Volume:** `/var/lib/ghost/content`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-with-mysql)
