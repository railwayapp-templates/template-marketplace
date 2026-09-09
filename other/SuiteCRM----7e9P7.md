# Deploy SuiteCRM on Railway

Open-source CRM for sales, marketing, service, and workflow automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-7e9P7)

## About

**SuiteCRM** is an open-source, enterprise-ready Customer Relationship Management (CRM) platform that brings sales, marketing, customer service, reporting, and workflow automation together in one place.

With SuiteCRM, teams can manage leads, contacts, accounts, opportunities, campaigns, customer cases, activities, quotes, contracts, and more while maintaining control over their CRM data and customization.

Hosting SuiteCRM on Railway provides a simple way to run a self-hosted CRM without managing a traditional server environment.

This template simplifies the deployment of SuiteCRM and provides the infrastructure required to run the application with persistent storage and a MySQL database.

Railway makes it easy to deploy, manage, monitor, and maintain your SuiteCRM environment from a single platform.

The application is designed to use a persistent Railway Volume so that SuiteCRM files and configuration survive container restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.4` | Database |
| SuiteCRM | [vamos-automatizar/suitecrm-railway](https://github.com/vamos-automatizar/suitecrm-railway) (root: /) | Web service |

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
| `PORT` | SuiteCRM | 8080 | - |
| `SUITECRM_EMAIL` | SuiteCRM | - | Enter your system administrator email |
| `SUITECRM_PASSWORD` | SuiteCRM | (secret) | Enter the system administrator password |
| `SUITECRM_USERNAME` | SuiteCRM | (secret) | Enter the system administrator username |
| `SUITECRM_ENABLE_HTTPS` | SuiteCRM | no | - |
| `SUITECRM_DATABASE_USER` | SuiteCRM | (secret) | - |
| `SUITECRM_DATABASE_PASSWORD` | SuiteCRM | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/-7e9P7)
