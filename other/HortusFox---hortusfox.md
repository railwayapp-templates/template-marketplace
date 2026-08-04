# Deploy HortusFox on Railway

Collaborative plant care, inventory, and task tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hortusfox)

## About

HortusFox is a collaborative plant-management application for locations, plants, photos, care tasks, inventory, calendar entries, chat, history, and API integrations. This template deploys stable version 5.9 with MariaDB and generated administrator credentials.

Sign in using `APP_ADMIN_EMAIL` and the generated `APP_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hortusfox | [monotykamary/railway-template-hortusfox](https://github.com/monotykamary/railway-template-hortusfox) (root: /app) | Web service |
| mariadb | [monotykamary/railway-template-hortusfox](https://github.com/monotykamary/railway-template-hortusfox) (root: /mariadb) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hortusfox | 80 | HortusFox Apache port used by the Railway domain. |
| `DB_HOST` | hortusfox | - | Private MariaDB hostname. |
| `DB_PORT` | hortusfox | 3306 | Private MariaDB port. |
| `APP_DEBUG` | hortusfox | false | Production mode. The adapter enables CLI debug only during startup migrations. |
| `DB_CHARSET` | hortusfox | utf8mb4 | Database character set. |
| `APP_CRON_PW` | hortusfox | - | Generated password for HortusFox cron endpoints. |
| `DB_DATABASE` | hortusfox | hortusfox | HortusFox database name. |
| `DB_PASSWORD` | hortusfox | (secret) | Database password shared by Railway reference. |
| `DB_USERNAME` | hortusfox | (secret) | Database application user. |
| `APP_TIMEZONE` | hortusfox | UTC | Application timezone name. |
| `APP_WORKSPACE` | hortusfox | Railway Plants | Workspace title shown on the login page. |
| `APP_UPDATEDEPS` | hortusfox | false | Keep dependencies pinned inside the release image. |
| `APP_ADMIN_EMAIL` | hortusfox | admin@example.com | Initial administrator email address. |
| `APACHE_SERVER_NAME` | hortusfox | - | Generated Railway hostname used by Apache. |
| `APP_ADMIN_PASSWORD` | hortusfox | (secret) | Generated initial HortusFox administrator password. |
| `PORT` | mariadb | 3306 | Private MariaDB port. |
| `MARIADB_USER` | mariadb | (secret) | Database application user. |
| `MARIADB_DATABASE` | mariadb | hortusfox | Database initialized for HortusFox. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated password for the HortusFox database user. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated MariaDB root password. |

## Configuration

- **Healthcheck:** `/auth`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/hortusfox)
