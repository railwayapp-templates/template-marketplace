# Deploy Kimai on Railway

Open-source time tracking with MariaDB and persistent team data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kimai-1)

## About

This template runs the official Kimai 2.61.0 Apache image with MariaDB 11.4.5.
Railway provides the public HTTPS endpoint for Kimai while the database remains
on private networking. Kimai waits for MariaDB and applies its idempotent
Doctrine migrations before Apache starts. A persistent application volume
retains Kimai's writable data under `/opt/kimai/var/data`; MariaDB uses a
separate persistent volume. Required passwords are generated at deployment
time, while portable settings and service connections are prefilled, so the
base deployment needs no external credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kimai | `kimai/kimai2:2.61.0@sha256:33d9574ba954fd4cf2f01f6369fa3a26a7bf0944d0d7f43b779c8927f8729aa9` | Web service |
| MariaDB | `mariadb:11.4.5@sha256:5dfb3093333fa0ea53194ddef0a2bfa21d3b1e1353bd228b22610cd6fc0c04da` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Kimai | 8001 |
| `ADMINMAIL` | Kimai | admin@kimai.local |
| `MYSQL_USER` | MariaDB | (secret) |
| `MYSQL_DATABASE` | MariaDB | kimai |
| `MYSQL_PASSWORD` | MariaDB | (secret) |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Start command:** `bash -c "a2dismod mpm_event mpm_worker 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; exec /entrypoint.sh"`
- **Healthcheck:** `/en/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/kimai/var/data`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kimai-1)
