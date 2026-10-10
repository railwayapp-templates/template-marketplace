# Deploy Bitwarden Lite on Railway

A secure password manager for storing and syncing credentials.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bitwarden-lite)

## About

[Bitwarden Lite](https://bitwarden.com/help/install-and-deploy-lite/) is a lightweight, official self-hosted password management solution from Bitwarden. It provides secure storage and synchronization of passwords, passkeys, secure notes, and sensitive information across devices. With encrypted vaults, browser extensions, and mobile applications, Bitwarden Lite offers a streamlined way to manage credentials while maintaining control over your infrastructure.

Hosting Bitwarden Lite on Railway allows you to deploy your own password management server with minimal infrastructure management. This template uses the official Bitwarden Lite container alongside PostgreSQL for persistent database storage.

Railway simplifies deployment by providing HTTPS access, private networking, environment variable management, and persistent storage.

Before deployment, users must obtain an Installation ID and Installation Key from Bitwarden to activate their self-hosted instance. Once configured, the application provides a secure web vault accessible through browsers, desktop applications, and mobile devices.

Bitwarden Lite is designed primarily for personal and homelab environments rather than enterprise deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bitwarden Lite | `ghcr.io/bitwarden/lite:2026.9.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BW_DOMAIN` | Bitwarden Lite | - | Public HTTPS domain |
| `BW_DB_SERVER` | Bitwarden Lite | - | PostgreSQL private hostname |
| `BW_PORT_HTTP` | Bitwarden Lite | 8080 | Application HTTP port |
| `BW_ENABLE_SSL` | Bitwarden Lite | false | HTTPS is handled by Railway |
| `BW_DB_DATABASE` | Bitwarden Lite | - | PostgreSQL database name |
| `BW_DB_PASSWORD` | Bitwarden Lite | (secret) | PostgreSQL password |
| `BW_DB_PROVIDER` | Bitwarden Lite | postgresql | Database provider |
| `BW_DB_USERNAME` | Bitwarden Lite | (secret) | PostgreSQL username |
| `BW_INSTALLATION_ID` | Bitwarden Lite | - | Generate at https://bitwarden.com/host/ |
| `BW_INSTALLATION_KEY` | Bitwarden Lite | - | Generate at https://bitwarden.com/host/ |
| `globalSettings__disableUserRegistration` | Bitwarden Lite | false | Allow initial account registration |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c 'ln -sf /etc/supervisor/supervisord.conf /etc/supervisord.conf && exec /entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/bitwarden`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/bitwarden-lite)
