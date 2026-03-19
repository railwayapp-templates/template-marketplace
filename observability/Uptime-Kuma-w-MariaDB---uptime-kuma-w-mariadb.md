# Deploy Uptime Kuma (w/ MariaDB) on Railway

Uptime Kuma is an easy-to-use self-hosted monitoring tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-w-mariadb)

## About

Uptime Kuma is an open-source, self-hosted monitoring tool with a clean, reactive UI. It supports HTTP(s), TCP, DNS, Ping, WebSocket, and many more monitor types with 90+ notification providers. This template deploys Uptime Kuma v2 backed by MariaDB 11.8 LTS for better performance and scalability compared to the default SQLite setup.

This template deploys two services: Uptime Kuma and a MariaDB 11.8 LTS database. All database connection variables are pre-configured using Railway reference variables, so no manual setup is required. Uptime Kuma v2 introduced MariaDB as an alternative to SQLite, offering improved performance for concurrent reads/writes and better suitability for production workloads. Once deployed, you simply visit the generated URL to complete the initial account setup through the Uptime Kuma wizard. The MariaDB instance runs on Railway's private network for secure, low-latency communication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma:2` | Web service |
| MariaDB | `mariadb:11.8` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Uptime Kuma | 3001 |
| `UPTIME_KUMA_DB_TYPE` | Uptime Kuma | mariadb |
| `UPTIME_KUMA_DB_PASSWORD` | Uptime Kuma | (secret) |
| `UPTIME_KUMA_DB_USERNAME` | Uptime Kuma | (secret) |
| `MARIADB_PORT` | MariaDB | 3306 |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | kuma |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-w-mariadb)
