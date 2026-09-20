# Deploy phpIPAM Address Inventory on Railway

IP address and subnet inventory with MariaDB and protected administration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phpipam-address-inventory)

## About

IP address and subnet inventory with MariaDB and protected administration.

| Service | Access | Persistent storage |
| --- | --- | --- |
| app | Private | /phpipam/css/images/logo |
| phpipam | Public HTTPS | None |
| mariadb | Private | /var/lib/mysql |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `phpipam/phpipam-www:v1.8.3@sha256:1ec1035d7e650bbe722faecc56ded7231c479b08297437dd8a37fde4f314fb04` | Database |
| phpipam | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| mariadb | `mariadb:11.4@sha256:70cc072b29b4a89ae07abb2d4da2c64678a7f2dfe092751bb51c87d67dc1338b` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | app | UTC | Tz for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IPAM_DATABASE_HOST` | app | - | Ipam database host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `IPAM_DATABASE_NAME` | app | phpipam | Ipam database name for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IPAM_DATABASE_PASS` | app | - | Ipam database pass resolved automatically from the linked service. Keep this reference when using the included topology. |
| `IPAM_DATABASE_USER` | app | (secret) | Ipam database user for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IPAM_DATABASE_WEBHOST` | app | % | Ipam database webhost for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IPAM_TRUST_X_FORWARDED` | app | true | Ipam trust x forwarded for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | phpipam | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | phpipam | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | phpipam | all | Protect all application routes. |
| `UPSTREAM_HOST` | phpipam | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | phpipam | 80 | Upstream port for phpipam. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | phpipam | (secret) | Generated access password. Keep private and preserve with backups. |
| `MARIADB_USER` | mariadb | (secret) | Mariadb user for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_DATABASE` | mariadb | phpipam | Mariadb database for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated mariadb password. Keep private and preserve with backups. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated mariadb root password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/phpipam/css/images/logo`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/phpipam-address-inventory)
