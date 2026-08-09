# Deploy AutoGPT Platform on Railway

No-code AI agent builder. Build, run, and schedule agents you fully own

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autogpt-platform)

## About

AutoGPT Platform is the agent builder from the AutoGPT team. You visually compose AI agents from blocks, wire them to LLM providers and integrations, run them on schedules or triggers, and watch executions live. This template deploys the full self-hosted platform: frontend, the complete backend stack, postgres with vector search, redis, and rabbitmq.

Hosting AutoGPT Platform means running five coordinated pieces: a Next.js frontend with embedded auth, a Python backend that bundles the REST API, websocket server, agent executor, scheduler and notification workers in one container, a postgres database with the vector extension, a redis cluster for caching and events, and rabbitmq for the execution queue. This template wires all of it: database migrations run automatically on boot, secrets are generated per deploy, the API and websocket traffic share one public endpoint, and agent workspace files persist on a volume. Keys go in two separate places. The built in chat assistant runs on one key you set on the backend service at deploy time, with OpenRouter, Anthropic, your own Claude Pro or Max subscription, or a self hosted model all supported. The agents you build in the visual editor use per user keys that each account adds inside the app under Settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/hmseeb/autogpt-railway-frontend:autogpt-platform-beta-v0.7.0` | Web service |
| rabbitmq | `rabbitmq:4.1.4` | Database |
| postgres | `pgvector/pgvector:pg15` | Database |
| redis | `redis:7` | Database |
| backend | `ghcr.io/hmseeb/autogpt-railway-backend:autogpt-platform-beta-v0.7.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frontend | 3000 | - |
| `AUTH_DB_SCHEMA` | frontend | platform | - |
| `BETTER_AUTH_SECRET` | frontend | (secret) | - |
| `AUTH_REQUIRE_EMAIL_VERIFICATION` | frontend | false | - |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | - |
| `POSTGRES_DB` | postgres | postgres | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `PORT` | backend | 8080 | - |
| `DB_NAME` | backend | postgres | - |
| `DB_PORT` | backend | 5432 | - |
| `DB_USER` | backend | (secret) | - |
| `REDIS_PORT` | backend | 6379 | - |
| `CHAT_API_KEY` | backend | (secret) | The key for the endpoint in CHAT_BASE_URL. Only needed if you set that. |
| `CHAT_BASE_URL` | backend | - | Optional. Any OpenAI-compatible endpoint that should write the replies, including OpenAI itself (https://api.openai.com/v1) or your own Ollama or vLLM server. Pair with CHAT_API_KEY. Covers the conversation only. |
| `RABBITMQ_PORT` | backend | 5672 | - |
| `ANTHROPIC_API_KEY` | backend | (secret) | Optional. Use Anthropic to write the replies instead of OpenRouter. Covers the conversation only, so pair it with an OpenRouter key above if you also want web search. |
| `OPEN_ROUTER_API_KEY` | backend | (secret) | RECOMMENDED, and the only single credential that gives a complete assistant. Get one at openrouter.ai/keys. The assistant's web search and the marketplace search both run through OpenRouter no matter which model writes the replies, so without this they report themselves unavailable. |
| `RABBITMQ_DEFAULT_USER` | backend | (secret) | - |
| `CLAMAV_SERVICE_ENABLED` | backend | false | - |
| `UNSUBSCRIBE_SECRET_KEY` | backend | (secret) | - |
| `CLAUDE_CODE_OAUTH_TOKEN` | backend | (secret) | Optional. Use your own Claude Pro or Max subscription to write the replies: run 'claude setup-token' on a machine signed in to Claude Code and paste the result. Covers the conversation only, so pair it with an OpenRouter key above if you also want web search. Personal instances only, a consumer subscription is not licensed to serve other people. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/rabbitmq`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "redis-server --port 6379 --cluster-enabled yes --cluster-config-file /tmp/nodes.conf --cluster-require-full-coverage no --cluster-announce-hostname $RAILWAY_PRIVATE_DOMAIN --cluster-preferred-endpoint-type hostname --protected-mode no & until redis-cli -p 6379 ping >/dev/null 2>&1; do sleep 1; done; redis-cli -p 6379 cluster addslotsrange 0 16383 || true; wait"`
- **Healthcheck:** `/health`
- **Volume:** `/app/autogpt_platform/backend/workspaces`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/autogpt-platform)
