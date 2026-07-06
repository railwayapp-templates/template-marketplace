# Deploy Activepieces — Open-Source Zapier Alternative with MCP on Railway

Self-host Activepieces: Zapier alternative, unlimited tasks, 400+ MCP tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-zapier-alternative)

## About

Activepieces is the open-source, AI-first automation platform — **23k+ GitHub stars**, MIT
licensed, Y Combinator backed — with a clean drag-and-drop builder and 280+ integrations
("pieces") written in TypeScript. Its standout feature: **every piece is automatically exposed
as an MCP server** — roughly 400 tools that Claude Desktop, Cursor, and Windsurf can call
directly, making Activepieces the largest open-source MCP toolkit for AI agents.

Zapier's Team plan is $195/month for 50,000 tasks; heavier usage runs ~$990/month. Activepieces
self-hosted on Railway gives you **unlimited tasks** at ~$5–15/month flat — no per-task billing,
no per-piece fees, and your automation data on infrastructure you own.

---

Activepieces combines a visual builder for non-technical users, a TypeScript pieces framework
for developers, human-in-the-loop steps, AI agents, and a built-in MCP server. Running it in
production needs PostgreSQL, Redis for the execution queue, encryption secrets, and a public
HTTPS endpoint. This template does the official Docker Compose setup on Railway with nothing to
wire by hand — private networking, generated secrets, migrations, and HTTPS all handled.

Typical cost: **~$5–15/month** on Railway's Hobby plan for the full stack, with unlimited task
executions. Zapier's Team plan is $195/month for a 50,000-task cap; scaling to 200,000 tasks
runs ~$990/month. Activepieces self-hosted removes per-task billing entirely — you pay flat
compute no matter how many automations run.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Activepieces | `activepieces/activepieces:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Activepieces | 80 | - |
| `AP_JWT_SECRET` | Activepieces | (secret) | - |
| `AP_ENVIRONMENT` | Activepieces | prod | - |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | - |
| `AP_SIGN_UP_ENABLED` | Activepieces | false | - |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | - |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | - |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | - |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | /usr/local/bin/node | - |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | https://cloud.activepieces.com/api/v1/flow-templates | - |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js | - |
| `AP_FLOW_WORKER_CONCURRENCY` | Activepieces | 10 | - |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | - |
| `AP_SANDBOX_RUN_TIME_SECONDS` | Activepieces | 600 | - |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-zapier-alternative)
