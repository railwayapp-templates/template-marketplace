# Deploy Eng-Ismacil-Automation on Railway

Self-host n8n workflow automation with Postgres storage on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eng-ismacil-automation)

## About

Deploy n8n, an open-source workflow automation tool, on Railway with a Postgres database and persistent storage already wired together.

This template runs the official `n8nio/n8n` image as one service and a Postgres database as another. n8n stores workflows, credentials and execution history in Postgres, and keeps its local data in a volume mounted at `/home/node/.n8n`. The n8n service is exposed through a generated public domain so you can open the editor and receive webhooks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DB_TYPE` | n8n | postgresdb | Database driver n8n uses. Keep as postgresdb. |
| `N8N_HOST` | n8n | - | Public host name of this n8n instance. |
| `N8N_PORT` | n8n | 5678 | Port n8n listens on inside the container. |
| `WEBHOOK_URL` | n8n | - | Public base URL used for webhook addresses. |
| `N8N_PROTOCOL` | n8n | https | Protocol used to build public n8n URLs. |
| `DB_POSTGRESDB_HOST` | n8n | - | Private host of the Postgres service. |
| `DB_POSTGRESDB_PORT` | n8n | - | Port of the Postgres service. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres user n8n connects as. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Key that encrypts stored n8n credentials. Keep it safe; losing it makes saved credentials unreadable. |
| `N8N_RUNNERS_ENABLED` | n8n | true | Enables n8n task runners. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Database name n8n stores its data in. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password n8n connects with. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/eng-ismacil-automation)
