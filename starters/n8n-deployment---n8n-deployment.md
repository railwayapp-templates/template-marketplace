# Deploy n8n deployment on Railway

Environment for self hosting n8n.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-deployment)

## About

n8n is a fair-code workflow automation platform that connects 400+ apps and services through a visual, node-based editor. It lets you build automations ranging from simple integrations to complex, AI-powered workflows — with the option to drop into JavaScript or Python code whenever you need full control.

Hosting n8n means running its Node.js server together with a persistent database for workflow definitions, credentials, and execution history. This template deploys the official n8n Docker image on Railway, backed by a PostgreSQL database provisioned alongside it. Encryption keys, database credentials, and the public webhook URL are wired up automatically through Railway environment variables, so webhooks work out of the box. Railway handles TLS, networking, and restarts, and you can scale vertically as your workflow volume grows. Upgrades are as simple as redeploying with a newer image tag.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| striking-inspiration | [Alig1493/n8n-docker](https://github.com/Alig1493/n8n-docker) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | automatically generated inside the database service when you provision a PostgreSQL instance |
| `DATABASE_URL` | Postgres | - | automatically generated inside the database service when you provision a PostgreSQL instance |
| `POSTGRES_USER` | Postgres | (secret) | automatically generated inside the database service when you provision a PostgreSQL instance |
| `POSTGRES_PASSWORD` | Postgres | (secret) | automatically generated inside the database service when you provision a PostgreSQL instance |
| `DATABASE_PUBLIC_URL` | Postgres | - | automatically generated inside the database service when you provision a PostgreSQL instance |
| `DB_TYPE` | striking-inspiration | postgresdb | the type of database. |
| `N8N_HOST` | striking-inspiration | - | Domain of the host. Find this in the settings of this instance. |
| `N8N_PORT` | striking-inspiration | 5678 | The n8n service application is exposed at 5678. Look in the docker docs for more details |
| `NODE_ENV` | striking-inspiration | production | Environment tag for node. No idea/forgot the requirement/origin of this var. |
| `N8N_USER_ID` | striking-inspiration | 1000 | The user id of the application. Since it runs as root in docker we need to set it to 1000. |
| `WEBHOOK_URL` | striking-inspiration | https://striking-inspiration-production.up.railway.app | Full url of the app at root. I set the variable value as an example change it if your domain + project name changes. |
| `N8N_GROUP_ID` | striking-inspiration | 1000 | Same as user ID the n8n app runs as root user in docker so 1000 again. |
| `N8N_PROTOCOL` | striking-inspiration | https | Web application so it serves on https. |
| `N8N_USER_FOLDER` | striking-inspiration | /home/node | Node application on docker lives under /hoome/node |
| `DB_POSTGRESDB_HOST` | striking-inspiration | - | comes from connected postgres instance. |
| `DB_POSTGRESDB_PORT` | striking-inspiration | - | comes from connected postgres instance. |
| `DB_POSTGRESDB_USER` | striking-inspiration | (secret) | comes from connected postgres instance. |
| `N8N_BASIC_AUTH_USER` | striking-inspiration | (secret) | Value required for logging in on startup. Change it before deployment. |
| `N8N_RUNNERS_ENABLED` | striking-inspiration | true | for parallel processing/concurrency so true. |
| `DB_POSTGRESDB_SCHEMA` | striking-inspiration | public | We use public schema. |
| `N8N_BASIC_AUTH_ACTIVE` | striking-inspiration | true | Required for login. |
| `DB_POSTGRESDB_DATABASE` | striking-inspiration | - | comes from connected postgres instance. |
| `DB_POSTGRESDB_PASSWORD` | striking-inspiration | (secret) | comes from connected postgres instance. |
| `N8N_BASIC_AUTH_PASSWORD` | striking-inspiration | (secret) | Password required for admin login. Change it before deployment. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | striking-inspiration | true | No idea probably some admin level settings so set to true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-deployment)
