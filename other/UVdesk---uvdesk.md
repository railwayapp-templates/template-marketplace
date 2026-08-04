# Deploy UVdesk on Railway

Open-source helpdesk with generated admin and MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uvdesk)

## About

UVdesk Community Helpdesk is an open-source support platform with tickets, agents, groups, workflows, knowledge base content, saved replies, and customer portals. This template deploys stable 1.1.8 with generated credentials and private MariaDB.

Sign in at `/en/member/login` as `admin@example.com` with `UVDESK_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.8.3` | Database |
| uvdesk | [monotykamary/railway-template-uvdesk](https://github.com/monotykamary/railway-template-uvdesk) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb | (secret) | UVdesk database user. |
| `MARIADB_DATABASE` | mariadb | uvdesk | UVdesk database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate an unused random root password. |
| `PORT` | uvdesk | 8080 | Public Caddy port. |
| `MAILER_DSN` | uvdesk | null://null | Symfony mailer DSN; replace to enable outbound mail. |
| `PUBLIC_SCHEME` | uvdesk | https | Forwarded public URL scheme. |
| `UVDESK_DB_HOST` | uvdesk | - | Private MariaDB host. |
| `UVDESK_DB_NAME` | uvdesk | uvdesk | Database name. |
| `UVDESK_DB_PORT` | uvdesk | 3306 | MariaDB port. |
| `UVDESK_DB_USER` | uvdesk | (secret) | Database user. |
| `UVDESK_APP_SECRET` | uvdesk | (secret) | Generated Symfony application secret. |
| `UVDESK_ADMIN_EMAIL` | uvdesk | admin@example.com | Initial super administrator email. |
| `UVDESK_DB_PASSWORD` | uvdesk | (secret) | Shared generated database password. |
| `UVDESK_PUBLIC_HOST` | uvdesk | - | Canonical public helpdesk host. |
| `UVDESK_ADMIN_PASSWORD` | uvdesk | (secret) | Generated super administrator password. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/uvdesk`

**Category:** Other · **Languages:** Shell, Dockerfile, Python, JavaScript

[View on Railway →](https://railway.com/deploy/uvdesk)
