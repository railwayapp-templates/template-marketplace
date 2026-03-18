# Deploy SuiteCRM on Railway

Open-source CRM with a 360° customer view, sales and marketing automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-7e9P7)

## About

**SuiteCRM** is an open-source Customer Relationship Management (CRM) software that provides a 360-degree view of your customers and business. It offers a comprehensive suite of features designed to enhance sales, marketing, and customer service processes.

Hosting SuiteCRM allows organizations to maintain full control over their CRM data and customization. Whether you choose to self-host or deploy in the cloud, SuiteCRM offers flexibility and scalability to meet your business needs. Deploying on Railway simplifies the process, providing managed infrastructure that ensures reliability and ease of maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| SuiteCRM | `bitnami/suitecrm:latest` | Web service |

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
- **Volume:** `/bitnami/suitecrm`

**Category:** Other

[View on Railway →](https://railway.com/deploy/-7e9P7)
