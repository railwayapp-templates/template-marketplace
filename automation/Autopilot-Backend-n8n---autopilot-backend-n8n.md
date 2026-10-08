# Deploy Autopilot Backend n8n on Railway

Self-hosted n8n with Postgres, ready to import workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autopilot-backend-n8n)

## About

Autopilot Backend n8n is a ready-to-run copy of n8n, the workflow automation tool, with a Postgres database already connected. Deploy it in one click, open your own n8n address, create your owner login, and import your workflows. No server setup and no command line.

This template starts two services: n8n and a Postgres database. Railway connects them, creates a secret encryption key for your saved logins, and gives n8n a public web address. The settings follow the free workflows in the Autopilot Backend repo. After the first deploy, open the address Railway shows you, create the owner account, and import the workflow files. You add your own credentials inside n8n. Nothing is shared with us. Railway bills your own account for the small amount of usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| faceless-content-n8n-workflow | [autopilotbackend/faceless-content-n8n-workflow](https://github.com/autopilotbackend/faceless-content-n8n-workflow) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `TZ` | faceless-content-n8n-workflow | America/Chicago | Server time zone. Change to yours. |
| `DB_TYPE` | faceless-content-n8n-workflow | postgresdb | Database type. Leave as postgresdb. |
| `N8N_HOST` | faceless-content-n8n-workflow | - | Your n8n web address. Railway fills this in. |
| `N8N_PORT` | faceless-content-n8n-workflow | 5678 | Port n8n listens on. Leave as 5678. |
| `WEBHOOK_URL` | faceless-content-n8n-workflow | - | Address other apps use to reach your workflows. Railway fills this in. |
| `N8N_PROTOCOL` | faceless-content-n8n-workflow | https | Leave as https. |
| `GENERIC_TIMEZONE` | faceless-content-n8n-workflow | America/Chicago | Time zone for schedules. Change to yours. |
| `DB_POSTGRESDB_HOST` | faceless-content-n8n-workflow | - | Database address. Comes from the Postgres service. |
| `DB_POSTGRESDB_PORT` | faceless-content-n8n-workflow | - | Database port. Comes from the Postgres service. |
| `DB_POSTGRESDB_USER` | faceless-content-n8n-workflow | (secret) | Database user. Comes from the Postgres service. |
| `N8N_ENCRYPTION_KEY` | faceless-content-n8n-workflow | - | Secret that protects your saved logins. Railway makes one for you. Do not change it later. |
| `EXECUTIONS_DATA_PRUNE` | faceless-content-n8n-workflow | true | Deletes old run history to save space. Leave as true. |
| `DB_POSTGRESDB_DATABASE` | faceless-content-n8n-workflow | - | Database name. Comes from the Postgres service. |
| `DB_POSTGRESDB_PASSWORD` | faceless-content-n8n-workflow | (secret) | Database password. Comes from the Postgres service. |
| `EXECUTIONS_DATA_MAX_AGE` | faceless-content-n8n-workflow | 168 | Hours to keep run history. 168 is one week. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | faceless-content-n8n-workflow | filesystem | Where files from workflows are stored. Leave as filesystem. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/autopilot-backend-n8n)
