# Deploy Vaultwarden (fixed) on Railway

A self-hosted cross-platform password manager (fixed)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/E7NpWn)

## About

This templates fixes https://railway.com/template/vaultwarden, since it's been a while since it's updated. 

Alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients, perfect for self-hosted deployment where running the official resource-heavy service might not be ideal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Vaultwarden | [railwayapp-templates/vaultwarden](https://github.com/railwayapp-templates/vaultwarden) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Vaultwarden | 8000 | - |
| `ADMIN_TOKEN` | Vaultwarden | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/E7NpWn)
