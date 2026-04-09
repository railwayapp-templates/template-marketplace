# Deploy FOSSBilling on Railway

Host Fossbilling on Railway!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fossbilling)

## About

[FOSSBilling](https://fossbilling.org/) is an open-source billing and client-management platform for hosting providers and IT businesses. It handles invoices, orders, support tickets, and automation around products and services. You run it on a PHP stack with a relational database and scheduled tasks so recurring billing and reminders stay reliable.

Hosting FOSSBilling means running a long-lived PHP application behind a web server, keeping PHP-FPM available for requests, and running periodic jobs (for example invoicing and maintenance). You also need a MySQL-compatible database for configuration and data. This template ships a Docker image that bundles FOSSBilling with **Nginx**, **PHP 8.4-FPM**, **Supervisor** (to run Nginx, PHP-FPM, and cron together), and **system cron** executing `cron.php` every five minutes. **MySQL is preconfigured** in the template, so you connect the app during the web installer instead of provisioning the database service yourself. Railway injects `PORT` for Nginx; on first start the entrypoint can populate `/app` from the bundled application files when a volume is empty. After deploy, open your Railway URL and complete FOSSBilling’s setup wizard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FOSSBilling | `ghcr.io/blacksoulgem95/fossbilling-railway:latest` | Database |
| MySQL | `mysql:9.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | FOSSBilling | 8000 | Nginx Listen Port |
| `MYSQLHOST` | MySQL | - | MySQL Host |
| `MYSQLPORT` | MySQL | 3306 | MySQL Port |
| `MYSQLUSER` | MySQL | root | MySQL User |
| `MYSQL_URL` | MySQL | - | MySQL URL |
| `MYSQLDATABASE` | MySQL | - | MySQL Database Name |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL Password |
| `MYSQL_DATABASE` | MySQL | - | MySQL Database Name (Reference) |
| `MYSQL_PUBLIC_URL` | MySQL | - | MySQL Public URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | MySQL ROOT Password |

## Configuration

- **Volume:** `/app`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/fossbilling)
