# Deploy Open Journal Systems on Railway

Scholarly journal publishing with generated admin and MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ojs)

## About

Open Journal Systems (OJS) is an open-source platform for scholarly journal submissions, peer review, editorial workflows, publishing, and indexing. This template deploys stable 3.5.0-5 with generated credentials and private MariaDB.

Sign in as `admin` with `OJS_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ojs | [monotykamary/railway-template-ojs](https://github.com/monotykamary/railway-template-ojs) | Web service |
| mariadb | `mariadb:11.8.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ojs | 8080 | Public Caddy port. |
| `OJS_DB_HOST` | ojs | - | Private MariaDB host. |
| `OJS_DB_NAME` | ojs | ojs | Database name. |
| `OJS_DB_USER` | ojs | (secret) | Database user. |
| `OJS_BASE_URL` | ojs | - | Canonical public OJS URL. |
| `PUBLIC_SCHEME` | ojs | https | Forwarded public URL scheme. |
| `OJS_ADMIN_EMAIL` | ojs | admin@example.com | Initial administrator email. |
| `OJS_DB_PASSWORD` | ojs | (secret) | Shared generated database password. |
| `OJS_PUBLIC_HOST` | ojs | - | Allowed public host. |
| `OJS_ADMIN_PASSWORD` | ojs | (secret) | Generated administrator password. |
| `MARIADB_USER` | mariadb | (secret) | OJS database user. |
| `MARIADB_DATABASE` | mariadb | ojs | OJS database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate an unused random root password. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Python, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/ojs)
