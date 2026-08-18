# Deploy MySQL PITR on Railway

Point-in-time recovery via continuous binlog archiving for standalone MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mysql-pitr)

## About

MySQL with point-in-time recovery powered by continuous binary log archiving. Every committed transaction is shipped to a Railway Bucket, letting you restore your database to any specific timestamp within your retention window.

Hosting MySQL PITR on Railway provisions a Railway Bucket alongside your existing MySQL service and streams binary logs to it continuously, on top of periodic full backups. The archiver ships in Railway's MySQL image and activates automatically when `BINLOG_ARCHIVE_BUCKET` is detected on startup — no manual installation or configuration needed. Railway's Backups panel handles the full restore workflow: pick a target timestamp, and Railway provisions a new service, restores the newest full backup before your target, and replays binlogs forward to it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `ghcr.io/railwayapp-templates/mysql-ha/mysql:8.4` | Database |

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
| `BINLOG_ARCHIVE_PATH` | /binlog | - |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |
| `BINLOG_ARCHIVE_SECRET` | (secret) | - |

## Configuration

- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mysql-pitr)
