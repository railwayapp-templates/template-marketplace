# Deploy n8n on Railway

The cheapest n8n with PostgreSQL database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nIAh-Q)

## About

n8n is a workflow automation platform that gives technical teams the flexibility of code with the speed of no-code. With 400+ integrations, native AI capabilities, and a fair-code license, n8n lets you build powerful automations while maintaining full control over your data and deployments.

NOTE: This is the official image + some community nodes!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `br1cascio/n8n:1.123.38` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `GENERIC_TIMEZONE` | n8n | America/New_York | Timezone to use in N8N workflows |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | n8n | true | enabled for MCP |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nIAh-Q)
