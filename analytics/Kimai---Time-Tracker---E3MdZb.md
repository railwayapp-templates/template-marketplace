# Deploy Kimai - Time Tracker on Railway

Open source time-tracking solution for business or freelance.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/E3MdZb)

## About

![Kimai Logo](https://www.kimai.org/images/kimai_logo.webp)
# Kimai
Free and easy to use time tracking for freelancers, agencies and companies. Kimai is open source software available for self-hosting and as SaaS. 

## Supports your business
Kimai has all the business core features you need to setup your time-tracking workflows and integrate it with your existing infrastructure.

# Instructions
1. Add your admin email & password.
2. Remove the admin email & password environment variables after build (they're no longer needed).

Go to the link below for more up-to-date instructions & troubleshooting help.
https://github.com/hellocory/railway-kimai

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| Kimai | `kimai/kimai2:apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `PORT` | Kimai | 8001 | - |
| `ADMINMAIL` | Kimai | - | LOGIN EMAIL: For first time startup - REMOVE AFTER USE. |
| `ADMINPASS` | Kimai | - | LOGIN PASS: For first time startup - REMOVE AFTER USE. |
| `APP_SECRET` | Kimai | (secret) | Generated UUID for your app. |
| `MAILER_URL` | Kimai | null://localhost | https://www.kimai.org/documentation/emails.html |
| `MAILER_FROM` | Kimai | - | Your mailers FROM address. |
| `DATABASE_URL` | Kimai | - | Make sure "?charset=utf8mb4&serverVersion=8.3.0" is appended to the end of your connection string. Sometimes it doesn't show by default. |
| `TRUSTED_HOSTS` | Kimai | nginx,localhost,127.0.0.1 | - |
| `TRUSTED_PROXIES` | Kimai | nginx,localhost,127.0.0.1 | - |
| `READ_INSTRUCTION_INFO` | Kimai | - | Visit the following URL and follow the instructions. Delete this environment variable as needed. Instructions URL: https://github.com/hellocory/railway-kimai |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/E3MdZb)
