# Deploy Fizzy + MySQL on Railway

Kanban as it should be. Not as it has been.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fizzy-with-mysql)

## About

The Kanban tracking tool for issues and ideas by 37signals.

Fizzy is a self-hosted Rails application that uses SQLite for data storage and Solid Queue for background job processing. Deploying on Railway requires
  configuring persistent storage for SQLite databases, setting up SMTP for passwordless authentication via magic links, and configuring environment variables
  for security. The application runs in a container with background job processing handled by Solid Queue inside the Puma web server. Once configured,
  Fizzy provides a collaborative kanban board system for teams to track cards, manage workflow columns, and organize work with automatic card postponement
  based on inactivity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fizzy | [basecamp/fizzy](https://github.com/basecamp/fizzy) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_PORT` | fizzy | 587 | - |
| `MYSQL_USER` | fizzy | (secret) | - |
| `SMTP_PASSWORD` | fizzy | (secret) | - |
| `SMTP_USERNAME` | fizzy | (secret) | - |
| `MYSQL_PASSWORD` | fizzy | (secret) | - |
| `MYSQL_SSL_MODE` | fizzy | REQUIRED | - |
| `CSP_CONNECT_SRC` | fizzy | storage.railway.app | - |
| `SECRET_KEY_BASE` | fizzy | (secret) | - |
| `WEB_CONCURRENCY` | fizzy | 8 | - |
| `DATABASE_ADAPTER` | fizzy | mysql | - |
| `S3_FORCE_PATH_STYLE` | fizzy | true | - |
| `SMTP_AUTHENTICATION` | fizzy | plain | - |
| `SOLID_QUEUE_IN_PUMA` | fizzy | true | - |
| `S3_SECRET_ACCESS_KEY` | fizzy | (secret) | - |
| `ACTIVE_STORAGE_SERVICE` | fizzy | s3 | - |
| `SMTP_ENABLE_STARTTLS_AUTO` | fizzy | true | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Ruby, HTML, CSS, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/template/fizzy-with-mysql)
