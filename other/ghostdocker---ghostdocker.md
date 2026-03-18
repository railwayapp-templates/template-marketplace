# Deploy ghost_docker on Railway

A template for ghost with mysql on railway that uses api for email delivery

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ghostdocker)

## About

Ghost is a powerful open-source headless CMS built for modern publishing. This template deploys a production-ready Ghost instance with MySQL database, perfect for blogs, newsletters, and membership sites - all configured for migrant entrepreneur news platforms like Peakberg.

This template provides a one-click deployment of Ghost CMS with MySQL on Railway. It includes pre-configured email support (Mailgun/API), automatic SSL certificates, and healthcheck monitoring. Ghost boots in production mode with optimized performance settings. The setup supports custom domains, newsletter functionality, and member subscriptions out of the box. Perfect for content creators, publishers, and founders who want to launch quickly without infrastructure headaches. All environment variables are templated for easy customization. 
NB: api not smtp as railway not support smtp

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL-bZW4 | `mysql:9.4` | Database |
| ghost:latest | `ghost:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQLPORT` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQLUSER` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQL_URL` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQLDATABASE` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQLPASSWORD` | MySQL-bZW4 | (secret) | links to mysql on same project |
| `MYSQL_DATABASE` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQL_PUBLIC_URL` | MySQL-bZW4 | - | links to mysql on same project |
| `MYSQL_ROOT_PASSWORD` | MySQL-bZW4 | (secret) | links to mysql on same project |
| `url` | ghost:latest | - | your hosted domain url eg: https://peakberg.com |
| `PORT` | ghost:latest | - | port |
| `NODE_ENV` | ghost:latest | - | specify production or development |
| `mail__from` | ghost:latest | - | ur registered mail address on mailgun or else where |
| `mail__transport` | ghost:latest | Mailgun | Ghost uses Mailgun in the nodemailer internally |
| `database__client` | ghost:latest | - | links to mysql on same project |
| `database__connection__host` | ghost:latest | - | links to mysql on same project |
| `database__connection__port` | ghost:latest | - | links to mysql on same project |
| `database__connection__user` | ghost:latest | (secret) | links to mysql on same project |
| `mail__options__auth__apiKey` | ghost:latest | - | generate an api key on mailgun |
| `mail__options__auth__domain` | ghost:latest | - | ur domain or provided in mailgun api setup |
| `database__connection__database` | ghost:latest | - | links to mysql on same project |
| `database__connection__password` | ghost:latest | (secret) | links to mysql on same project |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/ghostdocker)
