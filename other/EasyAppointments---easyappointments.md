# Deploy Easy!Appointments on Railway

Open-source online appointment scheduler for businesses and teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easyappointments)

## About

**Easy!Appointments** is an open-source, self-hosted appointment scheduling platform for managing online bookings, services, providers, customers, and availability.

Deploy it on Railway and get a ready-to-use scheduling system that can be customized for businesses, teams, and professional services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Easy!Appointments | `alextselegidis/easyappointments:latest` | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Easy!Appointments | 80 | - |
| `DEBUG_MODE` | Easy!Appointments | TRUE | - |
| `DB_PASSWORD` | Easy!Appointments | (secret) | - |
| `DB_USERNAME` | Easy!Appointments | (secret) | - |
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
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/easyappointments)
