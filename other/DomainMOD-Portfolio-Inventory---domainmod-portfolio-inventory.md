# Deploy DomainMOD Portfolio Inventory on Railway

Domain and SSL asset inventory with MariaDB and protected administration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/domainmod-portfolio-inventory)

## About

Domain and SSL asset inventory with MariaDB and protected administration.

DomainMOD tracks domain registrations, renewal dates, SSL certificates and related Internet assets. This adapter builds the pinned application source on PHP 8.2 with MariaDB, a ten-minute task scheduler and a persistent temporary/export directory. It does not use the obsolete upstream PHP 7.4 container.

| Service | Access | Persistent storage |
| --- | --- | --- |
| mariadb | Private | /var/lib/mysql |
| core | Private | /data |
| domainmod | Public HTTPS | None |

Railway terminates public TLS. Keep volume-backed services at one replica. Database and core application ports are private; only the generated owner gateway is public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| mariadb | `mariadb:10.11@sha256:7f22313fc130a377a44999965bcb0a08dd5b21e8502824c1b864f792f9bc66ab` | Database |
| domainmod | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | core | UTC | Tz for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_HOST` | core | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_NAME` | core | domainmod | Db name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_USER` | core | (secret) | Db user for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_PASSWORD` | core | (secret) | Db password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MARIADB_USER` | mariadb | (secret) | Mariadb user for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_DATABASE` | mariadb | domainmod | Mariadb database for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated mariadb password. Keep private and preserve with backups. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated mariadb root password. Keep private and preserve with backups. |
| `PORT` | domainmod | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | domainmod | true | Owner auth for domainmod. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | domainmod | all | Owner scope for domainmod. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | domainmod | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | domainmod | 80 | Upstream port for domainmod. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | domainmod | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/domainmod-portfolio-inventory)
