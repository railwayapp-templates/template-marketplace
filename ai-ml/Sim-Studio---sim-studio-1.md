# Deploy Sim Studio on Railway

Visual builder for AI agents and automated workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-studio-1)

## About

Sim is an open-source AI workspace where you build agents and automations on a visual canvas instead of in glue code. You drag in blocks — an LLM agent, an HTTP call, a JavaScript function, a Gmail or Slack action — wire them together, and run the result on a schedule, from a webhook, or through an API endpoint. Every run is traced block by block, so you can see what an agent decided and why. Teams reach for it when a chat window is not enough: they want the model to read a CRM, file a ticket, and repeat it tomorrow unattended.

Deploy Sim on Railway and you get the full production topology, not a single container. The template runs the Next.js application, a realtime service powering the collaborative canvas over WebSockets, a one-shot migration runner that prepares the schema before the app takes traffic, and a scheduler firing Sim's background jobs every minute. Behind them sit PostgreSQL — workflows, runs, users, and knowledge-base embeddings through pgvector — and Redis, carrying pub/sub, live execution status, and the Socket.IO adapter. A volume holds uploaded files. To self-host Sim without wiring six services together by hand, start here.

![Diagram of Sim's six Railway services and their volumes](https://res.cloudinary.com/rroe4rtk/image/upload/v1787331769/sim-studio-architecture.png)

Sim closes the gap between "the model gave a good answer" and "the work got done". A workflow is a directed graph of blocks: triggers start it, agent blocks call an LLM with tools attached, function blocks run sandboxed JavaScript, and integration blocks talk to SaaS APIs over OAuth. Teams self-host it when prompts, customer data, and API credentials must not leave their own infrastructure.

Key capabilities:

- Visual workflow builder with real-time multiplayer editing
- Agent blocks backed by OpenAI, Anthropic, Google, Mistral, Azure, Bedrock, or a local Ollama server
- 1,000+ integrations, plus generic HTTP and MCP support
- Knowledge bases with pgvector embeddings for retrieval-augmented answers
- Workspace tables and files, plus schedule, webhook and API triggers

The Railway architecture splits the roles upstream runs in production. The **app** serves the UI and API and runs workflows in an isolated V8 sandbox. The **realtime** service owns the collaborative canvas and holds its own public domain, because browsers connect to it directly. The **migrations** service runs once per deploy and exits, so schema changes land before the new app container takes traffic. The **cron** service calls the app every minute to fire schedules, poll Gmail, IMAP, RSS and Drive triggers, and sync knowledge-base connectors — without it, nothing scheduled runs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cron | `ghcr.io/simstudioai/cron:latest` | Worker |
| realtime | `ghcr.io/simstudioai/realtime:v0.8.7` | Web service |
| Redis | `redis:8.2` | Database |
| sim | `ghcr.io/simstudioai/simstudio:v0.8.7` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| migrations | `ghcr.io/simstudioai/migrations:v0.8.7` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | cron | UTC | Schedule timezone |
| `SIM_URL` | cron | - | Private app URL for jobs |
| `CRON_SECRET` | cron | (secret) | Must match the app |
| `PORT` | realtime | 3002 | Socket.IO listening port |
| `NODE_ENV` | realtime | production | Runtime environment |
| `REDIS_URL` | realtime | - | Socket.IO adapter and pub/sub |
| `SIM_DB_ROLE` | realtime | realtime | Selects the realtime pool profile |
| `DATABASE_URL` | realtime | - | Postgres connection string |
| `ALLOWED_ORIGINS` | realtime | - | Allowed WebSocket origins |
| `BETTER_AUTH_URL` | realtime | - | Auth base URL |
| `BETTER_AUTH_SECRET` | realtime | (secret) | Must match the app |
| `INTERNAL_API_SECRET` | realtime | (secret) | Must match the app |
| `NEXT_PUBLIC_APP_URL` | realtime | - | App origin, trusted for CORS |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | sim | 3000 | HTTP listening port |
| `NODE_ENV` | sim | production | Runtime environment |
| `REDIS_URL` | sim | - | Redis connection string |
| `CRON_SECRET` | sim | (secret) | Scheduler bearer token |
| `DATABASE_URL` | sim | - | Postgres connection string |
| `ENCRYPTION_KEY` | sim | - | Credential encryption, hex only |
| `BETTER_AUTH_URL` | sim | - | Auth base URL |
| `SOCKET_SERVER_URL` | sim | - | Private realtime URL |
| `API_ENCRYPTION_KEY` | sim | - | API key encryption, hex only |
| `BETTER_AUTH_SECRET` | sim | (secret) | Session signing key |
| `INTERNAL_API_SECRET` | sim | (secret) | App-to-realtime auth |
| `NEXT_PUBLIC_APP_URL` | sim | - | Public app origin |
| `AUTH_TRUSTED_PROXIES` | sim | 152.233.0.0/17,100.64.0.0/10,fd00::/8 | Edge hops for client IP |
| `DISABLE_REGISTRATION` | sim | false | Set true after first account exists |
| `NEXT_PUBLIC_SOCKET_URL` | sim | - | Browser WebSocket origin |
| `NEXT_TELEMETRY_DISABLED` | sim | 1 | Disable Next.js telemetry |
| `EMAIL_VERIFICATION_ENABLED` | sim | false | No SMTP configured by default |
| `ADMISSION_GATE_MAX_INFLIGHT` | sim | 500 | Concurrent executions per replica |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `DATABASE_URL` | migrations | - | Schema target, runs once per deploy |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'mkdir -p /app/apps/sim/uploads/.multipart /app/apps/sim/uploads/.staging && exec bun apps/sim/bootstrap.js'`
- **Healthcheck:** `/api/health`
- **Volume:** `/app/apps/sim/uploads`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run db:migrate`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sim-studio-1)
