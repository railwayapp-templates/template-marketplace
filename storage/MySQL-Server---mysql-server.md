# Deploy MySQL Server on Railway

Production-ready MySQL with persistent storage and TCP access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mysql-server)

## About

MySQL is a widely used open-source relational database built for web applications, APIs, backend services, transactional systems, and general-purpose data storage. It provides SQL, ACID transactions, indexing, replication, stored procedures, JSON support, and broad compatibility across modern application frameworks and development tools.

Hosting MySQL on Railway gives you a persistent relational database without manually managing a virtual machine, operating system, package installation, or database server lifecycle.

This template runs MySQL as a dedicated database service with persistent Railway storage. Applications inside the same Railway project can connect through Railway private networking, while external database clients can connect through Railway TCP Proxy.

The deployment also creates a dedicated application database and user alongside the root administrator account, making it easier to separate normal application access from database administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Private Railway hostname for internal connections |
| `MYSQLPORT` | 3306 | Internal MySQL TCP port |
| `MYSQLUSER` | - | Application username used by client applications |
| `MYSQL_USER` | (secret) | Application database user created on first initialization |
| `DATABASE_URL` | - | Private MySQL connection URL |
| `MYSQLDATABASE` | - | Default database used by client applications |
| `MYSQLPASSWORD` | (secret) | Application password used by client applications |
| `MYSQL_DATABASE` | app | Default application database created on first initialization |
| `MYSQL_PASSWORD` | (secret) | Password for the application database user |
| `DATABASE_PUBLIC_URL` | - | Public MySQL connection URL via Railway TCP Proxy |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root administrator password |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mysql-server)
