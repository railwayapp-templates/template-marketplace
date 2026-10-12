# Deploy Activepieces | Open-Source Zapier & n8n Alternative with Workers on Railway

No-code automation with 600+ pieces, a separate worker and code sandbox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-workflows)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/activepieces-workflows?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=activepieces-workflows)

[Activepieces](https://www.activepieces.com/) is the open-source alternative to Zapier, Make and n8n: a visual flow builder with hundreds of integrations ("pieces"), webhooks, schedules, branches, loops, code steps, human-in-the-loop approvals, AI agents and an MCP server for your AI tools. This template runs the official Activepieces image the way upstream runs it in production, as a separate app and worker, on Postgres and Redis.

The stack is four services: Activepieces, Worker, Postgres and Redis.

- **App and worker split, like upstream's own compose.** The Activepieces service serves the web UI, the API and incoming webhooks. Flows, triggers and code steps run on the Worker service, which talks to the app over Railway's private network. A heavy flow can't stall the UI, and you scale execution by adding Worker replicas.
- **Upstream's own image, pinned.** Both services run `ghcr.io/activepieces/activepieces` at a fixed release tag (0.92.2), not `latest`. Database migrations run on boot, so upgrading is bumping the tag on both services.
- **Sandboxed code steps that work on Railway.** `AP_EXECUTION_MODE=SANDBOX_CODE_ONLY` runs your JavaScript/TypeScript code steps in an isolated V8 sandbox: they can't read the server's environment variables (your encryption key, JWT secret, database password) or its files. It needs no privileged container, unlike Activepieces' process-sandbox modes, which Railway doesn't support.
- **Secrets generated per deploy.** The encryption key that protects your saved app connections and the JWT secret are generated for every deployment; the worker derives its own token from the JWT secret at boot.
- **Everything in Postgres.** Flows, connections, run logs and uploaded files are stored in Postgres (the `pgvector` image, which Activepieces' vector features need). Redis holds the job queue with an append-only file on its own volume. The app and worker are stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `ghcr.io/activepieces/activepieces:0.92.2` | Worker |
| Redis | `redis:8.10.2-alpine` | Database |
| Activepieces | `ghcr.io/activepieces/activepieces:0.92.2` | Web service |
| Postgres | `pgvector/pgvector:0.8.7-pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Worker | 3000 | Port of the worker's health endpoint - leave as is |
| `AP_PORT` | Worker | 3000 | Must match PORT |
| `AP_JWT_SECRET` | Worker | (secret) | Shared with the app; the worker signs its own token with it at boot |
| `AP_FRONTEND_URL` | Worker | - | How the worker reaches the Activepieces API - private network, not the public URL (webhook URLs come from the app's own AP_FRONTEND_URL) |
| `AP_CONTAINER_TYPE` | Worker | WORKER | Executes flows, triggers and code steps. Add replicas to run more flows in parallel |
| `AP_WORKER_CONCURRENCY` | Worker | 2 | Flows one worker runs at the same time. Each running flow needs RAM; raise it with the service's memory, or add replicas |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Activepieces | 80 | Port Railway routes to - leave as is |
| `AP_PORT` | Activepieces | 80 | Port Activepieces listens on - must match PORT |
| `AP_REDIS_URL` | Activepieces | - | Redis job queue on the private network (family=0 lets ioredis connect over IPv6) |
| `AP_SMTP_HOST` | Activepieces | - | Optional SMTP server for invitation emails (Railway allows outbound SMTP on Pro only) |
| `AP_SMTP_PORT` | Activepieces | 587 | SMTP port |
| `NODE_OPTIONS` | Activepieces | --max-old-space-size=512 | Caps the API's JavaScript heap. Without it Node sizes the heap from the container limit and holds ~1.4 GB after the first piece-catalog sync; with it the API peaks ~700 MB and idles ~380 MB. Raise it if logs show 'heap out of memory' |
| `AP_JWT_SECRET` | Activepieces | (secret) | Signs user sessions and the Worker's token - changing it logs everyone out |
| `AP_FRONTEND_URL` | Activepieces | - | Public URL of Activepieces (webhook URLs, OAuth redirects, email links) - set it to your custom domain after adding one |
| `AP_POSTGRES_URL` | Activepieces | - | Postgres on the private network |
| `AP_SMTP_PASSWORD` | Activepieces | (secret) | SMTP password |
| `AP_SMTP_USERNAME` | Activepieces | (secret) | SMTP username |
| `AP_CONTAINER_TYPE` | Activepieces | APP | This service runs the API, web UI and webhooks; flows execute on the Worker service |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Encrypts stored app connections (32 hex chars). BACK IT UP - changing it makes every saved connection unreadable |
| `AP_EXECUTION_MODE` | Activepieces | SANDBOX_CODE_ONLY | Code steps run in an isolated V8 sandbox (no env, files or npm packages) - works without privileged containers. Use UNSANDBOXED if code steps need npm packages; SANDBOX_PROCESS modes need privileges Railway does not grant. The Worker follows this setting |
| `AP_SMTP_SENDER_NAME` | Activepieces | Activepieces | Sender name for Activepieces emails |
| `AP_SMTP_SENDER_EMAIL` | Activepieces | - | Sender address for Activepieces emails |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | Anonymous usage telemetry to Activepieces |
| `POSTGRES_DB` | Postgres | activepieces | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/worker/health`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-workflows)
