# Deploy Ghost on Railway

Self-hosted Ghost blogging platform with MariaDB on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-3)

## About

This template runs Ghost on Railway, a cloud platform that handles infrastructure, scaling, and HTTPS. All data is stored on a MariaDB persistent volume for durability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ghost | `ghost:latest` | Web service |
| ghost-mariadb | `mariadb:11.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `url` | ghost | - | Ghost public URL. Auto-configured via Railway public domain. |
| `PORT` | ghost | 2368 | Ghost application port. Railway injects PORT for routing. |
| `database__client` | ghost | mysql | Database client type (mysql for production, sqlite3 for standalone). |
| `database__connection__host` | ghost | ghost-mariadb | MariaDB hostname. Matches the companion service name for private networking. |
| `database__connection__port` | ghost | 3306 | MariaDB port. |
| `database__connection__user` | ghost | (secret) | MariaDB username. Auto-matched to ghost-mariadb service's MYSQL_USER. |
| `database__connection__database` | ghost | ghost | MariaDB database name. Auto-matched to ghost-mariadb service's MYSQL_DATABASE. |
| `database__connection__password` | ghost | (secret) | MariaDB password. Auto-refs ghost-mariadb service's MYSQL_PASSWORD. |
| `MYSQL_USER` | ghost-mariadb | (secret) | MariaDB username for Ghost application access. |
| `MYSQL_DATABASE` | ghost-mariadb | ghost | MariaDB database name for Ghost tables. |
| `MYSQL_PASSWORD` | ghost-mariadb | (secret) | MariaDB password for Ghost user. Auto-generated on first deploy. |
| `MYSQL_ROOT_PASSWORD` | ghost-mariadb | (secret) | MariaDB root password. Auto-generated on first deploy. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-3)
