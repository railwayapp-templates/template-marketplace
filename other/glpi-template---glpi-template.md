# Deploy glpi-template on Railway

GLPI — IT helpdesk + asset management, auto-installed in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glpi-template)

## About

Deploy GLPI to Railway in one click. The template provisions both services, wires the database credentials by reference, and hands you a login-able helpdesk at your Railway domain — the installer runs itself on the first boot with zero prompts.

Hosting GLPI on Railway gives you a managed ITSM stack: a `glpi` service (official image, pinned `glpi/glpi:11.0.9`, wrapped for Railway so the `/var/glpi` volume is writable and served on port 80) and a `mariadb` service (`mariadb:10.11`, private networking only, utf8mb4). The five `GLPI_DB_*` variables the official image needs for its silent auto-install are pre-wired: host points at the MariaDB private hostname, the password is generated fresh per deployment and shared by reference — no secrets in the repo, nothing to type at deploy time. Everything GLPI writes outside the database (config, uploaded files, logs, marketplace plugins) lives on a single volume at `/var/glpi`, so restarts and redeploys keep your installation. Timezone tables are loaded in the MariaDB init and enabled in GLPI on every boot, so dates and SLAs render correctly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | [lNamelessl/glpi-railway-template](https://github.com/lNamelessl/glpi-railway-template) (root: mariadb) | Database |
| glpi | [lNamelessl/glpi-railway-template](https://github.com/lNamelessl/glpi-railway-template) (root: glpi) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_PASSWORD` | mariadb | (secret) |
| `GLPI_DB_PASSWORD` | glpi | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/glpi`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/glpi-template)
