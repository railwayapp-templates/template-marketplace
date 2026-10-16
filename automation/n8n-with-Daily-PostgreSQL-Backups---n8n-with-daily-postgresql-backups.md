# Deploy n8n with Daily PostgreSQL Backups on Railway

n8n workflow automation with PostgreSQL and daily database backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-daily-postgresql-backups)

## About

n8n is a fair-code workflow automation platform that connects apps, APIs, databases, and AI services through a visual workflow editor. Build automations for business processes, data synchronization, notifications, and AI-powered tasks with little or no code. This Railway template includes PostgreSQL and automated daily database backups.

This template deploys n8n using the official `n8nio/n8n:latest` Docker image, with PostgreSQL configured as its database. Database connections and webhook settings are preconfigured, so you can get started without manually configuring the underlying services.

Automated daily backups of the PostgreSQL database provide an additional recovery option if database data is lost or corrupted. A persistent Railway Volume is mounted at `/home/node/.n8n` to retain n8n's local settings and files across deployments.

After deployment, open the automatically generated Railway domain to access the n8n editor and create your owner account. The service uses HTTP port `5678`. Keep the generated encryption key unchanged and back up your database and persistent files appropriately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | Port |
| `DB_TYPE` | n8n | postgresdb | Databse variant |
| `WEBHOOK_URL` | n8n | - | API Url |
| `N8N_PROXY_HOPS` | n8n | 1 | Proxy number |
| `N8N_TRUST_PROXY` | n8n | true | Required for routing through proxy |
| `N8N_USER_FOLDER` | n8n | /home/node | Set root folder |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres Domain |
| `DB_POSTGRESDB_PORT` | n8n | - | Postgres Port |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres User |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encryption key |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | Delete data of past executions on a rolling basis |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres Database |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres Password |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | filesystem | Default binary data mode |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 200 | Max executions before date prune |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | false | Enforce file permissions |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-daily-postgresql-backups)
