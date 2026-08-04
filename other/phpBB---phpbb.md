# Deploy phpBB on Railway

Discussion forum with generated admin and private MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phpbb)

## About

phpBB is an open-source discussion board with forums, topics, moderation, permissions, private messages, themes, and extensions. This template deploys stable 3.3.17 with generated credentials and private MariaDB.

Sign in as `admin` with `PHPBB_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.8.3` | Database |
| phpbb | [monotykamary/railway-template-phpbb](https://github.com/monotykamary/railway-template-phpbb) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb | (secret) | phpBB database user. |
| `MARIADB_DATABASE` | mariadb | phpbb | phpBB database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate an unused random root password. |
| `PORT` | phpbb | 8080 | Apache HTTP port. |
| `PHPBB_DB_HOST` | phpbb | - | Private MariaDB host. |
| `PHPBB_DB_NAME` | phpbb | phpbb | Database name. |
| `PHPBB_DB_PORT` | phpbb | 3306 | MariaDB port. |
| `PHPBB_DB_USER` | phpbb | (secret) | Database user. |
| `PHPBB_BOARD_NAME` | phpbb | phpBB on Railway | Initial board name. |
| `PHPBB_ADMIN_EMAIL` | phpbb | admin@example.com | Initial administrator email. |
| `PHPBB_DB_PASSWORD` | phpbb | (secret) | Shared generated database password. |
| `PHPBB_SERVER_NAME` | phpbb | - | Canonical public host. |
| `PHPBB_ADMIN_PASSWORD` | phpbb | (secret) | Generated administrator password (phpBB maximum length). |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz.txt`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other · **Languages:** Shell, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/phpbb)
