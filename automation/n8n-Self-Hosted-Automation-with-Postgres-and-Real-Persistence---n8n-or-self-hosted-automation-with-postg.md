# Deploy n8n | Self-Hosted Automation with Postgres and Real Persistence on Railway

Self-host n8n on Railway — workflows, Postgres & data that survives.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-or-self-hosted-automation-with-postg)

## About

[n8n](https://n8n.io) is a self-hosted workflow automation tool — a visual editor for connecting APIs, databases and schedules, with the workflows and credentials living on infrastructure you control. This template deploys n8n with a PostgreSQL database, wired together over Railway's private network.

n8n keeps state in two places, and this is where self-hosted deployments quietly go wrong. Workflows, executions and credentials go into PostgreSQL. But the encryption key, installed community nodes, binary data from executions and the instance's own settings file live on disk, under the user folder. A container filesystem is wiped on every redeploy, so without a volume on the *correct* path those disappear — and because the workflows themselves survive in Postgres, the instance looks fine until a credential fails to decrypt or a custom node vanishes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8nio/n8n:2.32.5 | `n8nio/n8n:2.32.5` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_TYPE` | n8nio/n8n:2.32.5 | postgresdb | - |
| `N8N_PORT` | n8nio/n8n:2.32.5 | 5678 | - |
| `N8N_USER_FOLDER` | n8nio/n8n:2.32.5 | /home/node/.n8n | - |
| `GENERIC_TIMEZONE` | n8nio/n8n:2.32.5 | UTC | - |
| `DB_POSTGRESDB_USER` | n8nio/n8n:2.32.5 | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8nio/n8n:2.32.5 | :: | - |
| `DB_POSTGRESDB_PASSWORD` | n8nio/n8n:2.32.5 | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-or-self-hosted-automation-with-postg)
