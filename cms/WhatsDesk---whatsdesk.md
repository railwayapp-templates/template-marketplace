# Deploy WhatsDesk on Railway

🚀 WhatsDesk is a WhatsApp marketing and automation platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsdesk)

## About

WhatsDesk is an open-source WhatsApp inbox and customer support desk that helps teams manage conversations, contacts, and messages from a single dashboard. It is designed for businesses that want full control over their WhatsApp communication without relying on expensive third-party platforms.

MySQL Image
WhatsDesk image

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| whatsdesk | `mobidonia/whatsdesk` | Web service |

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
| `DB_PASSWORD` | whatsdesk | (secret) | - |
| `DB_USERNAME` | whatsdesk | (secret) | - |
| `FORCE_HTTPS` | whatsdesk | true | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/public/uploads`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/whatsdesk)
