# Deploy Matomo Analytics + MariaDB on Railway

Privacy-friendly analytics with MariaDB and persistent volumes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matomo-analytics-mariadb)

## About

Matomo is a privacy-friendly web analytics platform and a self-hosted alternative to Google Analytics. This Railway template deploys Matomo with MariaDB, persistent volumes, private database networking, and the Apache start-command fix required for the official Matomo image on Railway.

This template runs Matomo on the official `matomo:5.8.0-apache` image and stores analytics data in a private MariaDB 11 service. Matomo receives the public Railway domain while MariaDB stays private. Both services use persistent volumes so application state and database data survive redeploys. The Matomo service includes a healthcheck at `/` and starts Apache after disabling conflicting MPM modules, which avoids the common Apache multiple-MPM crash.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11` | Database |
| matomo | `matomo:5.8.0-apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb | (secret) | MariaDB application user Matomo uses to connect to the database. |
| `MARIADB_DATABASE` | mariadb | matomo | MariaDB database created for Matomo analytics data. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated password for the Matomo MariaDB application user. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated MariaDB root password for administrative access. |
| `PORT` | matomo | 80 | Railway HTTP proxy port for the Matomo service. |
| `PHP_MEMORY_LIMIT` | matomo | 256M | PHP memory limit for Matomo. |
| `MATOMO_DATABASE_HOST` | matomo | - | Private hostname for the MariaDB service on Railway. |
| `MATOMO_DATABASE_DBNAME` | matomo | - | MariaDB database Matomo stores analytics data in. |
| `MATOMO_DATABASE_ADAPTER` | matomo | mysql | Database adapter Matomo should use. |
| `MATOMO_DATABASE_PASSWORD` | matomo | (secret) | Password for the Matomo MariaDB application user. |
| `MATOMO_DATABASE_USERNAME` | matomo | (secret) | MariaDB user Matomo uses for application queries. |
| `MATOMO_DATABASE_TABLES_PREFIX` | matomo | matomo_ | Prefix Matomo adds to database table names. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "a2dismod mpm_event || true; a2dismod mpm_worker || true; a2enmod mpm_prefork || true; exec /entrypoint.sh apache2-foreground"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/matomo-analytics-mariadb)
