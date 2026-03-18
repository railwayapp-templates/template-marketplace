# Deploy MariaDB on Railway

The open source relational database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Onvy0F)

## About

MariaDB Server is a relational database management system that originated as a fork of MySQL. It's developed by the original creators of MySQL and maintains high compatibility with MySQL while adding new features and performance improvements.

Hosting MariaDB involves deploying a database server that runs as a persistent service managing SQL queries, data storage, and transactions. The deployment requires configuring database users, setting up persistent storage for data files, and establishing network connectivity for client applications. MariaDB uses the same connection protocols and configuration patterns as MySQL, making deployment straightforward for those familiar with MySQL setups. The server typically runs on port 3306 and requires environment variables for root passwords and initial database creation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MARIADB_HOST` | - | MariaDB private host |
| `MARIADB_PORT` | 3306 | Private port for MariaDB |
| `MARIADB_USER` | (secret) | MariaDB username |
| `MARIADB_DATABASE` | railway | MariaDB default database |
| `MARIADB_PASSWORD` | (secret) | MariaDB password |
| `MARIADB_PUBLIC_URL` | - | Public database URL |
| `MARIADB_PRIVATE_URL` | - | Private database URL |
| `MARIADB_PUBLIC_HOST` | - | Public host for MariaDB |
| `MARIADB_PUBLIC_PORT` | - | Public port for MariaDB |
| `MARIADB_ROOT_PASSWORD` | (secret) | MariaDB root password |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/Onvy0F)
