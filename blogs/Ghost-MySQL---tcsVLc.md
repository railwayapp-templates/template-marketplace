# Deploy Ghost + MySQL on Railway

Self-hosted Ghost with MySQL and persistent volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tcsVLc)

## About

###Overview
[Ghost](https://ghost.org/) is a full-featured blogging platform and an open-source alternative to Medium, Substack, WordPress etc. It offers a comprehensive set of features to publish content, send newsletters, and offer paid subscriptions to members. It also offers detailed engagement analytics for your audience and content.

###Template
This template deploys the community-maintained [Docker](https://hub.docker.com/_/ghost) image, along with an attached volume and a separate MySQL database, so that configuration and content can persist across deployments.

Note: Once deployed, launch https://[RAILWAY_URL]/ghost to access the admin page and set up Ghost for the first time.

###Mail Configuration
If you want to send transactional emails, please configure the following optional variables with valid details:
* `mail__from`: 
* `mail__transport`: SMTP
* `mail__options__host`: 
* `mail__options__port`:
* `mail__options__auth__user`:
* `mail__options__auth__pass`: 

For bulk email newsletter delivery, you'll also need to configure the Mailgun service from Ghost Settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8` | Database |
| ghost | `ghost:alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | ghost | 2368 | - |
| `mail__transport` | ghost | SMTP | - |
| `database__client` | ghost | mysql | - |
| `mail__options__auth__user` | ghost | (secret) | - |
| `database__connection__user` | ghost | (secret) | - |
| `database__connection__password` | ghost | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** Blogs

[View on Railway →](https://railway.com/template/tcsVLc)
