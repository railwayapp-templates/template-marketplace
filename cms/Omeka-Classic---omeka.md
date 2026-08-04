# Deploy Omeka Classic on Railway

Digital collections with generated admin and private MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omeka)

## About

Omeka Classic is an open-source platform for digital collections, archives, exhibits, and cultural heritage publishing. This template deploys stable 3.2.1 with generated credentials and private MariaDB.

Sign in at `/admin` as `admin` with `OMEKA_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omeka | [monotykamary/railway-template-omeka](https://github.com/monotykamary/railway-template-omeka) | Web service |
| mariadb | `mariadb:11.8.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | omeka | 8080 | Public Caddy port. |
| `OMEKA_DB_HOST` | omeka | - | Private MariaDB host. |
| `OMEKA_DB_NAME` | omeka | omeka | Database name. |
| `OMEKA_DB_PORT` | omeka | 3306 | MariaDB port. |
| `OMEKA_DB_USER` | omeka | (secret) | Database user. |
| `PUBLIC_SCHEME` | omeka | https | Forwarded public URL scheme. |
| `OMEKA_BASE_URL` | omeka | - | Canonical public Omeka URL. |
| `OMEKA_SITE_TITLE` | omeka | Omeka on Railway | Initial public site title. |
| `OMEKA_ADMIN_EMAIL` | omeka | admin@example.com | Initial administrator email. |
| `OMEKA_DB_PASSWORD` | omeka | (secret) | Shared generated database password. |
| `OMEKA_PUBLIC_HOST` | omeka | - | Public host forwarded by Caddy. |
| `OMEKA_ADMIN_PASSWORD` | omeka | (secret) | Generated administrator password. |
| `MARIADB_USER` | mariadb | (secret) | Omeka database user. |
| `MARIADB_DATABASE` | mariadb | omeka | Omeka database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate an unused random root password. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/files`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile, Python, JavaScript

[View on Railway →](https://railway.com/deploy/omeka)
