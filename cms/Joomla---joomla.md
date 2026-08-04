# Deploy Joomla! on Railway

Joomla CMS with generated admin and private MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/joomla)

## About

Joomla is an open-source content management system for websites, portals, and applications. This template deploys stable 6.1.2 with unattended setup, generated credentials, and MariaDB.

Sign in at `/administrator/` using `JOOMLA_ADMIN_USERNAME` and `JOOMLA_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| joomla | [monotykamary/railway-template-joomla](https://github.com/monotykamary/railway-template-joomla) | Web service |
| mariadb | `mariadb:11.8.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | joomla | 80 | Internal Apache HTTP port. |
| `JOOMLA_DB_HOST` | joomla | - | Private MariaDB host and port. |
| `JOOMLA_DB_NAME` | joomla | joomla | Database name. |
| `JOOMLA_DB_USER` | joomla | (secret) | Database user. |
| `JOOMLA_SITE_NAME` | joomla | Joomla on Railway | Initial site name. |
| `JOOMLA_ADMIN_USER` | joomla | (secret) | Administrator display name. |
| `JOOMLA_ADMIN_EMAIL` | joomla | admin@example.com | Initial administrator email. |
| `JOOMLA_DB_PASSWORD` | joomla | (secret) | Shared generated database password. |
| `JOOMLA_ADMIN_PASSWORD` | joomla | (secret) | Generated administrator password. |
| `JOOMLA_ADMIN_USERNAME` | joomla | (secret) | Administrator login username. |
| `MARIADB_USER` | mariadb | (secret) | Joomla database user. |
| `MARIADB_DATABASE` | mariadb | joomla | Joomla database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated Joomla database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Run safe MariaDB system-table upgrades. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate an unused random root password. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Python, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/joomla)
