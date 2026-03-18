# Deploy Activepieces | Open-Source Alterative of n8n, Zapier, Make.com on Railway

Self Host Activepieces: Workflow Automation with 500+ App Integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/activepieces-automation)

## About

Self-host Activepieces on Railway with a single click — no server provisioning, no manual Docker setup. This template deploys the full production stack: the Activepieces application (`activepieces/activepieces:latest` from Docker Hub), a managed PostgreSQL 17 database for persistent storage, and a Redis instance powering the BullMQ job queue. All three services communicate over Railway's private network, with automatic TLS and a public URL out of the box.

Run Activepieces on Railway and get a fully operational, open-source workflow automation platform — a privacy-first alternative to Zapier and Make — in under five minutes.

![Activepieces architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773473818/actipieces_railway_arch_onrsq7.png)

Activepieces is an open-source, MIT-licensed workflow automation platform that lets teams build multi-step automations across any combination of apps — without vendor lock-in, task limits, or monthly usage bills scaling against you. It's the self-hostable answer to Zapier and Make.

**Key features:**
- Visual flow builder with branches, loops, and conditional logic
- 500+ pre-built pieces (Google Sheets, Slack, OpenAI, HTTP, webhooks, and more)
- AI Agents and AI Copilot built into the flow builder
- Human-in-the-loop approval steps
- Custom code steps (JavaScript/TypeScript via Bun)
- BullMQ-backed job queue for reliable, retryable execution
- MCP (Model Context Protocol) server support for AI tool integrations
- Full REST API for programmatic flow management

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Activepieces | `activepieces/activepieces:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal hostname for Redis service |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `AP_DB_TYPE` | Activepieces | POSTGRES | Database engine used by Activepieces |
| `AP_JWT_SECRET` | Activepieces | (secret) | Secret used for JWT authentication |
| `AP_REDIS_HOST` | Activepieces | - | Hostname of Redis server |
| `AP_REDIS_PORT` | Activepieces | - | Redis server port |
| `AP_REDIS_TYPE` | Activepieces | STANDALONE | Redis deployment type |
| `AP_ENVIRONMENT` | Activepieces | prod | Application runtime environment |
| `AP_FRONTEND_URL` | Activepieces | - | Public URL of Activepieces UI |
| `AP_POSTGRES_HOST` | Activepieces | - | Hostname of Postgres database |
| `AP_POSTGRES_PORT` | Activepieces | - | Port of Postgres database server |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Hex key for encrypting credentials |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | Run workflows without sandbox isolation |
| `AP_REDIS_PASSWORD` | Activepieces | (secret) | Password for Redis authentication |
| `AP_SIGN_UP_ENABLED` | Activepieces | false | Disable public user registration |
| `AP_QUEUE_UI_ENABLED` | Activepieces | true | Enable queue monitoring UI |
| `AP_POSTGRES_DATABASE` | Activepieces | - | Database name used by Activepieces |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | Password for Postgres authentication |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | Username for Postgres authentication |
| `AP_QUEUE_UI_PASSWORD` | Activepieces | (secret) | Password for queue UI authentication |
| `AP_QUEUE_UI_USERNAME` | Activepieces | (secret) | Username for queue UI login |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | Disable telemetry collection |
| `AP_WORKER_CONCURRENCY` | Activepieces | 5 | Number of concurrent worker jobs |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | /usr/local/bin/node | Node.js runtime executable path |
| `AP_FILE_STORAGE_LOCATION` | Activepieces | DB | Store files inside database |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js | Path to Activepieces engine entrypoint |
| `AP_EXECUTION_DATA_RETENTION_DAYS` | Activepieces | 30 | Days to retain execution history |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | Default polling interval seconds |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/activepieces-automation)
