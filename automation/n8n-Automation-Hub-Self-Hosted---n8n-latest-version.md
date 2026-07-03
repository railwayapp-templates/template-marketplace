# Deploy n8n Automation Hub – Self-Hosted on Railway

[Jun'26]  Self-hosted n8n: 400+ integrations, Postgres DB & AI workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-latest-version)

## About

**Self-host the open-source alternative to Zapier — unlimited executions, no per-task billing,
full data ownership.**

n8n is the world's most popular open-source workflow automation platform with **188k+ GitHub
stars**, 100M+ Docker pulls, and 500+ integrations. Build powerful automations visually, write
code when you need it, and connect AI agents, APIs, and databases — all without execution caps or
vendor lock-in.

![n8n workflow builder](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| N8n Self Deploy | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | N8n Self Deploy | 5678 | n8n runs internally on port 5678 |
| `DB_TYPE` | N8n Self Deploy | postgresdb | - |
| `WEBHOOK_URL` | N8n Self Deploy | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `N8N_PROXY_HOPS` | N8n Self Deploy | 1 | n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443 |
| `DB_POSTGRESDB_PORT` | N8n Self Deploy | 5432 | - |
| `DB_POSTGRESDB_USER` | N8n Self Deploy | (secret) | - |
| `EXECUTIONS_DATA_PRUNE` | N8n Self Deploy | true | EXECUTIONS_DATA_PRUNE in n8n is an environment variable that enables automatic deletion of old workflow execution logs |
| `DB_POSTGRESDB_PASSWORD` | N8n Self Deploy | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | N8n Self Deploy | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | N8n Self Deploy | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8n Self Deploy | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8n Self Deploy | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-latest-version)
