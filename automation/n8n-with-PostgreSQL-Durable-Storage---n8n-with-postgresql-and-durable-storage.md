# Deploy n8n with PostgreSQL & Durable Storage on Railway

Workflow automation with private Postgres, durable files and webhook URLs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-postgresql-and-durable-storage)

## About

Workflow automation with private Postgres, durable files and webhook URLs.

Deploying this template creates Postgres, n8n in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n@sha256:3db21366be1d3c77c1708963129c051948573019659e8873e0294be035ffc1b2` | Web service |
| Postgres | `postgres@sha256:ca0bd484cb98bf4b24eb1010e73fb3fcbd6714d240fbc1a10eea5b7dbecb641d` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | n8n | UTC | - |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `GENERIC_TIMEZONE` | n8n | UTC | - |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | - | Keep this key for the lifetime of the database so saved credentials can be decrypted. |
| `N8N_LISTEN_ADDRESS` | n8n | :: | - |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 168 | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 5000 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |
| `POSTGRES_DB` | Postgres | n8n | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated separately for every deployment. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-postgresql-and-durable-storage)
