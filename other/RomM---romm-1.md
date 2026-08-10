# Deploy RomM on Railway

Self-hosted game library manager with metadata and emulation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/romm-1)

## About

RomM is an open-source game library manager that organizes legally obtained ROMs, metadata, artwork, and play history in a browser-based interface. It is designed for private game collections and can integrate with external metadata sources when configured by the operator.

This template runs RomM with MariaDB for application metadata and user state. Keep database traffic on private networking, expose only the web application for browser access, and attach persistent storage for the database and any library assets that must survive redeployments. Metadata providers or identity integrations may require credentials issued by those services; enter those only when you enable the related feature. Review the upstream documentation for supported platforms, scanners, backups, and upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RomM | `rommapp/romm:5.0.0@sha256:91f6611eca5a4dafc4f4a1d72a1ed7dd66a11375d939f28410dc1d1de0b80b1b` | Web service |
| MariaDB | `mariadb:11.4.5@sha256:5dfb3093333fa0ea53194ddef0a2bfa21d3b1e1353bd228b22610cd6fc0c04da` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_USER` | RomM | (secret) |
| `ROMM_AUTH_SECRET_KEY` | RomM | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MYSQL_PASSWORD` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | romm |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/romm/library`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/romm-1)
