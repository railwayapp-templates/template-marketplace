# Deploy Kimal on Railway

Multi-user time-tracking application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mbo4oE)

## About

Kimai is a professional grade time-tracking application, free and open-source. 
It handles use-cases of freelancers as well as companies with dozens or hundreds of users. 
Kimai was build to track your project times and ships with many advanced features, including but not limited to:

JSON API, invoicing, data exports, multi-timer and punch-in punch-out mode, tagging, multi-user - multi-timezones - multi-language ([over 30 translations existing](https://hosted.weblate.org/projects/kimai/)!),
authentication via SAML/LDAP/Database, two-factor authentication (2FA) with TOTP, customizable role and team permissions, responsive design,
user/customer/project specific rates, advanced search & filtering, money and time budgets, advanced reporting, support for [plugins](https://www.kimai.org/store/)
and so much more.

[Github](https://github.com/kimai/kimai)

[Official Site](https://www.kimai.org/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| kimai/kimai2:apache | `kimai/kimai2:apache` | Web service |

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
| `PORT` | kimai/kimai2:apache | 8001 | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/kimai/var`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mbo4oE)
