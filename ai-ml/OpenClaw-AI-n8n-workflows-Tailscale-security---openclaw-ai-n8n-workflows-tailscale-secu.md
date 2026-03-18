# Deploy OpenClaw AI + n8n workflows + Tailscale security on Railway

OpenClaw AI Agent Stack — n8n , Tailscale Mesh, Modal & 500+ Integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-ai-n8n-workflows-tailscale-secu)

## About

The standard OpenClaw Railway template gets you a gateway. This template gets you a **complete autonomous AI infrastructure stack**. On top of OpenClaw, you get n8n (workflow automation engine with AI agent nodes), Postgres, Redis, Tailscale WireGuard mesh (embedded in the container — no SSH, no exposed ports), Langfuse LLM observability, PostHog analytics, and Composio's universal MCP server for 500+ SaaS integrations. A browser-based `/setup` wizard handles onboarding and applies cost-optimized defaults that reduce LLM API spend by 90%+. All cross-service secrets and internal URLs are auto-generated via Railway reference variables — nothing to wire manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `n8nio/n8n` | Web service |
| openclaw-railway-template | [TrendpilotAI/openclaw-railway-tailscale](https://github.com/TrendpilotAI/openclaw-railway-tailscale) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `railwayapp/redis` | Database |
| Worker | `n8nio/n8n` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Primary | - | HTTP port for n8n primary instance |
| `WEBHOOK_URL` | Primary | - | Public URL for n8n webhooks |
| `NODE_OPTIONS` | Primary | - | Node.js runtime options (e.g. --max-old-space-size) |
| `N8N_TRUST_PROXY` | Primary | - | Trust reverse proxy headers (default: true) |
| `DB_POSTGRESDB_HOST` | Primary | - | PostgreSQL host (use Railway reference variable) |
| `DB_POSTGRESDB_PORT` | Primary | - | PostgreSQL port (use Railway reference variable) |
| `DB_POSTGRESDB_USER` | Primary | (secret) | PostgreSQL user (use Railway reference variable) |
| `N8N_ENCRYPTION_KEY` | Primary | - | Encryption key for credentials storage |
| `N8N_LISTEN_ADDRESS` | Primary | - | Address n8n listens on (default: 0.0.0.0) |
| `N8N_EDITOR_BASE_URL` | Primary | - | Base URL for the n8n editor UI |
| `N8N_RUNNERS_ENABLED` | Primary | - | Enable task runners (default: true) |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Redis host for queue mode (use Railway reference)     │ |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Redis port for queue mode (use Railway reference) |
| `DB_POSTGRESDB_DATABASE` | Primary | - | PostgreSQL database name (use Railway reference) |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | PostgreSQL password (use Railway reference) |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Redis password for queue mode (use Railway reference) │ |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Redis username for queue mode |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | - | Enable Redis dual-stack networking |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | - | Enable Railway private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | - | Offload manual runs to worker nodes |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | - | Enforce strict file permissions on settings |
| `PORT` | openclaw-railway-template | - | HTTP port for the Express wrapper (default: 8080) |
| `CACHEBUST` | openclaw-railway-template | - | Change to force a fresh Docker build |
| `N8N_API_KEY` | openclaw-railway-template | (secret) | n8n API key for workflow automation integration |
| `GITHUB_TOKEN` | openclaw-railway-template | (secret) | GitHub PAT for repo access from the instance |
| `GROK_API_KEY` | openclaw-railway-template | (secret) | xAI Grok API key (optional LLM provider) |
| `OPENAI_API_KEY` | openclaw-railway-template | (secret) | OpenAI API key (optional LLM provider) |
| `SETUP_PASSWORD` | openclaw-railway-template | (secret) | Password to access the /setup wizard (required) |
| `SETUP_USERNAME` | openclaw-railway-template | (secret) | Username for /setup Basic auth (default: admin) |
| `RUNWARE_API_KEY` | openclaw-railway-template | (secret) | Runware API key for image generation |
| `SLACK_BOT_TOKEN` | openclaw-railway-template | (secret) | Slack bot token for channel integration |
| `TAILSCALE_SERVE` | openclaw-railway-template | - | Enable Tailscale Serve HTTPS proxy (default: true) |
| `AWS_ENDPOINT_URL` | openclaw-railway-template | - | S3-compatible endpoint URL for storage |
| `DEEPSEEK_API_KEY` | openclaw-railway-template | (secret) | DeepSeek API key (optional LLM provider) |
| `ANTHROPIC_API_KEY` | openclaw-railway-template | (secret) | Anthropic API key for Claude models |
| `AWS_ACCESS_KEY_ID` | openclaw-railway-template | - | AWS access key for S3 storage |
| `TAILSCALE_AUTHKEY` | openclaw-railway-template | - | Tailscale auth key (reusable + ephemeral recommended) |
| `AWS_DEFAULT_REGION` | openclaw-railway-template | - | AWS region for S3 storage |
| `AWS_S3_BUCKET_NAME` | openclaw-railway-template | - | S3 bucket name for file storage |
| `CLAWDBOT_STATE_DIR` | openclaw-railway-template | - | Deprecated: use OPENCLAW_STATE_DIR instead |
| `CLOUDFLARE_API_KEY` | openclaw-railway-template | (secret) | Cloudflare API key for DNS/tunnel integration |
| `OPENCLAW_STATE_DIR` | openclaw-railway-template | - | State directory path (default: /data/.openclaw) |
| `TAILSCALE_HOSTNAME` | openclaw-railway-template | - | Tailnet hostname (default: openclaw-railway) |
| `AWS_SECRET_ACCESS_KEY` | openclaw-railway-template | (secret) | AWS secret key for S3 storage |
| `CLAWDBOT_GATEWAY_TOKEN` | openclaw-railway-template | (secret) | Deprecated: use OPENCLAW_GATEWAY_TOKEN instead |
| `CLAWDBOT_WORKSPACE_DIR` | openclaw-railway-template | - | Deprecated: use OPENCLAW_GATEWAY_TOKEN instead |
| `OPENCLAW_GATEWAY_TOKEN` | openclaw-railway-template | (secret) | Gateway auth token (auto-generated if not set) |
| `OPENCLAW_WORKSPACE_DIR` | openclaw-railway-template | - | Workspace directory path (default: /data/workspace) |
| `Openclaw_exec_security` | openclaw-railway-template | - | Execution security policy for tool sandboxing |
| `CLAUDE_CODE_OAUTH_TOKEN` | openclaw-railway-template | (secret) | Claude Code OAuth token for Anthropic auth |
| `POSTGRES_DB` | Postgres | - | Database to create on first start |
| `DATABASE_URL` | Postgres | - | Full PostgreSQL connection string |
| `POSTGRES_USER` | Postgres | (secret) | User to create on first start |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the created user |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection string |
| `REDISHOST` | Redis | - | Redis server hostname |
| `REDISPORT` | Redis | - | Redis server port |
| `REDISUSER` | Redis | - | Redis username |
| `REDIS_URL` | Redis | - | Full Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (alternate var name) |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection string |
| `PORT` | Worker | - | HTTP port for n8n worker |
| `DB_TYPE` | Worker | - | Database type (postgresdb) |
| `WEBHOOK_URL` | Worker | - | Public URL for n8n webhooks |
| `NODE_OPTIONS` | Worker | - | Node.js runtime options |
| `EXECUTIONS_MODE` | Worker | - | Execution mode: queue |
| `DB_POSTGRESDB_HOST` | Worker | - | PostgreSQL host (use Railway reference) |
| `DB_POSTGRESDB_PORT` | Worker | - | PostgreSQL port (use Railway reference) |
| `DB_POSTGRESDB_USER` | Worker | (secret) | PostgreSQL user (use Railway reference) |
| `N8N_ENCRYPTION_KEY` | Worker | - | Encryption key (must match Primary) |
| `N8N_LISTEN_ADDRESS` | Worker | - | Address worker listens on |
| `N8N_RUNNERS_ENABLED` | Worker | - | Enable task runners |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Redis host (use Railway reference) |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Redis port (use Railway reference) |
| `DB_POSTGRESDB_DATABASE` | Worker | - | PostgreSQL database (use Railway reference) |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | PostgreSQL password (use Railway reference) │ |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Redis password (use Railway reference) |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Redis username |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | - | Enable Redis dual-stack networking |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | - | Enable Railway private networking |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | - | Offload manual runs to workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | - | Enforce strict file permissions |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/start.sh `
- **Healthcheck:** `/setup/healthz`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`
- **Start command:** `n8n worker`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/openclaw-ai-n8n-workflows-tailscale-secu)
