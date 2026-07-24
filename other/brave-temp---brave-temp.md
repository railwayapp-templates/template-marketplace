# Deploy brave temp on Railway

Deploy and Host brave temp with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/brave-temp)

## About

This project is a simple Node.js web application that can be deployed to any cloud hosting provider or self-hosted on a Linux server. The application listens on the port specified by the `PORT` environment variable and is production-ready.

The application can be hosted using any platform that supports Node.js applications.

Supported hosting platforms include:
- Vercel
- Render
- Railway
- Heroku
- DigitalOcean App Platform
- AWS EC2
- Google Cloud Run
- Microsoft Azure App Service

Before deployment:
- Install all project dependencies.
- Configure the required environment variables.
- Build the application (if applicable).
- Start the production server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |

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
| `MYSQL_PUBLIC_URL` | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/brave-temp)
