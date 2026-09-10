# Deploy Easy!Appointments on Railway

Open-source online appointment scheduler for businesses and teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easyappointments)

## About

**Easy!Appointments** is an open-source, self-hosted appointment scheduling platform for managing online bookings, services, providers, customers, schedules, and availability.

Deploy it on Railway and run your own scheduling platform for businesses, teams, clinics, professionals, and service providers.

Hosting Easy!Appointments on Railway provides a convenient way to run a self-hosted appointment scheduling platform without manually configuring a traditional server environment.

This template deploys Easy!Appointments together with a MySQL database and configures the application through Railway environment variables.

The application container includes PHP and Apache. The MySQL service uses persistent storage so appointment, customer, and application data survive container restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.4` | Database |
| Easy!Appointments | [vamos-automatizar/easyappointments-railway](https://github.com/vamos-automatizar/easyappointments-railway) (root: /) | Web service |

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
| `PORT` | Easy!Appointments | 80 | - |
| `DEBUG_MODE` | Easy!Appointments | FALSE | - |
| `DB_PASSWORD` | Easy!Appointments | (secret) | - |
| `DB_USERNAME` | Easy!Appointments | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/easyappointments)
