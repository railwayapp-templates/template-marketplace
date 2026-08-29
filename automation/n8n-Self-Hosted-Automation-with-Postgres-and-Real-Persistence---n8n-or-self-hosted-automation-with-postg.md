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
| n8n | `n8nio/n8n:2.36.0` | Web service |

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
| `NODE_OPTIONS` | n8n | --max-old-space-size=768 | Caps the V8 heap so the first boot, which runs every database migration at once, stays under the 1 GB per-service memory ceiling of the Railway Trial plan. |
| `N8N_USER_FOLDER` | n8n | /home/node | - |
| `GENERIC_TIMEZONE` | n8n | UTC | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_LISTEN_ADDRESS` | n8n | :: | - |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | Deletes old execution records so Postgres does not grow without bound on a small plan. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | filesystem | Keeps binary data from executions on the volume instead of in memory and Postgres, so large files do not blow up the container or the database. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 200 | How many past executions to keep when pruning is on. Raise it if you need a longer history. |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT` | n8n | 60000 | Milliseconds to wait for Postgres on start, raised from the 20s default so a slow first boot of the database does not fail the deploy. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-or-self-hosted-automation-with-postg)
