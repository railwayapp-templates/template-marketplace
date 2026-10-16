# Deploy n8n-template on Railway

n8n + Postgres. Volume, healthcheck, webhook URL. No API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-template)

## About

Self-host [n8n](https://n8n.io/) with Railway Postgres. Official `n8nio/n8n` image. This is the Zapier-shaped stack on [c17.io/stacks/n8n-automation](https://c17.io/stacks/n8n-automation). Activepieces is a **separate** template: [9o4t/activepieces](https://github.com/9o4t/activepieces).

No LLM or SaaS API keys are required to boot. Railway injects `PORT`. The template generates `N8N_ENCRYPTION_KEY` and wires `WEBHOOK_URL` to the public domain.

n8n is fair-code workflow automation: HTTP, webhooks, spreadsheets, Slack, and a large node library. Credentials live in Postgres, encrypted with `N8N_ENCRYPTION_KEY`. Binary data and the settings file live on a volume at `/home/node/.n8n`.

On Railway this is two services:

| Service | Source | Public | Notes |
|---|---|---|---|
| `n8n` | Docker image `n8nio/n8n` | Yes | Health `GET /healthz`. Volume `/home/node/.n8n`. |
| `Postgres` | Railway plugin | No | Workflows, credentials, execution history. |

The first account you create in the editor is the owner. There is no default username or password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16` | Database |
| n8n | [9o4t/n8n](https://github.com/9o4t/n8n) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DB_POSTGRESDB_USER` | n8n | (secret) |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-template)
