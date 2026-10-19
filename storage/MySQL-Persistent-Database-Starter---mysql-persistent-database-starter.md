# Deploy MySQL Persistent Database Starter on Railway

Private MySQL with separate app credentials and durable database storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mysql-persistent-database-starter)

## About

Private MySQL with separate app credentials and durable database storage.

This deployment fork provisions MySQL. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql@sha256:24989179f58856db763f418010c1169fecc944e3ec1ea7e921572d83eb070f70` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Railway Private Domain Name. |
| `MYSQLPORT` | 3306 | MySQL port. |
| `MYSQL_USER` | (secret) | - |
| `MYSQLDATABASE` | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | (secret) | - |
| `MYSQL_DATABASE` | railway | Database to be created on image startup. |
| `MYSQL_PASSWORD` | (secret) | Generated password for the app user, separate from the root password. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-buffer-pool-size=128M`
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mysql-persistent-database-starter)
