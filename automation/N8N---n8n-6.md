# Deploy N8N on Railway

n8n queue mode with workers and webhook processors behind one URL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-6)

## About

**This variant: n8n queue mode with workers and webhook processors, behind one URL.** n8n's full scaling architecture: dedicated processes for the editor, for incoming webhooks and for executions. n8n is an open-source workflow automation platform with 400+ integrations, AI agent nodes and a visual editor: a self-hosted alternative to Zapier and Make with no per-execution fees.

This template deploys six services:

- `Caddy`: the only public service. It sends production traffic (`/webhook/*`, `/webhook-waiting/*`, `/form/*`, `/form-waiting/*`, `/mcp/*`) to `n8n-webhook` and everything else to `n8n`.
- `n8n`: the editor, API, schedules and test webhooks. Production webhooks are switched off here.
- `n8n-webhook`: receives production webhooks, forms and MCP calls, and queues them.
- `n8n-worker`: runs every execution.
- `Redis` and `Postgres`: the job queue, and all persistent data.

Every n8n service is pinned to 2.40.7. The first boot runs n8n's database migrations, which takes about a minute. Then open the public URL and **create the owner account right away**: the first visitor to an unclaimed instance becomes its owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Caddy | `caddy:2.11-alpine` | Web service |
| n8n-worker | `n8nio/n8n:2.40.7` | Worker |
| n8n-webhook | `n8nio/n8n:2.40.7` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n:2.40.7` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname n8n connects to. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Private connection string, for other services you add later. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect it. |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis. Generated per deploy. |
| `PORT` | Caddy | 8080 | Port Caddy listens on. The public domain points here. |
| `CADDYFILE` | Caddy | {
	admin off
	auto_https off
	servers {
		trusted_proxies static 0.0.0.0/0 ::/0
	}
}

:{$PORT} {
	handle /caddy-healthz {
		respond 200
	}
	@production path /webhook/* /webhook-waiting/* /form/* /form-waiting/* /mcp/*
	handle @production {
		reverse_proxy {$WEBHOOK_UPSTREAM}
	}
	handle {
		reverse_proxy {$MAIN_UPSTREAM}
	}
}
 | Routes production webhooks to n8n-webhook and everything else to n8n. |
| `MAIN_UPSTREAM` | Caddy | - | Private address of the main n8n instance. |
| `WEBHOOK_UPSTREAM` | Caddy | - | Private address of the webhook processors. |
| `PORT` | n8n-worker | 5678 | Port of the worker's health server, which Railway's healthcheck probes. |
| `DB_TYPE` | n8n-worker | postgresdb | Stores everything in Postgres instead of SQLite. |
| `EXECUTIONS_MODE` | n8n-worker | queue | Hands executions to workers through Redis. |
| `N8N_WEBHOOK_URL` | n8n-worker | - | Mirrors the main instance's webhook URL. |
| `GENERIC_TIMEZONE` | n8n-worker | - | Mirrors the main instance's timezone. |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n-worker | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | Must equal the main instance's key to read credentials. |
| `N8N_EDITOR_BASE_URL` | n8n-worker | - | Mirrors the main instance's editor URL. |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | Redis host on the private network. |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | Postgres password. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) | Redis user. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true | Turns on the worker's /healthz endpoints. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true | Resolves Redis over IPv6 as well, which Railway's private network uses. |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n-worker | true | Reinstalls community nodes on boot, since this service has no volume. |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | n8n-worker | 10 | Executions each worker replica runs in parallel. Keep it at 5 or more. |
| `PORT` | n8n-webhook | 5678 | Port the webhook processor listens on. Caddy and the healthcheck use it. |
| `DB_TYPE` | n8n-webhook | postgresdb | Stores everything in Postgres instead of SQLite. |
| `N8N_PROXY_HOPS` | n8n-webhook | 3 | Railway's edge (two hops) plus Caddy, so rate limits see real client IPs. |
| `EXECUTIONS_MODE` | n8n-webhook | queue | Hands executions to workers through Redis. |
| `N8N_WEBHOOK_URL` | n8n-webhook | - | Mirrors the main instance's webhook URL. |
| `GENERIC_TIMEZONE` | n8n-webhook | - | Mirrors the main instance's timezone. |
| `DB_POSTGRESDB_HOST` | n8n-webhook | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n-webhook | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n-webhook | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n-webhook | - | Must equal the main instance's key to read credentials. |
| `N8N_EDITOR_BASE_URL` | n8n-webhook | - | Mirrors the main instance's editor URL. |
| `QUEUE_BULL_REDIS_HOST` | n8n-webhook | - | Redis host on the private network. |
| `QUEUE_BULL_REDIS_PORT` | n8n-webhook | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n-webhook | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n-webhook | (secret) | Postgres password. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-webhook | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-webhook | (secret) | Redis user. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-webhook | true | Resolves Redis over IPv6 as well, which Railway's private network uses. |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n-webhook | true | Reinstalls community nodes on boot, since this service has no volume. |
| `POSTGRES_DB` | Postgres | railway | Database n8n stores workflows, credentials and executions in. |
| `DATABASE_URL` | Postgres | - | Private connection string, for other services you add later. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to Postgres. Generated per deploy. |
| `PORT` | n8n | 5678 | Port n8n listens on. Railway's healthcheck and domain use it. |
| `DB_TYPE` | n8n | postgresdb | Stores everything in Postgres instead of SQLite. |
| `N8N_PROXY_HOPS` | n8n | 3 | Railway's edge (two hops) plus Caddy, so rate limits see real client IPs. |
| `EXECUTIONS_MODE` | n8n | queue | Hands executions to workers through Redis. |
| `N8N_WEBHOOK_URL` | n8n | - | Public base URL shown for webhook, form and MCP trigger URLs. |
| `GENERIC_TIMEZONE` | n8n | UTC | Timezone for Schedule triggers and dates, e.g. Europe/Berlin. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials. Generated per deploy; back it up. |
| `N8N_EDITOR_BASE_URL` | n8n | - | Public URL of the editor, used in links, emails and OAuth redirects. |
| `QUEUE_BULL_REDIS_HOST` | n8n | - | Redis host on the private network. |
| `QUEUE_BULL_REDIS_PORT` | n8n | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password. |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | Hours to keep execution history before pruning (336 = 14 days). |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n | (secret) | Redis user. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n | true | Resolves Redis over IPv6 as well, which Railway's private network uses. |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n | true | Reinstalls community nodes on boot, since this service has no volume. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | Most executions to keep in history. 0 means no limit. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | n8n | true | Leaves production webhooks to n8n-webhook; main keeps test webhooks. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true | Runs editor test executions on workers too, like production. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/caddy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/sbin/tini -- /docker-entrypoint.sh worker`
- **Healthcheck:** `/healthz/readiness`
- **Start command:** `/sbin/tini -- /docker-entrypoint.sh webhook`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-6)
