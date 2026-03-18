# Deploy OwnCloud on Railway

Flexible and secure way to share files and folders

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rLkDBH)

## About

# OwnCloud

ownCloud is an open-source file sync, share and content collaboration software that lets teams work on data easily from anywhere, on any device. It provides access to your data through a web interface, sync clients or WebDAV while providing a platform to view, sync and share across devices easily - all under your control.

![OwnCloud Image](https://raw.githubusercontent.com/owncloud-docker/server/master/images/Home-UI.png)

## Authorization

The default username and password is `admin`. Recommended to change this immediately after deploying. You can change this in your settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:latest` | Database |
| OwnCloud Server | `owncloud/server` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_URL` | MariaDB | - | Public database URL |
| `MARIADB_HOST` | MariaDB | - | Public host for MariaDB |
| `MARIADB_PORT` | MariaDB | - | Public port for MariaDB |
| `MARIADB_USER` | MariaDB | (secret) | MariaDB username |
| `MARIADB_DATABASE` | MariaDB | railway | MariaDB default database |
| `MARIADB_PASSWORD` | MariaDB | (secret) | MariaDB password |
| `MARIADB_PRIVATE_URL` | MariaDB | - | Private database URL |
| `MARIADB_PRIVATE_HOST` | MariaDB | - | MariaDB private host |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 | Private port for MariaDB |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password |
| `HTTP_PORT` | OwnCloud Server | 8080 | - |
| `OWNCLOUD_DB_TYPE` | OwnCloud Server | mysql | - |
| `OWNCLOUD_VERSION` | OwnCloud Server | latest | - |
| `OWNCLOUD_DB_PASSWORD` | OwnCloud Server | (secret) | - |
| `OWNCLOUD_DB_USERNAME` | OwnCloud Server | (secret) | - |
| `OWNCLOUD_REDIS_PASSWORD` | OwnCloud Server | (secret) | - |
| `OWNCLOUD_REDIS_USERNAME` | OwnCloud Server | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Storage

[View on Railway →](https://railway.com/template/rLkDBH)
