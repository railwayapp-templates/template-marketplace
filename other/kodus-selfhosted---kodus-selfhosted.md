# Deploy kodus-selfhosted on Railway

Kodus AI self-hosted on Railway with API, Web, Worker, and webhooks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kodus-selfhosted)

## About

kodus-selfhosted is the self-hosted version of Kodus AI, an automated code review platform for engineering teams. It ships as a multi-service stack with Web, API, Worker, and Webhook services, backed by PostgreSQL (pgvector), MongoDB, and
  RabbitMQ. Teams can run Kodus in private infrastructure with their own keys and integrations.

  ## About Hosting kodus-selfhosted

  Hosting kodus-selfhosted involves deploying application services and data services that communicate over private networking. The Web service provides the UI, the API handles business logic, Webhooks ingest SCM events, and the Worker
  processes asynchronous jobs through RabbitMQ. PostgreSQL stores transactional and vector-backed data, while MongoDB supports document workloads. In Railway, you expose only the services that need public access (typically Web, API, and
  Webhooks), then wire internal URLs via service references. You configure required secrets, auth/session settings, and optional provider credentials (LLM keys, GitHub App, GitLab, Bitbucket, Azure Repos, Forgejo). Docs and Discord links are
  included for onboarding and troubleshooting.

  ## Common Use Cases

  - Run AI code reviews in private or regulated environments.
  - Bring your own LLM/API keys and control provider routing/cost.
  - Connect multiple SCM providers with a single review workflow.

  ## Dependencies for kodus-selfhosted Hosting

  - PostgreSQL (pgvector), MongoDB, and RabbitMQ.
  - Public domains for Web/API/Webhooks plus private service networking.

  ### Deployment Dependencies

  - Kodus Docs: https://docs.kodus.io
  - Kodus Deploy Guide: https://docs.kodus.io/how_to_deploy/en/deploy_kodus/generic_vm
  - Kodus Discord: https://discord.gg/QFzwwmNmdN
  - Railway Template Docs: https://docs.railway.com/templates/create
  - Railway Variables Reference: https://docs.railway.com/reference/variables

  ### Implementation Details

  ```env
  WEB_SUPPORT_DOCS_URL=https://docs.kodus.io
  WEB_SUPPORT_DISCORD_INVITE_URL=https://discord.gg/QFzwwmNmdN
  API_RABBITMQ_URI=amqp://${{kodus-rabbitmq.RABBITMQ_DEFAULT_USER}}:${{kodus-rabbitmq.RABBITMQ_DEFAULT_PASS}}@kodus-rabbitmq:5672/kodus-ai?heartbeat=60

  ## Why Deploy kodus-selfhosted on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying kodus-selfhosted on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kodus-web | `ghcr.io/kodustech/kodus-ai-web` | Web service |
| kodus-ai-webhook | `ghcr.io/kodustech/kodus-ai-webhook` | Web service |
| MongoDB | `mongo:8.0` | Database |
| kodus-mcp-manager | `ghcr.io/kodustech/kodus-mcp-manager` | Worker |
| kodus-ai-api | `ghcr.io/kodustech/kodus-ai-api` | Web service |
| kodus-rabbitmq | `ghcr.io/kodustech/kodus-rabbitmq` | Database |
| pgvector | [kodustech/kodus-installer](https://github.com/kodustech/kodus-installer) (root: /docker/pgvector) | Worker |
| kodus-service-ast | `ghcr.io/kodustech/kodus-service-ast` | Worker |
| kodus-ai-worker | `ghcr.io/kodustech/kodus-ai-worker` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `WEB_NODE_ENV` | kodus-web | self-hosted |
| `WEB_NEXTAUTH_SECRET` | kodus-web | (secret) |
| `WEB_SUPPORT_DOCS_URL` | kodus-web | https://docs.kodus.io/ |
| `WEB_SUPPORT_DISCORD_INVITE_URL` | kodus-web | https://discord.gg/TFZBRk9fT6 |
| `WEB_SUPPORT_TALK_TO_FOUNDER_URL` | kodus-web | https://cal.com/gabrielmalinosqui/30min |
| `PORT` | kodus-ai-webhook | 3332 |
| `NODE_ENV` | kodus-ai-webhook | production |
| `RUN_SEEDS` | kodus-ai-webhook | false |
| `API_JWT_SECRET` | kodus-ai-webhook | (secret) |
| `RUN_MIGRATIONS` | kodus-ai-webhook | false |
| `API_WEBHOOKS_PORT` | kodus-ai-webhook | 3332 |
| `API_MG_DB_PASSWORD` | kodus-ai-webhook | (secret) |
| `API_MG_DB_USERNAME` | kodus-ai-webhook | (secret) |
| `API_PG_DB_PASSWORD` | kodus-ai-webhook | (secret) |
| `API_PG_DB_USERNAME` | kodus-ai-webhook | (secret) |
| `API_JWT_REFRESH_SECRET` | kodus-ai-webhook | (secret) |
| `CODE_MANAGEMENT_SECRET` | kodus-ai-webhook | (secret) |
| `CODE_MANAGEMENT_WEBHOOK_TOKEN` | kodus-ai-webhook | (secret) |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `API_PG_DB_PORT` | kodus-mcp-manager | 5432 |
| `CONTAINER_NAME` | kodus-mcp-manager | kodus-service-mcp-manager |
| `API_PG_DB_DATABASE` | kodus-mcp-manager | kodus_db |
| `API_PG_DB_PASSWORD` | kodus-mcp-manager | (secret) |
| `API_PG_DB_USERNAME` | kodus-mcp-manager | (secret) |
| `API_MCP_MANAGER_PORT` | kodus-mcp-manager | 3101 |
| `API_MCP_MANAGER_NODE_ENV` | kodus-mcp-manager | production |
| `API_MCP_MANAGER_LOG_LEVEL` | kodus-mcp-manager | info |
| `API_MCP_MANAGER_JWT_SECRET` | kodus-mcp-manager | (secret) |
| `API_MCP_MANAGER_DATABASE_ENV` | kodus-mcp-manager | development |
| `API_MCP_MANAGER_PG_DB_SCHEMA` | kodus-mcp-manager | mcp_manager |
| `API_MCP_MANAGER_MCP_PROVIDERS` | kodus-mcp-manager | composio,kodusmcp,custom |
| `API_MCP_MANAGER_COMPOSIO_API_KEY` | kodus-mcp-manager | (secret) |
| `API_MCP_MANAGER_COMPOSIO_BASE_URL` | kodus-mcp-manager | https://backend.composio.dev/api/v3 |
| `API_MCP_MANAGER_ENCRYPTION_SECRET` | kodus-mcp-manager | (secret) |
| `PORT` | kodus-ai-api | 3001 |
| `API_HOST` | kodus-ai-api | 0.0.0.0 |
| `API_PORT` | kodus-ai-api | 3001 |
| `RUN_SEEDS` | kodus-ai-api | true |
| `API_NODE_ENV` | kodus-ai-api | production |
| `USE_LOCAL_DB` | kodus-ai-api | true |
| `API_LOG_LEVEL` | kodus-ai-api | info |
| `API_CLOUD_MODE` | kodus-ai-api | false |
| `API_CRYPTO_KEY` | kodus-ai-api | 844258d13c99e4d6600eb7f44e2f72e4b19261bec3fcb5f4710be808124fb2e7 |
| `API_JWT_SECRET` | kodus-ai-api | (secret) |
| `API_LOG_PRETTY` | kodus-ai-api | false |
| `API_PG_DB_PORT` | kodus-ai-api | 5432 |
| `RUN_MIGRATIONS` | kodus-ai-api | true |
| `API_DATABASE_ENV` | kodus-ai-api | development |
| `SANDBOX_PROVIDER` | kodus-ai-api | manual |
| `API_RATE_INTERVAL` | kodus-ai-api | 1000 |
| `API_WEBHOOKS_PORT` | kodus-ai-api | 3332 |
| `API_JWT_EXPIRES_IN` | kodus-ai-api | 365d |
| `API_MG_DB_DATABASE` | kodus-ai-api | kodus_db |
| `API_MG_DB_PASSWORD` | kodus-ai-api | (secret) |
| `API_MG_DB_USERNAME` | kodus-ai-api | (secret) |
| `API_PG_DB_PASSWORD` | kodus-ai-api | (secret) |
| `API_PG_DB_USERNAME` | kodus-ai-api | (secret) |
| `USE_LOCAL_RABBITMQ` | kodus-ai-api | true |
| `API_OPEN_AI_API_KEY` | kodus-ai-api | (secret) |
| `API_RABBITMQ_ENABLED` | kodus-ai-api | true |
| `API_RATE_MAX_REQUEST` | kodus-ai-api | 1000 |
| `API_CRON_KODY_LEARNING` | kodus-ai-api | 0 0 * * 6 |
| `API_JWT_REFRESH_SECRET` | kodus-ai-api | (secret) |
| `API_MCP_SERVER_ENABLED` | kodus-ai-api | true |
| `CODE_MANAGEMENT_SECRET` | kodus-ai-api | (secret) |
| `GLOBAL_API_CONTAINER_NAME` | kodus-ai-api | kodus-api |
| `API_ENABLE_CODE_REVIEW_AST` | kodus-ai-api | true |
| `API_JWT_REFRESH_EXPIRES_IN` | kodus-ai-api | 365d |
| `CODE_MANAGEMENT_WEBHOOK_TOKEN` | kodus-ai-api | (secret) |
| `API_CRON_SYNC_CODE_REVIEW_REACTIONS` | kodus-ai-api | 0 0 * * * |
| `API_CRON_CHECK_IF_PR_SHOULD_BE_APPROVED` | kodus-ai-api | */2 * * * * |
| `RABBITMQ_DEFAULT_USER` | kodus-rabbitmq | (secret) |
| `POSTGRES_DB` | pgvector | kodus_db |
| `POSTGRES_USER` | pgvector | (secret) |
| `POSTGRES_PASSWORD` | pgvector | (secret) |
| `API_PORT` | kodus-service-ast | 3002 |
| `NODE_ENV` | kodus-service-ast | production |
| `RABBIT_SAC` | kodus-service-ast | false |
| `API_NODE_ENV` | kodus-service-ast | production |
| `API_LOG_LEVEL` | kodus-service-ast | info |
| `API_LOG_PRETTY` | kodus-service-ast | true |
| `API_PG_DB_PORT` | kodus-service-ast | 5432 |
| `CONTAINER_NAME` | kodus-service-ast | kodus-service-ast |
| `RABBIT_PREFETCH` | kodus-service-ast | 1 |
| `API_DATABASE_ENV` | kodus-service-ast | development |
| `API_PG_DB_SCHEMA` | kodus-service-ast | kodus_workflow |
| `API_PG_DB_DATABASE` | kodus-service-ast | kodus_db |
| `API_PG_DB_PASSWORD` | kodus-service-ast | (secret) |
| `API_PG_DB_USERNAME` | kodus-service-ast | (secret) |
| `RABBIT_RETRY_QUEUE` | kodus-service-ast | ast.jobs.retry.q |
| `RABBIT_RETRY_TTL_MS` | kodus-service-ast | 60000 |
| `API_DATABASE_DISABLE_SSL` | kodus-service-ast | true |
| `RABBIT_PUBLISH_TIMEOUT_MS` | kodus-service-ast | 5000 |
| `NODE_ENV` | kodus-ai-worker | production |
| `RUN_SEEDS` | kodus-ai-worker | false |
| `API_JWT_SECRET` | kodus-ai-worker | (secret) |
| `RUN_MIGRATIONS` | kodus-ai-worker | false |
| `API_WEBHOOKS_PORT` | kodus-ai-worker | 3332 |
| `API_MG_DB_PASSWORD` | kodus-ai-worker | (secret) |
| `API_MG_DB_USERNAME` | kodus-ai-worker | (secret) |
| `API_PG_DB_PASSWORD` | kodus-ai-worker | (secret) |
| `API_PG_DB_USERNAME` | kodus-ai-worker | (secret) |
| `API_JWT_REFRESH_SECRET` | kodus-ai-worker | (secret) |
| `CODE_MANAGEMENT_SECRET` | kodus-ai-worker | (secret) |
| `CODE_MANAGEMENT_WEBHOOK_TOKEN` | kodus-ai-worker | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/usr/local/bin/init-definitions.sh`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/kodus-selfhosted)
