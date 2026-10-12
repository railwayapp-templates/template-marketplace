# Deploy n8n 2 AI Agent Stack (Ollama + Qdrant) on Railway

n8n queue mode with workers, local LLMs via Ollama and Qdrant memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-2-ai-agent-stack-ollama-qdrant)

## About

n8n is a fair-code workflow automation platform with a visual editor, 400+ integrations and native AI agent nodes. This community template runs n8n 2 in queue mode with a webhook processor, workers, isolated task runners, a local Ollama LLM and a Qdrant vector database, all on one private Railway network.

A single n8n container works for experiments, but production automations need more: Postgres instead of SQLite, Redis-backed queue mode so workers execute runs while the editor stays responsive, a webhook processor for incoming traffic, and task runners that execute Code nodes outside the n8n process. AI agent workflows add a model server and a vector store for memory and retrieval. This template wires all of these with generated secrets, readiness checks and persistent volumes, pulls a small open model on first boot, and seeds ready-made Ollama and Qdrant credentials plus a demo chat workflow, so you can build private AI agents without sending data to external LLM APIs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant:v1.19.2` | Database |
| n8n Webhook | `n8nio/n8n:2.42.6` | Worker |
| n8n Task Runners | `n8nio/runners:2.42.6` | Worker |
| Ollama | [baranberkay96/n8n-ai-stack-railway](https://github.com/baranberkay96/n8n-ai-stack-railway) (branch: main) (root: /services/ollama) | Database |
| Gateway | [baranberkay96/n8n-ai-stack-railway](https://github.com/baranberkay96/n8n-ai-stack-railway) (branch: main) (root: /services/gateway) | Web service |
| n8n Main | `n8nio/n8n:2.42.6` | Worker |
| n8n Bootstrap | [baranberkay96/n8n-ai-stack-railway](https://github.com/baranberkay96/n8n-ai-stack-railway) (branch: main) (root: /services/bootstrap) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n Worker | `n8nio/n8n:2.42.6` | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Qdrant | 6333 | Qdrant REST port (gRPC 6334). |
| `QDRANT__SERVICE__HOST` | Qdrant | :: | Listen on IPv4+IPv6. |
| `QDRANT__SERVICE__API_KEY` | Qdrant | (secret) | API key required for all Qdrant requests. |
| `QDRANT__TELEMETRY_DISABLED` | Qdrant | true | Disable Qdrant telemetry. |
| `PORT` | n8n Webhook | 5678 | Port Railway health-checks. |
| `DB_TYPE` | n8n Webhook | - | Database type. |
| `N8N_PORT` | n8n Webhook | 5678 | n8n HTTP port. |
| `WEBHOOK_URL` | n8n Webhook | - | Public base for webhook, form, chat and MCP URLs (the Gateway). |
| `N8N_LOG_LEVEL` | n8n Webhook | - | Log level. |
| `N8N_PROXY_HOPS` | n8n Webhook | - | Trusted proxies in front of n8n (Railway edge + Gateway) for correct client IPs. |
| `EXECUTIONS_MODE` | n8n Webhook | - | Queue mode: main/webhook enqueue executions in Redis, workers run them. |
| `GENERIC_TIMEZONE` | n8n Webhook | - | Default timezone for schedules (e.g. Europe/Istanbul). |
| `DB_POSTGRESDB_HOST` | n8n Webhook | - | Postgres private host. |
| `DB_POSTGRESDB_PORT` | n8n Webhook | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n Webhook | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n Webhook | - | Encrypts stored credentials; identical on every n8n process. Never change after first boot. |
| `N8N_LISTEN_ADDRESS` | n8n Webhook | :: | Listen on IPv4+IPv6. |
| `QUEUE_BULL_REDIS_HOST` | n8n Webhook | - | Redis private host. |
| `QUEUE_BULL_REDIS_PORT` | n8n Webhook | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n Webhook | - | Postgres database. |
| `DB_POSTGRESDB_PASSWORD` | n8n Webhook | (secret) | Postgres password. |
| `N8N_DIAGNOSTICS_ENABLED` | n8n Webhook | - | Disable anonymous telemetry. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n Webhook | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n Webhook | (secret) | Redis user. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n Webhook | - | Resolve Redis over IPv4 and IPv6 (Railway private network). |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n Webhook | - | Binary data in Postgres so main, webhook and workers share files (filesystem mode is unsupported in queue mode). |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n Webhook | - | Reinstall community nodes on boot (no shared volume between processes). |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8n Webhook | (secret) | Signs login sessions; identical on every n8n process. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n Webhook | - | Strict permissions on the n8n settings file. |
| `PORT` | n8n Task Runners | 5680 | Launcher health port (Railway healthcheck). |
| `GENERIC_TIMEZONE` | n8n Task Runners | - | Timezone for Code nodes. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n Task Runners | (secret) | Must equal the worker's token. |
| `N8N_RUNNERS_MAX_CONCURRENCY` | n8n Task Runners | 10 | Concurrent Code-node tasks per runner (matches worker concurrency). |
| `N8N_RUNNERS_TASK_BROKER_URI` | n8n Task Runners | - | Task broker of the paired worker. |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | n8n Task Runners | info | Launcher log level. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | n8n Task Runners | 15 | Stop idle JS/Python runners after N seconds (the launcher restarts them on demand). |
| `PORT` | Ollama | 11434 | Ollama API port (private). |
| `OLLAMA_HOST` | Ollama | [::]:11434 | Bind address for the Ollama API (IPv4+IPv6). |
| `OLLAMA_KEEP_ALIVE` | Ollama | 5m | Unload idle models after this time to free RAM. |
| `OLLAMA_PULL_MODELS` | Ollama | llama3.2:3b,nomic-embed-text:v1.5 | Models pulled on first boot (comma-separated). Chat model + embedding model for Qdrant RAG. |
| `OLLAMA_CONTEXT_LENGTH` | Ollama | 8192 | Default context window (agents with tools need more than 4k). |
| `OLLAMA_MAX_LOADED_MODELS` | Ollama | 2 | Keep chat + embedding model loaded together. |
| `PORT` | Gateway | 8080 | Port nginx listens on (public domain target). |
| `NGINX_PROXY_TIMEOUT` | Gateway | 3600s | Proxy timeout for long webhook responses and push connections. |
| `N8N_GW_MAIN_UPSTREAM` | Gateway | - | n8n main (editor, API, push, test webhooks). |
| `N8N_GW_WEBHOOK_UPSTREAM` | Gateway | - | Webhook processor (/webhook, /webhook-waiting, /form, /form-waiting, /mcp). |
| `NGINX_CLIENT_MAX_BODY_SIZE` | Gateway | 200M | Max request size (form uploads, binary webhooks). |
| `PORT` | n8n Main | 5678 | Port Railway health-checks. |
| `DB_TYPE` | n8n Main | postgresdb | Database type. |
| `N8N_PORT` | n8n Main | 5678 | n8n HTTP port. |
| `WEBHOOK_URL` | n8n Main | - | Public base for webhook, form, chat and MCP URLs (the Gateway). |
| `N8N_LOG_LEVEL` | n8n Main | info | Log level. |
| `N8N_PROXY_HOPS` | n8n Main | 2 | Trusted proxies in front of n8n (Railway edge + Gateway) for correct client IPs. |
| `EXECUTIONS_MODE` | n8n Main | queue | Queue mode: main/webhook enqueue executions in Redis, workers run them. |
| `GENERIC_TIMEZONE` | n8n Main | Etc/UTC | Default timezone for schedules (e.g. Europe/Istanbul). |
| `DB_POSTGRESDB_HOST` | n8n Main | - | Postgres private host. |
| `DB_POSTGRESDB_PORT` | n8n Main | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n Main | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n Main | - | Encrypts stored credentials; identical on every n8n process. Never change after first boot. |
| `N8N_LISTEN_ADDRESS` | n8n Main | :: | Listen on IPv4+IPv6. |
| `N8N_EDITOR_BASE_URL` | n8n Main | - | Public editor URL (links in emails, OAuth callbacks). |
| `QUEUE_BULL_REDIS_HOST` | n8n Main | - | Redis private host. |
| `QUEUE_BULL_REDIS_PORT` | n8n Main | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n Main | - | Postgres database. |
| `DB_POSTGRESDB_PASSWORD` | n8n Main | (secret) | Postgres password. |
| `N8N_DIAGNOSTICS_ENABLED` | n8n Main | false | Disable anonymous telemetry. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n Main | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n Main | (secret) | Redis user. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n Main | true | Resolve Redis over IPv4 and IPv6 (Railway private network). |
| `N8N_PERSONALIZATION_ENABLED` | n8n Main | false | Skip the onboarding survey. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n Main | database | Binary data in Postgres so main, webhook and workers share files (filesystem mode is unsupported in queue mode). |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n Main | true | Reinstall community nodes on boot (no shared volume between processes). |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8n Main | (secret) | Signs login sessions; identical on every n8n process. |
| `N8N_DISABLE_PRODUCTION_MAIN_PROCESS` | n8n Main | true | Production webhooks are served by the n8n Webhook service via the Gateway. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n Main | true | Run editor/test executions on workers too (main never runs Code nodes). |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n Main | true | Strict permissions on the n8n settings file. |
| `DB_TYPE` | n8n Bootstrap | - | Database type. |
| `QDRANT_URL` | n8n Bootstrap | - | URL stored in the seeded Qdrant credential. |
| `N8N_LOG_LEVEL` | n8n Bootstrap | warn | Keep CLI output short. |
| `QDRANT_API_KEY` | n8n Bootstrap | (secret) | API key stored in the seeded Qdrant credential. |
| `DEMO_CHAT_MODEL` | n8n Bootstrap | llama3.2:3b | Model used by the seeded demo workflow. |
| `OLLAMA_BASE_URL` | n8n Bootstrap | - | Base URL stored in the seeded Ollama credential. |
| `DB_POSTGRESDB_HOST` | n8n Bootstrap | - | Postgres private host. |
| `DB_POSTGRESDB_PORT` | n8n Bootstrap | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n Bootstrap | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n Bootstrap | - | Encrypts stored credentials; identical on every n8n process. Never change after first boot. |
| `N8N_MAIN_READY_URL` | n8n Bootstrap | - | Waits until n8n main has migrated the database. |
| `DB_POSTGRESDB_DATABASE` | n8n Bootstrap | - | Postgres database. |
| `DB_POSTGRESDB_PASSWORD` | n8n Bootstrap | (secret) | Postgres password. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | n8n Worker | 5678 | Port of the worker health server (Railway healthcheck). |
| `DB_TYPE` | n8n Worker | - | Database type. |
| `WEBHOOK_URL` | n8n Worker | - | Public base for webhook, form, chat and MCP URLs (the Gateway). |
| `N8N_LOG_LEVEL` | n8n Worker | - | Log level. |
| `N8N_PROXY_HOPS` | n8n Worker | - | Trusted proxies in front of n8n (Railway edge + Gateway) for correct client IPs. |
| `EXECUTIONS_MODE` | n8n Worker | - | Queue mode: main/webhook enqueue executions in Redis, workers run them. |
| `GENERIC_TIMEZONE` | n8n Worker | - | Default timezone for schedules (e.g. Europe/Istanbul). |
| `N8N_RUNNERS_MODE` | n8n Worker | external | Code nodes run in the separate n8n Task Runners service (n8n's production recommendation). |
| `DB_POSTGRESDB_HOST` | n8n Worker | - | Postgres private host. |
| `DB_POSTGRESDB_PORT` | n8n Worker | - | Postgres port. |
| `DB_POSTGRESDB_USER` | n8n Worker | (secret) | Postgres user. |
| `N8N_ENCRYPTION_KEY` | n8n Worker | - | Encrypts stored credentials; identical on every n8n process. Never change after first boot. |
| `QUEUE_BULL_REDIS_HOST` | n8n Worker | - | Redis private host. |
| `QUEUE_BULL_REDIS_PORT` | n8n Worker | - | Redis port. |
| `DB_POSTGRESDB_DATABASE` | n8n Worker | - | Postgres database. |
| `DB_POSTGRESDB_PASSWORD` | n8n Worker | (secret) | Postgres password. |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n Worker | (secret) | Shared secret between this worker's task broker and the runners. |
| `N8N_DIAGNOSTICS_ENABLED` | n8n Worker | - | Disable anonymous telemetry. |
| `N8N_RUNNERS_BROKER_PORT` | n8n Worker | 5679 | Task broker port. |
| `QUEUE_HEALTH_CHECK_PORT` | n8n Worker | 5678 | Worker health server port. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n Worker | (secret) | Redis password. |
| `QUEUE_BULL_REDIS_USERNAME` | n8n Worker | (secret) | Redis user. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n Worker | true | Expose /healthz and /healthz/readiness on the worker. |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n Worker | - | Resolve Redis over IPv4 and IPv6 (Railway private network). |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n Worker | - | Binary data in Postgres so main, webhook and workers share files (filesystem mode is unsupported in queue mode). |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n Worker | 30 | Seconds to finish running jobs on redeploy. |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n Worker | - | Reinstall community nodes on boot (no shared volume between processes). |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8n Worker | (secret) | Signs login sessions; identical on every n8n process. |
| `N8N_RUNNERS_TASK_REQUEST_TIMEOUT` | n8n Worker | 60 | Seconds a Code node waits for a free runner. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n Worker | :: | Task broker listens on the private network (IPv4+IPv6). |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n Worker | - | Strict permissions on the n8n settings file. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Healthcheck:** `/readyz`
- **Volume:** `/qdrant/storage`
- **Start command:** `tini -- /docker-entrypoint.sh webhook`
- **Healthcheck:** `/healthz/readiness`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/`
- **Volume:** `/root/.ollama`
- **Healthcheck:** `/gateway-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `tini -- /docker-entrypoint.sh worker --concurrency=10`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation · **Tags:** n8n, automation, ai-agents, ollama, qdrant · **Languages:** Shell, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/n8n-2-ai-agent-stack-ollama-qdrant)
