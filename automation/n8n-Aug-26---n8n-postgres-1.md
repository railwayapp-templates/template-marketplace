# Deploy n8n [Aug 26] on Railway

n8n workflow automation + Postgres — 400+ integrations · Updated Aug 26

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-postgres-1)

## About

Railway provides a streamlined platform for deploying web applications and databases. This template runs n8n — the popular workflow automation platform with 400+ integrations — on Railway with a PostgreSQL database. n8n's official Docker image is pinned to a stable version, so deploys are reproducible and updates are a one-line bump.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [marco-quintella/n8n-postgres](https://github.com/marco-quintella/n8n-postgres) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_POSTGRESDB_USER` | web | (secret) |
| `DB_POSTGRESDB_PASSWORD` | web | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-postgres-1)
