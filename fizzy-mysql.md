# Deploy Fizzy (MySQL) on Railway

The Kanban tracking tool for issues and ideas by 37signals

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fizzy-mysql)

## About

Fizzy is a lightweight kanban app for tracking bugs, issues, ideas, and small projects. It keeps boards simple with cards and columns, so you can organize work without heavy process. Deploy it on Railway to run your own instance and keep your boards under your control.

Hosting Fizzy (MySQL) on Railway runs the Rails app as a web service backed by a managed MySQL database. File uploads use Active Storage with S3-compatible object storage via Railway Buckets. To send sign-in and notification emails, configure an SMTP provider and a from address. Fizzy runs in single-tenant mode by default, so after you create the first account, public signups are disabled. Railway runs the infrastructure for you, letting you focus on using Fizzy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Web | `ghcr.io/basecamp/fizzy:main` | Web service |

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
| `S3_BUCKET` | Web | - | The bucket name used by Active Storage (defaults to fizzy-<env>-activestorage when unset). |
| `S3_REGION` | Web | - | The region used for AWS S3 or any S3-compatible provider (defaults to us-east-1 when unset). |
| `SMTP_PORT` | Web | 587 | The port used to connect to the SMTP server (defaults to 587). |
| `MYSQL_HOST` | Web | - | The hostname used to connect to the MySQL database. |
| `MYSQL_PORT` | Web | - | The port used to connect to the MySQL database. |
| `MYSQL_USER` | Web | (secret) | The username used to connect to the MySQL database. |
| `S3_ENDPOINT` | Web | - | The endpoint URL used for AWS S3 or any S3-compatible provider. |
| `SMTP_DOMAIN` | Web | - | The domain presented to the SMTP server when sending email. |
| `MULTI_TENANT` | Web | false | The setting that enables multi-tenant mode when true (false runs Fizzy in single-tenant mode and disables public signups). |
| `SMTP_ADDRESS` | Web | - | The SMTP server used to send email. |
| `SMTP_PASSWORD` | Web | (secret) | The password used for SMTP authentication. |
| `SMTP_USERNAME` | Web | (secret) | The username used for SMTP authentication. |
| `MYSQL_PASSWORD` | Web | (secret) | The password used to connect to the MySQL database. |
| `MYSQL_SSL_MODE` | Web | REQUIRED | The SSL mode used for the MySQL connection (REQUIRED enforces TLS). |
| `CSP_REPORT_ONLY` | Web | true | The setting that enables Content Security Policy report-only mode when true. |
| `SECRET_KEY_BASE` | Web | (secret) | The secret key used for session signing and encryption. |
| `DATABASE_ADAPTER` | Web | mysql | The database adapter Fizzy uses (defaults to sqlite when unset). |
| `S3_ACCESS_KEY_ID` | Web | - | The access key used for AWS S3 or any S3-compatible provider. |
| `VAPID_PUBLIC_KEY` | Web | - | The public VAPID key used for web push notifications (generate at https://vapidkeys.com). |
| `VAPID_PRIVATE_KEY` | Web | - | The private VAPID key used for web push notifications (generate at https://vapidkeys.com). |
| `MAILER_FROM_ADDRESS` | Web | - | The email "from" address that Fizzy sends email from. |
| `S3_SECRET_ACCESS_KEY` | Web | (secret) | The secret access key used for AWS S3 or any S3-compatible provider. |
| `ACTIVE_STORAGE_SERVICE` | Web | s3 | The Active Storage service name defined in storage.oss.yml (defaults to local when unset). |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other

[View on Railway →](https://railway.com/template/fizzy-mysql)
