# Deploy n8n Automation Hub – Self-Hosted on Railway

[May'26]  Self-hosted n8n: 400+ integrations, Postgres DB & AI workflows

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
| n8n-railway | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n-railway | 5678 | n8n runs internally on port 5678 |
| `DB_TYPE` | n8n-railway | postgresdb | - |
| `WEBHOOK_URL` | n8n-railway | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `N8N_PROXY_HOPS` | n8n-railway | 1 | n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443 |
| `DB_POSTGRESDB_USER` | n8n-railway | (secret) | - |
| `EXECUTIONS_DATA_PRUNE` | n8n-railway | true | EXECUTIONS_DATA_PRUNE in n8n is an environment variable that enables automatic deletion of old workflow execution logs |
| `DB_POSTGRESDB_PASSWORD` | n8n-railway | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | n8n-railway | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-railway | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n-railway | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-railway | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-latest-version)
