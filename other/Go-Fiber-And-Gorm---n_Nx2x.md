# Deploy Go Fiber And Gorm on Railway

A Gofiber api with gorm as orm using mysql

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n_Nx2x)

## About

This is golang useing gofbier web framworks as a api then we hava gorm as the orm using a mysql database

in the template they is a user model, and a setup file to run the mirgation on the database in the main file they database conntion is run and the mirgation and it start the api on the port Railway gives it

to deploy you will need a mysql database give login env aka MYSQLUSER, MYSQLHOST and you will need to grenate a url for the api

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Go-Fiber-Gorm  | [kronborg6/Go-Fiber-Gorm](https://github.com/kronborg6/Go-Fiber-Gorm) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | Go-Fiber-Gorm  | - | mysql host |
| `MYSQLPORT` | Go-Fiber-Gorm  | - | mysql port |
| `MYSQLUSER` | Go-Fiber-Gorm  | - | mysql username |
| `MYSQLDATABASE` | Go-Fiber-Gorm  | - | mysql database name |
| `MYSQLPASSWORD` | Go-Fiber-Gorm  | (secret) | mysql user password |
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

**Category:** Other · **Languages:** Go

[View on Railway →](https://railway.com/deploy/n_Nx2x)
