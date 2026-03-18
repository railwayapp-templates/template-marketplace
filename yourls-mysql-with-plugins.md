# Deploy YOURLS + plugins on Railway

The de facto standard self-hosted URL shortener with added plugins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yourls-mysql-with-plugins)

## About

YOURLS is a powerful set of PHP scripts that empowers you to run Your Own URL Shortener, on your server. With YOURLS, you have complete control over your links, detailed statistics, plugin support, and more, all wrapped in a free and open-source package.

This  **improved**  Docker image bundles YOURLS with the expiry plugin preinstalled.

### Post deployment actions [IMPORTANT!]

Railway currently fails to identify the correct port of the application, to fix this issue wait until the YOURLS service is deployed, navigate to  **Settings > Network > Edit**  the public domain to redirect to port  **8080**.

After this you can navigate to your public domain + /admin to install the application.

The admin user and password are available as environment variables (`YOURLS_USER`,  `YOURLS_PASS`).

To use your own domain for link generation, set  `YOURLS_HOST`  to that domain and redeploy the service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| YOURLS | `prismatechcorp/yourls-custom:latest` | Web service |

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
| `YOURLS_PASS` | YOURLS | - | Dashboard admin password |
| `YOURLS_SITE` | YOURLS | - | Base URL of the application |
| `YOURLS_USER` | YOURLS | (secret) | Dashboard admin user |
| `YOURLS_DB_HOST` | YOURLS | - | Database host |
| `YOURLS_DB_NAME` | YOURLS | - | Database name |
| `YOURLS_DB_PASS` | YOURLS | - | Database password |
| `YOURLS_DB_USER` | YOURLS | (secret) | Database user |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/yourls-mysql-with-plugins)
