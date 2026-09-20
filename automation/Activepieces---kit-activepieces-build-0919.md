# Deploy Activepieces on Railway

Activepieces: open-source Zapier alternative with 400+ automation pieces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-activepieces-build-0919)

## About

Activepieces is an open-source automation platform - a self-hosted alternative to Zapier and Make - with a visual flow builder, 400+ integration "pieces" (Slack, Gmail, Notion, OpenAI, Stripe, webhooks, HTTP, custom TypeScript code) and an MCP server so AI agents can use the same integrations. This template deploys the official Activepieces image pinned by digest with Postgres and Redis wired in over private networking, every secret generated for you, and a deployment healthcheck. **There is nothing to fill in.** After the deploy, open the public URL: the first sign-up becomes the platform admin.

**Plan requirements.** Measured on this exact stack after the first flow ran: the Activepieces container idles around **750 MB** and peaked at **1.0 GB** during sign-up, migrations and a webhook run; Postgres about 60 MB and Redis about 10 MB. Budget **2 GB or more** for the app service (Hobby plan or higher). It will not fit the Free plan's 0.5 GB and is tight on Trial's 1 GB, where a flow run can push it over the limit.

Activepieces runs as a single container that serves the web app, the API and the worker (`AP_CONTAINER_TYPE=WORKER_AND_APP`). It stores flows, runs, connections and users in Postgres and uses Redis for the job queue, so all three services must be up for flows to run. The application migrates its own database schema at startup. This template runs the worker in `UNSANDBOXED` mode, which is what upstream recommends for a single trusted team on a host without Docker-in-Docker; each code step still runs in its own process. Connections (API keys you add to pieces) are encrypted at rest with `AP_ENCRYPTION_KEY`; keep a copy of that variable - rotating it makes existing connections unreadable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2@sha256:7d1e4ce8b9395088377ab382d1f6cfdbd13b3690795198a0399ab8d683064d6d` | Database |
| Activepieces | `activepieces/activepieces:0.91.0@sha256:58414dfc94c4c6b148d286aed455344ae751d68b5723ed174bd045ff6e3d5db3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18@sha256:3b8bc16ccb823c9a293b09d20d4180049502ee2b243b5989d59e258450044e22` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private-network hostname of the Redis service. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Redis username for this image's default user. |
| `REDIS_URL` | Redis | - | Private-network connection string. Activepieces keeps its BullMQ job queue, scheduled triggers and the migration lock here; RDB snapshots on the volume survive restarts. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for Railway's data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated once at deploy time. |
| `PORT` | Activepieces | 80 | Port Railway routes the public domain and the deploy healthcheck to. The image listens on 80 and AP_PORT follows this value; leave it. |
| `AP_PORT` | Activepieces | - | Port the API and the built-in worker listen on. Follows PORT so Railway's domain, healthcheck and the app always agree. |
| `AP_REDIS_URL` | Activepieces | - | Private-network connection string to the bundled Redis service. Backs the BullMQ job queue, scheduled triggers and the migration lock. |
| `AP_JWT_SECRET` | Activepieces | (secret) | Secret that signs user sessions and the internal worker token, generated once at deploy time. Rotating it signs everyone out. |
| `AP_FRONTEND_URL` | Activepieces | - | Public URL of this instance. Every webhook URL, OAuth redirect and email link is built from it. Change it to your custom domain after you attach one. |
| `AP_POSTGRES_URL` | Activepieces | - | Private-network connection string to the bundled Postgres service. Flows, runs, users, connections and piece metadata live here. |
| `AP_CONTAINER_TYPE` | Activepieces | WORKER_AND_APP | Which processes this container runs. WORKER_AND_APP runs the API and one worker together (upstream default). To scale out, keep this service as APP and add worker services from the same image with WORKER. |
| `AP_ENCRYPTION_KEY` | Activepieces | - | 32-hex-character AES-256 key that encrypts every stored connection credential, generated once at deploy time. Losing or rotating it orphans every saved connection; back it up with the database. |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | How flow code runs. UNSANDBOXED (upstream default) forks the engine with a memory cap and works without privileges. SANDBOX_CODE_ONLY adds a V8 isolate per Code step for multi-tenant safety. SANDBOX_PROCESS needs CAP_SYS_ADMIN and does not run on Railway. |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | Starting value for product analytics sent to Activepieces. Off here; upstream defaults it on. The platform copies it on first boot, so later changes go through Platform Admin, Infrastructure, Configurations. |
| `AP_WORKER_CONCURRENCY` | Activepieces | 5 | Flow runs the built-in worker executes at once (upstream default 5). Each run holds an engine process; lower it on a 1 GB plan if runs get OOM-killed, raise it with memory. |
| `AP_FLOW_TIMEOUT_SECONDS` | Activepieces | 600 | Maximum runtime of a single flow run in seconds (upstream default 600). |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | Seconds a synchronous webhook waits for the flow before replying (upstream default 30, maximum 900). |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | Minutes between polls for polling triggers such as new rows or new emails (upstream default 5). |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private-network connection string. Activepieces stores flows, runs, users, encrypted connections and piece metadata here. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated once at deploy time. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/kit-activepieces-build-0919)
