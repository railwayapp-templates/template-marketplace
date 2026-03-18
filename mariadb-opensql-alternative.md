# Deploy MariaDB - the Open-Source MySQL Alternative on Railway

Self-host MariaDB on Railway - fast, scalable open-source relational DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mariadb-opensql-alternative)

## About

Deploy a fully configured, persistent MariaDB instance on Railway in one click. This template provisions the official `mariadb` Docker image with auto-generated credentials, persistent volume storage at `/var/lib/mysql`, and private  connection URL ready to use immediately.

MariaDB is an open-source relational database management system created by MySQL's original developers. It's a high-performance, drop-in MySQL replacement used by Wikipedia, WordPress.com, and thousands of production applications.

**Key features:**
- Full ACID compliance with InnoDB storage engine
- MySQL-compatible wire protocol — existing MySQL drivers work unchanged
- Faster query execution and replication than MySQL for most workloads
- JSON functions, virtual columns, and sequence storage engines not in MySQL
- Active open-source community with LTS releases (current: MariaDB 11.4)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MARIADB_HOST` | - | Internal hostname for MariaDB service |
| `MARIADB_PORT` | 3306 | Default MariaDB database port |
| `MARIADB_USER` | (secret) | default database |
| `MARIADB_DATABASE` | railway | Default database created on startup |
| `MARIADB_PASSWORD` | (secret) | Password for MariaDB user authentication |
| `MARIADB_PUBLIC_URL` | - | External MariaDB connection string |
| `MARIADB_PRIVATE_URL` | - | Internal MariaDB connection string |
| `MARIADB_PUBLIC_HOST` | - | Public TCP proxy hostname |
| `MARIADB_PUBLIC_PORT` | - | Public TCP proxy port |
| `MARIADB_ROOT_PASSWORD` | (secret) | Root admin password for MariaDB |

## Configuration

- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/template/mariadb-opensql-alternative)
