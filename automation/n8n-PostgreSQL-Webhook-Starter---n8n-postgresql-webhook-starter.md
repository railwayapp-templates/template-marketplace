# Deploy n8n PostgreSQL Webhook Starter on Railway

n8n with private Postgres, generated encryption and automatic webhook URLs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-postgresql-webhook-starter)

## About

n8n with private Postgres, generated encryption and automatic webhook URLs.

This deployment fork provisions Postgres, n8n. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:34c3e49e7ed2aaef6c575fb23bb37b878007e97752d3bf27ccb550046f893ca7` | Database |
| n8n | `n8nio/n8n@sha256:3db21366be1d3c77c1708963129c051948573019659e8873e0294be035ffc1b2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | - | A random generated n8n encryption key for credentials |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 168 | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 5000 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-postgresql-webhook-starter)
