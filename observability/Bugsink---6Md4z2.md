# Deploy Bugsink on Railway

Self-hosted Error Tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6Md4z2)

## About

Bugsink is self-hosted Error Tracking.

* Sentry-API Compatible
* Scalable & Reliable

This is the MySQL Template for Bugsink. It follows Bugsink's Docker Installation: https://www.bugsink.com/docs/docker-install/

Check out / set the value for CREATE_SUPERUSER such that you can actually log in before clicking "deploy".

If you want to get notifications, add EMAIL_HOST etc. (see https://www.bugsink.com/docs/settings/#email)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| bugsink/bugsink | `bugsink/bugsink` | Web service |

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
| `SECRET_KEY` | bugsink/bugsink | (secret) | - |
| `BEHIND_HTTPS_PROXY` | bugsink/bugsink | True | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/6Md4z2)
