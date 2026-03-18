# Deploy OnlyOffice (Open-Source Document Collaboration Suite) on Railway

OnlyOffice [Mar ’26] (Edit & Collaborate on Docs Securely) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onlyoffice)

## About

ONLYOFFICE is a free, open-source office suite available on GitHub that provides powerful document, spreadsheet, and presentation editing capabilities - all in your own private cloud. Designed as a privacy-focused alternative to Google Workspace and Microsoft 365, ONLYOFFICE enables individuals, teams, and enterprises to collaborate securely while keeping full control over their data.

* * *

You can self-host ONLYOFFICE to maintain full ownership and control of your data. Hosting it on Railway eliminates the need to manage complex server infrastructure manually. Railway’s one-click deployment and managed environment make running ONLYOFFICE smooth, scalable, and maintenance-free.
* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| documentserver | `onlyoffice/documentserver` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | documentserver | 80 |
| `DB_TYPE` | documentserver | mysql |
| `DB_USER` | documentserver | (secret) |
| `JWT_SECRET` | documentserver | (secret) |
| `JWT_ENABLED` | documentserver | true |
| `WOPI_ENABLED` | documentserver | true |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/onlyoffice/Data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/onlyoffice)
