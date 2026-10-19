# Deploy n8n Integration App with PostgreSQL on Railway

Integration workflows with Postgres, durable local files and a stable key.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-integration-app-with-postgresql)

## About

Integration workflows with Postgres, durable local files and a stable key.

This deployment fork provisions n8n, Postgres. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | [Shinyduo/n8n-railway-updated](https://github.com/Shinyduo/n8n-railway-updated) (branch: main) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:34c3e49e7ed2aaef6c575fb23bb37b878007e97752d3bf27ccb550046f893ca7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_PROXY_HOPS` | n8n | 1 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | - | Persistent encryption key; retain it with database backups. |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 168 | - |
| `N8N_EXPRESS_TRUST_PROXY` | n8n | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 5000 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-integration-app-with-postgresql)
