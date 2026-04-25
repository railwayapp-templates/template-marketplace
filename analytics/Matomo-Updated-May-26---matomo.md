# Deploy Matomo [Updated May ’26] on Railway

Matomo [May ’26] (Managed Analytics & Tracking, GA Alternative), Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matomo)

## About

Matomo is a free, open-source web analytics platform available on GitHub, offering privacy-focused website analytics as an alternative to Google Analytics. With Matomo, users gain full control over their data and analytics setup, supported by a robust developer community on the Matomo GitHub repository.

You can self host Matomo to keep all your analytics data and configurations entirely under your control, with zero third-party involvement. With Matomo web analytics, you benefit from advanced, privacy-focused tracking for your website or application, tailored to your unique requirements. The Matomo deploy process is streamlined on modern cloud platforms such as Railway, making it easy to set up, scale, and manage your analytics solution while preserving privacy and security at every step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:latest` | Database |
| matomo | `matomo:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | matomo |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | matomo | 80 |
| `MATOMO_DATABASE_ADAPTER` | matomo | mysql |
| `MATOMO_DATABASE_PASSWORD` | matomo | (secret) |
| `MATOMO_DATABASE_USERNAME` | matomo | (secret) |
| `MATOMO_DATABASE_TABLES_PREFIX` | matomo | matomo_ |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/matomo)
