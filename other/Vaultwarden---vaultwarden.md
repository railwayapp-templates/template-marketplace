# Deploy Vaultwarden on Railway

A self-hosted cross-platform password manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vaultwarden)

## About

Alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients, perfect for self-hosted deployment where running the official resource-heavy service might not be ideal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| vaultwarden | [railwayapp-starters/vaultwarden](https://github.com/railwayapp-starters/vaultwarden) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | vaultwarden | 8000 | - |
| `DOMAIN` | vaultwarden | - | The domain of your vault |
| `ADMIN_TOKEN` | vaultwarden | (secret) | Administration Token (long string of characters and super secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** password manager, rust, bitwarden · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/vaultwarden)
