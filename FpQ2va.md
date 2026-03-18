# Deploy dyan-up on Railway

This is an online learning application to Grow up your skills

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/FpQ2va)

## About

We believe every learner is an individual and every course is an opportunity to build job-ready skills. Through our human-centered approach to learning, we will empower you to fulfil your professional and personal goals and enjoy career success.
We believe every learner is an individual and every course is an opportunity to build job-ready skills. Through our human-centered approach to learning, we will empower you to fulfil your professional and personal goals and enjoy career success.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dyan-up | [marotiuppe/Dyan-up-v1.git](https://github.com/marotiuppe/Dyan-up-v1.git) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `dyan-up-v1` | dyan-up | dyanup | this is an version one |
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

**Category:** Blogs · **Languages:** Java

[View on Railway →](https://railway.com/template/FpQ2va)
