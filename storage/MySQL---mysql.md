# Deploy MySQL on Railway

Deploy a MySQL database service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mysql)

## About

MySQL is a popular open-source relational database management system that provides a reliable and efficient way to store and manage structured data. It is widely used for web applications, content management systems, and various enterprise solutions.

Hosting MySQL gives you access to a reliable database server capable of handling concurrent connections, managing data persistence, and supporting high availability configurations. MySQL offers flexible database engine configuration, comprehensive user authentication and permission systems, and efficient storage and memory allocation. The database excels at query optimization and advanced indexing strategies. MySQL deployments benefit from scalable CPU, RAM, and storage resources while supporting enterprise-grade network security through Railway's private network capabilities. Railway provides automated backup systems and comprehensive logging to support your database operations.

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

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mysql)
