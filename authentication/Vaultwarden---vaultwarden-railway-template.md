# Deploy Vaultwarden on Railway

A secure, self-hosted password manager for storing and syncing passwords.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-railway-template)

## About

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a lightweight, open-source password manager compatible with Bitwarden clients. Built with Rust, it enables secure storage and synchronization of passwords, secure notes, identities, and payment information across devices. Vaultwarden provides a self-hosted alternative to cloud-based password managers, offering greater control over data privacy, security, and infrastructure.

Hosting Vaultwarden on Railway provides a convenient way to run your own password management server without managing complex infrastructure. This template deploys Vaultwarden alongside PostgreSQL for persistent database storage, while Railway handles container deployment, private networking, and HTTPS access.

Vaultwarden supports encrypted password vaults, browser extensions, mobile applications, and cross-device synchronization. Persistent storage ensures that important application data remains available across deployments.

Before deployment, users must configure an administrator token to secure the management interface. Public registration is disabled by default to prevent unauthorized account creation. Once deployed, Vaultwarden can be accessed through a browser or compatible Bitwarden applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vaultwarden | `vaultwarden/server:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DOMAIN` | Vaultwarden | - | Public URL for accessing Vaultwarden |
| `LOG_LEVEL` | Vaultwarden | info | Application logging level |
| `ADMIN_TOKEN` | Vaultwarden | (secret) | Generate Argon2id hash at https://emn178.github.io/online-tools/argon2/ |
| `ROCKET_PORT` | Vaultwarden | 80 | HTTP server port |
| `DATABASE_URL` | Vaultwarden | - | PostgreSQL database connection |
| `ROCKET_ADDRESS` | Vaultwarden | 0.0.0.0 | HTTP server binding address |
| `SIGNUPS_ALLOWED` | Vaultwarden | false | Disable public user registration |
| `EXTENDED_LOGGING` | Vaultwarden | true | Enable extended application logging |
| `SHOW_PASSWORD_HINT` | Vaultwarden | (secret) | Hide password hints for security |
| `INVITATIONS_ALLOWED` | Vaultwarden | true | Allow user invitations |
| `DB_CONNECTION_RETRIES` | Vaultwarden | 30 | Database connection retry attempts |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vaultwarden-railway-template)
