# Deploy overflowing-fascination on Railway

Deploy and Host overflowing-fascination with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/overflowing-fascination)

## About

overflowing-fascination is a matrimony web application where users can create profiles, upload images, and connect with potential matches. The backend is powered by Spring Boot and MySQL, while the frontend uses Angular.

Hosting overflowing-fascination involves setting up a MySQL database for user data and image references, deploying the Spring Boot backend for business logic and API endpoints, and hosting the Angular frontend for user interaction. The application requires persistent storage for profile images and videos, secure handling of user credentials, and reliable networking between the frontend, backend, and database services. Railway simplifies the deployment of these components by providing managed services and easy scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Railway Private Domain Name. |
| `MYSQLPORT` | 3306 | MySQL port. |
| `MYSQLUSER` | jawaharlal | MySQL user, used for the Data panel. |
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

[View on Railway →](https://railway.com/deploy/overflowing-fascination)
