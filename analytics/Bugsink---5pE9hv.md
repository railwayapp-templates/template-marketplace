# Deploy Bugsink on Railway

Self-hosted Error Tracking. Sentry-SDK compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5pE9hv)

## About

# Bugsink

 ![](https://www.bugsink.com/static/images/bugsink-logo.7a9597e724ff.webp)

#### Error tracking

- Get notified about errors in your applications as they happen.

- All the information needed to triage and fix them in a single location.

#### Built to self-host

- Have full control over your data by running Bugsink on servers that you own or rent yourself.

- Installation is easy, and we provide detailed instructions to help you get started.

#### Sentry Compatible

- To report errors to Bugsink, you only need to add a few lines of code to your application.

- Bugsink is compatible with Sentry's open source SDKs which are available for most popular programming languages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bugsink | `bugsink/bugsink:2.0.12` | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Bugsink | 8000 | - |
| `EMAIL_PORT` | Bugsink | 587 | - |
| `SECRET_KEY` | Bugsink | (secret) | - |
| `EMAIL_HOST_USER` | Bugsink | (secret) | - |
| `BEHIND_HTTPS_PROXY` | Bugsink | true | - |
| `EMAIL_HOST_PASSWORD` | Bugsink | (secret) | - |
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
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Analytics

[View on Railway →](https://railway.com/template/5pE9hv)
