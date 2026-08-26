# Deploy MariaDB on Railway

Fast, reliable MySQL-compatible relational database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mariadb-sql)

## About

MariaDB is an open-source relational database designed as a MySQL-compatible database server for web applications, APIs, CMS platforms, analytics workloads, and general-purpose transactional systems. It provides SQL, transactions, indexing, replication capabilities, and broad compatibility with tools and applications built for the MySQL ecosystem.

Hosting MariaDB on Railway gives you a persistent relational database without manually managing a virtual machine, operating system, database package installation, or server lifecycle.

This template runs the official MariaDB Docker image and stores database files in a persistent Railway volume. Applications inside the same Railway project can connect through Railway private networking on port `3306`, while external database clients can connect through Railway TCP Proxy.

The deployment creates a root administrator account, a default application database, and a dedicated application user so applications do not need to connect using the root account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:lts` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Public TCP proxy hostname for external connections |
| `MYSQLPORT` | - | Public TCP proxy port |
| `MYSQLUSER` | - | Application username used by clients |
| `MYSQL_URL` | - | Public MariaDB connection URL |
| `MARIADB_USER` | (secret) | Application database user created on first startup |
| `MYSQLDATABASE` | - | Default database name used by clients |
| `MYSQLPASSWORD` | (secret) | Application password used by clients |
| `MARIADB_DATABASE` | app | Default database created on first startup |
| `MARIADB_PASSWORD` | (secret) | Password for the application database user |
| `MYSQLHOST_PRIVATE` | - | Private Railway hostname for internal database connections |
| `MYSQLPORT_PRIVATE` | 3306 | Internal MariaDB TCP port |
| `MYSQL_URL_PRIVATE` | - | Private MariaDB connection URL |
| `MARIADB_ROOT_PASSWORD` | (secret) | Root password used to administer MariaDB |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mariadb-sql)
