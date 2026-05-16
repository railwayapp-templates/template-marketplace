# Deploy Fizzy + MySQL on Railway

Kanban as it should be. Not as it has been.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fizzy-with-mysql)

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
| `APP_HOST` | fizzy | - | Your application host |
| `BASE_URL` | fizzy | - | Your application base URL |
| `S3_BUCKET` | fizzy | - | S3 Bucket name |
| `S3_REGION` | fizzy | - | S3 Bucket region |
| `SMTP_PORT` | fizzy | 587 | SMTP port |
| `MYSQL_HOST` | fizzy | - | Database host |
| `MYSQL_PORT` | fizzy | - | Database port |
| `MYSQL_USER` | fizzy | (secret) | Database user |
| `S3_ENDPOINT` | fizzy | - | S3 endpoint |
| `SMTP_DOMAIN` | fizzy | - | SMTP Domain |
| `SMTP_ADDRESS` | fizzy | - | SMTP mail address |
| `SMTP_PASSWORD` | fizzy | (secret) | SMTP password |
| `SMTP_USERNAME` | fizzy | (secret) | SMTP username |
| `MYSQL_PASSWORD` | fizzy | (secret) | Database password |
| `MYSQL_SSL_MODE` | fizzy | REQUIRED | Database SSL mode |
| `CSP_CONNECT_SRC` | fizzy | storage.railway.app | Enable CSP |
| `SECRET_KEY_BASE` | fizzy | (secret) | App secret |
| `WEB_CONCURRENCY` | fizzy | 8 | Restrict concurrency |
| `DATABASE_ADAPTER` | fizzy | mysql | Database driver |
| `S3_ACCESS_KEY_ID` | fizzy | - | S3 access key id |
| `VAPID_PUBLIC_KEY` | fizzy | - | VAPID (Voluntary Application Server Identification) keys to send browser push notifications |
| `VAPID_PRIVATE_KEY` | fizzy | - | VAPID (Voluntary Application Server Identification) keys to send browser push notifications |
| `MAILER_FROM_ADDRESS` | fizzy | - | Mailer from address |
| `S3_FORCE_PATH_STYLE` | fizzy | true | S3 force path style |
| `SMTP_AUTHENTICATION` | fizzy | plain | SMTP auth |
| `SOLID_QUEUE_IN_PUMA` | fizzy | true | Queue in PUMA |
| `S3_SECRET_ACCESS_KEY` | fizzy | (secret) | S3 secret |
| `ACTIVE_STORAGE_SERVICE` | fizzy | s3 | Use S3 for storage |
| `SMTP_ENABLE_STARTTLS_AUTO` | fizzy | true | SMTP TLS auto |
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

[View on Railway →](https://railway.com/deploy/fizzy-with-mysql)
