# Deploy Deploy Ghost on Railway on Railway

Ghost allows you to build a website, publish content, newsletters & more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_tnMWG)

## About

## Description

This template deploys [Ghost](https://ghost.org/) with a MySQL database integrated.

## Installation

- Just click on the Railway button and deploy it.
- No special config is required, you can leave default parameters.
- The app will be available after a minute on the generated Railway URL.

If you found this helpful, or have any question, follow me on [X/Twitter : @LeBugArtisan](https://twitter.com/LeBugArtisan)

## Useful links

- Ghost config docs: [https://ghost.org/docs/config/](https://ghost.org/docs/config/)
- Docker image: [https://hub.docker.com/\_/ghost](https://hub.docker.com/_/ghost)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ghost:latest | `ghost:latest` | Web service |
| MySQL | `mysql` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `url` | ghost:latest | - | Ghost's url |
| `PORT` | ghost:latest | 2368 | Ghost exposes this port but your app will be accessible normally in https. |
| `NODE_ENV` | ghost:latest | production | production or development |
| `database__client` | ghost:latest | mysql | - |
| `database__connection__user` | ghost:latest | (secret) | - |
| `database__connection__password` | ghost:latest | (secret) | - |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/_tnMWG)
