# Deploy Warracker on Railway

💸 Open-source warranty tracker for individuals and teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/warracker)

## About

**Warracker** is a self-hosted vulnerability tracking and management tool.  
It helps you monitor, analyze, and visualize security vulnerabilities (CVEs) in your systems, projects, or dependencies — giving you a clear overview of risk exposure in one place.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Warracker | `ghcr.io/sassanix/warracker/main` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_USER` | Warracker | (secret) | - |
| `SMTP_HOST` | Warracker | - | Host for your SMTP mail server |
| `SMTP_PORT` | Warracker | - | Port for your SMTP mail server |
| `SECRET_KEY` | Warracker | (secret) | - |
| `DB_PASSWORD` | Warracker | (secret) | - |
| `SMTP_PASSWORD` | Warracker | (secret) | Password for your SMTP mail server |
| `SMTP_USERNAME` | Warracker | (secret) | Username for your SMTP mail server |
| `WARRACKER_MEMORY_MODE` | Warracker | optimized | Options: optimized (default), ultra-light |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/warracker)
