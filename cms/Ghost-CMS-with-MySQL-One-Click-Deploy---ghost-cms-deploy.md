# Deploy Ghost CMS with MySQL | One-Click Deploy on Railway

Self Host Ghost CMS + MySQL + SMTP — publishing platform on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-cms-deploy)

## About

Deploy a self-hosted Ghost CMS instance on Railway in minutes. This template provisions Ghost (`ghost:alpine`) backed by a managed MySQL database, with all service wiring handled automatically — no manual config files, no server setup.
![Ghost railway arch](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773090256/Ghost_railway_arch_j8jzth.png)

Ghost is an open-source, Node.js-based publishing platform built for professional content creators. Unlike bloated CMS platforms, Ghost ships with a focused editor, native membership/subscription support, and a built-in email newsletter engine.

**Key features:**
- Markdown-first editor with card-based content blocks
- Native memberships, subscriptions, and paid tiers
- Built-in email newsletters with post-send link editing
- ActivityPub / Social Web support (Ghost 6.0+)
- RESTful Content and Admin APIs for headless use cases
- Cookie-free, first-party analytics (Ghost 6.0+)

**Architecture:** This template runs two services — `ghost:alpine` and a MySQL 8 database. Ghost connects to MySQL over Railway's private network, keeping database traffic off the public internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Ghost | `ghost:alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Internal hostname for MySQL server |
| `MYSQLPORT` | MySQL | 3306 | Default MySQL server port |
| `MYSQLUSER` | MySQL | root | MySQL root administrator username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | MySQL database name variable |
| `MYSQLPASSWORD` | MySQL | (secret) | Password used for MySQL authentication |
| `MYSQL_DATABASE` | MySQL | railway | Default database created on startup |
| `MYSQL_PUBLIC_URL` | MySQL | - | External MySQL connection string |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL server |
| `url` | Ghost | - | Public URL of Ghost site |
| `PORT` | Ghost | 2368 | HTTP server listening port |
| `mail__from` | Ghost | - | Sender email address for Ghost |
| `mail__transport` | Ghost | SMTP | Email transport method |
| `database__client` | Ghost | mysql | Database engine used by Ghost |
| `mail__options__host` | Ghost | - | SMTP server hostname |
| `mail__options__port` | Ghost | - | SMTP server port |
| `mail__options__auth__pass` | Ghost | - | SMTP authentication password |
| `mail__options__auth__user` | Ghost | (secret) | SMTP authentication username |
| `database__connection__host` | Ghost | - | MySQL server hostname |
| `database__connection__port` | Ghost | - | MySQL server listening port |
| `database__connection__user` | Ghost | (secret) | MySQL database username |
| `database__connection__database` | Ghost | - | MySQL database name for Ghost |
| `database__connection__password` | Ghost | (secret) | Password for MySQL authentication |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-cms-deploy)
