# Deploy Vaultwarden on Railway

Unofficial Bitwarden Compatible Server Written in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-1)

## About

**What is Vaultwarden?**  
Vaultwarden is a lightweight, open-source, self-hosted password manager written in Rust. Fully compatible with Bitwarden clients and browser extensions, it delivers secure, end-to-end encrypted vault management with minimal resource usage—ideal for personal or team use and optimised for deployment on Railway.

---

Hosting Vaultwarden on Railway is simple, fast, and production-ready. You’ll run Vaultwarden as a Docker container alongside a PostgreSQL database, all configured via environment variables—Railway manages builds, secrets, logs, and scaling automatically. A dedicated Railway volume ensures persistent storage for Vaultwarden data, including attachments and encrypted vault entries, surviving redeployments without manual config files. It’s a resilient, scalable password vault solution you can spin up with minimal overhead.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Vaultwarden | `vaultwarden/server:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DOMAIN` | Vaultwarden | https://yourdomain.com | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 80
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vaultwarden-1)
