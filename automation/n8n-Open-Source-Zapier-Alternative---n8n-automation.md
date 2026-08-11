# Deploy n8n | Open Source Zapier Alternative on Railway

Self-hosted workflow automation in queue mode with a dedicated worker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-automation)

## About

n8n is a workflow automation tool: you connect apps, APIs and databases on a canvas, and it runs the result on a schedule, on a webhook, or on demand. This template deploys it in **queue mode**, the configuration n8n recommends for production, with a dedicated worker process, Postgres and Redis.

Most n8n templates run a single container that both serves the editor and executes workflows. That is the development shape: one long-running execution blocks the UI, and a crash in a workflow takes the editor down with it. This template splits the two.

Four services, all from official upstream images with fully pinned tags:

- **n8n** — the editor and API. Public domain, healthcheck on `/healthz`.
- **Worker** — the same image running `n8n worker`. It pulls jobs off the queue and executes them. Its health endpoint is switched on, so Railway restarts it if it wedges instead of leaving it silently idle.
- **Postgres** — workflows, credentials and execution history, on a volume.
- **Redis** — the job queue. Deliberately without a volume: a Redis container cannot write to a Railway volume, and the way it fails is to stop accepting writes altogether, which takes the queue down with it. A restart therefore drops work that was waiting in the queue; everything already recorded is in Postgres. Private network only; there is no public proxy in front of it.

Everything is pre-configured. There are no fields to fill in on the deploy screen, and every variable carries a description explaining what it does and when to change it.

Details that are easy to get wrong on Railway and are already handled here:

