# Deploy N8N on Railway

Deploy n8n with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-5)

## About

**This variant: n8n with Postgres.** One n8n instance on a volume, backed by Railway's managed Postgres. n8n is an open-source workflow automation platform with 400+ integrations, AI agent nodes and a visual editor: a self-hosted alternative to Zapier and Make with no per-execution fees.

This template deploys two services: `n8n` (the editor, API, triggers and executions in one process) and `Postgres` (workflows, credentials and execution history). n8n is pinned to 2.40.7.

The first boot runs n8n's database migrations, which takes about a minute before the healthcheck on `/healthz/readiness` turns green. Then open the public URL and **create the owner account right away**: the first visitor to an unclaimed instance becomes its owner.

The `n8n` service keeps a volume at `/home/node/.n8n` for binary files from executions and for community nodes you install from the UI. The volume also means Railway never runs two copies of n8n side by side during a redeploy, so Schedule triggers do not fire twice.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n:2.40.7` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database n8n stores workflows, credentials and executions in. |
| `DATABASE_URL` | Postgres | - | Private connection string, for other services you add later. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to Postgres. Generated per deploy. |
| `PORT` | n8n | 5678 | Port n8n listens on. Railway's healthcheck and domain use it. |
| `DB_TYPE` | n8n | postgresdb | Stores everything in Postgres instead of SQLite. |
| `N8N_PROXY_HOPS` | n8n | 2 | Proxy hops in front of n8n (Railway's edge adds two), so rate limits see real client IPs. |
| `N8N_WEBHOOK_URL` | n8n | - | Public base URL shown for webhook, form and MCP trigger URLs. |
| `GENERIC_TIMEZONE` | n8n | UTC | Timezone for Schedule triggers and dates, e.g. Europe/Berlin. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials. Generated per deploy; back it up. |
| `N8N_EDITOR_BASE_URL` | n8n | - | Public URL of the editor, used in links, emails and OAuth redirects. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password. |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | Hours to keep execution history before pruning (336 = 14 days). |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | Most executions to keep in history. 0 means no limit. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'test "$(stat -c %U /home/node/.n8n)" = node || chown -R node:node /home/node/.n8n; export HOME=/home/node; exec su -p -s /bin/sh node -c "exec /sbin/tini -- /docker-entrypoint.sh"'`
- **Healthcheck:** `/healthz/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-5)
