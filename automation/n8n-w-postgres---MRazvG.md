# Deploy n8n (w/ postgres) on Railway

Simple n8n deploy. It just works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MRazvG)

## About

# n8n

n8n is a flexible and powerful workflow automation tool that connects apps, services, and APIs. It allows you to:

- Build complex automated workflows with a visual, node-based editor
- Integrate hundreds of services and tools without writing code
- Customize your workflows with JavaScript when needed
- Self-host for complete data control and privacy

Whether you're automating business processes, building internal tools, or connecting disparate systems, n8n provides the flexibility to tackle nearly any automation challenge. Its open-source nature and active community ensure continuous improvements and integrations.

# Learn more

- [n8n docs](https://docs.n8n.io/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | - | A random generated n8n encryption key for credentials |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/MRazvG)
