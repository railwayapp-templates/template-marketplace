# Deploy N8N-Postgres on Railway

Production-ready n8n with an internal PostgreSQL database for persistence.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-postgres)

## About

n8n-Postgres is a powerful combination of the n8n workflow automation tool backed by a PostgreSQL database. It allows you to build, scale, and automate complex node-based workflows and AI agents without code limitations, while ensuring all your execution data, credentials, and custom configurations are securely and permanently retained.

Hosting n8n with a dedicated PostgreSQL database involves orchestrating two main components: the n8n application engine and the database storage layer. The n8n instance handles the user interface, execution logic, and webhook listeners, while PostgreSQL manages workflow states, user credentials, and execution logs.

When deploying this stack, you need to configure private networking so n8n can securely communicate with the database, map persistent storage volumes to prevent data loss during container restarts, and set up automatic pruning variables to keep the database from expanding indefinitely. Railway handles this architecture seamlessly out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | [statin26/n8n-postgres-universal](https://github.com/statin26/n8n-postgres-universal) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | n8n-db | railway | The name of the default database created on startup. |
| `DATABASE_URL` | n8n-db | - | The private connection string used by other services inside your Railway project to talk to the database securely. |
| `POSTGRES_USER` | n8n-db | (secret) | The master username for superuser access to the database. |
| `POSTGRES_PASSWORD` | n8n-db | (secret) | A securely generated, 32-character random password for the database. |
| `DATABASE_PUBLIC_URL` | n8n-db | - | The public connection string used to connect to your database from outside Railway (like your local machine or external tools). |
| `PORT` | n8n | 5678 | The internal web server port that Railway routes traffic to (typically 5678). |
| `DB_TYPE` | n8n | postgresdb | Specifies the type of database backend being used (set to postgresdb). |
| `N8N_PORT` | n8n | 5678 | Tells n8n which port to bind to (should match the PORT variable). |
| `WEBHOOK_URL` | n8n | - | The primary domain address n8n uses to receive external webhook triggers. |
| `N8N_PROTOCOL` | n8n | https | Defines how clients connect to n8n (usually http or https). |
| `DB_POSTGRESDB_HOST` | n8n | - | The specific database name within PostgreSQL assigned to n8n. |
| `DB_POSTGRESDB_PORT` | n8n | - | The network port used to connect to your database (typically 5432). |
| `DB_POSTGRESDB_USER` | n8n | (secret) | The username n8n uses to log into your PostgreSQL database. |
| `N8N_ENCRYPTION_KEY` | n8n | - | A secure, randomly generated key used to encrypt credentials stored in the database. |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | Set to true to automatically delete old workflow execution history to save database space. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | The specific database name within PostgreSQL assigned to n8n. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | The password n8n uses to authenticate with your PostgreSQL database. |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 168 | The number of hours to keep workflow execution data before it gets pruned (e.g., 168 for 7 days). |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | Set to false to disable sending anonymous telemetry data to n8n. |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-postgres)
