# Deploy Bugsink on Railway

Self-hosted Error Tracking. Sentry-SDK compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bugsink)

## About

Hosting Bugsink requires deploying the application server alongside a PostgreSQL database for storing events, issues, users, and project metadata. Since Bugsink supports standard Sentry SDKs, teams can integrate it into existing applications with minimal setup changes.

Railway simplifies deployment by handling infrastructure provisioning, networking, environment variables, persistent storage, and service orchestration. A typical deployment includes a Bugsink web service, a PostgreSQL database, persistent storage volumes, and optional SMTP configuration for notifications. Railway also supports automatic deployments from GitHub and seamless scaling as your monitoring needs grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bugsink | `bugsink/bugsink:2.1.3` | Web service |
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

[View on Railway →](https://railway.com/deploy/bugsink)
