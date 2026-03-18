# Deploy Nacos-MySQL on Railway

Deploy and Host Nacos-MySQL with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/naocs-mysql)

## About

Nacos is an open-source project from Alibaba for dynamic service discovery, configuration, and service management. In this template, Nacos runs in **standalone mode** with MySQL as the persistent data store, making it well-suited for development and testing environments.

This template deploys a Nacos server connected to a MySQL database, following the official `standalone-mysql.yaml` configuration. The MySQL instance stores Nacos metadata and configuration data, ensuring persistence across restarts. With port **8848** exposed, you can access the Nacos console UI to manage services, configurations, and namespaces. This single-node setup simplifies exploration and integration of Nacos features, while Railway manages the runtime, networking, and scaling. It is intended for non-production use, providing an easy way to experiment with Nacos + MySQL without complex setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nacos | `nacos/nacos-server:v3.0.3` | Web service |
| MySQL | [wangxued/nacos-mysql-railway](https://github.com/wangxued/nacos-mysql-railway) (root: /mysql) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | Nacos | standalone | - |
| `PORT` | Nacos | 8080 | - |
| `NACOS_AUTH_TOKEN` | Nacos | (secret) | - |
| `PREFER_HOST_MODE` | Nacos | hostname | - |
| `MYSQL_SERVICE_USER` | Nacos | (secret) | - |
| `MYSQL_SERVICE_DB_PARAM` | Nacos | characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true | - |
| `MYSQL_SERVICE_PASSWORD` | Nacos | (secret) | - |
| `NACOS_AUTH_IDENTITY_KEY` | Nacos | 2222 | - |
| `NACOS_AUTH_IDENTITY_VALUE` | Nacos | 2xxx | - |
| `SPRING_DATASOURCE_PLATFORM` | Nacos | mysql | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | nacos | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld  --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/naocs-mysql)
