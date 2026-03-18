# Deploy ITop on Railway

Open source ITIL ITSM CMDB Software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9Tn0yh)

## About

iTop is an open-source **IT Service Management** (ITSM) tool that provides a comprehensive web-based interface for managing IT operations and services. It offers robust features for incident management, change management, and asset management, making it a versatile solution for organizations looking to streamline their IT processes.

Links:

- Official website: https://www.combodo.com/itop-193
- GitHub repository: https://github.com/Combodo/iTop

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| ITop | [dream-on-technology/itop-railway](https://github.com/dream-on-technology/itop-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Railway Private Domain Name. |
| `MYSQLPORT` | 3306 | MySQL port. |
| `MYSQLUSER` | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/9Tn0yh)