- The encryption key for stored credentials is generated once and shared with the worker. Without that the worker cannot decrypt the credentials attached to the jobs it picks up.
- `N8N_PROXY_HOPS` is set to 1. Left at its default, every request looks like it came from Railway's edge, which quietly disables rate limiting and the login-attempt lockout.
- The Redis client is told to resolve IPv6 and the private-networking flag Alpine images need is set, so the queue actually connects.
- n8n exits when it cannot reach Redis, and its default patience is shorter than a Redis restart. The timeout is raised so a routine restart of the queue is not an outage.
- The webhook base URL uses `N8N_WEBHOOK_URL`, not the deprecated `WEBHOOK_URL`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.33.7` | Web service |
| Postgres | `postgres:18.4-alpine` | Database |
| Worker | `n8nio/n8n:2.33.7` | Worker |
| Redis | `redis:8.10.0-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | n8n | UTC | Timezone of the container itself, used for log timestamps and date formatting. |
| `PORT` | n8n | 5678 | Port Railway routes public traffic and healthchecks to. Must match N8N_PORT. |
| `DB_TYPE` | n8n | postgresdb | Database driver. n8n stores workflows, credentials and execution history in Postgres. |
| `N8N_PORT` | n8n | 5678 | Port n8n binds. Must match PORT. |
| `N8N_PROTOCOL` | n8n | https | Scheme n8n uses when it builds its own URLs. |
| `N8N_PROXY_HOPS` | n8n | 1 | Number of reverse proxies in front of n8n — exactly one on Railway. Left at 0 every request looks like it came from the edge, which quietly breaks rate limiting and the login lockout. |
| `EXECUTIONS_MODE` | n8n | queue | Queue mode: the editor hands work to the Worker over Redis instead of running it itself. Changing this to 'regular' makes the Worker service dead weight. |
| `GENERIC_TIMEZONE` | n8n | UTC | Timezone used by Schedule and Cron triggers. Set it to yours or every schedule fires at the wrong hour. |
| `N8N_RUNNERS_MODE` | n8n | internal | Code nodes run in a task runner launched as a child process. 'external' needs a separate runner image and is not part of this template. |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | Port of the Postgres service on the private network. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres role n8n connects as. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials. Generated once — if you lose it, every saved credential becomes unreadable, and if you change it, the Worker can no longer decrypt what the editor saved. |
| `N8N_LISTEN_ADDRESS` | n8n | :: | Bind address. The wildcard IPv6 socket is dual-stack on Node, so the healthcheck still gets an answer over IPv4. |
| `N8N_PYTHON_ENABLED` | n8n | false | This image ships no Python interpreter, so the Code node offers JavaScript only. Leaving it on would let you write a Python node that fails when it runs. |
| `QUEUE_BULL_REDIS_PORT` | n8n | 6379 | Port of the Redis service on the private network. |
| `DB_POSTGRESDB_DATABASE` | n8n | n8n | Database name. Must match POSTGRES_DB on the Postgres service. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | Hours of execution history to keep (14 days). This is the dial that decides how fast the Postgres volume fills up. |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n | 300 | Seconds a single Code node may run before it is aborted. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n | true | Lets the Redis client resolve IPv6. Railway's private network is IPv6-only, so without this the queue never connects. |
| `NODE_FUNCTION_ALLOW_BUILTIN` | n8n | - | Node.js built-in modules the Code node may require, comma-separated (for example 'crypto,url') or '*' for all. Empty blocks every module. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | n8n | - | npm packages the Code node may require, comma-separated. Only packages already present in the image can be loaded. |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | n8n | true | Allows installing community nodes outside n8n's verified list. Set to false for a locked-down instance. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n | true | Required on Alpine-based images for *.railway.internal to resolve at all. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | n8n | 60000 | How long (ms) n8n keeps trying to reach Redis before it exits. The upstream default of 10s is shorter than a Redis restart takes, which turns a routine restart into an outage. |
| `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES` | n8n | 1000 | Maximum number of files in an archive the Compression node will open. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true | Test runs from the editor go through the queue too, so a long test does not block the UI. |
| `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES` | n8n | 268435456 | Ceiling (bytes) on what the Compression node may unpack. 256 MiB — a container this size cannot hold upstream's 2 GiB default, and the limit gives you an error instead of an out-of-memory kill. |
| `PORT` | Postgres | 5432 | Port Postgres listens on inside the private network. |
| `POSTGRES_DB` | Postgres | n8n | Database created on first boot. Must match DB_POSTGRESDB_DATABASE. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser role created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once on deploy. Changing it here does not change it in the database. |
| `TZ` | Worker | UTC | Timezone of the container itself, used for log timestamps and date formatting. |
| `PORT` | Worker | 5678 | Port the worker's health endpoint listens on. |
| `DB_TYPE` | Worker | postgresdb | Database driver. n8n stores workflows, credentials and execution history in Postgres. |
| `EXECUTIONS_MODE` | Worker | queue | Queue mode: the editor hands work to the Worker over Redis instead of running it itself. Changing this to 'regular' makes the Worker service dead weight. |
| `GENERIC_TIMEZONE` | Worker | UTC | Timezone used by Schedule and Cron triggers. Set it to yours or every schedule fires at the wrong hour. |
| `N8N_RUNNERS_MODE` | Worker | internal | Code nodes run in a task runner launched as a child process. 'external' needs a separate runner image and is not part of this template. |
| `DB_POSTGRESDB_PORT` | Worker | 5432 | Port of the Postgres service on the private network. |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Postgres role n8n connects as. |
| `N8N_ENCRYPTION_KEY` | Worker | - | Taken from the editor service — it has to be byte-identical, or the worker cannot decrypt the credentials attached to the jobs it picks up. |
| `N8N_PYTHON_ENABLED` | Worker | false | This image ships no Python interpreter, so the Code node offers JavaScript only. Leaving it on would let you write a Python node that fails when it runs. |
| `QUEUE_BULL_REDIS_PORT` | Worker | 6379 | Port of the Redis service on the private network. |
| `DB_POSTGRESDB_DATABASE` | Worker | n8n | Database name. Must match POSTGRES_DB on the Postgres service. |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_HEALTH_CHECK_PORT` | Worker | 5678 | Port for that health endpoint. Must match PORT. |
| `N8N_RUNNERS_TASK_TIMEOUT` | Worker | 300 | Seconds a single Code node may run before it is aborted. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Worker | true | Exposes /healthz on the worker. Off by default upstream, which leaves Railway unable to tell a wedged worker from a healthy one. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Lets the Redis client resolve IPv6. Railway's private network is IPv6-only, so without this the queue never connects. |
| `NODE_FUNCTION_ALLOW_BUILTIN` | Worker | - | Node.js built-in modules the Code node may require, comma-separated (for example 'crypto,url') or '*' for all. Empty blocks every module. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | Worker | - | npm packages the Code node may require, comma-separated. Only packages already present in the image can be loaded. |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | Worker | true | Allows installing community nodes outside n8n's verified list. Set to false for a locked-down instance. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Required on Alpine-based images for *.railway.internal to resolve at all. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Worker | 60000 | How long (ms) n8n keeps trying to reach Redis before it exits. The upstream default of 10s is shorter than a Redis restart takes, which turns a routine restart into an outage. |
| `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES` | Worker | 1000 | Maximum number of files in an archive the Compression node will open. |
| `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES` | Worker | 268435456 | Ceiling (bytes) on what the Compression node may unpack. 256 MiB — a container this size cannot hold upstream's 2 GiB default, and the limit gives you an error instead of an out-of-memory kill. |
| `PORT` | Redis | 6379 | Port Redis listens on inside the private network. Reachable only from this project — there is no public proxy. |

## Configuration

- **Start command:** `tini -- /docker-entrypoint.sh start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Start command:** `tini -- /docker-entrypoint.sh worker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-automation)
