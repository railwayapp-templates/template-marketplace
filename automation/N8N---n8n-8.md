# Deploy N8N on Railway

n8n + Postgres with external task runners.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-8)

## About

**This variant: n8n with external task runners, so Python Code nodes work.** n8n and Postgres plus n8n's official runners sidecar, which executes JavaScript and Python Code nodes in a separate container. n8n is an open-source workflow automation platform with 400+ integrations, AI agent nodes and a visual editor: a self-hosted alternative to Zapier and Make with no per-execution fees.

Since n8n 2.0, the Python Code node only runs on task runners in external mode, which the standard single-container setup does not have. This template deploys three services:

- `n8n`: the editor, API, triggers and executions, with a volume at `/home/node/.n8n`. It hosts the task broker on port 5679 of the private network.
- `n8n-runners`: the `n8nio/runners` image. Its launcher connects to the broker and starts JavaScript and Python runners on demand.
- `Postgres`: workflows, credentials and execution history.

Both n8n images are pinned to 2.40.7. The first boot runs n8n's database migrations, which takes about a minute. Then open the public URL and **create the owner account right away**: the first visitor to an unclaimed instance becomes its owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `n8nio/n8n:2.40.7` | Web service |
| n8n-runners | `n8nio/runners:2.40.7` | Worker |

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
| `N8N_RUNNERS_MODE` | n8n | external | Runs Code nodes in the n8n-runners service instead of inside n8n. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres host on the private network. |
| `DB_POSTGRESDB_PORT` | n8n | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials. Generated per deploy; back it up. |
| `N8N_EDITOR_BASE_URL` | n8n | - | Public URL of the editor, used in links, emails and OAuth redirects. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres database name. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n | (secret) | Shared secret n8n-runners uses to connect. Generated per deploy. |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 336 | Hours to keep execution history before pruning (336 = 14 days). |
| `N8N_RUNNERS_BROKER_PORT` | n8n | 5679 | Port of the task broker that n8n-runners connects to. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 10000 | Most executions to keep in history. 0 means no limit. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n | :: | Lets the runners reach the task broker over the private network. |
| `PORT` | n8n-runners | 5680 | Port of the launcher's health server, which Railway's healthcheck probes. |
| `GENERIC_TIMEZONE` | n8n-runners | - | Mirrors the main instance's timezone for JavaScript dates. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-runners | (secret) | Must equal the main instance's runner token. |
| `N8N_RUNNERS_CONFIG_PATH` | n8n-runners | /tmp/n8n-task-runners.json | Where the start command writes the launcher config. |
| `N8N_RUNNERS_STDLIB_ALLOW` | n8n-runners | json,re,math,cmath,statistics,random,datetime,time,calendar,zoneinfo,string,textwrap,unicodedata,difflib,uuid,hashlib,hmac,base64,binascii,collections,itertools,functools,operator,decimal,fractions,copy,bisect,heapq,enum,dataclasses,typing,html,csv,urllib,ipaddress,struct | Python standard library modules Code nodes may import. * allows all. |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n-runners | 300 | Seconds a single Code node may run before it is stopped. |
| `N8N_RUNNERS_EXTERNAL_ALLOW` | n8n-runners | - | Third-party Python packages Code nodes may import. None ship in the image. |
| `N8N_RUNNERS_TASK_BROKER_URI` | n8n-runners | - | Task broker inside the main n8n instance. |
| `NODE_FUNCTION_ALLOW_BUILTIN` | n8n-runners | crypto | Node.js built-in modules JavaScript Code nodes may require. * allows all. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | n8n-runners | moment | npm packages in the image JavaScript Code nodes may require. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | n8n-runners | 15 | Seconds an idle runner stays up. 0 keeps runners warm. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'test "$(stat -c %U /home/node/.n8n)" = node || chown -R node:node /home/node/.n8n; export HOME=/home/node; exec su -p -s /bin/sh node -c "exec /sbin/tini -- /docker-entrypoint.sh"'`
- **Healthcheck:** `/healthz/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Start command:** `sh -c 'node <<"JS"
const fs = require("fs");
const cfg = JSON.parse(fs.readFileSync("/etc/n8n-task-runners.json", "utf8"));
const keys = {
  javascript: ["NODE_FUNCTION_ALLOW_BUILTIN", "NODE_FUNCTION_ALLOW_EXTERNAL"],
  python: ["N8N_RUNNERS_STDLIB_ALLOW", "N8N_RUNNERS_EXTERNAL_ALLOW"],
};
for (const runner of cfg["task-runners"]) {
  for (const key of keys[runner["runner-type"]] || []) {
    if (key in process.env) runner["env-overrides"][key] = process.env[key];
  }
}
fs.writeFileSync(process.env.N8N_RUNNERS_CONFIG_PATH, JSON.stringify(cfg, null, 2));
JS
exec /sbin/tini -- /usr/local/bin/task-runner-launcher javascript python'`
- **Healthcheck:** `/healthz`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-8)
