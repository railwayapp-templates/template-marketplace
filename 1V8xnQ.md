# Deploy Vikunja on Railway

Vikunja is an open source, self-hosted, task management application.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1V8xnQ)

## About

# Vikunja

Vikunja is an open source, self-hosted task management application. This template helps you deploy your own instance on Railway with a MySQL database.

Everything is ready to go!

## Features
- Task and project management
- Team collaboration
- Calendar view
- Kanban boards
AGPLv3

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| Vikunja | `vikunja/vikunja` | Worker |

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
| `PORT` | Vikunja | 3456 | Do not change this |
| `VIKUNJA_DATABASE_TYPE` | Vikunja | mysql | - |
| `VIKUNJA_DATABASE_USER` | Vikunja | (secret) | - |
| `VIKUNJA_DATABASE_PASSWORD` | Vikunja | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/template/1V8xnQ)
