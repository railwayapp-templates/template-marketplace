# Deploy MantisBT on Railway

Issue tracker with generated admin and private MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mantisbt)

## About

MantisBT is an open-source issue tracker with projects, roles, workflows, custom fields, email notifications, and reporting. This template deploys stable 2.28.4 with generated credentials and private MariaDB.

Sign in as `administrator` with `MANTIS_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mantisbt | [monotykamary/railway-template-mantisbt](https://github.com/monotykamary/railway-template-mantisbt) | Web service |
| mariadb | `mariadb:11.8.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mantisbt | 8080 | Public Caddy port. |
| `PUBLIC_SCHEME` | mantisbt | https | Forwarded public URL scheme. |
| `MANTIS_DB_HOST` | mantisbt | - | Private MariaDB host. |
| `MANTIS_DB_NAME` | mantisbt | mantisbt | Database name. |
| `MANTIS_DB_PORT` | mantisbt | 3306 | MariaDB port. |
| `MANTIS_DB_USER` | mantisbt | (secret) | Database user. |
| `MANTIS_BASE_URL` | mantisbt | - | Canonical public MantisBT URL. |
| `MANTIS_DB_PASSWORD` | mantisbt | (secret) | Shared generated database password. |
| `MANTIS_ADMIN_PASSWORD` | mantisbt | (secret) | Generated administrator password. |
| `MARIADB_USER` | mariadb | (secret) | MantisBT database user. |
| `MARIADB_DATABASE` | mariadb | mantisbt | MantisBT database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate an unused random root password. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/config`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/mantisbt)
