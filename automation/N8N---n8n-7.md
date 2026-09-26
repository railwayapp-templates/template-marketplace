# Deploy N8N on Railway

n8n on SQLite in a single service with a volume. Cheapest to run.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-7)

## About

**This variant: n8n Lite, a single service on SQLite.** The cheapest way to run n8n: one container and one volume, no database service to pay for. n8n is an open-source workflow automation platform with 400+ integrations, AI agent nodes and a visual editor: a self-hosted alternative to Zapier and Make with no per-execution fees.

This template deploys one service, `n8n`, with a volume at `/home/node/.n8n`. Workflows, credentials and execution history live in a SQLite database on that volume, next to binary files and any community nodes you install. n8n is pinned to 2.40.7.

The first boot creates the database, which takes under a minute before the healthcheck on `/healthz/readiness` turns green. Then open the public URL and **create the owner account right away**: the first visitor to an unclaimed instance becomes its owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.40.7` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5678 | Port n8n listens on. Railway's healthcheck and domain use it. |
| `N8N_PROXY_HOPS` | 2 | Proxy hops in front of n8n (Railway's edge adds two), so rate limits see real client IPs. |
| `N8N_WEBHOOK_URL` | - | Public base URL shown for webhook, form and MCP trigger URLs. |
| `GENERIC_TIMEZONE` | UTC | Timezone for Schedule triggers and dates, e.g. Europe/Berlin. |
| `N8N_ENCRYPTION_KEY` | - | Encrypts stored credentials. Generated per deploy; back it up. |
| `DB_SQLITE_POOL_SIZE` | 2 | SQLite read connections; above 0 turns on WAL mode. |
| `N8N_EDITOR_BASE_URL` | - | Public URL of the editor, used in links, emails and OAuth redirects. |
| `EXECUTIONS_DATA_MAX_AGE` | 336 | Hours to keep execution history before pruning (336 = 14 days). |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | 10000 | Most executions to keep in history. 0 means no limit. |

## Configuration

- **Start command:** `sh -c 'test "$(stat -c %U /home/node/.n8n)" = node || chown -R node:node /home/node/.n8n; export HOME=/home/node; exec su -p -s /bin/sh node -c "exec /sbin/tini -- /docker-entrypoint.sh"'`
- **Healthcheck:** `/healthz/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-7)
