# Deploy PhpMyAdmin + MySQL on Railway

Web UI to manage MySQL databases easily and visually.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/p_f5uS)

## About

## PhpMyAdmin

**PhpMyAdmin** is a free and widely used web-based interface developed in PHP for managing **MySQL** and **MariaDB** databases. It offers an intuitive UI that simplifies many common database tasks such as:

- Creating and managing databases and tables
- Modifying columns, indexes, and relationships
- Managing users and permissions
- Importing and exporting data
- Running raw SQL queries directly from the browser
- Viewing server status and activity

It's especially useful in development environments where quick database interaction is needed without using a CLI or desktop client.

You can configure `phpMyAdmin` using environment variables when running it via Docker. For detailed setup instructions, refer to the official documentation:  
🔗 [phpMyAdmin Docker Environment Variables](https://docs.phpmyadmin.net/en/latest/setup.html#docker-environment-variables)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| PhpMyAdmin | `phpmyadmin/phpmyadmin:latest` | Web service |

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
| `PORT` | PhpMyAdmin | 80 | - |
| `PMA_HOST` | PhpMyAdmin | - | Hostname or IP address of the database server to use. |
| `PMA_PORT` | PhpMyAdmin | - | Port of the database server to use. |
| `PMA_USER` | PhpMyAdmin | (secret) | Username to use for Config authentication mode. |
| `PMA_PMADB` | PhpMyAdmin | - | Name of the database to be used for the “phpMyAdmin configuration storage” database. |
| `PMA_PASSWORD` | PhpMyAdmin | (secret) | Password to use for Config authentication mode. |
| `PMA_ARBITRARY` | PhpMyAdmin | 1 | Allows you to enter a database server hostname on login form. |
| `MYSQL_ROOT_PASSWORD` | PhpMyAdmin | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/p_f5uS)
